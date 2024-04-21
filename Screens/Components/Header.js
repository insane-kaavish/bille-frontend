import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import { useAuth } from "../Auth/AuthProvider";
import { useBill } from "./BillProvider";

const Header = ({ screenName, navigation }) => {
  const { logout } = useAuth();
  const { resetData } = useBill();
  const handleLogout = () => {
    logout();
    resetData();
    navigation.navigate("Signin");
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.appName}>Bill-E</Text>
        <Text style={styles.screenName}>{screenName}</Text>
      </View>
      <Menu>
        <MenuTrigger>
          <Ionicons name="menu" size={28} color="#333" accessibilityLabel="Open menu"/>
        </MenuTrigger>
        <MenuOptions style={styles.menuOptions}>
          <MenuOption onSelect={() => navigation.navigate("Profile")} style={styles.menuOption}>
            <Ionicons name="person-outline" size={22} color="#666" />
            <Text style={styles.menuText}>Profile</Text>
          </MenuOption>
          <MenuOption onSelect={() => navigation.navigate("Settings")} style={styles.menuOption}>
            <Ionicons name="settings-outline" size={22} color="#666" />
            <Text style={styles.menuText}>Settings</Text>
          </MenuOption>
          <MenuOption onSelect={() => navigation.navigate("HelpCenter")} style={styles.menuOption}>
            <Ionicons name="help-circle-outline" size={22} color="#666" />
            <Text style={styles.menuText}>Help Center</Text>
          </MenuOption>
          <MenuOption onSelect={() => navigation.navigate("Contact")} style={styles.menuOption}>
            <Ionicons name="mail-outline" size={22} color="#666" />
            <Text style={styles.menuText}>Contact Us</Text>
          </MenuOption>
          <MenuOption onSelect={handleLogout} style={styles.menuOption}>
            <Ionicons name="exit-outline" size={22} color="#666" />
            <Text style={[styles.menuText, styles.logoutText]}>Logout</Text>
          </MenuOption>
        </MenuOptions>
      </Menu>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: "#FFF",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowColor: "#000",
    shadowOffset: { height: 3, width: 0 },
    elevation: 3,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  appName: {
    fontSize: 20,
    color: "#333",
    fontWeight: "bold",
    marginRight: 10,
  },
  screenName: {
    fontSize: 18,
    color: "#666",
  },
  menuOptions: {
    padding: 5,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowColor: "#000",
    shadowOffset: { height: 3, width: 0 },
    elevation: 5,
  },
  menuOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingLeft: 10,
  },
  menuText: {
    fontSize: 18,
    marginLeft: 10,
    color: "#333",
  },
  logoutText: {
    color: "red",
    fontWeight: "bold",
  },
});

export default Header;
