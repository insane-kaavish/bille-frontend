import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Dimensions, TouchableWithoutFeedback } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { useNavigation } from "@react-navigation/native";
import Header from "./Components/Header";
import Navbar from "./Components/Navbar";
import { useAuth } from "./Auth/AuthProvider";
import { useBill } from "./Components/BillProvider";
import { Ionicons } from '@expo/vector-icons';


const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const PredictionScreen = () => {
  const navigation = useNavigation();
  const { authToken } = useAuth();
  const { units, totalCost, actualMonthly, predictedMonthly, labels, fetchMonthlyData } = useBill();
  const [fillPercentage, setFillPercentage] = useState(0);

  useEffect(() => {
    fetchMonthlyData();
    setFillPercentage(units % 100);
  }, []);

  const data = {
    labels,
    datasets: [
      {
        data: actualMonthly,
        color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
        strokeWidth: 2,
        label: "Actual Units",
      },
      {
        data: predictedMonthly,
        color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
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
            <TouchableWithoutFeedback onPress={() => navigation.navigate("RoomOverview")}>
              <AnimatedCircularProgress
                size={280} // Increased size for better visibility
                width={20} // Wider progress bar
                fill={fillPercentage}
                tintColor="#00e0ff"
                backgroundColor="#3d5875"
                rotation={225}
                lineCap="round"
                arcSweepAngle={270}
              >
                {fill => (
                  <View style={styles.progressTextContainer}>
                    <Text style={styles.consumptionValue}>{units}</Text>
                    <Text style={styles.consumptionUnit}>Predicted units</Text>
                  </View>
                )}
              </AnimatedCircularProgress>
            </TouchableWithoutFeedback>
            <Text style={styles.estimatedBill}>
              Estimated Bill: <Text style={{ color: "#4CAF50" }}>Pkr {totalCost}</Text>
            </Text>

            <TouchableOpacity style={styles.detailsButton}   onPress={() => navigation.navigate("RoomOverview")} >
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
                verticalLabelRotation={0}
                fromZero
                segments={4}
                chartConfig={{
                  backgroundGradientFrom: "#FFF",
                  backgroundGradientTo: "#FFF",
                  decimalPlaces: 0,
                  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                  style: {
                    borderRadius: 16,
                  },
                  propsForDots: {
                    r: "6",
                    strokeWidth: "2",
                    stroke: "#ffa726"
                  }
                }}
                bezier
                style={{ marginVertical: 8, borderRadius: 16 }}
              />
            </ScrollView>
            <Text style={styles.graphDescription}>
              Comparison between the <Text style={{ color: "blue" }}>actual</Text> and
              <Text style={{ color: "red" }}> predicted</Text> units.
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
    alignItems: 'center', // Center children horizontally
    justifyContent: 'center', // Center children vertically
  
  },
  scrollContainer: {
    flex: 1,
  },
  predictionCard: {
    backgroundColor: "#ffffff", // Lighter background for better contrast
    borderRadius: 12, // Rounded corners for a softer look
    padding: 24, // More padding for a spacious layout
    margin: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 10, // More prominent elevation for a "floating" effect
  },
  consumptionValue: {
    fontSize: 48,
    color: "#000",
    fontFamily: "Arial",
    textAlign: "center",
  },
  consumptionUnit: {
    fontSize: 18,
    color: "#666",
    fontFamily: "Arial",
    textAlign: "center",
  },
  estimatedBill: {
    fontSize: 23,
    color: "#37474F", // Deep blue-grey, elegant and less stark
    textAlign: "center",
    fontFamily: "Arial",
    // make bold 
    // fontWeight: "bold",
    marginVertical: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.2)', // Softer shadow for a subtle depth effect
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1, // Less blur for cleaner text appearance
  },
  
  detailsButton: {
    backgroundColor: "#00e0ff",
    borderRadius: 20,
    padding: 12,
    width: "80%",
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
    opacity: 0.9, // Default lower opacity
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    

  },
  detailsButtonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Arial",
    textAlign: "center",
  },
  graphCard: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 16,
    marginTop: 10,
    marginBottom: 70,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 10,
  },
  graphDescription: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    fontFamily: "Arial",
    marginTop: 10,
  },
  progressTextContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -70 }, { translateY: -40 }], // Centered text alignment
    alignItems: "center",
  },
});

export default PredictionScreen;
