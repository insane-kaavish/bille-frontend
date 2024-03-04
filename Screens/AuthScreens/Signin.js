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
  const [emailTouched, setEmailTouched] = useState(false); // Track if email field has been touched
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
      setEmailTouched(false); // Reset email touched state
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

  useEffect(() => {
    // Validate email on each change if the email field has been touched
    if (emailTouched) {
      if (!validateEmail(email)) {
        setError('Please enter a valid email address');
        setShowError(true);
      } else {
        setError('');
        setShowError(false);
      }
    }
  }, [email, emailTouched]);

  const handleEmailBlur = () => {
    setEmailTouched(true);
  };

  const handlePasswordFocus = () => {
    // Clear error when password field is focused
    if (error) {
      setError('');
      setShowError(false);
    }
  };

  const handleEmailFocus = () => {
    // Clear error when email field is focused
    if (error) {
      setError('');
      setShowError(false);
    }
  };

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
      navigation.navigate('DashBoard'); // Have to fix: Navigate to Dashboard screen. to RoomData temporary
    } else {
      setLoading(false);
      setError('Email address or password is incorrect');
      setShowError(true);
    }
  }  

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
      <Text style={styles.header}>Welcome back 👋</Text>
      <View style={[styles.inputContainer, { borderColor: showError ? 'red' : '#ccc' }]}>
        <TextInput
          style={styles.input}
          placeholder="Enter email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize='none'
          onBlur={handleEmailBlur} // Track when email field loses focus
          onFocus={handleEmailFocus} // Clear error when email field is focused
          ref={emailInputRef}
        />
      </View>
      <View style={[styles.inputContainer, { borderColor: showError ? 'red' : '#ccc' }]}>
        <TextInput
          style={styles.input}
          placeholder="Enter password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          autoCapitalize='none'
          onFocus={handlePasswordFocus} // Clear error when password field is focused
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
    backgroundColor: '#F3F4F6',
    borderColor: '#ccc',
  },
  input: {
    padding: 10,
    borderColor: '#ccc',
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
