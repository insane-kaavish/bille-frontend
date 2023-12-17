import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const ChangeUsernameScreen = () => {
  const [currentUsername, setCurrentUsername] = useState('Bashir');
  const [newUsername, setNewUsername] = useState('');

  const handleChangeUsername = () => {
    // Implement logic to update the username, e.g., make an API call

    // For now, we'll just update the state
    setCurrentUsername(newUsername);
    setNewUsername('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Change Username</Text>

      <View style={styles.usernameContainer}>
        <Text style={styles.label}>Current Username:</Text>
        <Text style={styles.currentUsername}>{currentUsername}</Text>
      </View>

      <View style={styles.usernameContainer}>
        <Text style={styles.label}>New Username:</Text>
        <TextInput
          style={styles.input}
          value={newUsername}
          onChangeText={(text) => setNewUsername(text)}
          placeholder="Enter new username"
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleChangeUsername}>
        <Text style={styles.buttonText}>Change Username</Text>
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
  usernameContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  currentUsername: {
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

export default ChangeUsernameScreen;
