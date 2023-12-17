import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const ChangeEmailScreen = () => {
  const [currentEmail, setCurrentEmail] = useState('Bashir@gmail.com');
  const [newEmail, setNewEmail] = useState('');

  const handleChangeEmail = () => {
    // Implement logic to update the Email, e.g., make an API call

    // For now, we'll just update the state
    setCurrentEmail(newEmail);
    setNewEmail('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Change Email</Text>

      <View style={styles.EmailContainer}>
        <Text style={styles.label}>Current Email:</Text>
        <Text style={styles.currentEmail}>{currentEmail}</Text>
      </View>

      <View style={styles.EmailContainer}>
        <Text style={styles.label}>New Email:</Text>
        <TextInput
          style={styles.input}
          value={newEmail}
          onChangeText={(text) => setNewEmail(text)}
          placeholder="Enter new Email"
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleChangeEmail}>
        <Text style={styles.buttonText}>Change Email</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  EmailContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  currentEmail: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#535CE8',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ChangeEmailScreen;
