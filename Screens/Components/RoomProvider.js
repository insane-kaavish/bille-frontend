import React, { createContext, useState, useContext } from "react";
import { useAuth } from "../Auth/AuthProvider";

const API_URL = process.env.EXPO_PUBLIC_API_URL;
const RoomContext = createContext({});

const RoomProvider = ({ children }) => {
  const { authToken } = useAuth();
  const [rooms, setRooms] = useState([]);
  const [appliances, setAppliances] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedAppliance, setSelectedAppliance] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);

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
      setAppliances(data);
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
      setAppliances(data);
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

  const deleteApplicance = async (applianceId) => {
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
        appliances,
        selectedRoom,
        selectedAppliance,
        selectedSubCategory,
        setSelectedRoom,
        setSelectedAppliance,
        setSelectedSubCategory,
        fetchRooms,
        fetchAppliances,
        fetchRoom,
				updateRoom,
				deleteApplicance,
      }}
    >
      {children}
    </RoomContext.Provider>
  );
};
