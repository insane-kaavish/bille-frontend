import React, { useState } from "react";
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

const ProfileScreen = ({ navigation }) => {
  const [editName, setEditName] = useState("Admin");
  const [editEmail, setEditEmail] = useState("admin@admin.com");
  const [isEditing, setIsEditing] = useState(false);

  const handleEditPress = () => {
    setIsEditing(true);
  };

  const handleSavePress = () => {
    setIsEditing(false);
    if (editName !== "Admin") {
      setEditName(editName);
    }
    if (editEmail !== "admin@admin.com") {
      setEditEmail(editEmail);
    }
  };

  const handleCancelPress = () => {
    setEditName("Admin");
    setEditEmail("admin@admin.com");
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
              value={editName}
              onChangeText={(text) => setEditName(text)}
              editable={isEditing}
              selectTextOnFocus={false}
              placeholder="Edit Username"
            />
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
          </View>
        </View>

        {isEditing && (
          <TouchableOpacity onPress={handleSavePress} style={styles.editButton}>
            <Text style={styles.editButtonText}>Save changes</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={[styles.editButton, { backgroundColor: isEditing ? "red" : "#535CE8" }]}
          onPress={isEditing ? handleCancelPress : handleEditPress}
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
