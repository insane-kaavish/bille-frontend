import React, { useEffect, useState } from "react";
import Header from "./Components/Header";
import Navbar from "./Components/Navbar";
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
import { useAuth } from "./Auth/AuthProvider";
import { useBill } from "./Components/BillProvider";
// import Config from "react-native-config";

// const API_URL = Config.API_URL;
const API_URL = process.env.EXPO_PUBLIC_API_URL;
const screenWidth = Dimensions.get("window").width;

const HorizontalLine = ({ selectedIndex, data, chartHeight, chartWidth, color }) => {
  if (!data || !data.labels || !data.labels.length || isNaN(selectedIndex) || selectedIndex < 0 || selectedIndex >= data.labels.length) {
    return null; // Return null if data or selectedIndex is invalid
  }

  // Calculate the y-coordinate based on the selected index
  const y = (chartHeight / (data.labels.length - 1)) * selectedIndex;

  // Calculate the left position to align the line with the center of the chart
  const leftPosition = chartWidth / 2;

  return (
    <View style={{
      position: 'absolute',
      // left: leftPosition,
      right: 0,
      top: y - 0.5, // Adjust for half of the border width
      borderTopWidth: 1,
      borderTopColor: color || 'red',
      width: '80%', // Adjust the width as needed
      zIndex: 1, // Ensure the line is above the chart
    }} />
  );
};




const height = Dimensions.get("window").height;

const PredictionScreen = () => {
  const navigation = useNavigation();
  const { authToken } = useAuth();
  const {
    units,
    totalCost,
    actualMonthly,
    predictedMonthly,
    labels,
    fetchMonthlyData,
    isMonthlyDataFetched,
  } = useBill();
  const [selectedIndex, setSelectedIndex] = useState(null); // State to track selected index
  const [fillPercentage, setFillPercentage] = useState(0);
  const [selectedValue, setSelectedValue] = useState(null); // State to store selected value

  useEffect(() => {
    const fetchData = async () => {
      if (isMonthlyDataFetched === false) {
        console.log("Fetching monthly data");
        fetchMonthlyData();
      }
      setFillPercentage(units % 100);
    };
    fetchData();
  }, [authToken]);

  const data = {
    labels: labels,
    datasets: [
      {
        data: actualMonthly,
        color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`, // Adjust the blue color here
        strokeWidth: 2,
        label: "Actual Units",
      },
      {
        data: predictedMonthly,
        color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`, // Adjust the red color here
        strokeWidth: 2,
        label: "Predicted Units",
      },
    ],
  };

  return (
    <>
      <Header screenName="Prediction" navigation={navigation} />

      <View style={styles.container}>
        <ScrollView style={styles.scrollContainer}>
          <View style={styles.predictionCard}>
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate("RoomOverview")}
            >
              <AnimatedCircularProgress
                size={180}
                width={15}
                fill={fillPercentage}
                tintColor="#535CE8"
                backgroundColor="#F2F2F2"
                rotation={225}
                lineCap="round"
                arcSweepAngle={270}
              >
                {(fill) => (
                  <View style={styles.progressTextContainer}>
                    <Text style={styles.consumptionValue}>{units}</Text>
                    <Text style={styles.consumptionUnit}>Predicted units</Text>
                  </View>
                )}
              </AnimatedCircularProgress>
            </TouchableWithoutFeedback>

            <View style={styles.unitDetails}>
              <Text style={styles.estimatedBill}>
                Estimated Bill:{" "}
                <Text style={{ color: "orange" }}> Pkr. {totalCost}</Text>
              </Text>
            </View>

            <TouchableOpacity
              style={styles.detailsButton}
              onPress={() => navigation.navigate("RoomOverview")}
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
              verticalLabelRotation={0}
              fromZero={true}
              segments={4}
              onDataPointClick={(data) => {
                setSelectedIndex(data.index); // Update selected index on data point click
                setSelectedValue(data.value); // Update selected value on data point click
              }}
              chartConfig={{
                backgroundGradientFrom: "#FFF",
                backgroundGradientTo: "#FFF",
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                strokeWidth: 5,
                barPercentage: 0.3,
                propsForLabels: { fontsize: 2 },
                decimalPlaces: 0,
                yAxisInterval: 250,
              }}
              bezier
              style={{ marginVertical: 8, borderRadius: 16 }}
            />
            {/* Render the horizontal line */}
            {/* <HorizontalLine value={50} width="80%" color="blue" chartHeight={300} selectedIndex={selectedIndex} data={data} /> */}
            </ScrollView>
            <Text style={styles.graphDescription}>
              Comparison between the{" "}
              <Text style={{ color: "blue" }}>actual</Text> and{" "}
              <Text style={{ color: "red" }}>predicted</Text> units.
            </Text>
            <Text style={styles.selectedValueText}>
              Selected Value: {selectedValue !== null ? selectedValue.toFixed(2) : "-"}
            </Text>
          </View>
        </ScrollView>
        <Navbar />
      </View>
    </>
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
    paddingTop: height * 0.001,
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

export default PredictionScreen;
