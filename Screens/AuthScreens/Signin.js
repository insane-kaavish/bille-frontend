import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, StatusBar, View, Text, TextInput, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { useAuth } from './AuthProvider';

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showError, setShowError] = useState(false); // State to control error message and red border
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null); // Reference for password input
  const { authToken, login } = useAuth();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // Reset error state and clear email field when screen comes into focus
      setError('');
      setShowError(false);
      setEmail('');
      setPassword('');
    });
  
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    // Clear email and password fields when component unmounts (navigating away)
    return () => {
      setEmail('');
      setPassword('');
    };
  }, []);

  const handleSubmit = async () => {
    if (email === '' || password === '') {
      setError('Please enter email and password');
      setShowError(true);
      return;
    }
  
    setLoading(true);
    console.log('Signing in...');
    console.log(email, password);
    if (await login(email, password)) {
      console.log(authToken);
      setLoading(false);
      navigation.navigate('RoomData');
    } else {
      setLoading(false);
      setError('Email address or password is incorrect');
      setEmail('');
      setPassword('');
      emailInputRef.current.focus();
      setShowError(true);
    }
  }  

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
      <Text style={styles.header}>Welcome back 👋</Text>
      <View style={[styles.inputContainer, { borderColor: showError ? 'red' : '#F3F4F6' }]}>
        <TextInput
          style={styles.input}
          placeholder="Enter email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize='none'
          ref={emailInputRef}
        />
      </View>
      <View style={[styles.inputContainer, { borderColor: showError ? 'red' : '#F3F4F6' }]}>
        <TextInput
          style={styles.input}
          placeholder="Enter password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          autoCapitalize='none'
          ref={passwordInputRef} // Assign reference to password input
        />
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={isLoading}>
        {isLoading ? (
          <ActivityIndicator color="white" />
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
    borderWidth: 1,
    borderRadius: 16,
    borderColor: '#F3F4F6',
  },
  label: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 5,
  },
  input: {
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
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default SignInScreen;
