import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ModalDropdown from 'react-native-modal-dropdown';
import Navbar from './Components/Navbar';
import Header from './Components/Header';

import { useRoom } from './Components/RoomProvider';

const AddRoomScreen = ({ navigation }) => {
  const { categories, addRoom, fetchRooms } = useRoom();
  const [roomName, setRoomName] = useState('');
  const [appliances, setAppliances] = useState([
    { alias: '', category: '', sub_category: '', daily_usage: '0' },
  ]);

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
    setAppliances(prev => prev.filter((_, i) => i !== index));
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
    if (!roomName.trim() || appliances.some(appliance => !appliance.category || !appliance.sub_category || appliance.daily_usage === '')) {
      Alert.alert("Error", "Please fill all fields before saving.");
      return;
    }

    const roomData = { alias: roomName, appliances: appliances };
    try {
      addRoom(roomData);
      fetchRooms();
      navigation.goBack();
    } catch (error) {
      console.error("Failed to add room", error);
    }
  };

  const getSubcategoryOptions = (category) => categories.find(cat => cat.name === category)?.sub_categories || [];

  return (
    <>
      <Header screenName={'Add New Room'} navigation={navigation} />
      <ScrollView style={styles.container}>
        <View style={styles.card}>
          <View style={styles.inputGroup}>
            <MaterialCommunityIcons name="home-outline" size={30} color="#007AFF" style={styles.iconStyle} />
            <Text style={styles.label}>Room Name:</Text>
            <TextInput
              style={styles.roomNameInput}
              onChangeText={setRoomName}
              value={roomName}
              placeholder="Enter Room Name"
            />
          </View>
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
                  defaultIndex={appliance.category ? categories.findIndex(cat => cat.name === appliance.category) : 0}
                  dropdownStyle={styles.dropdownMenuStyle}
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
                    defaultIndex={appliance.sub_category ? getSubcategoryOptions(appliance.category).findIndex(subcat => subcat === appliance.sub_category) : 0}
                    dropdownStyle={styles.dropdownMenuStyle}
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
                  />
                  <Text style={styles.subDescription}>hours per day</Text>
                </View>
              </View>
              <TouchableOpacity onPress={() => removeAppliance(index)} style={styles.iconButton}>
                <MaterialCommunityIcons name="trash-can-outline" size={24} color="#FF6347" />
              </TouchableOpacity>
            </View>
          ))}
          <TouchableOpacity style={styles.addButton} onPress={addAppliance}>
            <MaterialCommunityIcons name="plus-circle-outline" size={24} color="white" style={styles.addIcon} />
            <Text style={styles.addButtonText}>Add Appliance</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.saveButton} onPress={saveData}>
          <MaterialCommunityIcons name="content-save-cog-outline" size={24} color="white" style={styles.saveIcon} />
          <Text style={styles.saveButtonText}>Save Room</Text>
        </TouchableOpacity>
        <View style={{ height: 70 }} />
      </ScrollView>
      <Navbar />
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
    alignItems: 'center',
    width: '58%',
    alignSelf: 'center',
    marginTop: 10,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Lato-Bold',
    marginLeft: 3,
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
    width: '50%',
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
  subDescription: {
    fontSize: 12,
    color: '#666',
    fontFamily: 'Lato-Regular',
    marginLeft: 5,
  },
});

export default AddRoomScreen;
