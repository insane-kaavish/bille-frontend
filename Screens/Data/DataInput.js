import React, { useState } from 'react';
import {ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useAuth } from '../AuthScreens/AuthProvider';
// import { ScrollView } from 'react-native-web';

const { width, height } = Dimensions.get('window');

const DataInput = ({ navigation }) => {
  // State hooks for input fields
  const [numOfPeople, setNumOfPeople] = useState('');
  const [stayatHomeOccupant, setStayatHomeOccupants] = useState('');
  const [ParttimeHomeOccupant, setParttimeHomeOccupants] = useState('');
  const [FulltimeHomeOccupants, setFulltimeHomeOccupants] = useState('');
  const { authToken } = useAuth();
  const [isTyping,setIsTyping] = useState(false);

  const handleFocus=()=>{
    setIsTyping(true);
  }
  const handleBlur = ()=>{
    setIsTyping(false);
  }


  // Function to handle continue click
  const handleContinue = () => {
    const inputData = {
      numOfPeople,
      stayatHomeOccupant,
      ParttimeHomeOccupant,
      FulltimeHomeOccupants,
    };
    console.log(inputData);
    console.log(authToken);

    navigation.navigate('RoomData', { inputData }); // Uncomment to navigate and pass data
  };

  return (
    <View style={styles.container}>

      {!isTyping && <Text style={styles.header}>Get Started</Text>}
      <ScrollView>
      {/* Input Section: Number of People */}
      
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>How many people live in your house?</Text>
        <TextInput
          placeholder="Enter number of people in the House"
          style={styles.input}
          value={numOfPeople}
          onChangeText={setNumOfPeople}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>How many people are completely stay at home occupants in your house?</Text>
        <TextInput
          placeholder="Occupants who are stay at home"
          style={styles.input}
          value={stayatHomeOccupant}
          onChangeText={setStayatHomeOccupants}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </View>

      {/* Input Section: Electricity Units Month Before Last */}
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>How many people are part-time employees, go to school, college or university in your house?</Text>
        <TextInput
          placeholder="Occupants who are not home aproximately 6 hours"
          style={styles.input}
          value={ParttimeHomeOccupant}
          onChangeText={setParttimeHomeOccupants}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </View>

      {/* Input Section: Electricity Units Month Before Last */}
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>How many people are full-time employees in your house?</Text>
        <TextInput
          placeholder="Occupants who are not home aproximately 10 hours"
          style={styles.input}
          value={FulltimeHomeOccupants}
          onChangeText={setFulltimeHomeOccupants}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </View>

      {/* Continue button */}
      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleContinue}
      >
        <Text style={styles.submitText}>Continue</Text>
      </TouchableOpacity>
      </ScrollView>

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