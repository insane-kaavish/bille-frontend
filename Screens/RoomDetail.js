import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ModalDropdown from 'react-native-modal-dropdown';

// Sample API data
const apiData = [
  {
    id: 1,
    tag: "LR",
    alias: "Living Room",
    appliances: [
      {
        id: 5,
        category: "Television",
        subcategories: ["LED", "LCD", "Plasma"],
        Daily_usage: 1
      },
      {
        id: 2,
        category: "Microwave Oven",
        subcategories: ["Solo", "Grill", "Convection"],
        Daily_usage: 8
      }
    ],
    units: 9
  }
  // Add more rooms as needed
];

const applianceOptions = [
  "TV", "Refrigerator", "Deep Freezer", "Air Conditioner", "Washing Machine", "Microwave",
  "Electric Oven", "Electric Kettle", "Electric Iron", "Electric Heater", "Electric Fan",
  "Gaming Consoles", "Desktop Computer", "Electric Geyser",
];

const RoomDetail = ({ route, navigation }) => {
  const { roomId } = route.params;
  const [roomData, setRoomData] = useState(null);
  const [appliances, setAppliances] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const room = apiData.find(room => room.id === roomId);
      if (room) {
        setRoomData(room);
        const updatedAppliances = room.appliances.map(appliance => ({
          ...appliance,
          usage: `${appliance.Daily_usage}`
        }));
        setAppliances(updatedAppliances);
      }
    };
  
    fetchData();
  }, [roomId]);
  

  const addAppliance = () => {
    setAppliances([...appliances, { name: '', usage: '' }]);
  };

  const removeAppliance = (index) => {
    const updatedAppliances = appliances.filter((_, i) => i !== index);
    setAppliances(updatedAppliances);
  };

  const saveData = () => {
    console.log('Data saved successfully:', appliances);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.roomInfo}>
          <Text>Room ID: {roomId}</Text>
          <Text>Room Alias: {roomData ? roomData.alias : ''}</Text>
          {appliances.map((appliance, index) => (
            <View key={index} style={styles.applianceRow}>
              <ModalDropdown
  options={applianceOptions}
  defaultValue={appliance.category || "Select Appliance"}
  style={styles.pickerStyle}
  textStyle={{ color: 'black' }}
  dropdownStyle={styles.dropdownStyle}
  onSelect={(selectedIndex, value) => setAppliances(prevState => {
    const updatedAppliances = [...prevState];
    updatedAppliances[index].category = value;
    return updatedAppliances;
  })}
/>

              <TextInput
                style={styles.usageInput}
                onChangeText={text => setAppliances(prevState => {
                  const updatedAppliances = [...prevState];
                  updatedAppliances[index].usage = text;
                  return updatedAppliances;
                })}
                value={appliance.usage}
                placeholder="Enter Usage"
              />
              <TouchableOpacity onPress={() => removeAppliance(index)}>
                <Ionicons name="close-circle" size={24} color="red" />
              </TouchableOpacity>
            </View>
          ))}
          <TouchableOpacity style={styles.addButton} onPress={addAppliance}>
            <Text style={styles.addButtonText}>Add Appliance</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.saveButton} onPress={saveData}>
        <Ionicons name="save-outline" size={24} color="#535CE8" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  roomInfo: {
    marginTop: 20,
  },
  applianceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  pickerStyle: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginRight: 10,
  },
  usageInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: '#535CE8',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  dropdownStyle: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  saveButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1,
  },
});

export default RoomDetail;
