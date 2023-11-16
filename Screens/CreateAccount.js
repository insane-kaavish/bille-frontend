import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const CreateAccount = ({ navigation }) => {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Bill-E</Text>
        <Text style={styles.title}>Create Account</Text>

      {/* Name Field */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Name</Text>
        <TextInput style={styles.input} placeholder="Enter name" />
      </View>

      {/* Email Field */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} placeholder="Enter email" keyboardType="email-address" />
      </View>

      {/* Password Field */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput style={styles.input} placeholder="Enter password" secureTextEntry />
      </View>

      {/* Confirm Password Field */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Confirm Password</Text>
        <TextInput style={styles.input} placeholder="Enter password" secureTextEntry />
      </View>

      {/* Sign Up Button */}
      <TouchableOpacity style={styles.button} onPress={() => {/* Handle sign up logic */}}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
        <Text style={styles.footerText}>
          Already have account? <Text style={styles.footerTextHighlight}>Login</Text>
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