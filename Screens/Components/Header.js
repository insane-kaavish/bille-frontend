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
      <Text style={styles.screenName}>{screenName}</Text>
      <Menu style={styles.menuIconContainer}>
        <MenuTrigger>
          <Ionicons name="menu" size={24} color="black" />
        </MenuTrigger>
        <MenuOptions style={styles.MenuOptions}>
          <MenuOption
            onSelect={() => navigation.navigate("Profile")}
            text="Profile"
            style={styles.MenuOption}
          />
          <MenuOption
            onSelect={() => navigation.navigate("Settings")}
            text="Settings"
            style={styles.MenuOption}
          />
          <MenuOption
            onSelect={() => navigation.navigate("HelpCenter")}
            text="Help Center"
            style={styles.MenuOption}
          />
          <MenuOption
            onSelect={() => navigation.navigate("Contact")}
            text="Contact Us"
            style={styles.MenuOption}
          />
          <MenuOption onSelect={handleLogout}>
            <Text style={styles.logoutOption}>Logout</Text>
          </MenuOption>
        </MenuOptions>
      </Menu>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "7%",
    backgroundColor: "#f8f8f8",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "relative",
  },
  screenName: {
    fontSize: 20,
    marginLeft: "5%",
  },
  menuIconContainer: {
    marginRight: "5%",
  },
  MenuOptions: {
    padding: 10,
    borderRadius: 10, // Rounded edges for the drawer
    width: 250, // Decrease width of the drawer
  },
  MenuOption: {
    paddingVertical: 10, // Increase distance between options
    fontSize: 16, // Adjusted for readability
  },
  logoutOption: {
    color: "red",
  },
});

export default Header;
