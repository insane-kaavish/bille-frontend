import React, { createContext, useState, useContext } from "react";
import { useAuth } from "../Auth/AuthProvider";

const API_URL = process.env.EXPO_PUBLIC_API_URL;
const RoomContext = createContext({});

export const useRoom = () => useContext(RoomContext);

export const RoomProvider = ({ children }) => {
  const { authToken } = useAuth();
  const [rooms, setRooms] = useState([]);
  const [applianceOptions, setApplianceOptions] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
	const [room, setRoom] = useState(null);

  const fetchRooms = async () => {
    try {
      const response = await fetch(`${API_URL}/rooms/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: authToken ? `Token ${authToken}` : "",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch rooms");
      }
      const data = await response.json();
      setRooms(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchAppliances = async () => {
    try {
      const response = await fetch(`${API_URL}/appliances/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: authToken ? `Token ${authToken}` : "",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch appliances");
      }
      const data = await response.json();
      setApplianceOptions(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchRoom = async (roomId) => {
    try {
      const response = await fetch(`${API_URL}/room/?room_id=${roomId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: authToken ? `Token ${authToken}` : "",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch room appliances");
      }
      const data = await response.json();
      setRoom(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const updateRoom = async (roomData) => {
    try {
      const response = await fetch(`${API_URL}/update_room`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: authToken ? `Token ${authToken}` : "",
        },
        body: JSON.stringify(roomData),
      });
      if (!response.ok) {
        throw new Error("Failed to update room data");
      }
      console.log("Room data updated successfully");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const deleteAppliance = async (applianceId) => {
    try {
      const response = await fetch(
        `${API_URL}/delete_appliance/?appliance_id${applianceId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: authToken ? `Token ${authToken}` : "",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete appliance");
      }
      console.log("Appliance deleted successfully");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <RoomContext.Provider
      value={{
        rooms,
				room,
        applianceOptions,
        selectedRoom,
        setSelectedRoom,
        fetchRooms,
        fetchAppliances,
        fetchRoom,
				updateRoom,
				deleteAppliance,
      }}
    >
      {children}
    </RoomContext.Provider>
  );
};
