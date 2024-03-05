import React from 'react';
import { navigation,View, Text, StyleSheet, TouchableOpacity, Switch, Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  MenuProvider,
} from 'react-native-popup-menu';
import MenuComponent from '../Components/Menu';
import NavBar from '../Components/NavBar';

const height = Dimensions.get('window').height;

const SettingsScreen = ({ navigation }) => {
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
    navigation.navigate('Profile');
  };

  return (
    <MenuProvider skipInstanceCheck={true} style={styles.container}>
      <View style={styles.header}>
      <View style={{ flex: 1 }}> 
        <Text style={{ fontFamily: 'Lato-Bold', fontSize: 20, color: '#171A1F', textAlign: 'left' }}>
          <Text>Settings</Text>
        </Text>  
      </View>
        <MenuComponent navigation={navigation} />
      </View>

    <View style={styles.maincontainer}>
      {/* <Text style={styles.heading}>Settings</Text> */}

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
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
    paddingTop: height * 0.001,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc', 
  },
  optionButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    marginBottom: 16,
  },
  optionText: {
    fontSize: 18,
    color: '#000',
  },
  maincontainer: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent:'center',

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
