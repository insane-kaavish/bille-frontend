import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import {
  MenuProvider,
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

const screenWidth = Dimensions.get('window').width;

const RoomwisePrediction = () => {
  const navigation = useNavigation();

  const rooms = [
    { name: 'Ali’s Bedroom', units: 56, icon: 'bed-outline', color: '#517fa4' },
    { name: 'Kitchen', units: 34, icon: 'fast-food-outline', color: '#f44336' },
    { name: 'Bashir Living Room', units: 15, icon: 'tv-outline', color: '#ffeb3b' },
    // Add other rooms as needed
  ];

  const navigateToRoomDetails = (roomName) => {
    console.log('Navigating to details of', roomName);
    // Implement your navigation logic
  };

  return (
    <MenuProvider skipInstanceCheck={true} style={styles.container}>
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

      <ScrollView style={styles.scrollContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>All Rooms Overview</Text>
        </View>
        {rooms.map((room, index) => (
        <TouchableOpacity
          key={index}
          style={styles.roomCard}
          onPress={() => navigateToRoomDetails(room.name)}
        >
          <View style={[styles.iconContainer, { backgroundColor: room.color }]}>
            <Ionicons name={room.icon} size={24} color="#fff" />
          </View>
          <View style={styles.roomDetails}>
            <Text style={styles.roomName}>{room.name}</Text>
            <Text style={styles.roomUnits}>{`${room.units} Units`}</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#C0C0C0" />
        </TouchableOpacity>
      ))}

    </ScrollView>

      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => navigation.navigate('DashBoard')}>
          <Ionicons name="home-outline" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Prediction')}>
          <Ionicons name="stats-chart-outline" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('RoomwisePrediction')}>
          <Ionicons name="grid-outline" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
          <Ionicons name="person-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>
    </MenuProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 10,
    top: 25,
    right : 5,
    zIndex: 1,
  },
  menuIcon: {
    marginTop: 5,
  },
  menuOptionsStyle: {
    marginTop: 40,
    marginVertical: 10,
    zIndex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  titleContainer: {
    padding: 16,
    paddingTop: 30,
    paddingBottom: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  roomCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 5,
    marginHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#e0e0e0', // You can remove this if you're setting the background color dynamically
    marginRight: 12,
  },
  roomDetails: {
    flex: 1,
    justifyContent: 'center', // Center content vertically
  },
  roomName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  roomUnits: {
    fontSize: 16,
    color: '#666',
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
    zIndex: 1,
  },
  menuOptionText: {
    fontSize: 16,
    padding: 10,
  },
});

export default RoomwisePrediction;