import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useAuth } from "./Auth/AuthProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Colors, GlobalStyles } from "./Styles/GlobalStyles";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';  // Ensure this is properly imported

const SplashScreen = ({ navigation }) => {
  const { setAuthToken } = useAuth();
  const [localToken, setLocalToken] = useState(null); // Local state to hold the token

  useEffect(() => {
    const checkUserToken = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        console.log("Async token: ", token);
        if (token) {
          setAuthToken(token);
          setLocalToken(token); // Set the token in local state
        }
        setTimeout(() => {
          navigation.navigate(token ? "Dashboard" : "Signin"); // Use the token to decide navigation
        }, 1000); // 1 second delay
      } catch (error) {
        console.error("Error retrieving token:", error);
      }
    };
    checkUserToken();
  }, []);

  const handleScreenPress = () => {
    // Directly navigate based on the token stored in local state
    navigation.navigate(localToken ? "Dashboard" : "Signin");
  };

  return (
    <TouchableOpacity activeOpacity={1} onPress={handleScreenPress} style={GlobalStyles.screenContainer}>
      <Text style={styles.logoText}>Bill-E</Text>
      <MaterialIcons name="pets" size={60} color="#007AFF" style={styles.iconStyle} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#fff",
	},
	upperCircle: {
		width: "100%",
		height: "100%",
		left: "-40%",
		top: "-75%",
		position: 'absolute',
		backgroundColor: '#535CE8', // Change 'light-blue' to 'lightblue'
		borderRadius: 999,
	},
	lowerCircle: {
		width: "100%",
		height: "100%",
		right: "-40%",
		top: "75%",
		position: 'absolute',
		backgroundColor: '#535CE8', // Change 'light-blue' to 'lightblue'
		borderRadius: 999,
	},
	congratulationsText: {
		width: "100%",
		left: "7%",
		top: "30%",
		position: 'absolute',
		color: 'black',
		fontSize: 32,
		fontWeight: '600',
		lineHeight: 48,
		textAlign: 'left',
	},
});

export default SplashScreen;
