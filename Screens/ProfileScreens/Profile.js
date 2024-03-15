import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import NavBar from "../Components/NavBar";
import Header from "../Components/Header";

const height = Dimensions.get("window").height;

const Profile = ({ navigation }) => {
  const [editName, setEditName] = useState("Admin");
  const [editEmail, setEditEmail] = useState("admin@admin.com");
  const [isEditing, setIsEditing] = useState(false);

  const handleEditPress = () => {
    setIsEditing(true);
  };

  const handleSavePress = () => {
    setIsEditing(false);
  };

  const handleCancelPress = () => {
    setEditName("Admin");
    setEditEmail("admin@admin.com");
    setIsEditing(false);
  };

  return (
    <>
    <Header screenName="Profile" navigation={navigation} />
    <View style={styles.content}>
          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Name</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={[styles.input]}
                value={editName}
                onChangeText={(text) => setEditName(text)}
                editable={isEditing}
                selectTextOnFocus={false}
                placeholder="Edit Username"
              />
              {isEditing && (
                <TouchableOpacity onPress={handleSavePress}>
                  <Ionicons name="checkmark" size={20} color="#535CE8" />
                </TouchableOpacity>
              )}
            </View>
          </View>

          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Email</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={[styles.input]}
                value={editEmail}
                onChangeText={(text) => setEditEmail(text)}
                editable={isEditing}
                selectTextOnFocus={false}
                placeholder="Edit Email"
                keyboardType="email-address"
              />
              {isEditing && (
                <TouchableOpacity onPress={handleSavePress}>
                  <Ionicons name="checkmark" size={20} color="#535CE8" />
                </TouchableOpacity>
              )}
            </View>
          </View>

          <TouchableOpacity
            style={styles.editButton}
            onPress={isEditing ? handleCancelPress : handleEditPress}
          >
            <Text style={styles.editButtonText}>
              {isEditing ? "Cancel" : "Edit Profile"}
            </Text>
          </TouchableOpacity>
        </View>

        <NavBar />
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
  },
  fieldLabel: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#333333",
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // Adjust alignment
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
    color: "#333333",
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

export default Profile;
