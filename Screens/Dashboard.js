import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  Modal,
  Dimensions,
} from "react-native";
import { FontAwesome5, Entypo } from "@expo/vector-icons";
import Header from "./Components/Header";
import Navbar from "./Components/Navbar";
import { useAuth } from "./Auth/AuthProvider";
import { useBill } from "./Components/BillProvider";
import { GlobalStyles } from "./Styles/GlobalStyles";

const DashboardScreen = ({ navigation }) => {
  const { authToken } = useAuth();
  const { units, totalCost, perUnitCost, taxes, surcharge, tvFees, fetchPredictedData } = useBill();

  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: "",
    subtitle: "",
    details: "",
  });

  const conservationTips = require("../assets/conservationTips.json");

  useEffect(() => {
    fetchPredictedData();
  }, [authToken]);

  const navigateToPrediction = () => {
    navigation.navigate("Prediction");
  };

  const navigateToRoomOverview = () => {
    navigation.navigate("RoomOverview");
  };

  const navigateToInsights = () => {
    navigation.navigate("Insights");
  };

  const handleRecommendationPress = (title) => {
    const tip = conservationTips[title];
    setModalContent(tip);
    setModalVisible(true);
  };

  const showBillDetails = () => {
    const detailedBill = {
      title: "Detailed Bill Breakdown",
      subtitle: "Complete billing information based on your usage pattern",
      details: [
        { label: "Total Cost", value: `Rs. ${totalCost}` },
        { label: "Unit Cost", value: `Rs. ${perUnitCost}` },
        { label: "Taxes", value: `Rs. ${taxes}` },
        { label: "Surcharge", value: `Rs. ${surcharge}` },
        { label: "TV Fees", value: `Rs. ${tvFees}` },
      ],
    };
    setModalContent(detailedBill);
    setModalVisible(true);
  };

  return (
    <>
      <Header screenName="Dashboard" navigation={navigation} />
      <View style={GlobalStyles.screenContainer}>
        <ScrollView style={styles.container}>
          {/* Current Units Card */}
          <View style={styles.section}>
            <TouchableOpacity
              style={styles.card}
              onPress={navigateToPrediction}
            >
              <Text style={styles.cardTitle}>Current Units</Text>
              <Text style={styles.cardValue}>{units}</Text>
              <Text style={styles.cardDescription}>
                Your current consumption data suggests that your predicted units
                are {units}, which is deemed satisfactory.
              </Text>
            </TouchableOpacity>
          </View>

          {/* Billing Information Container */}
          <View style={styles.billingContainer}>
            <TouchableOpacity
              style={styles.card}
              onPress={showBillDetails}
            >
              <Text style={styles.cardTitle}>Expected Bill</Text>
              <Text style={styles.cardValue}>Rs. {totalCost}</Text>
              <Text style={styles.cardDescription}>Based on usage pattern</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.card}
              // onPress={navigateToRoomOverview}
            >
              <Text style={styles.cardTitle}>Price per Unit</Text>
              <Text style={styles.cardValue}>Rs. {perUnitCost}</Text>
              <Text style={styles.cardDescription}>Average cost per unit</Text>
            </TouchableOpacity>
          </View>

          {/* Monthly Report Section */}
          <View style={styles.monthlyReportContainer}>
            <Text style={styles.sectionTitle}>Diagnostics</Text>
            <View style={styles.reportContainer}>
              <TouchableOpacity
                style={styles.reportCard}
                onPress={navigateToRoomOverview}
              >
                <FontAwesome5 name="building" size={24} color="#007AFF" />
                <Text style={styles.reportText}>Room Report</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.reportCard}
                onPress={navigateToPrediction}
              >
                <FontAwesome5 name="chart-bar" size={24} color="#007AFF" />
                <Text style={styles.reportText}>Monthly Units</Text>
              </TouchableOpacity>
            </View>
          </View>


          {/* Insights Section */}
          {/* <View style={styles.monthlyReportContainer}> */}
            {/* <Text style={styles.sectionTitle}>Insights</Text> */}
            {/* <View style={styles.reportContainer}> */}
              <TouchableOpacity
                style={styles.reportCard}
                onPress={navigateToInsights}
              >
                <Entypo name="info" size={24} color="#007AFF" />
                <Text style={styles.reportText}>Insights</Text>
              </TouchableOpacity>
              
            {/* </View> */}
          {/* </View> */}
          {/* Conservation Tips */}


          <View style={styles.tipsContainer}>
            <Text style={styles.sectionTitle}>Conservation Tips</Text>
            <ScrollView
              horizontal={true}
              contentContainerStyle={styles.tipsScrollContainer}
            >
              {Object.keys(conservationTips).map((title, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.recommendationContainer}
                  onPress={() => handleRecommendationPress(title)}
                >
                  <FontAwesome5 name="ghost" size={24} color="#007AFF" />
                  <Text style={styles.containerTitle}>{title}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </ScrollView>
        <Navbar />
        
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>{modalContent.title}</Text>
            <Text style={styles.modalSubtitle}>{modalContent.subtitle}</Text>
            {Array.isArray(modalContent.details) ? (
              <View style={styles.tableContainer}>
                {modalContent.details.map((item, index) => (
                  <View key={index} style={styles.tableRow}>
                    <Text style={styles.tableCell}>{item.label}</Text>
                    <Text style={styles.tableCell}>{item.value}</Text>
                  </View>
                ))}
              </View>
            ) : (
              <Text style={styles.modalText}>{modalContent.details}</Text>
            )}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10, 
    paddingBottom: 10,
    paddingTop: 1,
  },
  section: {
    marginBottom: 20,
  },
  billingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 24,
    padding: 20,
    // marginBottom: 10,
    marginTop: 10,
    shadowColor: "rgba(0,0,0,0.5)",
    shadowOffset: { width: 0, height: 10 }, // Reduced height for a closer shadow
    shadowOpacity: 0.5, // Lower opacity for a softer appearance
    shadowRadius: 20, // Increased radius to blur edges more
    elevation: 10, // Adjust elevation for Android to match visual consistency
    flex: 1,
    marginHorizontal: 5,
  },
  cardTitle: {
    fontFamily: "Lato-Bold",
    fontSize: 16,
    marginBottom: 10,
  },
  cardValue: {
    fontFamily: "Lato-Bold",
    fontSize: 24,
    color: "#007AFF",
    marginBottom: 10,
  },
  cardDescription: {
    fontFamily: "Lato-Regular",
    fontSize: 14,
    color: "#666",
  },
  monthlyReportContainer: {
    marginBottom: 20,
    marginTop: -10,
  },
  reportContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 0, // Adding padding to ensure some space around the cards
    marginBottom: -10, // Space below the container for clean separation
    marginTop: 10, // Space above the container to distinguish from previous content
  },
  reportCard: {
    backgroundColor: "#ffffff",
    borderRadius: 24,
    padding: 24,
    marginBottom: 10,
    shadowColor: "#rgba(0,0,0,0.5)",
    shadowOffset: { width: 0, height: 10 }, // Reduced height for a closer shadow
    shadowOpacity: 0.5, // Lower opacity for a softer appearance
    shadowRadius: 20, // Increased radius to blur edges more
    elevation: 10, // Adjust elevation for Android to match visual consistency
    flex: 1, // Utilizing flex to fill available space
    marginHorizontal: 5, // Spacing between the two cards
    maxWidth: "46%", // Decreasing the max width to make the cards more compact
  },
  reportText: {
    fontFamily: "Lato-Bold",
    fontSize: 18,
    color: "#333",
    marginTop: 5, // Space between icon and text
  },
  tipsContainer: {
    marginBottom: 50,
    // marginTop: 20,  // Added top margin for better spacing from previous content
  },
  tipsScrollContainer: {
    paddingHorizontal: 10, // Ensure there's padding on the sides of the scroll view
    paddingVertical: 5, // Padding above and below the scroll view
  },
  recommendationContainer: {
    backgroundColor: "#fff", // Soft gray for a subtle, sleek look
    borderRadius: 24, // RECOMMENDATIONS CORNERS SETTING
    padding: 20, // Adjusted padding for better spacing inside the card
    marginRight: 21, // Right margin adjusted for consistency
    alignItems: "center",
    justifyContent: "center", // Center content vertically and horizontally
    width: 220, // Adjusted width for a bit more space
    shadowColor: "#rgba(0,0,0,0.5)",
    shadowOffset: { width: 0, height: 6 }, // Reduced height for a closer shadow
    shadowOpacity: 0.5, // Lower opacity for a softer appearance
    shadowRadius: 8, // Increased radius to blur edges more
    elevation: 4, // Adjust elevation for Android to match visual consistency
  },
  containerTitle: {
    fontFamily: "Lato-Bold",
    fontSize: 16, // Slightly reduced size for a more refined look
    color: "#333", // Dark color for better readability
    marginTop: 8, // Top margin to space out text from the icon
    textAlign: "center",
  },
  modalView: {
    margin: 20, // Ensure there's some space around the modal to not touch the edges of the screen
    backgroundColor: "white",
    borderRadius: 20, // Soften the edges with a rounded border
    padding: 25, // Generous padding for internal spacing
    alignItems: "center", // Center-align items for a polished look
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 }, // Reduced height for a closer shadow
    shadowOpacity: 0.5, // Lower opacity for a softer appearance
    shadowRadius: 20, // Increased radius to blur edges more
    elevation: 10, // Adjust elevation for Android to match visual consistency
    justifyContent: "center", // Center the modal content vertically
    position: "absolute", // Positions the modal view absolutely relative to its parent
    top: "50%", // Places the top edge of the modal at the center of the parent
    left: "50%", // Places the left edge of the modal at the center of the parent
    transform: [
      { translateX: -Dimensions.get("window").width * 0.5 }, // Shifts the modal to the left by 40% of the screen width
      { translateY: -Dimensions.get("window").height * 0.31 },
    ],
  },
  modalTitle: {
    fontSize: 24, // Increased font size for greater emphasis
    fontFamily: "Lato-Bold", // Ensuring the font is bold
    color: "#007AFF", // A strong but not overwhelming color
    marginBottom: 20, // Increased bottom margin to separate from body text
    textAlign: "center", // Centered text to match the modal's alignment
  },
  // modal subtitle
  modalSubtitle: {
    fontSize: 18, // Slightly smaller font size for body text to differentiate from the title
    fontFamily: "Lato-Bold", // Regular font style for easy reading
    color: "#333", // Standard dark color for good readability
    marginBottom: 15, // Consistent spacing between paragraphs or text blocks
    lineHeight: 24, // Increased line height for better readability
    textAlign: "justify", // Justify alignment for a cleaner, more formal presentation
  },
  modalText: {
    fontSize: 16, // Slightly smaller font size for body text to differentiate from the title
    fontFamily: "Lato-Regular", // Regular font style for easy reading
    color: "#333", // Standard dark color for good readability
    marginBottom: 15, // Consistent spacing between paragraphs or text blocks
    lineHeight: 24, // Increased line height for better readability
    textAlign: "justify", // Justify alignment for a cleaner, more formal presentation
  },
  tableContainer: {
    width: '100%',
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 0.4,
    borderColor: "#ccc",
  },
  tableCell: {
    fontFamily: "Lato-Regular",
    fontSize: 16,
    color: "#333",
  },
  closeButton: {
    marginTop: 20, // Space above the button to separate it from the last text element
    backgroundColor: "#007AFF", // Bright, clickable color indicating interactivity
    borderRadius: 10, // Rounded button edges
    paddingVertical: 10, // Vertical padding for a taller button
    paddingHorizontal: 20, // Horizontal padding for wider button area
    elevation: 2, // Subtle elevation for a tactile feel on Android
  },
  closeButtonText: {
    fontSize: 18,
    fontFamily: "Lato-Bold",
    color: "white", // White text on a blue button for high contrast
    textAlign: "center", // Center text within the button
  },
  sectionTitle: {
    fontFamily: "Lato-Bold", // Ensuring the title is bold for emphasis
    fontSize: 20, // A moderate size for clear readability
    color: "#333", // Dark grey for a subtle, strong impression
    marginBottom: 10, // Space below the title to separate from content
    marginTop: 10, // Space above the title to distinguish from previous content
    marginLeft: 10, // Space to the left to align with the content
  },
  
});

export default DashboardScreen;