import React from "react";
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
import { MenuProvider } from "react-native-popup-menu";
import { ProgressChart } from "react-native-chart-kit";

import MenuComponent from "./Components/Menu";
import NavBar from "./Components/NavBar";
import { useAuth } from "./AuthScreens/AuthProvider";
import Config from "react-native-config";

// const API_URL = "https://app.bille.live";
const API_URL = Config.API_URL;

const roomsRequest = async (token) => {
  try {
    const response = await fetch(`${API_URL}/rooms/`, {
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

const height = Dimensions.get("window").height;

const RoomwisePrediction = () => {
  const navigation = useNavigation();
  const { authToken } = useAuth();
  const [rooms, setRooms] = React.useState([]);

  React.useEffect(() => {
    const fetchRooms = async () => {
      const roomsData = await roomsRequest(authToken);
      if (roomsData) {
        setRooms(roomsData);
      }
    };
    fetchRooms();
  }, [authToken]);

  const colors = [
    "#535CE8",
    "#FE763E",
    "#2ACCCF",
    "#F1C932",
    "#7B48CC",
    "#DE3B40",
    "#EFB034",
    "#1DD75B",
    "#379AE6",
  ];

  const assignColors = (rooms) => {
    const assignedColors = [];
    rooms.forEach((room, index) => {
      assignedColors.push({ ...room, color: colors[index] });
    });
    return assignedColors;
  };

  // Assign colors to rooms
  const updatedRooms = assignColors(rooms);

  const totalAllUnits = updatedRooms.reduce(
    (total, room) => total + room.units,
    0
  );

  const data = {
    labels: updatedRooms.map((room) => room.alias),
    data: updatedRooms.map((room) => room.units / totalAllUnits),
    colors: updatedRooms.map((room) => room.color),
  };
  const navigateToRoomDetails = (roomId) => {
    navigation.navigate("RoomDetail", { roomId: roomId });
  };

  return (
    <MenuProvider skipInstanceCheck={true} style={styles.container}>
      <View style={styles.header}>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontFamily: "Lato-Bold",
              fontSize: 20,
              color: "#171A1F",
              textAlign: "left",
            }}
          >
            Room Overview
          </Text>
        </View>
        <MenuComponent navigation={navigation} />
      </View>

      <ScrollView style={styles.scrollContainer}>
        <View style={styles.card}>
          <View style={styles.progressContainer}>
            <ProgressChart
              data={data}
              // FIXME: Do not hard code dimensions!
              width={Dimensions.get("window").width - 80}
              height={220}
              chartConfig={{
                backgroundGradientFrom: "#ffffff",
                backgroundGradientTo: "#ffffff",
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                strokeWidth: 5,
              }}
              style={{ borderRadius: 16, padding: 10 }}
              hideLegend={true}
              withCustomBarColorFromData
            />
          </View>
        </View>
        {updatedRooms.map((room, index) => (
          <TouchableOpacity
            key={index}
            style={styles.roomCard}
            onPress={() => navigateToRoomDetails(room.id)}
          >
            <View
              style={[styles.iconContainer, { backgroundColor: room.color }]}
            >
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
      <NavBar />
    </MenuProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingHorizontal: 10,
    paddingTop: height * 0.001,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  scrollContainer: {
    flex: 1,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  progressContainer: {
    alignItems: "center",
    marginBottom: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
  },
  roomCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginVertical: 5,
    marginHorizontal: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
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
  },
  roomUnits: {
    fontSize: 16,
    color: "#666",
  },
});

export default RoomwisePrediction;
