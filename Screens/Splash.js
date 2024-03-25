import react, { useEffect } from "react";
import { View, Image, StyleSheet, StatusBar, Text } from "react-native";
import { useAuth } from "./Auth/AuthProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "./Components/Header";

const SplashScreen = ({ navigation }) => {
  const { authToken, setAuthToken } = useAuth();

	useEffect(() => {
		const checkUserToken = async () => {
			try {
				const token = await AsyncStorage.getItem("authToken");
				console.log("Async token: ", token);
				if (token) {
					// Token exists, navigate to Dashboard
					setAuthToken(token);
					setTimeout(() => {
						navigation.navigate("Dashboard");
					}, 3000); // 3 seconds delay
					return;
				}
				setTimeout(() => {
					navigation.navigate("Signin");
				}, 3000); // 3 seconds delay
			} catch (error) {
				console.error("Error retrieving token:", error);
			}
		};
		checkUserToken();
	}, [authToken]);

	return (
		<>
		<View style={styles.container}>
			<Text>Logo Here</Text>
		</View>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#fff",
	},
	logo: {
		width: 200,
		height: 200,
	},
});

export default SplashScreen;