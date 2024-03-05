import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; // Import modern icons
import FontAwesome from 'react-native-vector-icons/FontAwesome'; // Import modern icons

import { useAuth } from '../AuthScreens/AuthProvider';

const Divider = () => <View style={styles.divider} />;

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
        <MenuOption onSelect={() => navigation.navigate('Profile')}>
          <Text style={styles.menuOptionText}>
            Profile         
          </Text>
          <FontAwesome name="user" size={25} color="black" style={styles.menuOptionIcon}/>
        </MenuOption>
        <Divider />
        <MenuOption onSelect={() => navigation.navigate('Settings')}>
          <Text style={styles.menuOptionText}>
            Settings
          </Text>
          <FontAwesome name="gear" size={25} color="black" style={styles.menuOptionIcon}/>
        </MenuOption>
        <Divider />
        <MenuOption onSelect={() => navigation.navigate('HelpCenter')}>
          <Text style={styles.menuOptionText}>
            Help Center
          </Text>
          <FontAwesome name="question-circle" size={25} color="black" style={styles.menuOptionIcon}/>
        </MenuOption>
        <Divider />
        <MenuOption onSelect={handleLogout}>
          <Text style={styles.menuOptionText}>
            Logout   
          </Text>
          <MaterialCommunityIcons name="logout" size={25} color="black" style={styles.menuOptionIcon}/>
        </MenuOption>
        <Divider />
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
    fontFamily: 'Roboto-Regular',
    marginLeft: 45, // Adjust this value based on the width of the icon
  },
  menuOptionIcon: {
    marginLeft: 10,
    paddingVertical: -50,
    justifyContent: 'space-between',
    top: -23,
    right: 0,
  },
  divider: {
    height: 1, // Set a fixed height for the divider
    // backgroundColor: '#7F8487',
  },
});

export default MenuComponent;
