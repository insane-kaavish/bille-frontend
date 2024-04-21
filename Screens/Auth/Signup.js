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
  const [NameError, setNameError] = useState("");
  const [showNameError, setShowNameError] = useState(false);
  const [EmailError, setEmailError] = useState("");
  const [showEmailError, setShowEmailError] = useState(false);
  const [KeNumberError, setKeNumberError] = useState("");
  const [showKeNumberError, setShowKeNumberError] = useState(false);
  const [PasswordError, setPasswordError] = useState("");
  const [showPasswordError, setShowPasswordError] = useState(false);
  const [ConfirmPasswordError, setConfirmPasswordError] = useState("");
  const [showConfirmPasswordError, setShowConfirmPasswordError] = useState(false);
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
      setNameError("");
      setEmailError("");
      setKeNumberError("");
      setPasswordError("");
      setConfirmPasswordError("");
      setShowError(false);
      setShowNameError(false);
      setShowEmailError(false);
      setShowKeNumberError(false);
      setShowPasswordError(false);
      setShowConfirmPasswordError(false);
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
    switch (field) {
      case "name":
        if (NameError) {
          setNameError("");
          setShowNameError(false);
        }
        break;
      case "email":
        if (EmailError) {
          setEmailError("");
          setShowEmailError(false);
        }
        break;
      case "keNumber":
        if (KeNumberError) {
          setKeNumberError("");
          setShowKeNumberError(false);
        }
        break;
      case "password":
        if (PasswordError) {
          setPasswordError("");
          setShowPasswordError(false);
        }
        break;
      case "confirmPassword":
        if (ConfirmPasswordError) {
          setConfirmPasswordError("");
          setShowConfirmPasswordError(false);
        }
        break;
      default:
        break;
    }
  };

  const handleBlur = (field) => {
    if (field !== "" && !isTyping) {
      setTouchedFields((prevState) => ({ ...prevState, [field]: true }));
    }
    switch (field) {
      case "name":
        if (name.length > 30 && name !== "") {
          setNameError("Name cannot be more than 30 characters");
          setShowNameError(true);
        } else {
          setNameError("");
          setShowNameError(false);
        }
        break;
      case "email":
        if (email !== "" && !validateEmail(email)) {
          setEmailError("Enter a valid email address");
          setShowEmailError(true);
        } else {
          setEmailError("");
          setShowEmailError(false);
        }
        break;
      case "keNumber":
        if (keNumber !== "" && (keNumber.length !== 13 || !keNumber.startsWith("040"))) {
          setKeNumberError("Enter a valid 13 digit account number starting with 040");
          setShowKeNumberError(true);
        } else {
          setKeNumberError("");
          setShowKeNumberError(false);
        }
        break;
      case "password":
        if (password !== "" && password.length < 8) {
          setPasswordError("Password must be at least 8 characters long");
          setShowPasswordError(true);
        } else {
          setPasswordError("");
          setShowPasswordError(false);
        }
        break;
      case "confirmPassword":
        if ((password !== "" || confirmPassword !== "") && confirmPassword !== password) {
          setConfirmPasswordError("Passwords do not match");
          setShowConfirmPasswordError(true);
        } else {
          setConfirmPasswordError("");
          setShowConfirmPasswordError(false);
        }
        break;
      default:
        break;
    }
  };

  const handleChange = () => {
    setIsTyping(true);
  };

  const handleSubmit = async () => {
    if (name === "" || email === "" || password === "" || confirmPassword === "" || keNumber === "") {
      console.log("Please fill in all fields")
      setError("Please fill in all fields");
      setShowError(true);
      return;
    }
    if (NameError || EmailError || KeNumberError || PasswordError || ConfirmPasswordError) {
      setShowNameError(true);
      setShowEmailError(true);
      setShowKeNumberError(true);
      setShowPasswordError(true);
      setShowConfirmPasswordError(true);
      setError("Please fill in all fields correctly");
      setShowError(true);
      return;
    }
    setLoading(true);

    const data = {
      name: name,
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
      <ScrollView style={[GlobalStyles.screenContainer, styles.container]}contentContainerStyle={styles.scrollViewContent}>
      <Text style={styles.header}>Welcome! Create Your Account👋</Text>

        <View
          style={[
            styles.inputContainer,
            { borderColor: showNameError ? "red" : "#ccc"}
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
        {NameError ? <Text style={styles.errorText}>{NameError}</Text> : null}

        <View
          style={[
            styles.inputContainer,
            { borderColor: showEmailError ? "red" : "#ccc"}
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
        {EmailError ? <Text style={styles.errorText}>{EmailError}</Text> : null}

        <View
          style={[
            styles.inputContainer,
            { borderColor: showKeNumberError ? "red" : "#ccc"}
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
        {KeNumberError ? <Text style={styles.errorText}>{KeNumberError}</Text> : null}

        <View
          style={[
            styles.inputContainer,
            { borderColor: showPasswordError || showConfirmPasswordError? "red" : "#ccc"}
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
        {PasswordError ? <Text style={styles.errorText}>{PasswordError}</Text> : null}

        <View
          style={[
            styles.inputContainer,
            { borderColor: showConfirmPasswordError ? "red" : "#ccc"}
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
        {ConfirmPasswordError ? <Text style={styles.errorText}>{ConfirmPasswordError}</Text> : null}

        {error ? <Text style={styles.errorText}>{error}</Text> : null}
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
            <Text style={styles.footerTextHighlight}>Sign In</Text>
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
    padding: 10,
  },
  header: {
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 20,
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
