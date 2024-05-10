import React, { createContext, useState, useContext } from "react";
import { useAuth } from "../Auth/AuthProvider";

const API_URL = process.env.EXPO_PUBLIC_API_URL;
const RoomContext = createContext({});

export const useRoom = () => useContext(RoomContext);

export const RoomProvider = ({ children }) => {
  const { authToken } = useAuth();
  const [rooms, setRooms] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
	const [room, setRoom] = useState(null);
  const [appliances, setAppliances] = useState([]);
  const [numrooms, setNumRooms] = useState(-1);

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
      setNumRooms(data.length);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const deleteRoom = async (roomId) => {
    try {
      const response = await fetch(`${API_URL}/delete_room/?room_id=${roomId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: authToken ? `Token ${authToken}` : "",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to delete room");
      }
      console.log("Room deleted successfully");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${API_URL}/categories/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: authToken ? `Token ${authToken}` : "",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      const data = await response.json();
      setCategories(data);
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
      setAppliances(data.appliances);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const updateRoom = async (roomData) => {
    try {
      const response = await fetch(`${API_URL}/update_room/?room_id=${roomData.id}`, {
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

  const addRoom = async (roomData) => {
    try {
      const response = await fetch(`${API_URL}/add_room/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${authToken}`
        },
        body: JSON.stringify(roomData)
      });
      const newRoom = await response.json();
      if (!response.ok) {
        throw new Error('Failed to add room');
      }
      console.log('Room added successfully:', newRoom);
    } catch (error) {
      console.error('Add room failed:', error);
      throw error;  // Rethrow or handle error as needed
    }
  };

  const deleteAppliance = async (applianceId) => {
    try {
      const response = await fetch(
        `${API_URL}/delete_appliance/?appliance_id=+${applianceId}`,
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
        categories,
        selectedRoom,
        appliances,
        setSelectedRoom,
        fetchRooms,
        deleteRoom,
        fetchCategories,
        fetchRoom,
				updateRoom,
        addRoom,
				deleteAppliance,
        setAppliances,
        setRoom,
        numrooms
      }}
    >
      {children}
    </RoomContext.Provider>
  );
};
