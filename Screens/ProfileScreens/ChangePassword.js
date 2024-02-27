import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import {
  MenuProvider,
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import MenuComponent from '../Components/Menu';
import NavBar from '../Components/NavBar';


const ChangePassword = ({ navigation }) => {
  const [currentPassword, setCurrentPassword] = useState('currentPassword123');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatchError, setPasswordMatchError] = useState(false);

  const handleChangePassword = () => {
    if (newPassword === confirmPassword) {
      // Implement logic to update the password, e.g., make an API call

      // For now, we'll just update the state
      setCurrentPassword(newPassword);
      setNewPassword('');
      setConfirmPassword('');
      setPasswordMatchError(false);
      navigation.navigate('EditProfile');
    } else {
      // Passwords don't match, show an error
      setPasswordMatchError(true);
    }
  };

  return (
    <MenuProvider skipInstanceCheck={true} style={styles.container}>
      <View style={styles.header}>
      <View style={{ flex: 1 }}> 
        <Text style={{ fontFamily: 'Lato-Bold', fontSize: 20, color: '#171A1F', textAlign: 'left' }}>
          <Text>Change Password</Text>
        </Text>  
      </View>
        <MenuComponent navigation={navigation} />
      </View>

    <View style={styles.maincontainer}>
      {/* <Text style={styles.header}>Change Password</Text> */}

      <View style={styles.PasswordContainer}>
        <Text style={styles.label}>Current Password: </Text>
        <Text style={styles.currentPassword}>{currentPassword}</Text>
      </View>

      <View style={styles.PasswordContainer}>
        <Text style={styles.label}>New Password:</Text>
        <TextInput
          style={styles.input}
          value={newPassword}
          onChangeText={(text) => setNewPassword(text)}
          secureTextEntry={true}
          placeholder="Enter new Password"
        />
      </View>

      <View style={styles.PasswordContainer}>
        <Text style={styles.label}>Confirm Password:</Text>
        <TextInput
          style={styles.input}
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
          secureTextEntry={true}
          placeholder="Confirm new Password"
        />
      </View>

      {passwordMatchError && (
        <Text style={styles.errorText}>Passwords do not match. Please try again.</Text>
      )}

      <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
        <Text style={styles.buttonText}>Change Password</Text>
      </TouchableOpacity>
    </View>

    <NavBar />
    </MenuProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
    paddingTop: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc', 
  },
  maincontainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  PasswordContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  currentPassword: {
    fontSize: 18,
    fontWeight: 'bold',
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
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default ChangePassword;
