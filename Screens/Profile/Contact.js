import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";

import Navbar from "../Components/Navbar";
import Header from "../Components/Header";

import { GlobalStyles } from "../Styles/GlobalStyles";

const ContactScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    // Implement logic to handle the contact form submission, e.g., make an API call

    // For now, we'll just log the values
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Message:", message);

    // You can add further logic, like clearing the form or displaying a success message
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <>
      <Header screenName="Contact Us" navigation={navigation} />

      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: "#F8F8F8" }}
        behavior="padding"
      >
        <ScrollView
          contentContainerStyle={GlobalStyles.screenContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.formContainer}>
            <Text style={styles.label}>Your Name:</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={(text) => setName(text)}
              placeholder="Enter your name"
            />

            <Text style={styles.label}>Your Email:</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={(text) => setEmail(text)}
              placeholder="Enter your email"
              keyboardType="email-address"
            />

            <Text style={styles.label}>Your Message:</Text>
            <TextInput
              style={[styles.input, styles.messageInput]}
              value={message}
              onChangeText={(text) => setMessage(text)}
              placeholder="Enter your message"
              multiline
              numberOfLines={4}
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>

      <Navbar />
    </>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: "#333333",
  },
  input: {
    height: 40,
    borderColor: "#CCCCCC",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: "#FFFFFF",
  },
  messageInput: {
    height: 100,
    paddingTop: 10,
  },
  button: {
    backgroundColor: "#535CE8",
    borderRadius: 20,
    paddingVertical: 12,
    alignItems: "center",
    width: "70%",
    alignSelf: "center",
    marginVertical: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ContactScreen;
