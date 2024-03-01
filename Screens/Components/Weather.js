import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

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

  const getWeatherIcon = (weather) => {
    if (weather.weather[0].main === 'Clouds') {
      return 'cloud';
    } else if (weather.weather[0].main === 'Rain') {
      return 'tint';
    } else if (weather.weather[0].main === 'Clear') {
      return 'sun-o';
    } else if (weather.weather[0].main === 'Snow') {
      return 'snowflake-o';
    } else if (weather.weather[0].main === 'Thunderstorm') {
      return 'bolt';
    } else if (weather.weather[0].main === 'Drizzle') {
      return 'tint';
    } else if (weather.weather[0].main === 'Mist') {
      return 'smog';
    }
    else {
      return '';
    }
  };

  return (
    <View style={styles.container}>
        <Icon name={getWeatherIcon(weather)} size={20} color="#565E6C" />
        <Text style={styles.temperature}>Karachi {weather.main.temp}°C</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  temperature: {
    color: '#565E6C',
    fontSize: 12,
    fontFamily: 'Lato-Bold',
    fontWeight: '700',
    lineHeight: 28, 
    // wordWrap: 'break-word',
    paddingLeft: 5,
  },
  description: {
    fontSize: 16,
  },
});

export default WeatherComponent;
