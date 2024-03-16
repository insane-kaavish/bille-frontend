import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useAuth } from "./AuthProvider";

import { Colors, GlobalStyles } from "../Styles/GlobalStyles";
import { ScrollView } from "react-native";

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const SignupScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [keNumber, setKeNumber] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);
  const [touchedFields, setTouchedFields] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
    keNumber: false,
  });
  const { signup } = useAuth();

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      // Reset fields when screen comes into focus
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setKeNumber("");
      setError("");
      setShowError(false);
      setTouchedFields({
        name: false,
        email: false,
        password: false,
        confirmPassword: false,
        keNumber: false,
      });
    });
    return unsubscribe;
  }, [navigation]);

  const handleFocus = (field) => {
    setIsTyping(true);
    if (!touchedFields[field]) {
      setTouchedFields((prevState) => ({ ...prevState, [field]: true }));
    }
    if (field === "name" && error) {
      setError("");
      setShowError(false);
    }
    if (field === "email" && error) {
      setError("");
      setShowError(false);
    }
  };

  const handleChange = () => {
    setIsTyping(true);
  };

  const handleBlur = (field) => {
    if (field !== "" && !isTyping) {
      setTouchedFields((prevState) => ({ ...prevState, [field]: true }));
    }
    if (field === "name" && (name.length > 30 && name !== "")) {
      setError("Name cannot be more than 30 characters");
      setShowError(true);
    } else if (field === "email" && (!validateEmail(email) && email !== "")) {
      setError("Please enter a valid email address");
      setShowError(true);
    } else {
      setError("");
      setShowError(false);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);

    const data = {
      first_name: name,
      last_name: "",
      email: email,
      password: password,
      ke_num: keNumber,
    };

    const response = await signup(data);
    if (response.status !== 201) {
      setLoading(false);
      return;
    }
    console.log("successfully signed up");
    navigation.navigate("RoomData");
    setLoading(false);
  };

  return (
    <>
      <ScrollView style={[GlobalStyles.screenContainer, styles.container]}
      contentContainerStyle={styles.scrollViewContent}
      >
        <View
          style={[
            styles.inputContainer,
            { borderColor: showError ? "red" : "#ccc"}
          ]}
        >
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            value={name}
            onChangeText={(text) => setName(text)}
            onFocus={() => handleFocus("name")}
            onBlur={() => handleBlur("name")}
          />
        </View>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <View
          style={[
            styles.inputContainer,
            { borderColor: showError ? "red" : "#ccc"}
          ]}
        >
          <TextInput
            style={styles.input}
            placeholder="Email Address"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              handleChange();
            }}
            autoCapitalize="none"
            onFocus={() => handleFocus("email")}
            onBlur={() => handleBlur("email")}
          />
        </View>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <View
          style={[
            styles.inputContainer,
            touchedFields.keNumber && !isTyping && { borderColor: "red" },
          ]}
        >
          <TextInput
            style={styles.input}
            placeholder="K-Electric Account Number"
            value={keNumber}
            onChangeText={(text) => setKeNumber(text)}
            onFocus={() => handleFocus("keNumber")}
            onBlur={() => handleBlur("keNumber")}
          />
        </View>

        <View
          style={[
            styles.inputContainer,
            touchedFields.password && !isTyping && { borderColor: "red" },
          ]}
        >
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry 
            value={password}
            autoCapitalize="none"
            onChangeText={(text) => setPassword(text)}
            onFocus={() => handleFocus("password")}
            onBlur={() => handleBlur("password")}
          />
        </View>

        <View
          style={[
            styles.inputContainer,
            touchedFields.confirmPassword &&
              !isTyping && { borderColor: "red" },
          ]}
        >
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            secureTextEntry
            value={confirmPassword}
            autoCapitalize="none"
            onChangeText={(text) => setConfirmPassword(text)}
            onFocus={() => handleFocus("confirmPassword")}
            onBlur={() => handleBlur("confirmPassword")}
          />
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.buttonText}>Sign Up</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Signin")}>
          <Text style={styles.footerText}>
            Already have an account?{" "}
            <Text style={styles.footerTextHighlight}>Login</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    // alignItems: "center",
    // justifyContent: "center",
    padding: 10,
  },
  inputContainer: {
    width: "90%",
    marginBottom: 15,
    borderWidth: 1,
    borderRadius: 16,
    backgroundColor: Colors.textfieldBG,
    borderColor: Colors.border,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
  },
  input: {
    padding: 10,
    borderColor: Colors.border,
  },
  button: {
    backgroundColor: Colors.buttonColor,
    borderRadius: 26,
    paddingVertical: 12,
    width: "90%",
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: "400",
  },
  footerText: {
    fontSize: 16,
    // fontWeight: "700",
    color: Colors.black,
    marginTop: 20,
  },
  footerTextHighlight: {
    color: Colors.buttonColor,
    // underline
    textDecorationLine: "underline",
  },
  errorText: {
    color: Colors.error,
    marginBottom: 10,
  },
});

export default SignupScreen;
