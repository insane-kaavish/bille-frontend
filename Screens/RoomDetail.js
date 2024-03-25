import React, { useState, useEffect } from "react";
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

import { useRoom } from "./Components/RoomProvider";

// Sample API data
const apiData = [
  {
    id: 5,
    tag: "LR",
    alias: "Living Room",
    appliances: [
      {
        id: 9,
        alias: "Clothes Iron",
        category: "Iron",
        sub_category: "Steam Iron",
        daily_usage: 3.0,
        units: 5,
      },
      {
        id: 10,
        alias: "Fridge",
        category: "Refrigerator",
        sub_category: "Double Door",
        daily_usage: 24.0,
        units: 360,
      },
    ],
    units: 365,
  },
  // Add more rooms as needed
];

// const applianceOptions = [
//   "TV", "Refrigerator", "Deep Freezer", "Air Conditioner", "Washing Machine", "Microwave",
//   "Electric Oven", "Electric Kettle", "Electric Iron", "Electric Heater", "Electric Fan",
//   "Gaming Consoles", "Desktop Computer", "Electric Geyser",
// ];

const RoomDetailScreen = ({ navigation }) => {
  const { room, categories, selectedRoom, fetchRoom } = useRoom();
  // const [roomData, setRoomData] = useState(null);
  const [appliances, setAppliances] = useState([]);

  useEffect(() => {
    fetchRoom(selectedRoom.id);
    setAppliances(room?.appliances || []);
  }, [selectedRoom.id]);

  const getSubcategoryOptions = (category) => {
    const selectedAppliance = categories.find(
      (appliance) => appliance.name === category
    );
    return selectedAppliance ? selectedAppliance.sub_categories : [];
  };

  const addAppliance = () => {
    setAppliances([
      ...appliances,
      { name: "", category: "Appliance", subCategory: "Type", usage: "" },
    ]);
  };

  const removeAppliance = (index) => {
    const updatedAppliances = appliances.filter((_, i) => i !== index);
    setAppliances(updatedAppliances);
  };

  const saveData = () => {
    console.log("Data saved successfully:", appliances);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.roomInfo}>
          <View style={styles.roominfocard}>
            <Text style={styles.roomInfoText}>
              {room ? room.alias : ""}
            </Text>
            <Text style={styles.roomAlias}>Room ID: {selectedRoom.id}</Text>
          </View>
          {appliances.map((appliance, index) => (
            <View key={index} style={styles.applianceRow}>
              <View style={styles.dropdownContainer}>
                <ModalDropdown
                  defaultIndex={0}
                  options={categories.map((appliance) => appliance.name)}
                  defaultValue={appliance.category || "Appliance"}
                  defaultTextStyle={{ color: "pink", opacity: 0.5 }}
                  style={styles.pickerStyle}
                  textStyle={{ color: "black" }}
                  dropdownStyle={styles.dropdownStyle}
                  onSelect={(selectedIndex, value) => {
                    const selectedAppliance = categories.find(
                      (appliance) => appliance.name === value
                    );
                    if (selectedAppliance) {
                      setAppliances((prevState) => {
                        const updatedAppliances = [...prevState];
                        updatedAppliances[index].category =
                          selectedAppliance.name;
                        // Remove the automatic selection of subcategory here
                        return updatedAppliances;
                      });
                    }
                  }}
                />
              </View>
              {appliances[index].category && (
                <View style={styles.subCategoryContainer}>
                  <ModalDropdown
                    defaultIndex={0}
                    options={getSubcategoryOptions(appliance.category)}
                    placeholder="Subcategory"
                    defaultValue={appliance.sub_category || "Subcategory"}
                    style={styles.subCategoryPickerStyle}
                    textStyle={{ color: "black" }}
                    dropdownStyle={styles.dropdownStyle}
                    onSelect={(selectedIndex, value) => {
                      setAppliances((prevState) => {
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
                  onChangeText={(text) =>
                    setAppliances((prevState) => {
                      const updatedAppliances = [...prevState];
                      updatedAppliances[index].daily_usage = text;
                      return updatedAppliances;
                    })
                  }
                  value={appliance.daily_usage}
                  placeholder="Usage"
                />
              </View>
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
  roomInfo: {
    backgroundColor: "#f7f7f7",
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
  },
  roominfocard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  roomInfoText: {
    fontSize: 26,
    fontWeight: "bold",
    color: "black",
    fontFamily: "Lato-Bold",
  },
  roomAlias: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  applianceRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  pickerStyle: {
    width: 120, // Set a fixed width for the dropdown
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 10,
    marginRight: 8,
    padding: 12,
  },
  subCategoryPickerStyle: {
    width: 120, // Set a fixed width for the dropdown
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 10,
    marginRight: 8,
    padding: 12,
  },
  usageInput: {
    width: 40, // Adjust width as needed
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 10,
    fontSize: 14,
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
    // padding: 12,
    // alignItems: 'center',
    // width: '45%',
  },
  saveButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default RoomDetailScreen;
