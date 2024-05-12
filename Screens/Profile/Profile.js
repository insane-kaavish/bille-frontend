import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from "react-native";
import { AntDesign } from "@expo/vector-icons"; // Import AntDesign icon
import { Colors, GlobalStyles } from "../Styles/GlobalStyles";
import Navbar from "../Components/Navbar";
import Header from "../Components/Header";
import { useAuth } from "../Auth/AuthProvider";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

const fetchUser = async (authToken) => {
  try {
    const response = await fetch(`${API_URL}/user/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: authToken ? `Token ${authToken}` : "",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch user");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
};

const updateUser = async (authToken, data) => {
  try {
    const response = await fetch(`${API_URL}/update_user/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: authToken ? `Token ${authToken}` : "",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Failed to update user data");
    }
    console.log("User data updated successfully");
  } catch (error) {
    console.error("Error:", error);
  }
};

const ProfileScreen = ({ navigation }) => {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const { authToken } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchUser(authToken).then((data) => {
      setName(`${data.first_name} ${data.last_name}`);
      setEmail(data.email);
    });
  }, []);

  const handleSavePress = () => {
    setName(name);
    setEmail(email);
    updateUser(authToken, { name, email });
    setIsEditing(false);
  };

  return (
    <>
      <Header screenName="Profile" navigation={navigation} />
      <View style={GlobalStyles.screenContainer}>
        <View style={styles.card}>
          {/* <Text style={styles.cardTitle}>Profile Information</Text> */}

          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Name</Text>
            <View style={styles.inputContainer}>
              <AntDesign name="user" size={24} color="#007AFF" style={styles.icon} />
              <TextInput
                style={[styles.input]}
                value={name}
                onChangeText={(text) => setName(text)}
                editable={isEditing}
                selectTextOnFocus={false}
                placeholder="Name"
              />
            </View>
          </View>

          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Email</Text>
            <View style={styles.inputContainer}>
              <AntDesign name="mail" size={24} color="#007AFF" style={styles.icon} />
              <TextInput
                style={[styles.input]}
                value={email}
                onChangeText={(text) => setEmail(text)}
                editable={isEditing}
                selectTextOnFocus={false}
                placeholder="Email"
                keyboardType="email-address"
              />
            </View>
          </View>

          {isEditing && (
            <TouchableOpacity onPress={handleSavePress} style={styles.editButton}>
              <Text style={styles.editButtonText}>Save changes</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={[
              styles.editButton,
              { backgroundColor: isEditing ? "red" : "#007AFF" },
            ]}
            onPress={() => setIsEditing(!isEditing)}
          >
            <Text style={styles.editButtonText}>
              {isEditing ? "Cancel" : "Edit Profile"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <Navbar navigation={navigation} />
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFF",
    borderRadius: 24,
    padding: 20,
    elevation: 3,
    marginBottom: 20,
    marginRight: 10,
    marginLeft: 10,
    shadowColor: "#rgba(0,0,0,0.5)",
    shadowOffset: { width: 0, height: 6 },  // Reduced height for a closer shadow
    shadowOpacity: 0.5,  // Lower opacity for a softer appearance
    shadowRadius: 8,  // Increased radius to blur edges more
    elevation: 6,  // Adjust elevation for Android to match visual consistency
  },
  cardTitle: {
    fontFamily: "Lato-Bold",
    fontSize: 20,
    color: Colors.black,
    marginBottom: 20,
  },
  field: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  fieldLabel: {
    fontFamily: "Lato-Regular",
    fontSize: 16,
    color: Colors.black,
    marginBottom: 5,
    marginRight: 10,
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#007AFF",
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: "#F3F4F6",
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontFamily: "Lato-Regular",
    fontSize: 16,
    color: Colors.black,
    paddingVertical: 10,
  },
  editButton: {
    backgroundColor: "#007AFF",
    borderRadius: 16,
    padding: 10,
    alignItems: "center",
    width: "50%",
    alignSelf: "center",
    marginTop: 10,
  },
  editButtonText: {
    fontFamily: "Lato-Bold",
    fontSize: 16,
    color: "white",
    // fontWeight: "bold",
  },
});

export default ProfileScreen;
