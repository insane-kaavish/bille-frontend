import React, { useEffect, useState } from "react";
import {
  Image,
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  Dimensions,
  Modal,
} from "react-native";
import Header from "./Components/Header";
import Navbar from "./Components/Navbar";
import { useAuth } from "./Auth/AuthProvider";
import { useBill } from "./Components/BillProvider";
import { GlobalStyles } from "./Styles/GlobalStyles";

const { height } = Dimensions.get("window");

const DashboardScreen = ({ navigation }) => {
  const { authToken } = useAuth();
  const { units, totalCost, perUnitCost, fetchPredictedData } = useBill();

  const [modalVisible, setModalVisible] = useState(false); // Added modalVisible state
  const [modalContent, setModalContent] = useState({
    title: "",
    subtitle: "",
    details: "",
  });


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

  const handleRecommendationPress = (title) => {
    switch (title) {
      case "Inverter Air Conditioner":
        setModalContent({
          title: "Inverter Air Conditioner",
          subtitle: "Did you know?",
          details:
            "Inverter air conditioners can save up to 50% of your annual electricity consumption compared to conventional AC units.\n\n" +
            "Energy-saving tip:\nTo save energy, set your AC thermostat to 26°C and regularly clean and replace its filters.",
        });
        break;
      case "LED Lighting":
        setModalContent({
          title: "LED Lighting",
          subtitle: "Did you know?",
          details:
            "LED lights can save up to 75% of your annual energy consumption and last up to 25 times longer than incandescent lights.\n\n" +
            "Energy-saving tip:\nTo conserve energy more efficiently, install smart home technology and draw your curtains during the day to utilize sunlight.",
        });
        break;
      case "Heat Rejection and Insulation Sheets":
        setModalContent({
          title: "Heat Rejection and Insulation Sheets",
          subtitle: "Did you know?",
          details:
            "Heat rejection and insulation sheets can reduce up to 78% of the sun's heat from entering your home, thereby reducing cooling costs.\n\n" +
            "Energy-saving tip:\nKeep your home cool and create a comfortable space for your family by installing heat rejection and insulation sheets.",
        });
        break;
      case "Energy-Intensive Appliances":
        setModalContent({
          title: "Energy-Intensive Appliances",
          subtitle: "Did you know?",
          details:
            "Old energy-intensive appliances cost an average homeowner up to 45% on their annual consumption.\n\n" +
            "Energy-saving tip:\nWhen buying appliances, look for the Energy Star label that identifies products in terms of energy efficiency. Make the smart switch to energy-efficient appliances. If you are using energy-intensive appliances, use them during off-peak hours (10 pm to 6 am) to reduce your consumption load.",
        });
        break;
      case "Energy Efficient UPS":
        setModalContent({
          title: "Energy Efficient UPS",
          subtitle: "Did you know?",
          details:
            "Energy-efficient UPS can reduce your annual energy loss by up to 55%.\n\n" +
            "Energy-saving tip:\nWhen buying a UPS, look for the Energy Star label that identifies products by their efficiency. Servicing equipment regularly ensures optimal efficiency.",
        });
        break;
      case "Phantom Energy Consumption":
        setModalContent({
          title: "Phantom Energy Consumption",
          subtitle: "Did you know?",
          details:
            "Phantom energy, which is unconsumed or wasted energy, contributes up to 10% of your annual electricity bill.\n\n" +
            "Energy-saving tip:\nIt is best to unplug electronic devices and kitchen appliances when not in use to save energy.",
        });
        break;
      default:
        setModalContent({
          title: "",
          subtitle: "",
          details: "",
        });
        break;
    }
    setModalVisible(true);
  };
  

  return (
    <>
      <Header screenName="Dashboard" navigation={navigation} />
      <View style={GlobalStyles.screenContainer}>
        <ScrollView style={{flex: 1, padding:"2%"}}>
          <View style={{ flexDirection: "column"}}>

            <View style={[styles.BackgroundContainer, {height: height * 0.2, backgroundColor: "#F1F2FDFF"}]}>
              <TouchableOpacity onPress={navigateToPrediction}>

                <View>
                  <Text style={ {top:"25%", left:"5%", fontFamily:"Lato-Bold", fontSize:24} }>Current Units</Text>
                </View>

                <View style={ {left:"70%", bottom:"15%"} }>
                    <Image source={require("../extra/assets/OV.png")} />
                    <View>
                      <Text style={ {left:"3%", bottom:"200%", fontFamily:"Lato-Bold", fontSize:24, color:"white"} }> {units} </Text>
                    </View>
                </View>

                <View>
                  <Text style={ {width:"70%" ,bottom:"90%", left:"5%", fontFamily:"Lato-Regular", fontSize:18, justifyContent:"center"} }>
                    Based on your current consumption data, your predicted units are{" "}
                    {units} and consider good.
                  </Text>
                </View>

              </TouchableOpacity>
            </View>

            <View style={[styles.BackgroundContainer, {height: height * 0.285, backgroundColor: "white"}]}>

              <View style= {{}}>
                <Text style={ styles.HeadingContainer }>Highlights</Text>
              </View>

              <View style={ {flexDirection:"row", justifyContent: "space-between"} }>
                <View style={[styles.CardContainer, { backgroundColor: "#7C83ED" }]}>
                  <Text style={ [styles.HighlightsCardText, {fontSize: 18} ] }>Expected Bill:</Text>
                  <Text style={ [styles.HighlightsCardText, {fontSize: 28, lineHeight: 40} ] }>Rs. {totalCost}</Text>
                  <Text style={ [styles.HighlightsCardText, {fontSize: 16} ] }>Based on usage pattern</Text>

                  <View style={ {left:"60%"} }>
                    <Image source={require("../extra/assets/c11.png")} />
                  </View>

                </View>

                <View style={[styles.CardContainer, {backgroundColor: "#2ACCCF" }]}>
                  <Text style={ [styles.HighlightsCardText, {fontSize: 18} ] }>Per Unit Price:</Text>
                  <Text style={ [styles.HighlightsCardText, {fontSize: 28, lineHeight: 40} ] }>Rs. {perUnitCost}</Text>
                  <Text style={ [styles.HighlightsCardText, {fontSize: 16} ] }>Based on the slab rates </Text>

                  <View style={ {left:"60%"} }>
                    <Image source={require("../extra/assets/c12.png")} />
                  </View>

                </View>

              </View>

            </View>

            <View style={[styles.BackgroundContainer, {height: height * 0.16, backgroundColor: "white",}]}>
              <View style= { {} }>
                <Text style={ styles.HeadingContainer }>Monthly Report</Text>
              </View>

              <View style={ {flexDirection:"row", justifyContent: "space-between"} }>
                <TouchableOpacity style={[styles.CardContainer, styles.MonthlyReportButton]} onPress={navigateToRoomOverview}>

                  <View style={{ flexDirection: "row", alignItems:"center"}}> 
                    <Text style={ {width:"70%", fontFamily: "Lato-Bold", fontSize: 24} }>Room Report</Text>

                    <View style={ {} }>
                      <Image source={require("../extra/assets/RRIcon.png")} />
                    </View>
                  </View>

                </TouchableOpacity>

                <TouchableOpacity style={[styles.CardContainer, styles.MonthlyReportButton]} onPress={navigateToPrediction}>
                  
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={{fontFamily: "Lato-Bold", fontSize: 24 }}>Monthly{"\n"}Units</Text>
                    
                    <View style={{}}>
                      <Image source={require("../extra/assets/MUGIcon.png")} />
                    </View>
                  </View>

                </TouchableOpacity>


              </View>

            </View>

          </View>

          {/* Electricity Conservation tips */}
          <View style={styles.Lastcontainer}>
            <Text style={[styles.HLtitle, { fontWeight: 'bold' }]}>Conservation Tips</Text>
          </View>
          <ScrollView horizontal={true} contentContainerStyle={styles.scrollViewContainer}>
           
            {/* Container 1 */}
            <TouchableOpacity onPress={() => handleRecommendationPress("Inverter Air Conditioner")} style={[styles.recommendationContainer, { backgroundColor: "#F1F2FD" }]}>
              <Text style={[styles.containerTitle, { fontSize: 18, marginTop: 10 }]}>Inverter Air Conditioner</Text>
              <Text style={[styles.containerSubTitle, { fontSize: 16 }]}>Did you know?</Text>
              <Text numberOfLines={2} ellipsizeMode="tail" style={[styles.containerText, { fontSize: 16, marginTop: 5 }]}>
                Inverter air conditioners can save up to 50% of your annual electricity consumption compared to conventional AC units.
              </Text>
            </TouchableOpacity>
            
            {/* Container 2 */}
            <TouchableOpacity onPress={() => handleRecommendationPress("LED Lighting")} style={[styles.recommendationContainer, { backgroundColor: "#FFE3E3" }]}>
              <Text style={[styles.containerTitle, { fontSize: 18, marginTop: 10 }]}>LED Lighting</Text>
              <Text style={[styles.containerSubTitle, { fontSize: 16 }]}>Did you know?</Text>
              <Text numberOfLines={2} ellipsizeMode="tail" style={[styles.containerText, { fontSize: 16, marginTop: 5 }]}>
                LED lights can save up to 75% of your annual energy consumption and last up to 25 times longer than incandescent lights.
              </Text>
            </TouchableOpacity>

            {/* Container 3 */}
            <TouchableOpacity onPress={() => handleRecommendationPress("Heat Rejection and Insulation Sheets")} style={[styles.recommendationContainer, { backgroundColor: "#C4F2E6" }]}>
              <Text style={[styles.containerTitle, { fontSize: 18, marginTop: 10 }]}>Heat Rejection and Insulation Sheets</Text>
              <Text style={[styles.containerSubTitle, { fontSize: 16 }]}>Did you know?</Text>
              <Text numberOfLines={2} ellipsizeMode="tail" style={[styles.containerText, { fontSize: 16, marginTop: 5 }]}>
                Heat rejection and insulation sheets can reduce up to 78% of the sun's heat from entering your home, thereby reducing cooling costs.
              </Text>
            </TouchableOpacity>

            {/* Container 4 */}
            <TouchableOpacity onPress={() => handleRecommendationPress("Energy-Intensive Appliances")} style={[styles.recommendationContainer, { backgroundColor: "#FFD6A5" }]}>
              <Text style={[styles.containerTitle, { fontSize: 18, marginTop: 10 }]}>Energy-Intensive Appliances</Text>
              <Text style={[styles.containerSubTitle, { fontSize: 16 }]}>Did you know?</Text>
              <Text numberOfLines={2} ellipsizeMode="tail" style={[styles.containerText, { fontSize: 16, marginTop: 5 }]}>
                Old energy-intensive appliances cost an average homeowner up to 45% on their annual consumption.
              </Text>
            </TouchableOpacity>

            {/* Container 5 */}
            <TouchableOpacity onPress={() => handleRecommendationPress("Energy Efficient UPS")} style={[styles.recommendationContainer, { backgroundColor: "#FFDDDD" }]}>
              <Text style={[styles.containerTitle, { fontSize: 18, marginTop: 10 }]}>Energy Efficient UPS</Text>
              <Text style={[styles.containerSubTitle, { fontSize: 16 }]}>Did you know?</Text>
              <Text numberOfLines={2} ellipsizeMode="tail" style={[styles.containerText, { fontSize: 16, marginTop: 5 }]}>
                Energy-efficient UPS can reduce your annual energy loss by up to 55%.
              </Text>
            </TouchableOpacity>

            {/* Container 6 */}
            <TouchableOpacity onPress={() => handleRecommendationPress("Phantom Energy Consumption")} style={[styles.recommendationContainer, { backgroundColor: "#C2E5FC" }]}>
              <Text style={[styles.containerTitle, { fontSize: 18, marginTop: 10 }]}>Phantom Energy Consumption</Text>
              <Text style={[styles.containerSubTitle, { fontSize: 16 }]}>Did you know?</Text>
              <Text numberOfLines={2} ellipsizeMode="tail" style={[styles.containerText, { fontSize: 16, marginTop: 5 }]}>
                Phantom energy, which is unconsumed or wasted energy, contributes up to 10% of your annual electricity bill.
              </Text>
            </TouchableOpacity>
            
            {/* Add more containers as needed */}
          </ScrollView>

        {/* Modal for Expanded Recommendation */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>{modalContent.title}</Text>
              <Text style={styles.modalText}>{modalContent.subtitle}</Text>
              <Text style={styles.modalText}>{modalContent.details}</Text>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.closeButton}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>


        </ScrollView>
        <Navbar />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  BackgroundContainer: {
    width: "100%",
    borderRadius: 16,
    position: "relative",
    marginBottom: "4%",
  },
  scrollViewContainer: {
    flexDirection: 'row',
    paddingHorizontal: 0, // Add padding as needed
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  Lastcontainer: {
    marginBottom: "1%",
  },
  HLtitle: {
    fontSize: 24,
    marginBottom: 10,
  },
  graphCard: {
    flexDirection: 'row',
  },
  recommendationContainer: {
    width: 250,
    marginRight: 20,
    padding: 15,
    borderRadius: 10,
  },
  containerTitle: {
    fontWeight: 'bold',
  },
  containerSubTitle: {
    marginTop: 5,
  },
  containerText: {
    marginTop: 5,
  },
    centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },

  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
  },
  modalText: {
    marginBottom: 15,
    fontSize: 18,
    textAlign: "center",
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#2196F3",
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  CardContainer: {
    width: "48%",
    borderRadius: 16,
    padding: "3%",
  },
  HeadingContainer: {
    top:"25%", 
    fontFamily:"Lato-Bold", 
    fontSize:24, 
    paddingBottom: "5%"
  },
  HighlightsCardText: {
    color: "white",
    fontFamily: "Lato-Bold",
  },
  MonthlyReportButton: {
    backgroundColor: "#F1F2FDFF", 
    elevation: 2, 
    shadowColor: "#000", 
    shadowOpacity: 0.2, 
    shadowRadius: 1
  }
  
});

export default DashboardScreen;