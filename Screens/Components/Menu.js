import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  MenuProvider,
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import Ionicons from 'react-native-vector-icons/Ionicons';

const MenuComponent = ({ navigation }) => {
  return (
    <MenuProvider skipInstanceCheck={true}>
      <View style={styles.header}>
        <Menu>
          <MenuTrigger>
            <Ionicons name="menu" size={30} color="black" style={styles.menuIcon} />
          </MenuTrigger>
          <MenuOptions style={styles.menuOptionsStyle}>
            <MenuOption onSelect={() => navigation.navigate('EditProfile')}>
              <Text style={styles.menuOptionText}>Profile</Text>
            </MenuOption>
            <MenuOption onSelect={() => navigation.navigate('Settings')}>
              <Text style={styles.menuOptionText}>Settings</Text>
            </MenuOption>
            <MenuOption onSelect={() => navigation.navigate('HelpCenter')}>
              <Text style={styles.menuOptionText}>Help Center</Text>
            </MenuOption>
            <MenuOption onSelect={() => navigation.navigate('SignIn')}>
              <Text style={styles.menuOptionText}>Sign Out</Text>
            </MenuOption>
          </MenuOptions>
        </Menu>
      </View>
    </MenuProvider>
  );
};

const styles = StyleSheet.create({
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
  menuIcon: {
    marginTop: 5,
    marginRight: 10,
  },
  menuOptionsStyle: {
    marginTop: 0,
    marginVertical: 2,
    zIndex: 1,
  },
  menuOptionText: {
    fontSize: 16,
    padding: 10,
  },
});

export default MenuComponent;