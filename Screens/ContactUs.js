import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ContactUsScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    // Implement logic to handle the contact form submission, e.g., make an API call

    // For now, we'll just log the values
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Message:', message);

    // You can add further logic, like clearing the form or displaying a success message
    setName('');
    setEmail('');
    setMessage('');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Contact Us</Text>

      <View style={styles.formContainer}>
        <Text style={styles.label}>Your Name:</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={(text) => setName(text)}
          placeholder="Enter your name"
        />

        <Text style={styles.label}>Your Email:</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholder="Enter your email"
          keyboardType="email-address"
        />

        <Text style={styles.label}>Your Message:</Text>
        <TextInput
          style={[styles.input, { height: 100 }]}
          value={message}
          onChangeText={(text) => setMessage(text)}
          placeholder="Enter your message"
          multiline
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
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
  formContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
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
    borderRadius: 20,
    padding: 12,
    alignItems: 'center',
    width: '70%',
    alignSelf: 'center',
    marginVertical: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ContactUsScreen;
