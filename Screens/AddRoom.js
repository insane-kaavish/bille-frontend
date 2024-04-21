import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import ModalDropdown from "react-native-modal-dropdown";
import Navbar from "./Components/Navbar";
import Header from "./Components/Header";

import { useRoom } from "./Components/RoomProvider";

const AddRoomScreen = ({ navigation }) => {
  const { addRoom } = useRoom();
  const [roomName, setRoomName] = useState("");
  const [appliances, setAppliances] = useState([
    { alias: "", category: "Appliance", sub_category: "Type", daily_usage: "0" },
  ]);

  const addAppliance = () => {
    setAppliances([
      ...appliances,
      { alias: "", category: "Appliance", sub_category: "Type", daily_usage: "0" },
    ]);
  };

  const removeAppliance = (index) => {
    const updatedAppliances = appliances.filter((_, i) => i !== index);
    setAppliances(updatedAppliances);
  };

  const saveData = () => {
    const data = {
      name: roomName,
      appliances: appliances,
    };
    addRoom(data);
    navigation.goBack();
  };

  return (
    <>
      <Header screenName={roomName} navigation={navigation} />
      <View style={styles.container}>
        <ScrollView style={styles.scrollContainer}>
          <TextInput
            style={styles.roomNameInput}
            onChangeText={setRoomName}
            value={roomName}
            placeholder="Enter Room Name"
          />
          <View style={styles.roomInfo}>
            {appliances.map((appliance, index) => (
              <View key={index} style={styles.applianceRow}>
                {/* Dropdowns for selecting category and subcategory */}
                {/* Usage Input */}
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
    backgroundColor: "white",
  },
  scrollContainer: {
    flex: 1,
    padding: 10,
  },
  roomNameInput: {
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
  },
  roomInfo: {
    backgroundColor: "#f7f7f7",
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
  },
  applianceRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: "#535CE8",
    borderRadius: 20,
    padding: 10,
    alignItems: "center",
    width: "50%",
    alignSelf: "center",
    marginTop: 10,
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  saveButton: {
    backgroundColor: "#535CE8",
    bottom: "5%",
    borderRadius: 20,
    padding: 12,
    alignItems: "center",
    width: "45%",
    alignSelf: "center",
    marginBottom: 20,
    borderRadius: 20,
  },
  saveButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default AddRoomScreen;
