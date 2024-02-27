import React from 'react';
import { TouchableOpacity, StyleSheet, ScrollView, Image, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const NavBar = () => {
  const handleTabPress = (tabIndex) => {
    // Implement your navigation logic here based on the tabIndex
    console.log(`Tab ${tabIndex + 1} pressed`);
  };
  const navigation = useNavigation(); // Hook to access the navigation prop

  const navigateToOverview = () => {
    navigation.navigate('DashBoard');
  };
  // Updated function to navigate to Prediction screen
  const navigateToPrediction = () => {
    navigation.navigate('Prediction'); // Ensure 'Prediction' matches the route name defined in your navigator
  };
  const navigateToRoomWise = () => {
    navigation.navigate('RoomwisePrediction');
  };
  const navigateToProfile = () => {
    navigation.navigate('EditProfile');
  };

  return (
    <View style={styles.navBar}>
        <TouchableOpacity onPress={navigateToOverview}>
          <Ionicons name="home-outline" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={navigateToPrediction}>
          <Ionicons name="stats-chart-outline" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={navigateToRoomWise}>
          <Ionicons name="grid-outline" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={navigateToProfile}>
          <Ionicons name="person-outline" size={24} color="#000" /> 
        </TouchableOpacity>
      </View>
  );
};

const styles = StyleSheet.create({
  navcontainer: {
    flexDirection: 'row',
    height: 70,
    backgroundColor: 'white',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    elevation: 7, // Android shadow
    shadowColor: '#171A1F',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  navtab: {
    flex: 1,
    justifyContent: 'top',
    alignItems: 'center',

  },
  navlabel: {
    fontSize: 11,
    color: '#9095A0',
    marginTop: 4,
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#EFEFEF',
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default NavBar;
