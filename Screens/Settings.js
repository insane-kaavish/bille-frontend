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

  // const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  // const toggleNotifications = () => {
  //   setNotificationsEnabled(!notificationsEnabled);
  //   // Implement logic to toggle notifications (e.g., update settings, send requests, etc.)
  // };


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
    paddingTop: 50, // Adjust padding as needed
    backgroundColor: 'white',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30, // Increase space below the heading
  },
  optionButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
    backgroundColor: '#f5f5f5', // Add a background color to buttons
    marginHorizontal: 20,
    borderRadius: 10, // Round the corners of the buttons
    marginBottom: 10, // Add space between buttons
  },
  optionText: {
    fontSize: 18,
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
