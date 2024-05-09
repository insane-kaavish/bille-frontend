import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import Header from './Components/Header';
import Navbar from './Components/Navbar';
import { useAuth } from './Auth/AuthProvider';
import { BarChart } from 'react-native-chart-kit';

const API_URL = process.env.EXPO_PUBLIC_API_URL;
const screenWidth = Dimensions.get("window").width;

const getDailyWeather = async (token) => {
	try {
		const response = await fetch(`${API_URL}/daily_weather/`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: token ? `Token ${token}` : "",
			},
		});
		if (!response.ok) {
			console.log("Error: Failed to fetch daily weather");
		}
		const data = await response.json();
		console.log("Data:", data);
		return data;
	} catch (error) {
		console.error("Error:", error);
	}
};

const getWeeklyWeather = async (token) => {
	try {
		const response = await fetch(`${API_URL}/weekly_weather/`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: token ? `Token ${token}` : "",
			},
		});
		if (!response.ok) {
			console.log("Error: Failed to fetch weekly weather");
		}
		const data = await response.json();
		console.log("Data:", data);
		return data;
	} catch (error) {
		console.error("Error:", error);
	}
};

const getWeather = async (token) => {
	try {
		const response = await fetch(`${API_URL}/weather/`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: token ? `Token ${token}` : "",
			},
		});
		if (!response.ok) {
			console.log("Error: Failed to fetch current weather");
		}
		const data = await response.json();
		console.log("Data:", data);
		return data;
	} catch (error) {
		console.error("Error:", error);
	}
};


const height = Dimensions.get("window").height;


const Insightscreen = ({ navigation }) => {
	const { authToken } = useAuth();
	const [Insights, setInsights] = useState([]);
	const [dailyData, setDailyData] = useState(null);
	const [weeklyData, setWeeklyData] = useState(null);
	const [weatherData, setWeatherData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		fetchWeather();
	}, []);

	const fetchWeather = async () => {
		try {
			const data = await getWeather(authToken);
			setWeatherData(data);
			const daily = await getDailyWeather(authToken);
			setDailyData(daily);
			const weekly = await getWeeklyWeather(authToken);
			setWeeklyData(weekly);
		} catch (error) {
			setError(error.message);
		} finally {
			setLoading(false);
		}
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

	const chartConfig = {
		backgroundGradientFrom: "#fff",
		backgroundGradientTo: "#fff",
		color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
		labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
	  };
	
	  const billData = {
		labels: ["Last Year", "This Year"],
		datasets: [{
		  data: [dailyData.old_bill, dailyData.new_bill],
		  colors: [
			(opacity = 1) => '#007AFF',
			(opacity = 1) => dailyData.new_bill < dailyData.old_bill ? 'green' : '#FF7F7F',
		  ]
		}],
	  };
	
	  const billChange = (((dailyData.new_bill - dailyData.old_bill) / dailyData.old_bill) * 100).toFixed(2);
	  const tempChange = (dailyData.today_weather.temp - dailyData.last_year_weather.temp).toFixed(2);

	  return (
		<>
		  <Header screenName="Insights" />
		  <ScrollView style={styles.container}>
			{/* Current Weather */}
			<View style={styles.card}>
			  <Text style={styles.cardTitle}>Current Weather</Text>
			  <Text style={styles.cardText}>Temperature: {dailyData.today_weather.temp}°C</Text>
			  <Text style={styles.cardText}>Humidity: {dailyData.today_weather.humidity}%</Text>
			</View>
	
			{/* Weather Comparison */}
			<View style={styles.card}>
			  <Text style={styles.cardTitle}>{dailyData.title}</Text>
			  <Text style={styles.cardText}>{dailyData.inference}</Text>
			</View>
	
			{/* Billing Comparison Chart */}
			<View style={styles.card}>
			  <Text style={styles.cardTitle}>Billing Comparison</Text>
			  <BarChart
				data={billData}
				width={screenWidth - 20}
				height={220}
				chartConfig={chartConfig}
				showValuesOnTopOfBars={true}
				withCustomBarColorFromData={true}
				fromZero
			  />
			  <Text style={styles.cardText}>{billChange}% {billChange > 0 ? "Increase" : "Decrease"} due to temperature change of {tempChange}°C</Text> 
			</View>
	
			{/* Weekly Forecast */}
			<View style={styles.card}>
			  <Text style={styles.cardTitle}>Weekly Forecast</Text>
			  <Text style={styles.cardText}>
				{weeklyData.inference}
				{"\n"}Highest Temperature will reach {weeklyData.high_temp}°C
			  </Text>
			</View>
		  </ScrollView>
		  <Navbar />
		</>
	  );
	};
	
	const styles = StyleSheet.create({
	  container: {
		flex: 1,
		backgroundColor: "#fff",
		padding: 10,
		marginBottom: 50,
	  },
	  card: {
		backgroundColor: "#f9f9f9",
		borderRadius: 10,
		padding: 20,
		marginBottom: 10,
	  },
	  cardTitle: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 10,
	  },
	  cardText: {
		fontSize: 16,
		marginBottom: 10,
	  },
	});

export default Insightscreen;