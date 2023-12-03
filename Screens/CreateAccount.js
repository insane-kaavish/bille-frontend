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
    const response = await fetch('http://0.0.0.0:8000/signup/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.status != 200) return false;
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
  const [token, setToken] = useState([]);

  const handleSubmit = async () => {
    // Prepare the data to send
    const data = {
      first_name: name,
      last_name: '',
      username: email,
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