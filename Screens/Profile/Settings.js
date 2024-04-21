import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Navbar from "../Components/Navbar";
import Header from "../Components/Header";
import { GlobalStyles } from "../Styles/GlobalStyles";

const height = Dimensions.get("window").height;

const SettingsScreen = ({ navigation }) => {
  const navigateToPrivacy = () => {
    navigation.navigate("Privacy");
    console.log("Navigate to Privacy");
  };
  const navigateToContact = () => {
    navigation.navigate("Contact");
    console.log("Navigate to Contact");
  };

  const navigateToNotifications = () => {
    console.log("Navigate to Notifications");
  };

  return (
    <>
      <Header screenName="Settings" navigation={navigation} />
      <View style={GlobalStyles.screenContainer}>
        <View style={styles.card}>
          <TouchableOpacity
            style={styles.optionButton}
            onPress={navigateToNotifications}
          >
            <View style={styles.optionContent}>
              <Ionicons name="notifications" size={24} color="#007AFF" />
              <Text style={styles.optionText}>Enable Notifications</Text>
            </View>
            <Ionicons name="chevron-forward-outline" size={20} color="#007AFF" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.optionButton}
            onPress={navigateToPrivacy}
          >
            <View style={styles.optionContent}>
              <Ionicons name="lock-closed" size={24} color="#007AFF" />
              <Text style={styles.optionText}>Privacy</Text>
            </View>
            <Ionicons name="chevron-forward-outline" size={20} color="#007AFF" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.optionButton}
            onPress={navigateToContact}
          >
            <View style={styles.optionContent}>
              <Ionicons name="mail" size={24} color="#007AFF" />
              <Text style={styles.optionText}>Contact Us</Text>
            </View>
            <Ionicons name="chevron-forward-outline" size={20} color="#007AFF" />
          </TouchableOpacity>
        </View>
      </View>
      <Navbar />
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFF",
    borderRadius: 24,
    padding: 20,
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,
    shadowColor: "#rgba(0,0,0,0.5)",
    shadowOffset: { width: 0, height: 6 },  // Reduced height for a closer shadow
    shadowOpacity: 0.5,  // Lower opacity for a softer appearance
    shadowRadius: 8,  // Increased radius to blur edges more
    elevation: 6,  // Adjust elevation for Android to match visual consistency
  },
  optionButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: "rgba(255, 255, 255, 0.9)", // Translucent white
    borderRadius: 10,
    marginBottom: 16,
  },
  optionContent: {
    flexDirection: "row",
    alignItems: "center",
    fontFamily: "Lato-Regular",
  },
  optionText: {
    fontSize: 18,
    // color: "#007AFF",
    marginLeft: 10,
  },
});

export default SettingsScreen;
