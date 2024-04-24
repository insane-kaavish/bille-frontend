import React, { useEffect, useState } from "react";
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

import Header from "./Components/Header";
import Navbar from "./Components/Navbar";
import { useAuth } from "./Auth/AuthProvider";
import { useRoom } from "./Components/RoomProvider";
import { 
  WidgetContainer,
  Container,
  SingleItemContainer,
  ColorIcon,
  Label, } from "./Styles";
import Pie from "./Components/DonutChart";

const height = Dimensions.get("window").height;

const getInnerText = (index, dataAsset) =>
  index < 0
    ? {
        index: -1,
        text: `Javascript Skills
%100`
      }
    : {
        index,
        text: `${dataAsset[index].name}
%${dataAsset[index].population}`
      };

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
  } = useRoom();
  const [selectedPie, setSelectedPie] = useState(getInnerText(-1, data));

  const onPieItemSelected = newIndex => () =>
    setSelectedPie(
      getInnerText(newIndex === selectedPie.index ? -1 : newIndex, data)
    );

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

  const data =
    rooms.length > 0
      ? rooms.map((room, index) => ({
          name: room.alias,
          population: parseInt(room.units) / totalUnits * 100,
          color: colors[index % colors.length],
          legendFontColor: "#7F7F7F",
          legendFontSize: 15,
        }))
      : [];

  const navigateToRoomDetails = (room) => {
    setSelectedRoom(room);
    navigation.navigate("RoomDetail");
  };
  
  return (
    <>
      <Header screenName="Room Overview" navigation={navigation} />
      <View style={styles.container}>
        <ScrollView style={styles.scrollContainer}>
          <View style={styles.card}>
            <View style={styles.progressContainer}>
              {data && rooms.length !== 0 && (
                <WidgetContainer>
                <Pie
                  pieSize={200}
                  onItemSelected={onPieItemSelected}
                  size={200}
                  data={data}
                  value={selectedPie}
                />
                <Container>
                  {data
                    .sort((a, b) => (a.population < b.population ? 1 : -1))
                    .map((item, index) => (
                      <TouchableOpacity
                        key={item.name}
                        onPress={onPieItemSelected(index)}
                      >
                        <SingleItemContainer>
                          <ColorIcon color={data[index].color} />
                          <Label isActive={index === selectedPie.index}>
                            {item.name}
                          </Label>
                        </SingleItemContainer>
                      </TouchableOpacity>
                    ))}
                </Container>
              </WidgetContainer>
              )}
              <View style={styles.unitDetails}>
                <Text style={styles.estimatedBill}>
                  Total Predicted Units:{" "}
                  <Text style={{ color: "orange" }}> {totalUnits} Units</Text>
                </Text>
              </View>
            </View>
          </View>
          {rooms.map((room, index) => (
            <TouchableOpacity
              key={index}
              style={styles.roomCard}
              onPress={() => navigateToRoomDetails(room)}
            >
              <View
                style={[
                  styles.iconContainer,
                  { backgroundColor: colors[rooms.indexOf(room)] },
                ]}
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
        <Navbar />
      </View>
    </>
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
  unitDetails: {
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    padding: 16,
    margin: 16,
    alignItems: "center",
    elevation: 6, // for the main shadow
    shadowColor: "#000", // color of the shadow
    shadowOffset: { width: 0, height: 0 }, // same as the CSS code
    shadowOpacity: 0.6, // opacity of the shadow
    shadowRadius: 1, // blur radius of the shadow
  },
  estimatedBill: {
    fontSize: 20,
    color: "#666",
    textAlign: "center",
    // marginBottom: 20,
    fontFamily: "Lato-Bold",
  },
});

export default RoomOverviewScreen;
