import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ModalDropdown from 'react-native-modal-dropdown';

const applianceOptions = [
  "TV",
  "Refrigerator",
  "Deep Freezer",
  "Air Conditioner",
  "Washing Machine",
  "Microwave",
  "Electric Oven",
  "Electric Kettle",
  "Electric Iron",
  "Electric Heater",
  "Electric Fan",
  "Gaming Consoles",
  "Desktop Computer",
  "Electric Geyser",
];

const subCategories = {
  "Refrigerator": ["Single Door", "Double Door"],
  "Iron": ["Dry Iron", "Steam Iron"],
  "Air Conditioner": ["Window AC", "Split AC 1 Ton", "Split AC 1.5 Ton", "Split AC 2 Ton", "Split Inverter AC 1 Ton", "Split Inverter AC 1.5 Ton", "Split Inverter AC 2 Ton"],
  "Deep Freezer": ["Small", "Medium", "Large"],
  "Washing Machine": ["Semi-Automatic", "Automatic"],
  "Television": ["CRT", "LCD", "LED", "Plasma"],
  "Microwave": ["Solo", "Grill", "Convection"],
  "Water Dispenser": ["Hot & Cold", "Normal"],
  "Water Heater": ["Instant", "Storage"],
};

const RoomData = () => {
  const [rooms, setRooms] = useState([{ name: '', appliances: [{ name: '', usage: '' }] }]);
  const [openRoomIndices, setOpenRoomIndices] = useState([0]);
  const navigation = useNavigation();

  const addRoom = () => {
    const newRoom = { name: '', appliances: [{ name: '', usage: '' }] };
    setRooms([...rooms, newRoom]);
    setOpenRoomIndices([...openRoomIndices, rooms.length]);
  };

  const removeRoom = (roomIndex) => {
    const newRooms = rooms.filter((_, index) => index !== roomIndex);
    setRooms(newRooms);
  };

  const addAppliance = (roomIndex) => {
    const newRooms = [...rooms];
    newRooms[roomIndex].appliances.push({ name: '', usage: '' });
    setRooms(newRooms);
  };

  const removeAppliance = (roomIndex, applianceIndex) => {
    const newRooms = [...rooms];
    newRooms[roomIndex].appliances.splice(applianceIndex, 1);
    setRooms(newRooms);
  };

  const handleSubmit = () => {
    const roomsJson = JSON.stringify(rooms);
    console.log(roomsJson);
    navigation.navigate('Home', { roomsData: rooms });
  };

  const handleSkip = () => {
    navigation.navigate('Home');
  };

  const toggleAccordion = (index) => {
    setOpenRoomIndices((currentIndices) => {
      if (currentIndices.includes(index)) {
        return currentIndices.filter(i => i !== index);
      } else {
        return [...currentIndices, index];
      }
    });
  };

  const setApplianceName = (roomIndex, applianceIndex, name) => {
    const newRooms = [...rooms];
    newRooms[roomIndex].appliances[applianceIndex].name = name;
    setRooms(newRooms);
  };

  const setApplianceUsage = (roomIndex, applianceIndex, usage) => {
    const newRooms = [...rooms];
    newRooms[roomIndex].appliances[applianceIndex].usage = usage;
    setRooms(newRooms);
  };

  const setRoomName = (index, name) => {
    const newRooms = [...rooms];
    newRooms[index].name = name;
    setRooms(newRooms);
  };

  const renderAppliance = (appliance, roomIndex, applianceIndex) => {
    return (
      <View key={`appliance-${applianceIndex}`} style={styles.applianceItem}>
        <ModalDropdown
          options={applianceOptions}
          defaultValue="Appliance"
          style={styles.pickerStyle}
          textStyle={styles.dropdownTextStyle}
          dropdownStyle={styles.dropdownStyle}
          onSelect={(index, value) => setApplianceName(roomIndex, applianceIndex, value)}
          defaultIndex={0}
        />
        <ModalDropdown
          options={appliance.name && subCategories[appliance.name] ? subCategories[appliance.name] : ["Type"]}
          defaultValue={appliance.name ? "Type" : "Select Type"}
          style={styles.pickerStyle}
          textStyle={styles.dropdownTextStyle}
          dropdownStyle={styles.dropdownStyle}
          onSelect={(index, value) => console.log(value)}
          defaultIndex={0}
        />
        <TextInput
          style={styles.usageInput}
          onChangeText={(text) => setApplianceUsage(roomIndex, applianceIndex, text)}
          value={appliance.usage}
          placeholder="Hours"
          keyboardType="numeric"
        />
        <TouchableOpacity onPress={() => removeAppliance(roomIndex, applianceIndex)}>
          <Ionicons name="close-circle" size={24} color="red" />
        </TouchableOpacity>
      </View>
    );
  };  

  const renderRooms = () => {
    return rooms.map((room, index) => (
      <View key={`room-${index}`} style={styles.roomWrapper}>
        <TouchableOpacity style={styles.roomContainer} onPress={() => toggleAccordion(index)}>
          <TextInput
            style={styles.roomInput}
            onChangeText={(text) => setRoomName(index, text)}
            value={room.name}
            placeholder="Enter Room Name: example 'bedroom'"
          />
          <TouchableOpacity onPress={() => removeRoom(index)}>
            <Ionicons name="close-circle" size={24} color="red" />
          </TouchableOpacity>
        </TouchableOpacity>
        {openRoomIndices.includes(index) && (
          <View>
            {room.appliances.map((appliance, applianceIndex) =>
              renderAppliance(appliance, index, applianceIndex)
            )}
            <TouchableOpacity style={styles.addApplianceButton} onPress={() => addAppliance(index)}>
              <Text style={styles.addApplianceText}>Add Appliances</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    ));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerBar}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.header}>Bill-E Setup</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.reset({ index: 0, routes: [{ name: 'SignIn' }] })}>
          <Ionicons name="log-out" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        {renderRooms()}
        <TouchableOpacity style={styles.addRoomButton} onPress={addRoom}>
          <Text style={styles.addRoomButtonText}>Add More Rooms</Text>
        </TouchableOpacity>
      </ScrollView>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={styles.skipButtonText}>Skip</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    padding: 10,
  },
  contentContainer: {
    padding: 16,
    justifyContent: 'space-between',
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Adjust to distribute space between the items
    paddingHorizontal: 10,
    paddingTop: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'black',
    fontFamily: 'Lato-Bold',
  },
  roomWrapper: {
    backgroundColor: '#f7f7f7',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
  },
  roomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  roomInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 10,
    padding: 14,
    marginRight: 8,
    marginBottom: 10,
  },
  applianceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    // justifyContent: 'space-between', // This will distribute space evenly between the items
  },
  pickerStyle: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 10,
    marginRight: 8,
    padding: 12,
    marginLeft: 0.5, // Add this if you want space on the left as well
  },
  usageInput: {
    flex: 0.35,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 10,
    paddingVertical: 8, // Reduce vertical padding to make the text box smaller
    paddingHorizontal: 10, // Reduce horizontal padding to make the text box smaller
    marginRight: 8,
    // marginLeft: 0.1,
    width: '30%', // Adjust the width as needed
    fontSize: 11,
  },
  addApplianceButton: {
    backgroundColor: '#535CE8',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    width: '50%',
    alignSelf: 'center', // Add this to center the button within its parent
    marginTop: 10, // Add some margin at the top if needed
  },
  addApplianceText: {
    color: 'white',
    fontWeight: 'bold',
  },
  addRoomButton: {
    backgroundColor: '#535CE8',
    borderRadius: 20,
    padding: 12,
    alignItems: 'center',
    width: '70%',
    alignSelf: 'center',
  },
  addRoomButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  dropdownStyle: {
    width: '50%',
    maxHeight: 100,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginTop: 10,
  },
  dropdownTextStyle: {
    fontSize: 13.5,
    color: 'black',
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 35,
    marginBottom: 30,
  },
  skipButton: {
    backgroundColor: 'red',
    borderRadius: 20,
    padding: 12,
    alignItems: 'center',
    width: '45%',
  },
  skipButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  submitButton: {
    backgroundColor: '#535CE8',
    borderRadius: 20,
    padding: 12,
    alignItems: 'center',
    width: '45%',
  },
});

export default RoomData;
