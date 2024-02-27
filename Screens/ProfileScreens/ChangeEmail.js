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



const ChangeEmail = ({ navigation }) => {
  const [currentEmail, setCurrentEmail] = useState('Bashir@gmail.com');
  const [newEmail, setNewEmail] = useState('');

  const handleChangeEmail = () => {
    setCurrentEmail(newEmail);
    setNewEmail('');
    navigation.navigate('EditProfile');
  };

  return (
    <MenuProvider skipInstanceCheck={true} style={styles.container}>
      <View style={styles.header}>
      <View style={{ flex: 1 }}> 
        <Text style={{ fontFamily: 'Lato-Bold', fontSize: 20, color: '#171A1F', textAlign: 'left' }}>
          <Text>Bill-E Profile</Text>
        </Text>  
      </View>
        <MenuComponent navigation={navigation} />
      </View>

    <View style={styles.maincontainer}>
      {/* <Text style={styles.header}>Change Email</Text> */}

      <View style={styles.EmailContainer}>
        <Text style={styles.label}>Current Email:</Text>
        <Text style={styles.currentEmail}>{currentEmail}</Text>
      </View>

      <View style={styles.EmailContainer}>
        <Text style={styles.label}>New Email:</Text>
        <TextInput
          style={styles.input}
          value={newEmail}
          onChangeText={(text) => setNewEmail(text)}
          placeholder="Enter new Email"
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleChangeEmail}>
        <Text style={styles.buttonText}>Change Email</Text>
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
  EmailContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  currentEmail: {
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

export default ChangeEmail;
