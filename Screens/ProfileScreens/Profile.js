import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard, Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { MenuProvider } from 'react-native-popup-menu';

import MenuComponent from '../Components/Menu';
import NavBar from '../Components/NavBar';

const height = Dimensions.get('window').height;

const Profile = ({ navigation }) => {
  const [editName, setEditName] = useState('Admin');
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
          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Username</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={[styles.input, !isEditing && styles.disabledInput]}
                value={editName}
                onChangeText={(text) => handleInputChange(text, 'editName')}
                editable={isEditing === 'editName'}
                selectTextOnFocus={false}
                placeholder="Edit Username"
              />
              <Ionicons
                name="create-outline"
                size={20}
                color="#535CE8"
                style={styles.icon}
                onPress={() => handlePress('editName')}
              />
            </View>
          </View>

          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Email</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={[styles.input, !isEditing && styles.disabledInput]}
                value={editEmail}
                onChangeText={(text) => handleInputChange(text, 'editEmail')}
                editable={isEditing === 'editEmail'}
                selectTextOnFocus={false}
                placeholder="Edit Email"
                keyboardType="email-address"
              />
              <Ionicons
                name="create-outline"
                size={20}
                color="#535CE8"
                style={styles.icon}
                onPress={() => handlePress('editEmail')}
              />
            </View>
          </View>
        </View>

        <NavBar />
      </MenuProvider>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingBottom: 10,
    marginBottom: 20,
  },
  headerText: {
    fontFamily: "Lato-Bold",
    fontSize: 20,
    color: "#171A1F",
  },
  content: {
    flex: 1,
  },
  field: {
    marginBottom: 20,
  },
  fieldLabel: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    color: '#333333',
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    color: '#333333',
    paddingVertical: 10,
  },
  disabledInput: {
    backgroundColor: '#F5F5F5',
  },
  icon: {
    marginLeft: 10,
  },
});

export default Profile;
