import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ModalDropdown from 'react-native-modal-dropdown';
import NavBar from './Components/NavBar';

const applianceOptions = [
  {
      "name": "Refrigerator",
      "sub_categories": [
          "Single Door",
          "Double Door"
      ]
  },
  {
      "name": "Iron",
      "sub_categories": [
          "Dry Iron",
          "Steam Iron"
      ]
  },
  {
      "name": "Air Conditioner",
      "sub_categories": [
          "Window AC",
          "Split AC 1 Ton",
          "Split AC 1.5 Ton",
          "Split AC 2 Ton",
          "Split Inverter AC 1 Ton",
          "Split Inverter AC 1.5 Ton",
          "Split Inverter AC 2 Ton"
      ]
  },
  {
      "name": "Deep Freezer",
      "sub_categories": [
          "Small",
          "Medium",
          "Large"
      ]
  },
  {
      "name": "Washing Machine",
      "sub_categories": [
          "Semi-Automatic",
          "Automatic"
      ]
  },
  {
      "name": "Television",
      "sub_categories": [
          "CRT",
          "LCD",
          "LED",
          "Plasma"
      ]
  },
  {
      "name": "Microwave Oven",
      "sub_categories": [
          "Solo",
          "Grill",
          "Convection"
      ]
  },
  {
      "name": "Water Dispenser",
      "sub_categories": [
          "Hot & Cold",
          "Normal"
      ]
  },
  {
      "name": "Water Heater",
      "sub_categories": [
          "Instant",
          "Storage"
      ]
  }
]



// Sample API data
const apiData = [
  {
    "id": 5,
    "tag": "LR",
    "alias": "Living Room",
    "appliances": [
        {
            "id": 9,
            "alias": "Clothes Iron",
            "category": "Iron",
            "sub_category": "Steam Iron",
            "daily_usage": 3.0,
            "units": 5
        },
        {
            "id": 10,
            "alias": "Fridge",
            "category": "Refrigerator",
            "sub_category": "Double Door",
            "daily_usage": 24.0,
            "units": 360
        }
    ],
    "units": 365
}
  // Add more rooms as needed
];

// const applianceOptions = [
//   "TV", "Refrigerator", "Deep Freezer", "Air Conditioner", "Washing Machine", "Microwave",
//   "Electric Oven", "Electric Kettle", "Electric Iron", "Electric Heater", "Electric Fan",
//   "Gaming Consoles", "Desktop Computer", "Electric Geyser",
// ];

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
          <View style={styles.roominfocard}>
            <Text style={styles.roomInfoText}>{roomData ? roomData.alias : ''}</Text>
            <Text style={styles.roomAlias}>Room ID: {roomId}</Text>
          </View>
          {appliances.map((appliance, index) => (
            <View key={index} style={styles.applianceRow}>
            <View style={styles.dropdownContainer}>
              <ModalDropdown
                options={applianceOptions.map(appliance => appliance.name)}
                defaultValue={appliance.category || "Select Appliance"}
                style={styles.pickerStyle}
                textStyle={{ color: 'black' }}
                dropdownStyle={styles.dropdownStyle}
                onSelect={(selectedIndex, value) => {
                  const selectedAppliance = applianceOptions.find(appliance => appliance.name === value);
                  if (selectedAppliance) {
                    setAppliances(prevState => {
                      const updatedAppliances = [...prevState];
                      updatedAppliances[index].category = selectedAppliance.name;
                      updatedAppliances[index].subCategory = selectedAppliance.sub_categories[0]; // Default to the first subcategory
                      return updatedAppliances;
                    });
                  }
                }}
              />
            </View>
            {appliances[index].category && (
              <View style={styles.subCategoryContainer}>
                <ModalDropdown
                  options={applianceOptions.find(appliance => appliance.name === appliances[index].category).sub_categories}
                  defaultValue={appliances[index].subCategory || "Select Subcategory"}
                  style={styles.subCategoryPickerStyle}
                  textStyle={{ color: 'black' }}
                  dropdownStyle={styles.dropdownStyle}
                  onSelect={(selectedIndex, value) => {
                    setAppliances(prevState => {
                      const updatedAppliances = [...prevState];
                      updatedAppliances[index].subCategory = value;
                      return updatedAppliances;
                    });
                  }}
                />
              </View>
            )}
            <View style={styles.usageContainer}>
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
          </View>
          
          
          
          ))}
          <TouchableOpacity style={styles.addButton} onPress={addAppliance}>
            <Text style={styles.addButtonText}>Add Appliance</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.saveButton} onPress={saveData}>
          <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
      <NavBar />
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
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  applianceRow: {
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // alignItems: 'center',
    marginBottom: 10,
  },
  dropdownContainer: {
    width: '45%', // Adjust width as needed
  },
  subCategoryContainer: {
    width: '45%', // Adjust width as needed
  },
  usageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pickerStyle: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    width: '100%',
  },
  subCategoryPickerStyle: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    width: '100%',
  },
  usageInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    width: '45%', // Adjust width as needed
    marginLeft: 10, // Add left margin for spacing
  },
  removeButton: {
    padding: 10,
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
    bottom: '7%',
    zIndex: 1,
    paddingHorizontal: 100,
    paddingVertical: 12,
    backgroundColor: '#535CE8',
    borderRadius: 20,
    alignSelf: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  roominfocard: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  roomInfoText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  roomAlias: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default RoomDetail;
