import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard, Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { MenuProvider } from 'react-native-popup-menu';

import MenuComponent from '../Components/Menu';
import NavBar from '../Components/NavBar';

const height = Dimensions.get('window').height;

const Profile = ({ navigation }) => {
  const [editName, setEditName] = useState('Admin');
  // const [editPassword, setEditPassword] = useState('********');
  // const [editKENumber, setEditKENumber] = useState('040001633072');
  const [editEmail, setEditEmail] = useState('admin@admin.com');

  const [isEditing, setIsEditing] = useState(null);

  const handlePress = (fieldName) => {
    setIsEditing(fieldName);
  };

  const handleInputChange = (text, fieldName) => {
    switch (fieldName) {
      case 'editName':
        setEditName(text);
        break;
      case 'editEmail':
        setEditEmail(text);
        break;
      default:
        break;
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <MenuProvider skipInstanceCheck={true} style={styles.container}>
        <View style={styles.header}>
          <View style={{ flex: 1 }}> 
            <Text style={styles.headerText}>Bill-E Profile</Text>
          </View>
          <MenuComponent navigation={navigation} />
        </View>

        <View style={styles.content}>
          <TouchableOpacity
            style={styles.card}
            onPress={() => handlePress('editName')}
          >
            <TextInput
              style={styles.input}
              value={editName}
              onChangeText={(text) => handleInputChange(text, 'editName')}
              editable={isEditing === 'editName'}
              selectTextOnFocus={false}
            />
            <Ionicons
              name="create-outline"
              size={20}
              color="#000"
              style={styles.icon}
              onPress={() => handlePress('editName')}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={() => handlePress('editEmail')}
          >
            <TextInput
              style={styles.input}
              value={editEmail}
              onChangeText={(text) => handleInputChange(text, 'editEmail')}
              editable={isEditing === 'editEmail'}
              selectTextOnFocus={false}
            />
            <Ionicons
              name="create-outline"
              size={20}
              color="#000"
              style={styles.icon}
              onPress={() => handlePress('editEmail')}
            />
          </TouchableOpacity>
        </View>

        <NavBar />
      </MenuProvider>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    justifyContent: 'center', // Center content vertically
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingTop: height * 0.001,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerText: {
    fontFamily: 'Lato-Bold',
    fontSize: 20,
    color: '#171A1F',
    textAlign: 'left',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    marginVertical: 10,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    elevation: 3, // Add elevation for a card-like effect (Android)
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  input: {
    flex: 1,
    fontFamily: 'Lato-Bold',
    fontSize: 18,
    color: '#000',
    paddingHorizontal: 10,
  },
  icon: {
    marginHorizontal: 10,
  },
});

export default Profile;
