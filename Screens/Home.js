import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.backgroundCircle} />

      <Text style={styles.header}>Welcome to Bill-E</Text>

      <Text style={styles.content}>
        Manage your electricity usage with Bill-E. Start saving energy and money today!
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('InitialDataInput')}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#535CE8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundCircle: {
    width: 504,
    height: 462,
    borderRadius: 9999,
    backgroundColor: 'white',
    position: 'absolute',
    top: -266,
  },
  header: {
    fontSize: 48,
    fontWeight: '700',
    color: '#171A1F',
    textAlign: 'center',
    marginTop: 50,
  },
  content: {
    fontSize: 24,
    fontWeight: '500',
    color: 'white',
    textAlign: 'center',
    marginHorizontal: 20,
    marginTop: 30,
  },
  button: {
    width: 348,
    paddingVertical: 12,
    backgroundColor: 'white',
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '400',
    color: '#171A1F',
  },
});

export default HomeScreen;
