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
        onPress={() => navigation.navigate('RoomData')}
      >
        <Text style={styles.continueText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  title: {
    position: 'absolute',
    top: 100,
    alignSelf: 'center',
    color: '#171A1F',
    fontSize: 48,
    fontWeight: '700',
    // textAlign: 'center',
    textAlign:'left',
  },
  subtitle: {
    position: 'absolute',
    top: 550,
    alignSelf: 'center', // This will center the subtitle
    color: 'white',
    fontSize: 24,
    fontWeight: '600',
  },
  continueButton: {
    position: 'absolute',
    top: 739,
    alignSelf: 'center', // This will center the button
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