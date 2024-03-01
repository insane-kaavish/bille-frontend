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
import { MenuProvider } from 'react-native-popup-menu';
import { ProgressChart } from 'react-native-chart-kit';

import MenuComponent from './Components/Menu';
import NavBar from './Components/NavBar';

const hexToRgb = (hex) => { // Convert hex color to RGB color
  const hexColor = hex.replace('#', '');
  const r = parseInt(hexColor.substring(0, 2), 16);
  const g = parseInt(hexColor.substring(2, 4), 16);
  const b = parseInt(hexColor.substring(4, 6), 16);
  return { r, g, b };}

const RoomwisePrediction = () => {
  const navigation = useNavigation();

  const rooms = [
    { name: 'Ali’s Bedroom', units: 15, color: '#517fa4' },
    { name: 'Kitchen', units: 34, color: '#f44336' },
    { name: 'Bashir Living Room', units: 56, color: '#ffeb3b' },
  ];

  // Calculate total units for all rooms
  const totalAllUnits = rooms.reduce((total, room) => total + room.units, 0);

  // Total units text
  const totalUnitsText = `${totalAllUnits} Units`;

  const navigateToRoomDetails = (roomName) => {
    console.log('Navigating to details of', roomName);
    // Implement your navigation logic
  };

  // Create an array of colors corresponding to each room
  const roomColors = rooms.map(room => room.color);

  const getChartColors = (rooms, roomColors) => {
    return rooms.map((room, index) => {
      const rgbColor = hexToRgb(roomColors[index]);
      return `rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, 1)`;
    });
  };
  
  // Inside the component:
  const chartColors = getChartColors(rooms, roomColors);

  return (
    <MenuProvider skipInstanceCheck={true} style={styles.container}>
      <View style={styles.header}>
        <View style={{ flex: 1 }}>
          <Text style={{ fontFamily: 'Lato-Bold', fontSize: 20, color: '#171A1F', textAlign: 'left' }}>
            <Text>Bill-E Roomwise Prediction</Text>
          </Text>
        </View>
        <MenuComponent navigation={navigation} />
      </View>

      <ScrollView style={styles.scrollContainer}>
        <View style={styles.card}>
          <View style={styles.progressContainer}>
          <ProgressChart
            data={rooms.map(room => room.units / totalAllUnits)}
            width={Dimensions.get('window').width - 40}
            height={220}
            chartConfig={{
              backgroundGradientFrom: '#ffffff',
              backgroundGradientTo: '#ffffff',
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              strokeWidth: 5,
            }}
            style={{ borderRadius: 16, padding: 10 }}
            hideLegend={true}
          />
          </View>
        </View>
        {rooms.map((room, index) => (
          <TouchableOpacity
            key={index}
            style={styles.roomCard}
            onPress={() => navigateToRoomDetails(room.name)}
            >
            <View style={[styles.iconContainer, { backgroundColor: room.color }]}>
              <Ionicons name="home" size={24} color="#fff" />
            </View>
            <View style={styles.roomDetails}>
              <Text style={styles.roomName}>{room.name}</Text>
              <Text style={styles.roomUnits}>{`${room.units} Units`}</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#C0C0C0" />
          </TouchableOpacity>
        ))}
      </ScrollView>
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
    paddingTop: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  scrollContainer: {
    flex: 1,
    
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  progressContainer: {
    alignItems: 'center',
    marginBottom: 10,
    elevation: 3, // for the main shadow
    shadowColor: '#000', // color of the shadow
    shadowOffset: { width: 0, height: 0 }, // same as the CSS code
    shadowOpacity: 0.3, // opacity of the shadow
    shadowRadius: 1, // blur radius of the shadow
  },
  totalUnitsContainer: {
    alignItems: 'center',
  },
  totalUnitsText: {
    fontSize: 16,
    color: '#666',
  },
  roomCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 5,
    marginHorizontal: 5,
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
    justifyContent: 'center',
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
});

export default RoomwisePrediction;
