import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
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
        <View style={styles.formContainer}>
          <Text style={styles.label}>Your Name:</Text>
          <View style={styles.inputContainer}>
            <AntDesign name="user" size={24} color="black" />
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={(text) => setName(text)}
              placeholder="Enter your name"
            />
          </View>

          <Text style={styles.label}>Your Email:</Text>
          <View style={styles.inputContainer}>
            <AntDesign name="mail" size={24} color="black" />
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
            <AntDesign name="message1" size={24} color="black" />
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
      <Navbar />
    </>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
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
    backgroundColor: "#535CE8", // Blue color
    borderRadius: 20,
    paddingVertical: 12,
    alignItems: "center",
    width: "50%",
    alignSelf: "center",
    marginVertical: 20,
    elevation: 3,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ContactScreen;
