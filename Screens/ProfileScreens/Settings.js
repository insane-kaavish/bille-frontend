import React from "react";
import {
  navigation,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Dimensions,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { MenuProvider } from "react-native-popup-menu";
import MenuComponent from "../Components/Header";
import NavBar from "../Components/NavBar";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../Components/Header";

const height = Dimensions.get("window").height;

const SettingsScreen = ({ navigation }) => {
  const navigateToPrivacy = () => {
    navigation.navigate("Privacy");
    console.log("Navigate to Privacy");
  };
  const navigateToContactUs = () => {
    navigation.navigate("ContactUs");
    console.log("Navigate to Contact Us");
  };

  const navigateToNotifications = () => {
    console.log("Navigate to Notifications");
  };

  return (
    <>
    <StatusBar style="auto" />
    <SafeAreaView edges={["right", "top", "left"]} style={{ flex: 1 }}>
    <Header screenName="Settings" navigation={navigation} />
      <View style={styles.maincontainer}>
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
          onPress={navigateToContactUs}
        >
          <Text style={styles.optionText}>Contact Us</Text>
          <Ionicons name="chevron-forward-outline" size={20} color="#000" />
        </TouchableOpacity>
      </View>
      <NavBar />
    </SafeAreaView>
    </>
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
    paddingTop: height * 0.001,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
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
  maincontainer: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  menuIcon: {
    marginTop: 5,
    marginRight: 10,
  },
  menuOptionsStyle: {
    marginTop: 0,
    marginVertical: 2,
    zIndex: 1,
  },
  menuOptionText: {
    fontSize: 16,
    padding: 10,
  },
  navBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderTopWidth: 1,
    borderTopColor: "#EFEFEF",
    paddingVertical: 10,
    backgroundColor: "#FFFFFF",
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default SettingsScreen;
