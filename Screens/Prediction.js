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
                size={240} // Increased size for better visibility
                width={9} // Wider progress bar
                fill={fillPercentage}
                tintColor="#007AFF"
                backgroundColor="#E5E5EA"
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
              Estimated Bill: <Text style={{ color: "#007AFF", fontFamily:"Lato-Bold" }}>Pkr {totalCost}</Text>
            </Text>

            <TouchableOpacity style={styles.detailsButton}   onPress={() => navigation.navigate("RoomOverview")} >
            <Ionicons name="eye" size={20} color="white" />
            
              <Text style={styles.detailsButtonText}>   View Room Details</Text>
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
                    r: "4",
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
    backgroundColor: "#ffffff", // Maintaining a light background for contrast
    borderRadius: 40, // Softening corners further for a more modern, elegant look
    padding: 30, // Increasing padding to enhance the card's spacious feel
    marginHorizontal: 20, // Applying horizontal margin for better layout spacing
    marginVertical: 10, // Reducing vertical margin to tighten up the design
    alignItems: "center",
    shadowColor: "rgba(0,0,0,0.5)", // Softening shadow color for a more subtle effect
    shadowOffset: { width: 0, height: 10 }, // Lifting the shadow for a deeper depth illusion
    shadowOpacity: 0.1, // Lowering opacity for a finer shadow
    shadowRadius: 20, // Increasing radius for a smoother fade of shadows
    elevation: 20, // Enhancing elevation for a pronounced floating effect
  },
  
  consumptionValue: {
    fontSize: 40,
    color: "#007AFF",
    fontFamily: "Lato-Regular", // Bold font for emphasis
    textAlign: "center",
  },
  consumptionUnit: {
    fontSize: 18,
    color: "#666",
    fontFamily: "Lato-Bold", // Regular font for a softer look
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
    opacity: 0.9, // Default lower opacity
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    

  },
  detailsButtonText: {
    color: "#fff",
    fontSize: 14,
    fontFamily: "Lato-Bold", // Bold font for emphasis
    textAlign: "center",
  },
  graphCard: {
    backgroundColor: "#ffffff",
    borderRadius: 40,
    padding: 20,
    marginHorizontal: 16,
    marginTop: 10,
    marginBottom: 70,
    shadowColor: "rgba(0,0,0,0.5=9)", // Softening shadow color for a more subtle effect
    shadowOffset: { width: 0, height: 10 }, // Lifting the shadow for a deeper depth illusion
    shadowOpacity: 0.9, // Lowering opacity for a finer shadow
    shadowRadius: 29, // Increasing radius for a smoother fade of shadows
    elevation: 30, // Enhancing elevation for a pronounced floating effect
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
    transform: [{ translateX: -70 }, { translateY: -40 }], // Centered text alignment
    alignItems: "center",
  },
});

export default PredictionScreen;
