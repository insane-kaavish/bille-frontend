import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const IntroductionScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.largeCircle} />
      {/* <View style={styles.smallCircle} /> */}
      <Text style={styles.title}>Bill-E</Text>
      <Text style={styles.subtitle}>Know what you are paying for!</Text>
      <TouchableOpacity
        style={styles.continueButton}
        onPress={() => navigation.navigate('SignIn')}
      >
        <Text style={styles.continueText}>Continue</Text>
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
  largeCircle: {
    width: 657,
    height: 657,
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 329,
    top: -185,
    left: -47,
  },
//   smallCircle: {
//     width: 58,
//     height: 58,
//     position: 'absolute',
//     backgroundColor: 'white',
//     borderRadius: 29,
//     top: 476,
//     left: 37,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
  title: {
    position: 'absolute',
    top: 100,
    left: 48,
    color: '#171A1F',
    fontSize: 48,
    fontWeight: '700',
    textAlign: 'center',
  },
  subtitle: {
    position: 'absolute',
    top: 550,
    left: 30,
    color: 'white',
    fontSize: 24,
    fontWeight: '600',
  },
  continueButton: {
    position: 'absolute',
    top: 739,
    left: 21,
    width: 348,
    paddingVertical: 12,
    backgroundColor: 'white',
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
  },
  continueText: {
    color: '#171A1F',
    fontSize: 18,
    fontWeight: '400',
  },
});

export default IntroductionScreen;