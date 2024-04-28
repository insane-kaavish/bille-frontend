import React, { useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { PieChart } from "react-native-chart-kit"; // Import PieChart

import Header from "./Components/Header";
import Navbar from "./Components/Navbar";
import { useAuth } from "./Auth/AuthProvider";
import { useRoom } from "./Components/RoomProvider";

const height = Dimensions.get("window").height;

const RoomOverviewScreen = () => {
  const navigation = useNavigation();
  const { authToken } = useAuth();
  const { rooms, fetchRooms, setSelectedRoom, fetchCategories, selectedRoom, setRoom, setAppliances } = useRoom();

  useEffect(() => {
    fetchRooms();
    fetchCategories();
    setRoom(null);
    setAppliances([]);
  }, [selectedRoom, authToken]);

  const colors = [
    "#535CE8",
    "#2ACCCF",
    "#FE763E",
    "#F1C932",
    "#7B48CC",
    "#DE3B40",
    "#EFB034",
    "#1DD75B",
    "#379AE6",
  ];

  const totalUnits = rooms.reduce((total, room) => total + room.units, 0);

  const data = rooms.map((room, index) => ({
    name: room.alias,
    units: room.units,
    color: colors[index % colors.length],
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  }));

  return (
    <>
      <Header screenName="Room Overview" navigation={navigation} />
      <ScrollView style={styles.container}>
      <View style={styles.card}>
      <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
        <PieChart
          data={data}
          width={Dimensions.get("window").width*0.9}
          height={200}
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
        Total Predicted Units: <Text style={{ color: "orange", fontFamily: "Lato-Bold" }}>
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
            <View style={[styles.iconContainer, { backgroundColor: colors[index % colors.length] }]}>
              <Ionicons name={"home"} size={24} color="#fff" />
            </View>
            <View style={styles.roomDetails}>
              <Text style={styles.roomName}>{room.alias}</Text>
              <Text style={styles.roomUnits}>{`${room.units} Units`}</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#C0C0C0" />
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Navbar />
      <View style={{ height: 60 }} />

    </>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  card: {
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
    elevation: 7,
    minHeight: 300, // Set a minimum height or adjust as needed
  },
  
  roomCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 20,
    marginBottom: 10,
    marginHorizontal: 5,
    shadowColor: "rgba(0,0,0,0.5)",
    shadowOffset: { width: 0, height: 10 }, // Reduced height for a closer shadow
    shadowOpacity: 0.5, // Lower opacity for a softer appearance
    shadowRadius: 20, // Increased radius to blur edges more
    elevation: 6, // Adjust elevation for Android to match visual consistency
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
    fontFamily: "Lato-Regular"
  },
  roomUnits: {
    fontSize: 16,
    color: "#666",
    fontFamily: "Lato-Regular"
  },
  estimatedBill: {
    fontSize: 18,
    fontWeight: 'normal',
    fontFamily: "Lato-Regular",
    color: "#666",
    textAlign: "center",
    paddingVertical: 20,
  },
});

export default RoomOverviewScreen;
