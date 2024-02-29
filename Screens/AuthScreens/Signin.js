import React, { useState } from 'react';
import { StyleSheet, StatusBar ,View, Text, TextInput, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { useAuth } from './AuthProvider';
import Config from 'react-native-config';

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setLoading] = useState(false);
  const { authToken, login } = useAuth();

  const handleSubmit = async () => {
    if (email === '' || password === '') return;
    setLoading(true);
    console.log('Signing in...');
    console.log(email, password);
    if (await login(email, password)) {
      console.log(authToken);
      setLoading(false);
      navigation.navigate('DataInput');
    }
    else {
      setLoading(false);
      setEmail(''); setPassword('');
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
      <Text style={styles.header}>Welcome back 👋</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize='none'
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          autoCapitalize='none'
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={isLoading}>
        {isLoading ? (
          <ActivityIndicator color="white" /> // Show loading symbol when isLoading is true
        ) : (
          <Text style={styles.buttonText}>Sign In</Text>
        )}
      </TouchableOpacity>
      <Text style={styles.footerText}>
        Don't have an account?
        <Text style={styles.signUpText} onPress={() => navigation.navigate('CreateAccount')}>
          {' '}
          Sign up
        </Text>
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
    padding: 10,
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
    marginTop: '5%',
    width: '90%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
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

export default SignInScreen;