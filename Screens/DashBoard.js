import React from "react";
import {
  Image,
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import {
  MenuProvider,
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";

import MenuComponent from "./Components/Menu";
import NavBar from "./Components/NavBar";
import { useAuth } from "./AuthScreens/AuthProvider";

import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesomeicons from "react-native-vector-icons/FontAwesome";
import WeatherComponent from "./Components/Weather";
import Config from "react-native-config";

const API_URL = Config.API_URL;

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
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
};

const Dashboard = ({ navigation }) => {
  const { authToken } = useAuth();
  const [units, setUnits] = React.useState(0);
  const [totalCost, setTotalCost] = React.useState(0);
  const [perUnitCost, setPerUnitCost] = React.useState(0);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchPrediction = async () => {
      if (perUnitCost !== 0) return;
      const data = await predictRequest(authToken);
      setUnits(data.units);
      setTotalCost(data.total_cost);
      setPerUnitCost(data.per_unit_cost);
      setLoading(false);
    };
    fetchPrediction();
  }, [authToken]);

  const navigateToOverview = () => {
    navigation.navigate("DashBoard");
  };

  const navigateToPrediction = () => {
    navigation.navigate("Prediction");
  };
  const navigateToRoomWise = () => {
    navigation.navigate("RoomwisePrediction");
  };
  const navigateToProfile = () => {
    navigation.navigate("Profile");
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
            Bill-E Dashboard
          </Text>
          <WeatherComponent />
        </View>
        <MenuComponent navigation={navigation} />
      </View>

      <ScrollView style={styles.scrollContainer}>
        <TouchableOpacity style={styles.MC} onPress={navigateToPrediction}>
          <View style={styles.MCcircleContainer}>
            <View style={styles.MCinnermostCircleContainer}>
              <Image source={require("../extra/assets/OV.png")} />
            </View>
          </View>
          <Text style={styles.MCtitle}>Current Units</Text>
          <Text style={styles.MCdescription}>
            Based on your current consumption data, your predicted units are{" "}
            {units} and consider good.
          </Text>
          <Text style={styles.MCunitsCount}>{units}</Text>
        </TouchableOpacity>

        <View style={styles.HLcontainer}>
          <Text style={styles.HLtitle}>Highlights</Text>
        </View>

        <View style={styles.cardsContainer}>
          <View style={[styles.card, { backgroundColor: "#F1F2FDFF" }]}>
            <Text style={styles.cardTitle}>Expected Bill</Text>
            <Text style={styles.cardAmount}>Rs. {totalCost}</Text>
            <Text style={styles.cardText}>Based on usage pattern</Text>
            <View style={styles.cardIconContainer}>
              <Image source={require("../extra/assets/c11.png")} />
            </View>
          </View>

          <View style={[styles.card, { backgroundColor: "#F1F2FDFF" }]}>
            <Text style={styles.cardTitle}>Per Unit Price</Text>
            <Text style={styles.cardAmount}>Rs. {perUnitCost}</Text>
            <Text style={styles.cardText}>Based on the slab rates</Text>
            <View style={styles.cardIconContainer}>
              <Image source={require("../extra/assets/c12.png")} />
            </View>
          </View>
        </View>

        <View style={styles.MRContainer}>
          <Text style={styles.MRtext}>Monthly Report</Text>
          <TouchableOpacity
            style={styles.RRcontainer}
            onPress={navigateToRoomWise}
          >
            <Text style={styles.RRText}>Room Report</Text>
            <View style={styles.RRicon}>
              <Image source={require("../extra/assets/RRIcon.png")} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.MUGcontainer}
            onPress={navigateToPrediction}
          >
            <Text style={styles.MUGText}> Monthly Unit Graph</Text>
            <View style={styles.MUGicon}>
              <Image source={require("../extra/assets/MUGIcon.png")} />
            </View>
          </TouchableOpacity>
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
  MC: {
    width: 348,
    height: 144,
    alignSelf: "center",
    justifyContent: "center",
    marginTop: "6%",
    backgroundColor: "#F1F2FDFF",
    borderRadius: 16,
    elevation: 6, // for the main shadow
    shadowColor: "#000", // color of the shadow
    shadowOffset: { width: 0, height: 0 }, // same as the CSS code
    shadowOpacity: 0.3, // opacity of the shadow
    shadowRadius: 1, // blur radius of the shadow
  },
  MCcircleContainer: {
    left: 259,
    top: -1,
    position: "absolute",
  },
  MCtitle: {
    left: 20,
    top: 8,
    position: "absolute",
    color: "#171A1F",
    fontSize: 18,
    fontFamily: "Lato-Bold",
    fontWeight: "600",
    lineHeight: 28,
  },
  MCdescription: {
    width: 198,
    left: 20,
    top: 40,
    position: "absolute",
    color: "#171A1F",
    fontSize: 14,
    fontFamily: "Lato-Bold",
    fontWeight: "400",
    lineHeight: 22,
  },
  MCunitsCount: {
    left: 276,
    top: 12,
    position: "absolute",
    color: "white",
    fontSize: 24,
    fontFamily: "Lato-Bold",
    fontWeight: "700",
    lineHeight: 36,
    alignContent: "center",
    textAlign: "center",
    transform: [{ translateX: -1.75 }],
  },
  HLcontainer: {
    left: "5%",
    top: "3%",
  },
  HLtitle: {
    color: "#171A1F",
    fontSize: 20,
    fontFamily: "Lato-Bold",
    fontWeight: "600",
    lineHeight: 30,
  },
  cardsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    paddingHorizontal: 10,
  },
  card: {
    width: "48%",
    height: 180,
    backgroundColor: "#F1F2FD",
    borderRadius: 16,
    padding: 10,
  },
  cardTitle: {
    color: "#171A1F",
    fontSize: 18,
    fontFamily: "Lato-Bold",
    fontWeight: "500",
    lineHeight: 22,
  },
  cardAmount: {
    color: "#171A1F",
    fontSize: 28,
    fontFamily: "Lato-Bold",
    fontWeight: "500",
    lineHeight: 36,
    marginTop: 10,
  },
  cardText: {
    color: "#171A1F",
    fontSize: 12,
    fontFamily: "Lato-Bold",
    fontWeight: "400",
  },
  cardIconContainer: {
    width: 66,
    height: 66,
    position: "absolute",
    right: 10,
    bottom: 10,
  },
  MRContainer: {
    marginLeft: "3%", // Aligning "Monthly Report" with "Highlights"
    marginTop: "5%", // Adjust the margin as needed
    justifyContent: "space-between",
  },
  MRtext: {
    color: "#171A1F",
    fontSize: 20,
    fontFamily: "Lato-Bold",
    fontWeight: "600",
    lineHeight: 30,
  },
  RRcontainer: {
    width: "45.5%",
    height: 91,
    backgroundColor: "#F1F2FDFF",
    borderRadius: 16,
    elevation: 6, // for the main shadow
    shadowColor: "#000", // color of the shadow
    shadowOffset: { width: 0, height: 0 }, // same as the CSS code
    shadowOpacity: 0.3, // opacity of the shadow
    shadowRadius: 1, // blur radius of the shadow
  },
  RRText: {
    fontFamily: "Lato-Regular",
    fontSize: 20,
    fontWeight: "700",
    lineHeight: 30,
    color: "#323842",
    flexWrap: "wrap",
    marginLeft: "40%", // Adjust the left margin to center the text
    marginTop: 13, // Adjust the margin as needed
  },
  RRicon: {
    // position: 'absolute',
    left: "5%", // Adjust the left position as needed
    top: "-60%", // Adjust the top position as needed
    // transform: [{ translateY: -40 }], // Centering the icon vertically
  },
  MUGcontainer: {
    // position: 'absolute',
    top: "-42.95%",
    left: "51%",
    width: "45.5%", // Match the width of the cards
    height: 91,
    backgroundColor: "#F1F2FDFF", // white
    borderRadius: 16,
    elevation: 6, // for the main shadow
    shadowColor: "#000", // color of the shadow
    shadowOffset: { width: 0, height: 0 }, // same as the CSS code
    shadowOpacity: 0.3, // opacity of the shadow
    shadowRadius: 1, // blur radius of the shadow
  },
  MUGText: {
    fontFamily: "Lato-Regular",
    fontSize: 20,
    fontWeight: "700",
    lineHeight: 30,
    color: "#323842",
    flexWrap: "wrap",
    marginLeft: "40%", // Adjust the left margin to center the text
    marginTop: 13, // Adjust the margin as needed
  },
  MUGicon: {
    // position: 'absolute',
    left: "5%", // Adjust the left position as needed
    top: "-65%", // Adjust the top position as needed
    // transform: [{ translateY: -40 }], // Centering the icon vertically
  },
});

export default Dashboard;
