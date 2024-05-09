import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import Header from './Components/Header';
import Navbar from './Components/Navbar';
import { useAuth } from './Auth/AuthProvider';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

const getInsights = async (token) => {
	try {
		const response = await fetch(`${API_URL}/weather_inference/`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: token ? `Token ${token}` : "",
			},
		});
		if (!response.ok) {
			console.log("Error: Failed to fetch insights");
		}
		const data = await response.json();
		console.log("Data:", data);
		return data;
	} catch (error) {
		console.error("Error:", error);
	}
};


const height = Dimensions.get("window").height;

const sampleData = [
	{
		"id": 1,
		"title": "Karachi Weather",
		"message": "Karachi weather will be hot today. Be cautious about your consumption.",

		"date": "2024-03-31",
		"time": "08:30:00"

	},
	{
		"id": 2,
		"title": "Karachi Weather",
		"message": "Karachi Weather should be cooler today. Spend more time outdoors and reduce AC use.",

		"date": "2024-03-31",
		"time": "09:00:00"

	},
	{
		"id": 3,
		"title": "Insight 1",
		"message": "This is the first Insight.",

		"date": "2024-03-31",
		"time": "08:00:00"

	},
	{
		"id": 4,
		"title": "Insight 2",
		"message": "This is the second Insight.",

		"date": "2024-03-31",
		"time": "08:30:00"

	},

];


const Insightscreen = () => {
	const { authToken } = useAuth();
	const [Insights, setInsights] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const navigation = useNavigation();

	useEffect(() => {
		fetchInsights();
	}, []);

	const fetchInsights = async () => {
		try {
			const data = await getInsights(authToken);
			setInsights(data);
		} catch (error) {
			setError(error.message);
		} finally {
			setLoading(false);
		}
	};

	const renderInsight = ({ item }) => {
		return (
			<View style={styles.flatList}>
				<Text
					style={styles.cardTitle}
				>{item.title}
				</Text>
				<Text style={styles.cardtext}>{item.inference}</Text>
				<View style={styles.dateTimeContainer}>
					{/* <Text style={styles.datetext}>{item.date}</Text>
					<Text style={styles.timetext}>{item.time}</Text> */}
				</View>
			</View>
		);
	};

	if (loading) {
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<ActivityIndicator size="large" color="#0000ff" />
			</View>
		);
	}

	if (error) {
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<Text>Error: {error}</Text>
			</View>
		);
	}

	return (
		<>
			<Header screenName="Insights" navigation={navigation} />
			<View style={styles.container}>
				<View style={styles.card}>
					{Insights.length === 0 ? (
						<Text>No Insights</Text>
					) : (
						<FlatList
							data={Insights}
							renderItem={renderInsight}
							keyExtractor={(item) => item.title}
						/>
					)}
				</View>
				<Navbar />
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		padding: 10,
	},
	scrollContainer: {
		flex: 1,
	},
	//   card: {
	//     backgroundColor: "#fff",
	//     borderRadius: 10,
	//     padding: 10,
	//     marginVertical: 10,
	//     marginHorizontal: 5,
	//     shadowColor: "#000",
	//     shadowOffset: { width: 0, height: 2 },
	//     shadowOpacity: 0.1,
	//     shadowRadius: 4,
	//     elevation: 3,
	//   },
	cardTitle: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 10,
	},
	flatList: {
		// flexDirection: "row",
		// alignItems: "center",
		backgroundColor: "#fff",
		borderRadius: 10,
		padding: 15,
		marginVertical: 5,
		marginHorizontal: 5,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
	},
	cardtext: {
		fontSize: 16,
		marginBottom: 10,
	},
	dateTimeContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	datetext: {
		fontSize: 14,
	},
	timetext: {
		fontSize: 14,
	},

});

export default Insightscreen;