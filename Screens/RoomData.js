import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const { width } = Dimensions.get('window');

const RoomData = ({ navigation }) => {
  const [rooms, setRooms] = useState([{ name: '', appliances: [{ name: '', usage: '' }] }]);
  const [activeRoomIndex, setActiveRoomIndex] = useState(null);

  const addRoom = () => {
    setRooms([...rooms, { name: '', appliances: [{ name: '', usage: '' }] }]);
  };

  const addAppliance = (roomIndex) => {
    const newRooms = [...rooms];
    newRooms[roomIndex].appliances.push({ name: '', usage: '' });
    setRooms(newRooms);
  };

  const toggleAccordion = (index) => {
    setActiveRoomIndex(activeRoomIndex === index ? null : index);
  };

  const renderAppliance = (appliance, roomIndex, applianceIndex) => {
    return (
      <View key={`appliance-${applianceIndex}`} style={styles.applianceItem}>
        <Picker
          selectedValue={appliance.name}
          style={styles.pickerStyle}
          onValueChange={(itemValue) =>
            setApplianceName(roomIndex, applianceIndex, itemValue)
          }>
          {/* Dummy Picker Items, replace with your actual appliances */}
          <Picker.Item label="Choose Your Appliance" value="" />
          <Picker.Item label="Air Conditioner" value="air_conditioner" />
          <Picker.Item label="Heater" value="heater" />
          <Picker.Item label="Washing Machine" value="washing_machine" />
        </Picker>
        <TextInput
          style={styles.usageInput}
          onChangeText={(text) => setApplianceUsage(roomIndex, applianceIndex, text)}
          value={appliance.usage}
          placeholder="Select Hrs"
          keyboardType="numeric"
        />
      </View>
    );
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

  const renderRooms = () => {
    return rooms.map((room, index) => (
      <View key={`room-${index}`} style={styles.roomWrapper}>
        {/* Room Accordion */}
        <TouchableOpacity style={styles.roomContainer} onPress={() => toggleAccordion(index)}>
          <View style={styles.iconPlaceholder} />
          <TextInput
            style={styles.roomInput}
            onChangeText={(text) => setRoomName(index, text)}
            value={room.name}
            placeholder="Enter Room Name"
          />
          <TouchableOpacity onPress={() => toggleAccordion(index)}>
            <Text style={styles.dropdownArrow}>{activeRoomIndex === index ? '▲' : '▼'}</Text>
          </TouchableOpacity>
        </TouchableOpacity>

        {/* Appliance Options - Hidden initially */}
        {activeRoomIndex === index && (
          <View style={styles.applianceContainer}>
            {room.appliances.map((appliance, applianceIndex) =>
              renderAppliance(appliance, index, applianceIndex)
            )}
            <TouchableOpacity
              style={styles.addApplianceButton}
              onPress={() => addAppliance(index)}>
              <Text style={styles.addApplianceText}>+ Add An Appliance</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    ));
  };

  const setRoomName = (index, name) => {
    const newRooms = [...rooms];
    newRooms[index].name = name;
    setRooms(newRooms);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.header}>Bill-E</Text>
      <Text style={styles.setupTitle}>Setup</Text>

      {renderRooms()}

      {/* Add Room Option */}
      <TouchableOpacity
        style={[styles.addRoomContainer]}
        onPress={addRoom}>
        <View style={[styles.iconPlaceholder, styles.addIconPlaceholder]} />
        <Text style={styles.addRoomText}>Add Room</Text>
      </TouchableOpacity>

      {/* Submit Button */}
      <TouchableOpacity
        style={styles.submitButton}
        onPress={() => navigation.navigate('DataComplete')}>
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentContainer: {
    paddingBottom: 50,
    alignItems: 'center',
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#000',
    marginVertical: 20,
  },
  setupTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#000',
    alignSelf: 'flex-start',
    marginLeft: 20,
    marginBottom: 10,
  },
  roomWrapper: {
    width: '90%',
    marginBottom: 10,
  },
  roomContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginBottom: 10,
  },
  iconPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#7B61FF',
    marginRight: 15,
  },
  roomInput: {
    fontSize: 18,
    fontWeight: '500',
    color: '#000',
    flex: 1,
  },
  dropdownArrow: {
    fontSize: 18,
    color: '#000',
    marginRight: 10,
  },
  applianceContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    padding: 15,
  },
  applianceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  pickerStyle: {
    flex: 1,
    marginRight: 10,
  },
  usageInput: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    padding: 8,
    width: 100,
    marginRight: 10,
  },
  addApplianceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  addApplianceText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#7B61FF',
    marginLeft: 5,
  },
  addRoomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(123, 97, 255, 0.1)',
    borderRadius: 12,
    padding: 15,
    width: '90%',
    marginTop: 10,
  },
  addIconPlaceholder: {
    backgroundColor: 'transparent',
  },
  addRoomText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'rgba(123, 97, 255, 1)',
    marginLeft: 15,
  },
  submitButton: {
    backgroundColor: '#535CE8',
    borderRadius: 26,
    paddingVertical: 18,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  submitText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default RoomData;
