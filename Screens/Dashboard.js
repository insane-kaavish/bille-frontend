import React, { useEffect, useState } from "react";
import {
  Image,
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Header from "./Components/Header";
import Navbar from "./Components/Navbar";
import { useAuth } from "./Auth/AuthProvider";
import { useBill } from "./Components/BillProvider";
import { GlobalStyles } from "./Styles/GlobalStyles";

const height = Dimensions.get("window").height;

const DashboardScreen = ({ navigation }) => {
  const { authToken } = useAuth();
  const { units, totalCost, perUnitCost, fetchPredictedData } = useBill();

  useEffect(() => {
    console.log("Fetching predicted data")
    fetchPredictedData();
  }, [authToken]);

  const navigateToPrediction = () => {
    navigation.navigate("Prediction");
  };
  const navigateToRoomOverview = () => {
    navigation.navigate("RoomOverview");
  };

  return (
    <>
      <Header screenName="Dashboard" navigation={navigation} />
      <View style={GlobalStyles.screenContainer}>
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
            <View style={[styles.card, { backgroundColor: "#7C83ED" }]}>
              <Text style={styles.cardTitle}>Expected Bill</Text>
              <Text style={styles.cardAmount}>Rs. {totalCost}</Text>
              <Text style={styles.cardText}>Based on usage pattern</Text>
              <View style={styles.cardIconContainer}>
                <Image source={require("../extra/assets/c11.png")} />
              </View>
            </View>

            <View style={[styles.card, { backgroundColor: "#2ACCCF" }]}>
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
          </View>
            <TouchableOpacity
              style={styles.RRcontainer}
              onPress={navigateToRoomOverview}
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
              <Text style={styles.MUGText}> Monthly{"\n"}   Units</Text>
              <View style={styles.MUGicon}>
                <Image source={require("../extra/assets/MUGIcon.png")} />
              </View>
            </TouchableOpacity>
        </ScrollView>
        <Navbar />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  MC: {
    width: "90%",
    height: "20%",
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
    left: "74%",
    top: "13%",
    position: "relative",
  },
  MCtitle: {
    left: "5%",
    top: "-30%",
    position: "relative",
    color: "#171A1F",
    fontSize: 18,
    fontFamily: "Lato-Bold",
    fontWeight: "600",
    lineHeight: 28,
  },
  MCdescription: {
    width: "50%",
    left: "5%",
    top: "-25%",
    position: "relative",
    color: "#171A1F",
    fontSize: 14,
    fontFamily: "Lato-Bold",
    fontWeight: "400",
    lineHeight: 22,
  },
  MCunitsCount: {
    left: "78.5%",
    top: "7.5%",
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
    marginTop: "7.5%",
    paddingHorizontal: "4%",
  },
  card: {
    width: "48%",
    height: "175%",
    backgroundColor: "#F1F2FD",
    borderRadius: 16,
    padding: "3%",
  },
  cardTitle: {
    color: "white",
    fontSize: 18,
    fontFamily: "Lato-Bold",
    fontWeight: "500",
  },
  cardAmount: {
    color: "white",
    fontSize: 28,
    fontFamily: "Lato-Bold",
    fontWeight: "500",
    lineHeight: 36,
  },
  cardText: {
    color: "white",
    fontSize: 12,
    fontFamily: "Lato-Bold",
    fontWeight: "400",
  },
  cardIconContainer: {
    width: "40%",
    height: "40%",
    position: "absolute",
    right: 10,
    bottom: 10,
  },
  MRContainer: {
    marginLeft: "3.5%", // Aligning "Monthly Report" with "Highlights"
    marginTop: "20%", // Adjust the margin as needed
    padding: "1.5%", // Adjust the padding as needed
  },
  MRtext: {
    color: "#171A1F",
    fontSize: 20,
    fontFamily: "Lato-Bold",
    fontWeight: "600",
    lineHeight: 30,
  },
  RRcontainer: {
    width: "44%",
    height: "15%",
    left: "3.5%",
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
    top: "5%",
    fontSize: 22,
    fontWeight: "700",
    lineHeight: 30,
    color: "#323842",
    flexWrap: "wrap",
    marginLeft: "40%", // Adjust the left margin to center the text
    marginTop: "10%", // Adjust the margin as needed
  },
  RRicon: {
    left: "6%", // Adjust the left position as needed
    top: "-48%",  // Adjust the top position as needed
  },
  MUGcontainer: {
    width: "44%",
    height: "15%",
    left: "52.25%",
    top: "-15%",
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
    top: "5%", // Adjust the top position as needed
    fontSize: 22,
    fontWeight: "700",
    lineHeight: 30,
    color: "#323842",
    flexWrap: "wrap",
    marginLeft: "40%", // Adjust the left margin to center the text
    marginTop: "10%", // Adjust the margin as needed
  },
  MUGicon: {
    left: "8%", // Adjust the left position as needed
    top: "-50%", // Adjust the top position as needed
  },
});

export default DashboardScreen;
