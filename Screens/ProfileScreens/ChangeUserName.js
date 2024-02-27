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


const ChangeUsername = ({ navigation }) => {
  const [currentUsername, setCurrentUsername] = useState('Bashir');
  const [newUsername, setNewUsername] = useState('');

  const handleChangeUsername = () => {
    // Implement logic to update the username, e.g., make an API call

    // For now, we'll just update the state
    setCurrentUsername(newUsername);
    setNewUsername('');
    navigation.navigate('EditProfile');
  };
  // test line

  return (
    <MenuProvider skipInstanceCheck={true} style={styles.container}>
      <View style={styles.header}>
      <View style={{ flex: 1 }}> 
        <Text style={{ fontFamily: 'Lato-Bold', fontSize: 20, color: '#171A1F', textAlign: 'left' }}>
          <Text>Change User Name</Text>
        </Text>  
      </View>
        <MenuComponent navigation={navigation} />
      </View>

      <View style={styles.maincontainer}>
      {/* <Text style={styles.header}>Change Username</Text> */}

      <View style={styles.usernameContainer}>
        <Text style={styles.label}>Current Username:</Text>
        <Text style={styles.currentUsername}>{currentUsername}</Text>
      </View>

      <View style={styles.usernameContainer}>
        <Text style={styles.label}>New Username:</Text>
        <TextInput
          style={styles.input}
          value={newUsername}
          onChangeText={(text) => setNewUsername(text)}
          placeholder="Enter new username"
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleChangeUsername}>
        <Text style={styles.buttonText}>Change Username</Text>
      </TouchableOpacity>
    </View>



    <NavBar />
    </MenuProvider>











    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    // justifyContent: 'center',
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
    padding: 10,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  usernameContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  currentUsername: {
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
});

export default ChangeUsername;
