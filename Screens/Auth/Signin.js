import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useAuth } from "./AuthProvider";

import { Colors, GlobalStyles } from "../Styles/GlobalStyles";
import { SafeAreaView } from "react-native-safe-area-context";

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const SigninScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const { authToken, login } = useAuth();

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setError("");
      setShowError(false);
      setEmail("");
      setPassword("");
      setEmailTouched(false);
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    return () => {
      setEmail("");
      setPassword("");
    };
  }, []);

  useEffect(() => {
    if (emailTouched) {
      if (!validateEmail(email)) {
        setError("Please enter a valid email address");
        setShowError(true);
      } else {
        setError("");
        setShowError(false);
      }
    }
  }, [email, emailTouched]);

  const handleEmailBlur = () => {
    setEmailTouched(true);
  };

  const handlePasswordFocus = () => {
    if (error) {
      setError("");
      setShowError(false);
    }
  };

  const handleEmailFocus = () => {
    if (error) {
      setError("");
      setShowError(false);
    }
  };

  const handleSubmit = async () => {
    if (email === "" || password === "") {
      setError("Please enter email and password");
      setShowError(true);
      return;
    }

    setLoading(true);
    console.log("Signing in...");
    console.log(email, password);
    if (await login(email, password)) {
      console.log(authToken);
      setLoading(false);
      navigation.navigate("Dashboard");
    } else {
      setLoading(false);
      setError("Email address or password is incorrect");
      setShowError(true);
    }
  };

  return (
    <>
      <View style={[GlobalStyles.screenContainer, styles.container]}>
        <Text style={styles.header}>Welcome back 👋</Text>
        <View
          style={[
            styles.inputContainer,
            { borderColor: showError ? "red" : "#ccc" },
          ]}
        >
          <TextInput
            style={styles.input}
            placeholder="Enter email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            onBlur={handleEmailBlur}
            onFocus={handleEmailFocus}
            ref={emailInputRef}
          />
        </View>
        <View
          style={[
            styles.inputContainer,
            { borderColor: showError ? "red" : "#ccc" },
          ]}
        >
          <TextInput
            style={styles.input}
            placeholder="Enter password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            autoCapitalize="none"
            onFocus={handlePasswordFocus}
            ref={passwordInputRef}
          />
        </View>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.buttonText}>Sign In</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
        <Text style={styles.footerText}>
          Don't have an account?{" "}
          <Text style={styles.signUpText}>Sign up</Text>
        </Text>
      </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
  input: {
    padding: 10,
    borderColor: Colors.border,
  },
  button: {
    backgroundColor: Colors.buttonColor,
    borderRadius: 26,
    marginTop: "5%",
    width: "90%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: Colors.white,
    fontSize: 18,
  },
  footerText: {
    fontSize: 16,
    // fontWeight: "700",
    color: Colors.black,
    marginTop: 20,
  },
  signUpText: {
    color: Colors.buttonColor,
    // fontWeight: "700",
    textDecorationLine: "underline",
  },
  errorText: {
    color: Colors.error,
    marginBottom: 10,
  },
});

export default SigninScreen;
