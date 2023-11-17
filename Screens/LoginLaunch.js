import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const LoginLaunch = () => {
  return (
    <View style={styles.container}>
      {/* Large white circle in the background */}
      <View style={styles.backgroundCircle} />

      {/* Title text */}
      <Text style={styles.header}>Bill-E</Text>

      {/* Main content text */}
      <Text style={styles.content}>
        Bill-E is developing a revolutionary app for more accurate and efficient electricity management in Pakistan. Your input will help us personalize the app, ensuring data privacy and security, for the most accurate results and promoting responsible energy usage.
      </Text>

      {/* Disclaimer text */}
      <Text style={styles.disclaimer}>
        By clicking 'Agree & Continue' you confirm your acceptance of our terms and conditions.
      </Text>

      {/* Agree & Continue button */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Agree & Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 390,
    height: 844,
    position: 'relative',
    backgroundColor: '#535CE8',
  },
  backgroundCircle: {
    width: 504,
    height: 504, // Modified to make the circle a perfect circle
    borderRadius: 252, // Half of the width and height
    backgroundColor: 'white',
    position: 'absolute',
    top: -252, // Half of the height to center it on the top-left corner
    left: -252, // Half of the width
  },
  header: {
    position: 'absolute',
    top: 50,
    left: 22,
    fontSize: 48,
    fontWeight: '600',
    color: '#171A1F',
    textAlign: 'center',
  },
  content: {
    position: 'absolute',
    top: 250,
    left: 12,
    width: 357,
    fontSize: 24,
    fontWeight: '500',
    color: 'white',
    lineHeight: 42, // This may not have the desired effect in React Native; adjust as necessary
  },
  disclaimer: {
    position: 'absolute',
    top: 680,
    left: 12,
    fontSize: 10,
    fontWeight: '500',
    color: '#BCC1CA',
  },
  button: {
    position: 'absolute',
    top: 715,
    left: 21,
    width: 348,
    paddingVertical: 12,
    backgroundColor: 'white',
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '400',
    color: '#171A1F',
  },
});

export default LoginLaunch;
