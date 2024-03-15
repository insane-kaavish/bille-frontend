import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import ModalDropdown from "react-native-modal-dropdown";
import { useAuth } from "../AuthScreens/AuthProvider";
import Config from "react-native-config";

const API_URL = Config.API_URL;

const getCategories = async (token) => {
  try {
    const response = await fetch(`${API_URL}/categories/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    });
    if (response.status !== 200) return false;
    return response.json();
  } catch (error) {
    console.error(error);
    return false;
  }
};

const sendData = async (data, token) => {
  try {
    const response = await fetch(`${API_URL}/input/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (response.status !== 201) return false;
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const RoomData = () => {
  const [rooms, setRooms] = useState([
    { alias: "", appliances: [{ category: "", sub_category: "", usage: "" }] },
  ]);
  const [openRoomIndices, setOpenRoomIndices] = useState([0]);
  const { authToken } = useAuth();
  const [appliances, setAppliances] = useState([]);
  const [subCategories, setSubCategories] = useState({});
  const navigation = useNavigation();

  useEffect(() => {
    const fetchCategories = async () => {
      const categoriesData = await getCategories(authToken);
      if (categoriesData) {
        // set appliances and subCategories
        const appliances = categoriesData.map((category) => category.name);
        setAppliances(appliances);
        const subCategories = {};
        categoriesData.forEach((category) => {
          subCategories[category.name] = category.sub_categories;
        });
        setSubCategories(subCategories);
      }
    };
    fetchCategories();
  }, [authToken]);

  const addRoom = () => {
    const newRoom = {
      alias: "",
      appliances: [{ category: "", sub_category: "", usage: "" }],
    };
    setRooms([...rooms, newRoom]);
    setOpenRoomIndices([...openRoomIndices, rooms.length]);
  };

  const removeRoom = (roomIndex) => {
    const newRooms = rooms.filter((_, index) => index !== roomIndex);
    setRooms(newRooms);
  };

  const addAppliance = (roomIndex) => {
    const newRooms = [...rooms];
    newRooms[roomIndex].appliances.push({
      category: "",
      sub_category: "",
      usage: 0,
    });
    setRooms(newRooms);
  };

  const removeAppliance = (roomIndex, applianceIndex) => {
    const newRooms = [...rooms];
    newRooms[roomIndex].appliances.splice(applianceIndex, 1);
    setRooms(newRooms);
  };

  const handleSubmit = () => {
    const data = { rooms: rooms };
    console.log(data);
    sendData(data, authToken).then((response) => {
      if (response) {
        navigation.navigate("Home");
        console.log("Data sent successfully");
      }
    });
  };

  const handleSkip = () => {
    navigation.navigate("Home");
  };

  const toggleAccordion = (index) => {
    setOpenRoomIndices((currentIndices) => {
      if (currentIndices.includes(index)) {
        return currentIndices.filter((i) => i !== index);
      } else {
        return [...currentIndices, index];
      }
    });
  };

  const setApplianceName = (roomIndex, applianceIndex, name) => {
    const newRooms = [...rooms];
    newRooms[roomIndex].appliances[applianceIndex].category = name;
    setRooms(newRooms);
  };

  const setApplianceSubCategory = (roomIndex, applianceIndex, subCategory) => {
    const newRooms = [...rooms];
    newRooms[roomIndex].appliances[applianceIndex].sub_category = subCategory;
    setRooms(newRooms);
  };

  const setApplianceUsage = (roomIndex, applianceIndex, usage) => {
    const newRooms = [...rooms];
    newRooms[roomIndex].appliances[applianceIndex].usage = usage;
    setRooms(newRooms);
  };

  const setRoomName = (index, name) => {
    const newRooms = [...rooms];
    newRooms[index].alias = name;
    setRooms(newRooms);
  };

  const renderAppliance = (appliance, roomIndex, applianceIndex) => {
    return (
      <View key={`appliance-${applianceIndex}`} style={styles.applianceItem}>
        <ModalDropdown
          options={appliances}
          defaultValue="Appliance"
          style={styles.pickerStyle}
          textStyle={styles.dropdownTextStyle}
          dropdownStyle={styles.dropdownStyle}
          onSelect={(index, value) =>
            setApplianceName(roomIndex, applianceIndex, value)
          }
          defaultIndex={0}
        />
        <ModalDropdown
          options={
            appliance.category && subCategories[appliance.category]
              ? subCategories[appliance.category]
              : ["Type"]
          }
          defaultValue={appliance.category ? "Type" : "Select Type"}
          style={styles.pickerStyle}
          textStyle={styles.dropdownTextStyle}
          dropdownStyle={styles.dropdownStyle}
          onSelect={(index, value) =>
            setApplianceSubCategory(roomIndex, applianceIndex, value)
          }
          defaultIndex={0}
        />
        <TextInput
          style={styles.usageInput}
          onChangeText={(text) =>
            setApplianceUsage(roomIndex, applianceIndex, text)
          }
          value={appliance.usage}
          placeholder="Hours"
          keyboardType="numeric"
        />
        <TouchableOpacity
          onPress={() => removeAppliance(roomIndex, applianceIndex)}
        >
          <Ionicons name="close-circle" size={24} color="red" />
        </TouchableOpacity>
      </View>
    );
  };

  const renderRooms = () => {
    return rooms.map((room, index) => (
      <View key={`room-${index}`} style={styles.roomWrapper}>
        <TouchableOpacity
          style={styles.roomContainer}
          onPress={() => toggleAccordion(index)}
        >
          <TextInput
            style={styles.roomInput}
            onChangeText={(text) => setRoomName(index, text)}
            value={room.alias}
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
            <TouchableOpacity
              style={styles.addApplianceButton}
              onPress={() => addAppliance(index)}
            >
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
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.header}>Bill-E Setup</Text>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() =>
            navigation.reset({ index: 0, routes: [{ name: "SignIn" }] })
          }
        >
          <Ionicons name="log-out" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
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
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    padding: 10,
  },
  contentContainer: {
    padding: 16,
    justifyContent: "space-between",
  },
  headerBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // Adjust to distribute space between the items
    paddingHorizontal: 10,
    paddingTop: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    color: "black",
    fontFamily: "Lato-Bold",
  },
  roomWrapper: {
    backgroundColor: "#f7f7f7",
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
  },
  roomContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  roomInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 10,
    padding: 14,
    marginRight: 8,
    marginBottom: 10,
  },
  applianceItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
    // justifyContent: 'space-between', // This will distribute space evenly between the items
  },
  pickerStyle: {
    flex: 1,
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 10,
    marginRight: 8,
    padding: 12,
    marginLeft: 0.5, // Add this if you want space on the left as well
  },
  usageInput: {
    flex: 0.35,
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 10,
    paddingVertical: 8, // Reduce vertical padding to make the text box smaller
    paddingHorizontal: 10, // Reduce horizontal padding to make the text box smaller
    marginRight: 8,
    // marginLeft: 0.1,
    width: "30%", // Adjust the width as needed
    fontSize: 11,
  },
  addApplianceButton: {
    backgroundColor: "#535CE8",
    borderRadius: 20,
    padding: 10,
    alignItems: "center",
    width: "50%",
    alignSelf: "center", // Add this to center the button within its parent
    marginTop: 10, // Add some margin at the top if needed
  },
  addApplianceText: {
    color: "white",
    fontWeight: "bold",
  },
  addRoomButton: {
    backgroundColor: "#535CE8",
    borderRadius: 20,
    padding: 12,
    alignItems: "center",
    width: "70%",
    alignSelf: "center",
  },
  addRoomButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  submitButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  dropdownStyle: {
    width: "50%",
    maxHeight: 100,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginTop: 10,
  },
  dropdownTextStyle: {
    fontSize: 13.5,
    color: "black",
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 35,
    marginBottom: 30,
  },
  skipButton: {
    backgroundColor: "red",
    borderRadius: 20,
    padding: 12,
    alignItems: "center",
    width: "45%",
  },
  skipButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  submitButton: {
    backgroundColor: "#535CE8",
    borderRadius: 20,
    padding: 12,
    alignItems: "center",
    width: "45%",
  },
});

export default RoomData;
