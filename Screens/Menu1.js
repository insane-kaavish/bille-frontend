import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MenuProvider, Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const Menu1 = () => {
  const navigation = useNavigation();

  return (
    <MenuProvider>
      <View style={styles.container}>
        <Menu>
          <MenuTrigger style={styles.menuTrigger}>
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
      </View>
    </MenuProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '10%',
    right: '10%',
    zIndex: 1,
  },
  menuTrigger: {
    margin: 10,
  },
  menuOptionsStyle: {
    marginTop: 40,
  },
  menuOptionText: {
    fontSize: 16,
    padding: 10,
  },
});

export default Menu1;
