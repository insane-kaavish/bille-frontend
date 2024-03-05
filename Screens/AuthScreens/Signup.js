import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useAuth } from './AuthProvider';

import { Colors } from '../Styles/Colors';

const CreateAccount = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [keNumber, setKeNumber] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [touchedFields, setTouchedFields] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
    keNumber: false,
  });
  const { signup } = useAuth();

  useEffect(() => { 
    const unsubscribe = navigation.addListener('focus', () => {
      // Reset fields when screen comes into focus
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setKeNumber('');
      setTouchedFields({
        name: false,
        email: false,
        password: false,
        confirmPassword: false,
        keNumber: false,
      });
    });
  
    return unsubscribe;
  }, [navigation]);

  const handleFocus = (field) => {
    setIsTyping(true);
    if (!touchedFields[field]) {
      setTouchedFields((prevState) => ({ ...prevState, [field]: true }));
    }
  };

  const handleChange = () => {
    setIsTyping(true);
  };

  const handleBlur = (field) => {
    if (field !== '' && !isTyping) {
      setTouchedFields((prevState) => ({ ...prevState, [field]: true }));
    }
  };

  const handleSubmit = async () => {
    setLoading(true);

    const data = {
      first_name: name,
      last_name: '',
      email: email,
      password: password,
      ke_num: keNumber,
    };

    const response = await signup(data);
    if (response.status !== 201) {
      setLoading(false);
      return;
    }
    console.log("successfully signed up");
    navigation.navigate('RoomData');
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <View style={[styles.inputContainer, touchedFields.name && !isTyping && { borderColor: 'red' }]}>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={name}
          onChangeText={(text) => setName(text)}
          onFocus={() => handleFocus('name')}
          onBlur={() => handleBlur('name')}
        />
      </View>

      <View style={[styles.inputContainer, touchedFields.email && !isTyping && { borderColor: '#ccc' }]}>
        <TextInput
          style={styles.input}
          placeholder="Email Address"
          keyboardType="email-address"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            handleChange();
          }}
          autoCapitalize='none'
          onFocus={() => handleFocus('email')}
          onBlur={() => handleBlur('email')}
        />
      </View>

      <View style={[styles.inputContainer, touchedFields.keNumber && !isTyping && { borderColor: 'red' }]}>
        <TextInput
          style={styles.input}
          placeholder="K-Electric Account Number"
          value={keNumber}
          onChangeText={(text) => setKeNumber(text)}
          onFocus={() => handleFocus('keNumber')}
          onBlur={() => handleBlur('keNumber')}
        />
      </View>

      <View style={[styles.inputContainer, touchedFields.password && !isTyping && { borderColor: 'red' }]}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          autoCapitalize='none'
          onChangeText={(text) => setPassword(text)}
          onFocus={() => handleFocus('password')}
          onBlur={() => handleBlur('password')}
        />
      </View>

      <View style={[styles.inputContainer, touchedFields.confirmPassword && !isTyping && { borderColor: 'red' }]}>
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry
          value={confirmPassword}
          autoCapitalize='none'
          onChangeText={(text) => setConfirmPassword(text)}
          onFocus={() => handleFocus('confirmPassword')}
          onBlur={() => handleBlur('confirmPassword')}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={isLoading}>
        {isLoading ? (
          <ActivityIndicator color="white" />
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
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  inputContainer: {
    width: '90%',
    marginBottom: 15,
    borderWidth: 1,
    borderRadius: 16,
    backgroundColor: Colors.textfieldBG,
    borderColor: '#ccc',
  },
  input: {
    height: 43,
    backgroundColor: Colors.textfieldBG,
    borderRadius: 16,
    padding: 10,
    marginTop: 5,
  },
  button: {
    backgroundColor: Colors.buttonColor,
    borderRadius: 26,
    paddingVertical: 12,
    width: '90%',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '400',
  },
  footerText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.black,
    marginTop: 20,
  },
  footerTextHighlight: {
    color: Colors.buttonColor,
  },
});

export default CreateAccount;