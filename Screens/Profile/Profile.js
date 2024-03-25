import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";

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
  }, [authToken]);
  
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
        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Name</Text>
          <View style={styles.inputContainer}>
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
            { backgroundColor: isEditing ? "red" : "#535CE8" },
          ]}
          onPress={() =>
            setIsEditing(!isEditing)
          }
        >
          <Text style={styles.editButtonText}>
            {isEditing ? "Cancel" : "Edit Profile"}
          </Text>
        </TouchableOpacity>
      </View>

      <Navbar />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    paddingBottom: 10,
    marginBottom: 20,
  },
  headerText: {
    fontFamily: "Lato-Bold",
    fontSize: 20,
    color: "#171A1F",
  },
  content: {
    flex: 1,
  },
  field: {
    marginBottom: 20,
    width: "90%",
    alignSelf: "center",
    borderColor: Colors.border,
  },
  fieldLabel: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: Colors.black,
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: "#F3F4F6",
  },
  input: {
    flex: 1,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: Colors.black,
    paddingVertical: 10,
  },
  editButton: {
    backgroundColor: "#535CE8",
    borderRadius: 20,
    padding: 10,
    alignItems: "center",
    width: "50%",
    alignSelf: "center",
    marginTop: 10,
  },
  editButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default ProfileScreen;
