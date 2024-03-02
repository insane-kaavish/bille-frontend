import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  MenuProvider,
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; // Import modern icons
import FontAwesome from 'react-native-vector-icons/FontAwesome'; // Import modern icons

import { useAuth } from '../AuthScreens/AuthProvider';

const MenuComponent = ({ navigation }) => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigation.navigate('SignIn');
  };
  
  return (
    <Menu>
      <MenuTrigger>
        <MaterialCommunityIcons name="menu" size={30} color="black" style={styles.menuIcon} />
      </MenuTrigger>
      <MenuOptions style={styles.menuOptionsStyle}>
    
        <MenuOption onSelect={() => navigation.navigate('EditProfile')}>
          <Text style={styles.menuOptionText}>
            Profile         
          </Text>
          <FontAwesome name="user" size={25} color="black" style={styles.menuOptionIcon}/>
        </MenuOption>
        <MenuOption onSelect={() => navigation.navigate('Settings')}>
          <Text style={styles.menuOptionText}>
            Settings
          </Text>
          <FontAwesome name="gear" size={25} color="black" style={styles.menuOptionIcon}/>
        </MenuOption>
        <MenuOption onSelect={() => navigation.navigate('HelpCenter')}>
          <Text style={styles.menuOptionText}>
            Help Center
          </Text>
          <FontAwesome name="question-circle" size={25} color="black" style={styles.menuOptionIcon}/>
        </MenuOption>
        <MenuOption onSelect={handleLogout}>
          <Text style={styles.menuOptionText}>
            Logout   
          </Text>
          <MaterialCommunityIcons name="logout" size={25} color="black" style={styles.menuOptionIcon}/>
        </MenuOption>
      </MenuOptions>
    </Menu>
  );
};

const styles = StyleSheet.create({
  menuIcon: {
    marginTop: 5,
    marginRight: 10,
  },
  menuOptionsStyle: {
    flex: 1,
    marginTop: 5,
    marginVertical: -10, // Adjust this value to reduce the vertical spacing
  },
  menuOptionText: {
    textAlign: 'left',
    fontSize: 16,
    fontFamily: 'Outfit-Bold',
    marginLeft: 40, // Adjust this value based on the width of the icon
  },
  menuOptionIcon: {
    marginLeft: 10,
    paddingVertical: -50,
    justifyContent: 'space-between',
    top: -26,
    right: 0,
  },
});

export default MenuComponent;
