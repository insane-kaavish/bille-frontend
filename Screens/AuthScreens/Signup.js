import React, { useState } from 'react';

import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import Config from 'react-native-config';
import { useAuth } from './AuthProvider';

const CreateAccount = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [keNumber, setKeNumber] = useState(''); // Add keNumber state
  const [token, setToken] = useState([]);
  const [isLoading, setLoading] = useState(false); // Add isLoading state
  const [isTyping, setIsTyping] = useState(false);
  const { signup } = useAuth();

  const handleFocus = () => {
    setIsTyping(true); // Set isTyping to true when a text input is focused
  };

  const handleBlur = () => {
    setIsTyping(false); // Set isTyping to false when a text input is blurred
  };

  const handleSubmit = async () => {
    setLoading(true); // Set isLoading to true when submitting

    // Prepare the data to send
    if (name === '' || email === '' || password === '' || confirmPassword === '') return;
    setLoading(true); // Set isLoading to true when the sign-in button is pressed
    const data = {
      first_name: name,
      last_name: '',
      email: email,
      password: password,
      // confirmPassword: confirmPassword,
    };

    // Make the API call
    const response = await signup(data);
    if (!response) {
      setLoading(false); // Set isLoading to false after submission
      return;
    }
    navigation.navigate('DashBoard');
    setLoading(false); // Set isLoading to false after submission
  };

  return (
    <View style={styles.container}>
      {!isTyping && <Text style={styles.header}>Bill-E</Text>}
      {!isTyping &&<Text style={styles.title}>Create Account</Text>}

      {/* Name Field */}
      <View style={styles.inputContainer}>
        {/* <Text style={styles.label}>Name</Text> */}
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={name}
          onChangeText={(text) => setName(text)}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </View>

      {/* Email Field */}
      <View style={styles.inputContainer}>
        {/* <Text style={styles.label}>Email</Text> */}
        <TextInput
          style={styles.input}
          placeholder="Email Address"
          keyboardType="email-address"
          value={email}
          onChangeText={(text) => setEmail(text)}
          autoCapitalize='none'
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </View>

      <View style={styles.inputContainer}>
        {/* <Text style={styles.label}>Password</Text> */}
        <TextInput
          style={styles.input}
          placeholder="K-Electric Account Number"
          value={keNumber}
          onChangeText={(text) => setKeNumber(text)}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </View>

      {/* Password Field */}
      <View style={styles.inputContainer}>
        {/* <Text style={styles.label}>Password</Text> */}
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          autoCapitalize='none'
          onChangeText={(text) => setPassword(text)}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </View>

      {/* Confirm Password Field */}
      <View style={styles.inputContainer}>
        {/* <Text style={styles.label}>Confirm Password</Text> */}
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry
          value={confirmPassword}
          autoCapitalize='none'
          onChangeText={(text) => setConfirmPassword(text)}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </View>

      {/* Sign Up Button */}
      <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={isLoading}>
        {isLoading ? (
          <ActivityIndicator color="white" /> // Show loading indicator when isLoading is true
        ) : (
          <Text style={styles.buttonText}>Sign Up</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
        <Text style={styles.footerText}>
          Already have an account? <Text style={styles.footerTextHighlight}>Login</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  header: {
    fontSize: 48,
    fontWeight: '700',
    color: '#171A1F',
    position: 'absolute',
    top: 47, 
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#171A1F',
    marginTop: 125, // Adjust as per your layout
  },
  inputContainer: {
    width: '90%',
    marginVertical: 10, // Adjust as per your layout
  },
  label: {
    color: '#424955',
    fontSize: 16,
    fontWeight: '700',
  },
  input: {
    height: 43,
    backgroundColor: '#F3F4F6',
    borderRadius: 16,
    padding: 10,
    marginTop: 5,
  },
  button: {
    backgroundColor: '#535CE8',
    borderRadius: 26,
    paddingVertical: 12,
    width: '90%',
    alignItems: 'center',
    marginTop: 20, // Adjust as per your layout
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '400',
  },
  footerText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#171A1F',
    marginTop: 20, // Adjust as per your layout
  },
  footerTextHighlight: {
    color: '#535CE8',
  },
});

export default CreateAccount;