import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';

const WeatherComponent = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_KEY = "2fce26b3009e0a66de8c0a0223800869";

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
            'http://api.openweathermap.org/data/2.5/weather?q=Karachi&appid=2fce26b3009e0a66de8c0a0223800869&units=metric'
            );

        if (!response.ok) {
          throw new Error('Failed to fetch weather data');
        }

        const data = await response.json();
        setWeather(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching weather:', error);
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!weather) {
    return (
      <View style={styles.container}>
        <Text>Failed to fetch weather data</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.temperature}>Karachi {weather.main.temp}°C</Text>
      {/* <Text style={styles.description}>{weather.weather[0].description}</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'Left',
    justifyContent: 'Right',
  },
  temperature: {
    color: '#565E6C',
    fontSize: 12,
    fontFamily: 'Lato-Bold',
    fontWeight: '700',
    lineHeight: 28, 
    wordWrap: 'break-word',
  },
  description: {
    fontSize: 16,
  },
});

export default WeatherComponent;
