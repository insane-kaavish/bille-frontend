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

const { height } = Dimensions.get("window");

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
        <ScrollView style={{flex: 1, padding:"5%"}}>
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
    position: "relative"
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