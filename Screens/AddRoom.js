import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ModalDropdown from 'react-native-modal-dropdown';
import Navbar from './Components/Navbar';
import Header from './Components/Header';

import { useRoom } from './Components/RoomProvider';

const AddRoomScreen = ({ navigation }) => {
  //const { addRoom, categories } = useRoom();  // Ensuring addRoom and categories are provided from RoomProvider
  const { room, categories, selectedRoom, fetchRoom, deleteAppliance, updateRoom, addRoom, fetchRooms } = useRoom();

  const [roomName, setRoomName] = useState('');
  const [appliances, setAppliances] = useState([
    { alias: '', category: 'Appliance', sub_category: 'Type', daily_usage: '0' },
  ]);

  const addAppliance = () => {
    setAppliances([
      ...appliances,
      { alias: "", category: "Appliance", sub_category: "Type", daily_usage: "0" },
    ]);
  };

  const removeAppliance = (index) => {
    setAppliances(appliances.filter((_, i) => i !== index));
  };

  
  const saveData = () => {
    // Construct the room data object according to your API's expected format
    const roomData = {
      alias: roomName,  // 'roomName' will be used as the 'alias' of the room
      //tag: roomName.slice(0, 2).toUpperCase(),  // Create a 'tag' from the first two letters of the room name
      appliances: appliances,
    };
  
    try {
      addRoom(roomData);  // Assuming 'addRoom' sends the room data to your API
      console.log('New room data:', roomData);
      navigation.goBack();
      fetchRooms();
    } catch (error) {
      console.error("Failed to add room", error);
      // Optionally handle error, e.g., show an alert to the user
    }
  };
  

  const getSubcategoryOptions = (category) => {
    const selectedCategory = categories.find(cat => cat.name === category);
    return selectedCategory ? selectedCategory.sub_categories : [];
  };

  return (
    <>
      <Header screenName={'Add New Room'} navigation={navigation} />
      <View style={styles.container}>
        <ScrollView style={styles.scrollContainer}>
          <TextInput
            style={styles.roomNameInput}
            onChangeText={setRoomName}
            value={roomName}
            placeholder="Enter Room Name"
          />
          {appliances.map((appliance, index) => (
            <View key={index} style={styles.applianceRow}>
              <ModalDropdown
                defaultIndex={0}
                options={categories.map(category => category.name)}
                defaultValue={appliance.category}
                onSelect={(selectedIndex, value) => {
                  const newAppliances = [...appliances];
                  newAppliances[index].category = value;
                  newAppliances[index].sub_category = getSubcategoryOptions(value)[0] || 'Select Subcategory';
                  setAppliances(newAppliances);
                }}
                style={styles.dropdownStyle}
                textStyle={styles.dropdownTextStyle}
                dropdownStyle={styles.dropdownMenuStyle}
              />
              <ModalDropdown
                options={getSubcategoryOptions(appliance.category)}
                defaultIndex={0}
                defaultValue={appliance.sub_category}
                onSelect={(selectedIndex, value) => {
                  const newAppliances = [...appliances];
                  newAppliances[index].sub_category = value;
                  setAppliances(newAppliances);
                }}
                style={styles.dropdownStyle}
                textStyle={styles.dropdownTextStyle}
                dropdownStyle={styles.dropdownMenuStyle}
              />
              <TextInput
                style={styles.usageInput}
                onChangeText={(text) => {
                  const newAppliances = [...appliances];
                  newAppliances[index].daily_usage = text;
                  setAppliances(newAppliances);
                }}
                value={appliance.daily_usage}
                placeholder="Usage"
                keyboardType="numeric"
              />
              <TouchableOpacity onPress={() => removeAppliance(index)}>
                <Ionicons name="close-circle" size={24} color="red" />
              </TouchableOpacity>
            </View>
          ))}
          <TouchableOpacity style={styles.addButton} onPress={addAppliance}>
            <Text style={styles.addButtonText}>Add Appliance</Text>
          </TouchableOpacity>
        </ScrollView>
        <TouchableOpacity style={styles.saveButton} onPress={saveData}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
        <Navbar />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContainer: {
    flex: 1,
    padding: 10,
  },
  roomNameInput: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  applianceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    padding: 10,
  },
  dropdownStyle: {
    width: 120, // Match width from RoomDetailScreen
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 10,
    marginRight: 8,
    padding: 12,
    backgroundColor: 'white',
  },
  dropdownTextStyle: {
    fontSize: 14,
    textAlign: 'center',
    color: 'black', // Ensure text color is consistent
  },
  dropdownMenuStyle: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 10,
  },
  usageInput: {
    width: 100, // Consistent width as in RoomDetailScreen
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 10,
    fontSize: 14,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: '#535CE8',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    width: '50%',
    alignSelf: 'center',
    marginTop: 10,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: '#535CE8',
    borderRadius: 20,
    padding: 12,
    alignItems: 'center',
    width: '45%',
    alignSelf: 'center',
    marginBottom: 20,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});


export default AddRoomScreen;
