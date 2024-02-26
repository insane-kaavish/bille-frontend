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
import Svg, { Circle } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import {
  MenuProvider,
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

const RoomwisePrediction = () => {
  const navigation = useNavigation();

  const rooms = [
    { name: 'Ali’s Bedroom', units: 56, color: '#517fa4' },
    { name: 'Kitchen', units: 34, color: '#f44336' },
    { name: 'Bashir Living Room', units: 15, color: '#ffeb3b' },
  ];

  // Calculate total units for all rooms
  const totalAllUnits = rooms.reduce((total, room) => total + room.units, 0);

  // Calculate total units for displayed rooms
  const displayedRooms = rooms.slice(0, 2); // Assuming only first two rooms are displayed
  const totalDisplayedUnits = displayedRooms.reduce((total, room) => total + room.units, 0);

  // Total units text
  const totalUnitsText = `${totalAllUnits} units`;

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
          {/* <Text style={styles.title}>Highest Usage Rooms</Text> */}
          <View style={styles.progressContainer}>
            <Svg width="200" height="250">
              {rooms.map((room, index) => (
                <React.Fragment key={index}>
                  {/* Outer circle */}
                  <Circle
                    cx="100"
                    cy="135"
                    r={(90 - index * 15).toString()}
                    fill="none"
                    stroke={room.color}
                    strokeWidth="10"
                  />
                  <Circle
                    cx="100"
                    cy="135"
                    r={(90 - index * 15).toString()}
                    fill="none"
                    stroke="#ddd"
                    strokeWidth="10"
                    strokeOpacity="0.95"
                    strokeDasharray={`${(1 - room.units / totalAllUnits) * (2 * Math.PI * (90 - index * 15))} ${(2 * Math.PI * (90 - index * 15))}`}
                    strokeDashoffset={`${(room.units / totalAllUnits) * (2 * Math.PI * (90 - index * 15))}`}
                  />
                </React.Fragment>
              ))}
              <View style={[styles.middletext]}>
                <Text x="100" y="135">
                  {totalUnitsText}
                </Text>
              </View>
            </Svg>
          </View>
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
  headerText: {
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
    position: 'relative',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  middletext: {
      color: '#000',
      top:'740%',
      left:'35%'
  }
});

export default RoomwisePrediction;