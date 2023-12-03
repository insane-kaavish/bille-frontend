import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const handleAuth = async (email, password) => {
  try {
    const response = await fetch('http://0.0.0.0:8000/api-token-auth/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: email, password }),
    });
    const data = await response.json();
    return data.token;
  } catch (error) {
    console.error(error);
  }
};

const handleSignUp = async (data) => {

  // Make the API call
  try {
    const response = fetch('http://0.0.0.0:8000/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.status != 201) return false;
    return true;
  }
  catch (error) {
    console.error(error);
  }
};

const CreateAccount = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async () => {
    // Prepare the data to send
    const data = {
      first_name: name,
      last_name: '',
      email: email,
      password: password,
      // confirmPassword: confirmPassword,
    };
    if (await handleSignUp(data)) {
      setToken(await handleAuth(email, password));
      navigation.navigate('DashBoard');
    }
    else {
      console.log('Error signing up');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Bill-E</Text>
      <Text style={styles.title}>Create Account</Text>

      {/* Name Field */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter name"
          value={name}
          onChangeText={text => setName(text)}
        />
      </View>

      {/* Email Field */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter email"
          keyboardType="email-address"
          value={email}
          onChangeText={text => setEmail(text)}
        />
      </View>

      {/* Password Field */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter password"
          secureTextEntry
          value={password}
          onChangeText={text => setPassword(text)}
        />
      </View>

      {/* Confirm Password Field */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Confirm Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={text => setConfirmPassword(text)}
        />
      </View>

      {/* Sign Up Button */}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
        <Text style={styles.footerText}>
          Already have an account? <Text style={styles.footerTextHighlight}>Login</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

// Rest of the code...

export default CreateAccount;