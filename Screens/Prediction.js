import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import { BarChart } from "react-native-chart-kit";

import { Defs, LinearGradient, Stop } from "react-native-svg";
import { LineChart, Grid } from "react-native-svg-charts";

import { AnimatedCircularProgress } from "react-native-circular-progress";
import { useNavigation } from "@react-navigation/native";
import Header from "./Components/Header";
import Navbar from "./Components/Navbar";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "./Auth/AuthProvider";
import { useBill } from "./Components/BillProvider";

const screenWidth = Dimensions.get("window").width;

const PredictionScreen = () => {
  const navigation = useNavigation();
  const { authToken } = useAuth();
  const { units, totalCost, actualMonthly, predictedMonthly, slab, barGraph, labels, fetchMonthlyData } = useBill();
  const [fillPercentage, setFillPercentage] = useState(0);
  const startValue = slab; // Example start value
  const endValue = slab + 100; // Example end value

  useEffect(() => {
    console.log("Prediction screen mounted")
    fetchMonthlyData();
    setFillPercentage(units % 100);
  }, []);

  const data = {
    labels: labels,
    datasets: [
      {
        data: barGraph,
        colors: barGraph.map((_, index) => (opacity = 1) =>
          index === barGraph.length - 1
            ? `gray` 
            : `#007AFF` 
        ),
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Solid black for labels and axes
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Consistent label color
    style: {
      borderRadius: 16,
    },
    useShadowColor: false, // Disable shadow color'
    showValuesOnTopOfBars: true,
  };

  return (
    <>
      <Header screenName="Prediction" navigation={navigation} />
      <View style={styles.container}>
        <ScrollView style={styles.scrollContainer}>
          <View style={styles.predictionCard}>
            <TouchableWithoutFeedback onPress={() => navigation.navigate("RoomOverview")}>
              <AnimatedCircularProgress
                size={240}
                width={9}
                fill={fillPercentage}
                tintColor="#007AFF"
                backgroundColor="#E5E5EA"
                rotation={240}
                lineCap="round"
                arcSweepAngle={240}
              >
                {(fill) => (
                  <View style={styles.progressTextContainer}>
                    <Text style={styles.consumptionValue}>{units}</Text>
                    <Text style={styles.consumptionUnit}>Predicted units</Text>
                  </View>
                )}
              </AnimatedCircularProgress>
            </TouchableWithoutFeedback>

            <Text style={styles.startValueText}>{startValue}</Text>
            <Text style={styles.endValueText}>{endValue}</Text>

            <Text style={styles.estimatedBill}>
              Estimated Bill: <Text style={{ color: "#007AFF", fontFamily:"Lato-Bold" }}>Pkr {totalCost}</Text>
            </Text>

            <TouchableOpacity
              style={styles.detailsButton}
              onPress={() => navigation.navigate("RoomOverview")}
            >
              <Ionicons name="eye" size={20} color="white" />
              <Text style={styles.detailsButtonText}> View Room Details</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.graphCard}>
            <ScrollView horizontal>
              <LineChart
                data={data}
                width={screenWidth * 1.5}
                height={300}
                fromZero
                segments={2}
                withCustomBarColorFromData={true} // Enable custom colors from `data.datasets.colors`
                verticalLabelRotation={0}
                chartConfig={chartConfig} // Solid background and label colors
                style={{ marginVertical: 8, borderRadius: 16 }}
              />
            </ScrollView>
            <Text style={styles.graphDescription}>
              <Text style={{ color: "#007AFF" }}>Actual</Text> and 
              <Text style={{ color: "gray" }}> Predicted</Text> units.
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
    alignItems: "center",
    justifyContent: "center",
  },
  scrollContainer: {
    flex: 1,
  },
  predictionCard: {
    backgroundColor: "#ffffff",
    borderRadius: 40,
    padding: 30,
    marginHorizontal: 20,
    marginVertical: 10,
    alignItems: "center",
    shadowColor: "rgba(0,0,0,0.5)",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 20,
  },
  consumptionValue: {
    fontSize: 40,
    color: "#007AFF",
    fontFamily: "Lato-Regular",
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
    fontWeight: 'normal',
    fontFamily: "Lato-Regular",
    color: "#666",
    textAlign: "center",
    paddingVertical: 20,
    marginTop:-15
  },
  detailsButton: {
    backgroundColor: "#007AFF",
    borderRadius: 36,
    padding: 14,
    width: "70%",
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  detailsButtonText: {
    color: "#fff",
    fontSize: 14,
    fontFamily: "Lato-Bold",
    textAlign: "center",
  },
  graphCard: {
    backgroundColor: "#ffffff",
    borderRadius: 40,
    padding: 20,
    marginHorizontal: 16,
    marginTop: 10,
    marginBottom: 70,
    shadowColor: "rgba(0,0,0,0.5)",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.9,
    shadowRadius: 29,
    elevation: 30,
  },
  graphDescription: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    fontFamily: "Lato-Regular",
    marginTop: 10,
  },
  progressTextContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -60 }, { translateY: -40 }],
    alignItems: "center",
  },
  startValueText: {
    position: "absolute",
    left: 60,
    top: 220,
    fontSize: 20,
    color: "#A9A9A9",
    fontFamily: "Lato-Regular",
  },
  endValueText: {
    position: "absolute",
    right: 60,
    top: 220,
    fontSize: 20,
    color: "red",
    fontFamily: "Lato-Regular",
  },
});

export default PredictionScreen;
