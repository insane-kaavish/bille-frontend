import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Navbar from "../Components/Navbar";
import Header from "../Components/Header";
import { GlobalStyles } from "../Styles/GlobalStyles";

const ContactScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Message:", message);
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <>
      <Header screenName="Contact Us" navigation={navigation} />
      <View style={GlobalStyles.screenContainer}>
        <View style={[styles.card, GlobalStyles.cardStyle]}>
          {/* <Text style={styles.cardTitle}>Contact Us</Text> */}

          <View style={styles.formContainer}>
            <Text style={styles.label}>Your Name:</Text>
            <View style={styles.inputContainer}>
              <AntDesign name="user" size={24} color="#535CE8" />
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={(text) => setName(text)}
                placeholder="Enter your name"
              />
            </View>

            <Text style={styles.label}>Your Email:</Text>
            <View style={styles.inputContainer}>
              <AntDesign name="mail" size={24} color="#535CE8" />
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={(text) => setEmail(text)}
                placeholder="Enter your email"
                keyboardType="email-address"
              />
            </View>

            <Text style={styles.label}>Your Message:</Text>
            <View style={[styles.inputContainer, { height: 100 }]}>
              <AntDesign name="form" size={24} color="#535CE8" />
              <TextInput
                style={[styles.input, { height: 80 }]}
                value={message}
                onChangeText={(text) => setMessage(text)}
                placeholder="Enter your message"
                multiline
              />
            </View>
          </View>

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Navbar />
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 20,
    elevation: 3,
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  cardTitle: {
    fontFamily: "Roboto-Bold",
    fontSize: 20,
    color: "black",
    marginBottom: 20,
  },
  formContainer: {
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: "rgba(255, 255, 255, 0.9)", // Translucent white
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: "black",
  },
  input: {
    flex: 1,
    marginLeft: 10,
    paddingVertical: 8,
    fontSize: 16,
    color: "black",
  },
  button: {
    backgroundColor: "#535CE8",
    borderRadius: 20,
    paddingVertical: 12,
    alignItems: "center",
    width: "50%",
    alignSelf: "center",
    elevation: 3,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ContactScreen;
