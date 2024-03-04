import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { MenuProvider } from 'react-native-popup-menu';

import MenuComponent from '../Components/Menu';
import NavBar from '../Components/NavBar';

const Profile = ({ navigation }) => {
  const [editName, setEditName] = useState('Admin');
  const [editPassword, setEditPassword] = useState('********');
  const [editKENumber, setEditKENumber] = useState('040001633072');
  const [editEmail, setEditEmail] = useState('admin@admin.com');

  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [isEditingKENumber, setIsEditingKENumber] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);

  const startEditingName = () => {
    setIsEditingName(true);
  };

  const startEditingPassword = () => {
    setIsEditingPassword(true);
  };

  const startEditingKENumber = () => {
    setIsEditingKENumber(true);
  };

  const startEditingEmail = () => {
    setIsEditingEmail(true);
  };

  return (
    <MenuProvider skipInstanceCheck={true} style={styles.container}>
      <View style={styles.header}>
        <View style={{ flex: 1 }}> 
          <Text style={styles.headerText}>Bill-E Profile</Text>
        </View>
        <MenuComponent navigation={navigation} />
      </View>

      <View style={styles.content}>
        <TouchableOpacity style={styles.card} onPress={startEditingName}>
          <TextInput
            style={styles.input}
            value={editName}
            onChangeText={setEditName}
            editable={isEditingName}
            selectTextOnFocus={false}
          />
          <Ionicons name="create-outline" size={20} color="#000" style={styles.icon} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={startEditingPassword}>
          <TextInput
            style={styles.input}
            value={editPassword}
            onChangeText={setEditPassword}
            secureTextEntry
            editable={isEditingPassword}
            selectTextOnFocus={false}
          />
          <Ionicons name="create-outline" size={20} color="#000" style={styles.icon} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={startEditingKENumber}>
          <TextInput
            style={styles.input}
            value={editKENumber}
            onChangeText={setEditKENumber}
            editable={isEditingKENumber}
            selectTextOnFocus={false}
          />
          <Ionicons name="create-outline" size={20} color="#000" style={styles.icon} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={startEditingEmail}>
          <TextInput
            style={styles.input}
            value={editEmail}
            onChangeText={setEditEmail}
            editable={isEditingEmail}
            selectTextOnFocus={false}
          />
          <Ionicons name="create-outline" size={20} color="#000" style={styles.icon} />
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
    justifyContent: 'center', // Center content vertically
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingTop: 10,
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
  optionText: {
    fontFamily: 'Lato-Bold',
    fontSize: 18,
    color: '#000',
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
