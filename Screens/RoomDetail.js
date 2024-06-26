import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons'; // Ensure you have the latest version
import ModalDropdown from "react-native-modal-dropdown";
import Navbar from "./Components/Navbar";
import Header from "./Components/Header";

import { useRoom } from "./Components/RoomProvider";

const RoomDetailScreen = ({ navigation }) => {
  const { room, categories, selectedRoom, fetchRoom, deleteAppliance, updateRoom, appliances, setAppliances, fetchRooms, deleteRoom } = useRoom();
  const [deletedAppliances, setDeletedAppliances] = useState([]);
  const [editMode, setEditMode] = useState(false); // Track edit mode state

  useEffect(() => {
    fetchRoom(selectedRoom.id);
  }, [selectedRoom.id]);

  const getSubcategoryOptions = (category) => categories.find(cat => cat.name === category)?.sub_categories || [];

  const addAppliance = () => {
    // Check if the last appliance is fully set before adding a new one
    if (appliances.length === 0) {
      setAppliances([{ alias: '', category: '', sub_category: '', daily_usage: '0' }]);
      return;
    }
    const lastAppliance = appliances[appliances.length - 1];
    if (lastAppliance.category && lastAppliance.sub_category && lastAppliance.daily_usage) {
      setAppliances([...appliances, { alias: '', category: '', sub_category: '', daily_usage: '0' }]);
    } else {
      Alert.alert("Error", "Please complete filling out the previous appliance's details.");
    }
  };

  const removeAppliance = (index) => {
    const updatedAppliances = appliances.filter((_, i) => i !== index);
    setAppliances(updatedAppliances);
    setDeletedAppliances([...deletedAppliances, appliances[index]]);
  };

  const handleUsageChange = (text, index) => {
    let usage = parseFloat(text);
    if (usage < 0 || usage > 24 || isNaN(usage)) {
      Alert.alert("Invalid Input", "Usage must be a number between 0 and 24.");
      return;
    }
    const newAppliances = [...appliances];
    newAppliances[index].daily_usage = text;
    setAppliances(newAppliances);
  };

  const saveData = () => {
    // Ensure all fields are filled
    if (appliances.some(appliance => !appliance.category || !appliance.sub_category || appliance.daily_usage === '')) {
      Alert.alert("Error", "Please fill all fields before saving.");
      return;
    }

    const data = {
      ...room,
      appliances: appliances,
    };
    updateRoom(data);
    deletedAppliances.forEach(appliance => deleteAppliance(appliance.id));
    navigation.goBack();
    fetchRooms();
  };

  const deleteRoomAndAppliances = () => {
    // Delete room and its appliances
    deleteRoom(selectedRoom.id);
    deletedAppliances.forEach(appliance => deleteAppliance(appliance.id));
    navigation.goBack();
    fetchRooms();
  };

  return (
    <>
      <Header screenName={room ? room.alias : "Room Details"} navigation={navigation} />
      <ScrollView style={styles.container}>
        <View style={styles.card}>
          {appliances.map((appliance, index) => (
            <View key={index} style={styles.applianceDetailContainer}>
              <View style={styles.inputGroup}>
                <MaterialCommunityIcons name="lightbulb-outline" size={24} color="#007AFF" style={styles.iconStyle} />
                <Text style={styles.label}>Appliance:</Text>
                <ModalDropdown
                  options={categories.map(category => category.name)}
                  defaultValue={appliance.category ? appliance.category : 'Select'}
                  onSelect={(selectedIndex, value) => {
                    const newAppliances = [...appliances];
                    newAppliances[index].category = value;
                    newAppliances[index].sub_category = getSubcategoryOptions(value)[0] || 'Select Subcategory';
                    setAppliances(newAppliances);
                  }}
                  style={styles.dropdownStyle}
                  textStyle={styles.dropdownTextStyle}
                  dropdownStyle={styles.dropdownMenuStyle}
                  defaultIndex={appliance.category ? categories.findIndex(cat => cat.name === appliance.category) : 0}
                  disabled={!editMode} // Disable dropdown when edit mode is false
                />
              </View>
              <View style={styles.typeUsageContainer}>
                <View style={styles.inputGroup}>
                  <MaterialCommunityIcons name="format-align-justify" size={22} color="#007AFF" style={styles.iconStyle} />
                  <Text style={styles.label}>Type:</Text>
                  <ModalDropdown
                    options={getSubcategoryOptions(appliance.category)}
                    defaultValue={appliance.sub_category ? appliance.sub_category : 'Select'}
                    onSelect={(selectedIndex, value) => {
                      const newAppliances = [...appliances];
                      newAppliances[index].sub_category = value;
                      setAppliances(newAppliances);
                    }}
                    style={styles.dropdownStyle}
                    textStyle={styles.dropdownTextStyle}
                    dropdownStyle={styles.dropdownMenuStyle}
                    defaultIndex={appliance.sub_category ? getSubcategoryOptions(appliance.category).findIndex(subcat => subcat === appliance.sub_category) : 0}
                    disabled={!editMode} // Disable dropdown when edit mode is false
                  />
                </View>
                <View style={styles.inputGroup}>
                  <MaterialCommunityIcons name="clock-time-four-outline" size={22} color="#007AFF" style={styles.iconStyle} />
                  <Text style={styles.label}>Usage:</Text>
                  <TextInput
                  style={styles.usageInput}
                  onChangeText={(text) => handleUsageChange(text, index)}
                  value={appliance.daily_usage.toString()}
                  placeholder="0"
                  keyboardType="numeric"
                  // Disable input when edit mode is false
                  editable={editMode}
                />
                <Text style={styles.subDescription}>hours per day</Text>

                </View>
              </View>
              {editMode && (
                <TouchableOpacity onPress={() => removeAppliance(index)} style={styles.iconButton}>
                  <MaterialCommunityIcons name="trash-can-outline" size={24} color="#FF6347" />
                </TouchableOpacity>
              )}
            </View>
          ))}
          {editMode && (
            <TouchableOpacity style={styles.addButton} onPress={addAppliance}>
              <MaterialCommunityIcons name="plus-circle-outline" size={24} color="white" style={styles.addIcon} />
              <Text style={styles.addButtonText}>Add Appliance</Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.buttonscard}>
          {!editMode && (
            <TouchableOpacity style={styles.addButton} onPress={() => setEditMode(true)}>
              <MaterialCommunityIcons name="pencil-outline" size={24} color="white" style={styles.saveIcon} />
              <Text style={styles.addButtonText}>Edit</Text>
            </TouchableOpacity>
          )}
          {editMode && (
            <View style={styles.buttonscard}>
              <TouchableOpacity style={styles.addButton} onPress={saveData}>
                <MaterialCommunityIcons name="content-save-cog-outline" size={24} color="white" style={styles.saveIcon} />
                <Text style={styles.addButtonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ ...styles.addButton, backgroundColor: 'red' }} onPress={deleteRoomAndAppliances}>
                <MaterialCommunityIcons name="trash-can-outline" size={24} color="white" style={styles.saveIcon} />
                <Text style={styles.addButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        <View style={{ height: 70 }} />
      </ScrollView>
      <Navbar navigation={navigation} />
    </>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    // marginBottom: 70,
  },
  card: {
    marginTop:5,
    backgroundColor: "#fff",
    borderRadius: 24,
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginVertical: 10,
    marginHorizontal: 5,
    shadowColor: "rgba(0,0,0,0.5)",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 5,
    shadowRadius: 20,
    elevation: 9,
  },
  
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    
  },
  label: {
    fontSize: 16,
    fontFamily: 'Lato-Bold',
    color: '#007AFF',
    marginLeft: -1,
  },
  
  roomNameInput: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#fff",
    marginLeft: 10,
    
  },

  applianceDetailContainer: {
    marginTop: 20,
    marginBottom: 20,
    marginRight : 5,
    marginLeft : 5,
    backgroundColor: '#F7F7F7',
    borderRadius: 8,
    padding: 10,
    // shadowColor: '#000',
    shadowColor: "#rgba(0,0,0,0.5)",
    shadowOffset: { width: 0, height: 6 },  // Reduced height for a closer shadow
    shadowOpacity: 0.5,  // Lower opacity for a softer appearance
    shadowRadius: 8,  // Increased radius to blur edges more
    elevation: 6,  // Adjust elevation for Android to match visual consistency
  },
  
  typeUsageContainer: {
    backgroundColor: '#EFEFEF',
    borderRadius: 8,
    paddingLeft: 10,
    marginRight: 5,
    marginLeft: 5,
    paddingVertical: 10,
    shadowColor: "#rgba(0,0,0,0.5)",
    shadowOffset: { width: 0, height: 6 },  // Reduced height for a closer shadow
    shadowOpacity: 0.5,  // Lower opacity for a softer appearance
    shadowRadius: 8,  // Increased radius to blur edges more
    elevation: 6,  // Adjust elevation for Android to match visual consistency
  },
  dropdownStyle: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#D0D4D8',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#FFFFFF',
    marginLeft: 10,
  },
  dropdownTextStyle: {
    fontSize: 14,
    fontFamily: 'Lato-Regular',
    color: '#606770',
  },
  dropdownMenuStyle: {
    marginTop: -20,
    marginLeft: -5,
    width: '35%',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 7,
    backgroundColor: '#FFFFFF',
    fontFamily: 'Lato-Regular',
  },
  usageInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 14,
    backgroundColor: '#FFFFFF',
    flex: 1,
    marginLeft: 10,
    maxWidth: 50,
    // align the input text to the center of the field
    textAlign: 'center',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    borderRadius: 18,
    padding: 10,
    alignSelf: 'center',
    margin: 10,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Lato-Bold',
  },
  saveButton: {
    flexDirection: 'row',
    // alignItems: 'center',
    backgroundColor: '#007AFF',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    width: '35%',
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  editButton: {
    flexDirection: 'row',
    backgroundColor: '#007AFF',
    borderRadius: 16,
    padding: 16,
    // alignItems: 'center',
    justifyContent: 'center', // Center horizontally
    width: '35%',
    marginHorizontal: "33%",
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Lato-Bold',
    marginLeft: 8,
  },
  iconStyle: {
    marginRight: 8,
  },
  iconButton: {
    alignSelf: 'flex-end',
    marginTop: 5,
  },
  addIcon: {
    marginRight: 8,
  },
  saveIcon: {
    marginRight: 8,
  }, 
  buttonscard: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'transparent', // Transparent background
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingBottom: 20,
    zIndex: 1, // Ensure it appears above other components
  },
  subDescription: {
    fontSize: 12,
    fontFamily: 'Lato-Regular',
    color: '#333',
    marginLeft: 10,
  },
});


export default RoomDetailScreen;
