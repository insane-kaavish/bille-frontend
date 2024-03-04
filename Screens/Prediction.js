import React, { useEffect, useState } from "react";
import MenuComponent from "./Components/Menu";
import NavBar from "./Components/NavBar";
import { LineChart } from "react-native-chart-kit";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import { useAuth } from "./AuthScreens/AuthProvider";
import Config from "react-native-config";

import { MenuProvider } from "react-native-popup-menu";

const API_URL = Config.API_URL;
const screenWidth = Dimensions.get("window").width;

const currentDate = new Date();
const currentMonth = currentDate.getMonth(); // Adding 1 because getMonth() returns zero-based month
// Convert month to string such as Jan, Feb, etc.
const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const currentMonthName = monthNames[currentMonth];

const currentYear = currentDate.getFullYear();

const predictRequest = async (token) => {
  try {
    const response = await fetch(`${API_URL}/predict/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Token ${token}` : "",
      },
      body: JSON.stringify({ month: currentMonthName, year: currentYear }),
    });
    if (!response.ok) {
      throw new Error("Failed to fetch bill data");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
};

const monthlyRequest = async (token, is_predicted = "False") => {
  try {
    const response = await fetch(`${API_URL}/months/?is_predicted=${is_predicted}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Token ${token}` : "",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch monthly data");
    }
    const data = await response.json();
    return data.monthwise_units;
  } catch (error) {
    console.error("Error:", error);
  }
};

const getLabels = () => {
  const labels = [];
  // Start from 11 months ago to include the correct range
  for (let i = 11; i >= 0; i--) {
    const year = (currentMonth - i < 0) ? currentYear - 1 : currentYear;
    const monthIndex = (currentMonth - i + 12) % 12;
    const month = monthNames[monthIndex];
    const label = i === 11 || month === "Jan" ? `${month}-${year.toString().slice(-2)}` : month;
    labels.push(label);
  }
  return labels;
};

const getLast12Months = () => {
  const last12Months = [];
  for (let i = 11; i >= 0; i--) {
    const month = (currentMonth - i + 12) % 12;
    const year = (currentMonth - i < 0) ? currentYear - 1 : currentYear;
    last12Months.push(`${monthNames[month]}-${year}`);
  }
  return last12Months;
};

const fillMissingMonths = (data, last12Months) => {
  return last12Months.map(month => data[month] ? data[month][0] : 0);
};

const App = () => {
  const navigation = useNavigation();
  const [hoveredSlab, setHoveredSlab] = useState(null);
  const { authToken } = useAuth();
  const [labels, setLabels] = useState(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']);
  const [units, setUnits] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [fillPercentage, setFillPercentage] = useState(0);
  const [actualValues, setActualValues] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [predictedValues, setPredictedValues] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  
  const last12Months = getLast12Months();

  // Function to handle hover event
  const handleHover = (slab) => {
    setHoveredSlab(slab);
  };

  // Function to handle mouse leave event
  const handleMouseLeave = () => {
    setHoveredSlab(null);
  };


  useEffect(() => {
    const fetchData = async () => {
      const data = await predictRequest(authToken);
      setUnits(data.units);
      setTotalCost(Number(data.total_cost));
      setHoveredSlab(data.per_unit_cost);
      setActualValues(fillMissingMonths(await monthlyRequest(authToken), last12Months));
      setPredictedValues(fillMissingMonths(await monthlyRequest(authToken, "True"), last12Months));
      setLabels(getLabels());
      setFillPercentage((data.units % 100));
      console.log("actual values: ", actualValues);
      console.log("predicted values: ", predictedValues);
    };
    fetchData();
  }, [authToken]);

  const data = {
    labels: labels,
    datasets: [
      {
        data: actualValues,
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
        strokeWidth: 2,
        label: "Actual Units",
      },
      {
        data: predictedValues,
        color: (opacity = 1) => `rgba(244, 65, 134, ${opacity})`,
        strokeWidth: 2,
        label: "Predicted Units",
      },
    ],
  };

  return (
    <MenuProvider skipInstanceCheck={true} style={styles.container}>
      <View style={styles.header}>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontFamily: "Lato-Bold",
              fontSize: 20,
              color: "#171A1F",
              textAlign: "left",
            }}
          >
            Bill-E Prediction Summary
          </Text>
        </View>
        <MenuComponent navigation={navigation} />
      </View>

      <ScrollView style={styles.scrollContainer}>
        <View style={styles.predictionCard}>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate("RoomwisePrediction")}
          >
            <AnimatedCircularProgress
              size={180}
              width={15}
              fill={fillPercentage}
              tintColor="#4682B4"
              onAnimationComplete={() => console.log("onAnimationComplete")}
              backgroundColor="#F2F2F2"
              rotation={0}
              onMouseEnter={() => handleHover(slab)}
              onMouseLeave={handleMouseLeave}
            >
              {(fill) => (
                <View style={styles.progressTextContainer}>
                  <Text style={styles.consumptionValue}>{units}</Text>
                  <Text style={styles.consumptionUnit}>Predicted units</Text>
                </View>
              )}
            </AnimatedCircularProgress>
          </TouchableWithoutFeedback>

          {/* Render slab rates if hovered */}
          {hoveredSlab && (
            <View style={styles.slabRatesContainer}>
              <Text style={styles.slabRateText}>
                Slab Rate: {hoveredSlab.rate}
              </Text>
            </View>
          )}

          <View style={styles.unitDetails}>
            <Text style={styles.estimatedBill}>
              Estimated Bill:{" "}
              <Text style={{ color: "orange" }}>
                {" "}
                Pkr. {totalCost.toFixed(2)}
              </Text>
            </Text>
          </View>

          <TouchableOpacity
            style={styles.detailsButton}
            onPress={() => navigation.navigate("RoomwisePrediction")}
          >
            <Text style={styles.detailsButtonText}>View Room Details</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.graphCard}>
          <ScrollView horizontal>
            <LineChart
              data={data}
              width={screenWidth * 1.5}
              height={300}
              yAxisLabel=""
              yAxisSuffix=""
              verticalLabelRotation={0}
              fromZero={true}
              segments={4}
              chartConfig={{
                backgroundGradientFrom: "#FFF",
                backgroundGradientTo: "#FFF",
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                strokeWidth: 5,
                barPercentage: 0.3,
                propsForLabels: { fontsize: 2 },
                withInnerLines: false, // Remove grid lines
                decimalPlaces: 0,
                formatYLabel: (yLabel) => yLabel.toFixed(0),
                yAxisInterval: 250,
                decimalPlaces: 0,
              }}
              bezier
              style={{ marginVertical: 8, borderRadius: 16 }}
            />
          </ScrollView>
          <Text style={styles.graphDescription}>
            Comparison between the actual and predicted units.
          </Text>
        </View>
      </ScrollView>

      <NavBar />
    </MenuProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingHorizontal: 10,
    paddingTop: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  scrollContainer: {
    flex: 1,
  },
  predictionCard: {
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    padding: 16,
    margin: 16,
    alignItems: "center",
    elevation: 6, // for the main shadow
    shadowColor: "#000", // color of the shadow
    shadowOffset: { width: 0, height: 0 }, // same as the CSS code
    shadowOpacity: 0.3, // opacity of the shadow
    shadowRadius: 1, // blur radius of the shadow
  },
  consumptionValue: {
    fontSize: 48,
    color: "#000",
    fontFamily: "Lato-Bold",
    textAlign: "center",
  },
  consumptionUnit: {
    fontSize: 18,
    color: "#666",
    fontFamily: "Lato-Bold",
    textAlign: "center",
  },
  estimatedBill: {
    fontSize: 20,
    color: "#666",
    textAlign: "center",
    // marginBottom: 20,
    fontFamily: "Lato-Bold",
  },
  detailsButton: {
    backgroundColor: "#535CE8",
    borderRadius: 20,
    padding: 12,
    alignItems: "center",
    width: "70%",
    alignSelf: "center",
    marginVertical: 20,
  },
  detailsButtonText: {
    color: "white",
    fontFamily: "Lato-Bold",
  },
  progressTextContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -60 }, { translateY: -40 }], // Adjust these values based on the size of your progress circle
    alignItems: "center",
  },
  progressText: {
    fontSize: 48, // Adjust the font size as needed
    fontFamily: "Lato-Bold",
    textAlign: "center", // Center the text horizontally
    textShadowColor: "rgba(0, 0, 0, 0.5)", // Shadow color
    textShadowOffset: { width: 1, height: 1 }, // Shadow offset
    textShadowRadius: 2, // Shadow radius
  },
  graphCard: {
    backgroundColor: "#f9f9f9",
    borderRadius: 1,
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    marginTop: 10,
    marginBottom: 70,
    elevation: 6, // for the main shadow
    shadowColor: "#000", // color of the shadow
    shadowOffset: { width: 0, height: 0 }, // same as the CSS code
    shadowOpacity: 0.3, // opacity of the shadow
    shadowRadius: 1, // blur radius of the shadow
  },
  graphDescription: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginTop: 10,
    fontFamily: "Lato-Bold",
  },
  slabRatesContainer: {
    position: "absolute",
    bottom: -40,
    width: "100%",
    alignItems: "center",
  },
  slabRateText: {
    fontFamily: "Lato-Bold",
    fontSize: 16,
    color: "#666",
  },
  unitDetails: {
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    padding: 16,
    margin: 16,
    alignItems: "center",
    elevation: 6, // for the main shadow
    shadowColor: "#000", // color of the shadow
    shadowOffset: { width: 0, height: 0 }, // same as the CSS code
    shadowOpacity: 0.6, // opacity of the shadow
    shadowRadius: 1, // blur radius of the shadow
  },
});

export default App;
