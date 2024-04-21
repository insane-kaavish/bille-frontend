import React from "react";
import { TouchableOpacity, StyleSheet, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";

const Navbar = () => {
  const navigation = useNavigation();

  const navigateToOverview = () => {
    navigation.navigate("Dashboard");
  };

  const navigateToPrediction = () => {
    navigation.navigate("Prediction");
  };

  const navigateToRoomWise = () => {
    navigation.navigate("RoomOverview");
  };

  return (
    <View style={styles.navBar}>
      <TouchableOpacity onPress={navigateToOverview} style={styles.navtab}>
        <MaterialIcons name="dashboard" size={28} color="#007AFF" />
      </TouchableOpacity>
      <TouchableOpacity onPress={navigateToPrediction} style={styles.navtab}>
        <MaterialIcons name="insights" size={28} color="#007AFF" />
      </TouchableOpacity>
      <TouchableOpacity onPress={navigateToRoomWise} style={styles.navtab}>
        <MaterialIcons name="meeting-room" size={28} color="#007AFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderTopWidth: 0.2,
    borderTopColor: "#E0E0E0",
    paddingVertical: 10,
    backgroundColor: "#FFFFFF",
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
  navtab: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Navbar;
