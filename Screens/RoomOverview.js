import React, { useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Modal,
  ActivityIndicator,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { PieChart } from "react-native-chart-kit";

import Header from "./Components/Header";
import Navbar from "./Components/Navbar";
import { useAuth } from "./Auth/AuthProvider";
import { useRoom } from "./Components/RoomProvider";

const RoomOverviewScreen = () => {
  const navigation = useNavigation();
  const { authToken } = useAuth();
  const {
    rooms,
    fetchRooms,
    setSelectedRoom,
    fetchCategories,
    selectedRoom,
    setRoom,
    setAppliances,
    numrooms,
  } = useRoom();

  useEffect(() => {
    fetchRooms();
    fetchCategories();
    setRoom(null);
    setAppliances([]);
  }, [selectedRoom, authToken]);

  const colors = [
    "#64b5f6", // Light blue
    "#ff8a65", // Light orange
    "#aed581", // Light green
    "#ffcdd2", // Light pink
    "#b2ebf2", // Light cyan
    "#e1bee7", // Light purple
    "#c5cae9", // Light indigo
    "#f0f4c3", // Light lime
  ];

  const totalUnits = rooms.reduce((total, room) => total + room.units, 0);

  const getIconName = (alias) => {
    const normalizedAlias = alias.toLowerCase().replace(/\s+/g, " ");

    if (normalizedAlias.includes("bedroom")) return "bed";
    if (normalizedAlias.includes("kitchen")) return "restaurant";
    if (
      normalizedAlias.includes("tv") ||
      normalizedAlias.includes("television")
    )
      return "tv";
    if (normalizedAlias.includes("bath")) return "bathtub";
    if (normalizedAlias.includes("dining")) return "restaurant-menu";
    if (
      normalizedAlias.includes("living") ||
      normalizedAlias.includes("lounge")
    )
      return "weekend";
    if (normalizedAlias.includes("office")) return "business-center";
    if (normalizedAlias.includes("garage")) return "drive-eta";
    if (normalizedAlias.includes("study")) return "import-contacts"; // book for MaterialIcons
    if (normalizedAlias.includes("gym")) return "fitness-center";
    if (normalizedAlias.includes("laundry")) return "local-laundry-service";
    if (normalizedAlias.includes("gaming")) return "gamepad";

    return "home"; // Default icon
  };

  const handleAddRoom = () => {
    navigation.navigate("AddRoom");
  };

  const handleSkip = () => {
    navigation.navigate("Dashboard");
  }

  return (
    <>
      <Header screenName="Room Overview" navigation={navigation} />
      {numrooms === -1 && (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      )}
      {numrooms === 0 && (
        <Modal animationType="slide" transparent={true} visible={true}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>No rooms found</Text>
              <View style={styles.buttonscard}>
                <TouchableOpacity style={{ ...styles.addButton, backgroundColor: "#AAA" }} onPress={handleSkip}>
                  <Text style={styles.addButtonText}>Skip</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={handleAddRoom}
                >
                  <Text style={styles.addButtonText}>Add Room</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
      {numrooms > 0 && (
        <>
          <ScrollView style={styles.container}>
            <View style={styles.card}>
              <ScrollView contentContainerStyle={{ alignItems: "center" }}>
                <PieChart
                  data={rooms.map((room, index) => ({
                    name: room.alias,
                    units: room.units,
                    color: colors[index % colors.length],
                    legendFontColor: "#7F7F7F",
                    legendFontSize: 12,
                  }))}
                  width={Dimensions.get("window").width * 0.9}
                  height={220}
                  chartConfig={{
                    color: (opacity = 1) => `rgba(33, 37, 41, ${opacity})`,
                  }}
                  accessor={"units"}
                  backgroundColor={"transparent"}
                  paddingLeft={"10"}
                  center={[0, 0]}
                  absolute={false}
                />
              </ScrollView>
              <Text style={styles.estimatedBill}>
                Total Predicted Units:{" "}
                <Text style={{ color: "orange", fontFamily: "Lato-Bold" }}>
                  {totalUnits} Units
                </Text>
              </Text>
            </View>
            {rooms.map((room, index) => (
              <TouchableOpacity
                key={index}
                style={styles.roomCard}
                onPress={() => {
                  setSelectedRoom(room);
                  navigation.navigate("RoomDetail");
                }}
              >
                <View
                  style={[
                    styles.iconContainer,
                    { backgroundColor: colors[index % colors.length] },
                  ]}
                >
                  {/* <Ionicons name={getIconName(room.alias)} size={24} color="#fff" /> */}
                  <MaterialIcons
                    name={getIconName(room.alias)}
                    size={24}
                    color="#fff"
                  />
                </View>
                <View style={styles.roomDetails}>
                  <Text style={styles.roomName}>{room.alias}</Text>
                  <Text style={styles.roomUnits}>{`${room.units} Units`}</Text>
                </View>
                <Ionicons name="chevron-forward" size={24} color="#C0C0C0" />
              </TouchableOpacity>
            ))}
            <View style={{ height: 80 }} />
          </ScrollView>
          <TouchableOpacity
            style={styles.addroomButton}
            onPress={handleAddRoom}
          >
            {/* <Text style={styles.addroomButtonText}>+</Text> */}
            <AntDesign name="pluscircle" size={50} color="#007AFF" />
          </TouchableOpacity>
        </>
      )}
      <Navbar />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  card: {
    marginTop: 5,
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
  roomCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 15,
    marginBottom: 10,
    marginHorizontal: 5,
    shadowColor: "rgba(0,0,0,0.5)",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 6,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  roomDetails: {
    flex: 1,
    justifyContent: "center",
  },
  roomName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    fontFamily: "Lato-Regular",
  },
  roomUnits: {
    fontSize: 16,
    color: "#666",
    fontFamily: "Lato-Regular",
  },
  estimatedBill: {
    fontSize: 18,
    fontWeight: "normal",
    fontFamily: "Lato-Regular",
    color: "#666",
    textAlign: "center",
    paddingVertical: 20,
  },
  addroomButton: {
    // backgroundColor: "#007AFF",
    bottom: "8%",
    right: "3%",
    // padding: 12,
    alignItems: "center",
    width: "20%",
    height: "20",
    alignSelf: "flex-end",
    borderRadius: 100, // Half of the height to make it round
  },
  addroomButtonText: {
    color: "white",
    // textAlign: "center",
    fontWeight: "bold",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
    fontFamily: "Lato-Regular",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: "#007AFF",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  buttonscard: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
  },
  addButton: {
    backgroundColor: "#007AFF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: "45%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
    marginLeft: 5,
  },
});

export default RoomOverviewScreen;
