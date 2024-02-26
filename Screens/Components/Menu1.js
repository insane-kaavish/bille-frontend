import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MenuProvider,Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const FixedMenu = () => {
  const navigation = useNavigation();

  return (
    <MenuProvider skipInstanceCheck={true} style={styles.container} >
      <TouchableOpacity style={styles.menuButtonContainer}>
        <Menu>
          <MenuTrigger style={styles.menuIcon}>
            <Ionicons name="menu" size={30} color="black" />
          </MenuTrigger>
          <MenuOptions style={styles.menuOptionsStyle}>
            <MenuOption onSelect={() => navigation.navigate('EditProfile')}>
              <Text style={styles.menuOptionText}>Profile</Text>
            </MenuOption>
            <MenuOption onSelect={() => navigation.navigate('Settings')}>
              <Text style={styles.menuOptionText}>Settings</Text>
            </MenuOption>
            <MenuOption onSelect={() => navigation.navigate('HelpCenter')}>
              <Text style={styles.menuOptionText}>Help center</Text>
            </MenuOption>
            <MenuOption onSelect={() => navigation.navigate('SignIn')}>
              <Text style={styles.menuOptionText}>Sign out</Text>
            </MenuOption>
          </MenuOptions>
        </Menu>
      </TouchableOpacity>
    </MenuProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 50,
    right: 10,
    // zIndex: 10,
  },
  menuButtonContainer: {
    padding: 10,
  },
  menuIcon: {
    zIndex: 1,
  },
  menuOptionsStyle: {
    marginTop: 30,
  },
  menuOptionText: {
    padding: 10,
    fontSize: 16,
  },
});

export default FixedMenu;
