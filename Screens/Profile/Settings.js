import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
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
        <TouchableOpacity
          style={styles.optionButton}
          onPress={navigateToNotifications}
        >
          <Text style={styles.optionText}>Enable Notifications</Text>
          <Ionicons name="chevron-forward-outline" size={20} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.optionButton}
          onPress={navigateToPrivacy}
        >
          <Text style={styles.optionText}>Privacy</Text>
          <Ionicons name="chevron-forward-outline" size={20} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.optionButton}
          onPress={navigateToContact}
        >
          <Text style={styles.optionText}>Contact Us</Text>
          <Ionicons name="chevron-forward-outline" size={20} color="#000" />
        </TouchableOpacity>
      </View>
      <Navbar />
    </>
  );
};

const styles = StyleSheet.create({
  optionButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    marginBottom: 16,
  },
  optionText: {
    fontSize: 18,
    color: "#000",
  },
});

export default SettingsScreen;
