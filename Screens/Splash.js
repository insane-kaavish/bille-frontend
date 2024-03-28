import react, { useEffect } from "react";
import { View, Image, StyleSheet, StatusBar, Animated, Text } from "react-native";
import { useAuth } from "./Auth/AuthProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "./Components/Header";
import { GlobalStyles } from "./Styles/GlobalStyles";

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
					}, 1500); // 1.5 seconds delay
					return;
				}
				setTimeout(() => {
					navigation.navigate("Signin");
				}, 1500); // 1.5 seconds delay
			} catch (error) {
				console.error("Error retrieving token:", error);
			}
		};
		checkUserToken();
	}, [authToken]);

	return (
		<>
		<View style={GlobalStyles.screenContainer}>
			<View style={styles.upperCircle} />
			{/* <View style={styles.lowerCircle} /> */}
			<Text style={styles.congratulationsText}>
				Congratulations!🎉{'\n'}
				You've just unlocked smarter energy management.{'\n\n'}
				Get ready to take control and start saving now!
			</Text>
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
		fontFamily: 'Lato-Bold',
		fontWeight: '600',
		lineHeight: 48,
		textAlign: 'left',
	},
});

export default SplashScreen;