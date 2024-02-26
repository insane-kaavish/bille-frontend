import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SettingsScreen = ({ navigation }) => {
  // Placeholder for actual navigation or action calls
  const navigateToPrivacy = () => {
    navigation.navigate('Privacy');
    console.log('Navigate to Privacy')};
  const navigateToContactUs = () => {
    navigation.navigate('ContactUs');
    console.log('Navigate to Contact Us');}

  
  const navigateToNotifications = () => {
    console.log('Navigate to Notifications')};

  const navigateToOverview = () => {
    navigation.navigate('DashBoard');
  };
  const navigateToPrediction = () => {
    navigation.navigate('Prediction');
  };
  const navigateToRoomWise = () => {
    navigation.navigate('RoomwisePrediction');
  };
  const navigateToProfile = () => {
    navigation.navigate('EditProfile');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Settings</Text>

      <TouchableOpacity style={styles.optionButton} onPress={navigateToNotifications}>
        <Text style={styles.optionText}>Enable Notifications</Text>
        <Ionicons name="chevron-forward-outline" size={20} color="#000" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.optionButton} onPress={navigateToPrivacy}>
        <Text style={styles.optionText}>Privacy</Text>
        <Ionicons name="chevron-forward-outline" size={20} color="#000" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.optionButton} onPress={navigateToContactUs}>
        <Text style={styles.optionText}>Contact Us</Text>
        <Ionicons name="chevron-forward-outline" size={20} color="#000" />
      </TouchableOpacity>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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

export default SettingsScreen;
