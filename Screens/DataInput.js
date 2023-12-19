import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const DataInput = ({ navigation }) => {
  // State hooks for input fields
  const [houseSize, setHouseSize] = useState('');
  const [numOfFloors, setNumOfFloors] = useState('');
  const [numOfPeople, setNumOfPeople] = useState('');
  const [unitsLastMonth, setUnitsLastMonth] = useState('');
  const [unitsMonthBeforeLast, setUnitsMonthBeforeLast] = useState('');

  // Function to handle continue click
  const handleContinue = () => {
    const inputData = {
      houseSize,
      numOfFloors,
      numOfPeople,
      unitsLastMonth,
      unitsMonthBeforeLast,
    };
    console.log(inputData);

    navigation.navigate('RoomData', { inputData }); // Uncomment to navigate and pass data
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Get Started</Text>
      
      {/* Input Section: Size of House */}
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>What is the size of your house?</Text>
        <TextInput
          placeholder="Please enter numerics"
          style={styles.input}
          value={houseSize}
          onChangeText={setHouseSize}
        />
      </View>

      {/* Input Section: Number of Floors */}
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>How many floors do you have in your house?</Text>
        <TextInput
          placeholder="Enter Number of floors"
          style={styles.input}
          value={numOfFloors}
          onChangeText={setNumOfFloors}
        />
      </View>

      {/* Input Section: Number of People */}
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>How many people live in your house?</Text>
        <TextInput
          placeholder="Enter number of people in the House"
          style={styles.input}
          value={numOfPeople}
          onChangeText={setNumOfPeople}
        />
      </View>

      {/* Input Section: Electricity Units Last Month */}
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>How many electricity units were consumed previous month?</Text>
        <TextInput
          placeholder="Electricity units previous month"
          style={styles.input}
          value={unitsLastMonth}
          onChangeText={setUnitsLastMonth}
        />
      </View>

      {/* Input Section: Electricity Units Month Before Last */}
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>How many electricity units were consumed the month before the previous month?</Text>
        <TextInput
          placeholder="Electricity units of month before previous month"
          style={styles.input}
          value={unitsMonthBeforeLast}
          onChangeText={setUnitsMonthBeforeLast}
        />
      </View>

      {/* Continue button */}
      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleContinue}
      >
        <Text style={styles.submitText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
    shadowColor: 'rgba(18, 15, 40, 0.12)',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 3,
  },
  header: {
    color: '#171A1F',
    fontSize: 32,
    fontWeight: '700',
    lineHeight: 48,
    marginTop: 130,
  },
  inputContainer: {
    marginTop: 15,
  },
  inputLabel: {
    color: '#424955',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 26,
  },
  input: {
    height: 43,
    marginTop: 8,
    backgroundColor: '#F3F4F6',
    borderRadius: 16,
    paddingLeft: 16,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 26,
  },
  submitButton: {
    width: '70%',
    height: 50,
    marginTop: 40,
    backgroundColor: '#535CE8',
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  submitText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '400',
    lineHeight: 28,
  },
});

export default DataInput;