import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';

const SignInScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome back 👋</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} placeholder="Enter email" />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput style={styles.input} placeholder="Enter password" secureTextEntry />
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
      <Text style={styles.footerText}>
        Don't have an account? 
        <Text style={styles.signUpText} onPress={() => navigation.navigate('CreateAccount')}> Sign up</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  header: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 20,
  },
  inputContainer: {
    width: '90%',
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#F3F4F6',
    borderRadius: 16,
    padding: 10,
  },
  button: {
    backgroundColor: '#535CE8',
    borderRadius: 26,
    paddingVertical: 12,
    paddingHorizontal: 20,
    width: '90%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  footerText: {
    marginTop: 20,
    fontSize: 16,
  },
  signUpText: {
    color: '#535CE8',
    fontWeight: '700',
  },
});

export default App;