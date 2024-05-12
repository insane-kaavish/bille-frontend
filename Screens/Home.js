import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Image,
  Modal,
  TextInput,
  Dimensions,
} from "react-native";
import { useAuth } from "./Auth/AuthProvider";
import { Colors } from "./Styles/GlobalStyles";
import { useBill } from "./Components/BillProvider";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

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

const HomeScreen = ({ navigation }) => {
  const { authToken, logout } = useAuth();
  const { fetchPredictedData } = useBill();
  const [modalVisible, setModalVisible] = useState(false);
  const [error, setError] = useState("");
  const [errorCode, setErrorCode] = useState(0);
  const [isError, setIsError] = useState(false);
  const [scrape, setScrape] = useState(false);
  const [retry, setRetry] = useState(false);
  const [accountNumber, setAccountNumber] = useState("");
  const [inputError, setInputError] = useState(false);
  const catPosition = useRef(new Animated.Value(-100)).current;

  const handleScrape = async () => {
    try {
      const response = await fetch(`${API_URL}/scrape/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${authToken}`,
        },
      });
      if (response.status !== 202)
        throw new Error("Failed to initiate scraping");
      return response;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const checkStatus = async (task_id) => {
    try {
      const response = await fetch(
        `${API_URL}/task_status/?task_id=${task_id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${authToken}`,
          },
        }
      );
      const data = await response.json();
      console.log(data);
      if (data.status === "SUCCESS" && data.result.status !== 200) {
        const errorMessages = {
          500: "Failed to scrape data. Please retry.",
          404: "Account not found. Please update your account number.",
        };
        setError(
          errorMessages[data.result.status] || "An unknown error occurred."
        );
        setErrorCode(data.result.status);
        setModalVisible(true);
        setIsError(true);
        return false;
      }
      return data.status === "SUCCESS";
    } catch (error) {
      console.error(error);
      setError("An error occurred while checking status.");
      setModalVisible(true);
      setIsError(true);
      return false;
    }
  };

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(catPosition, {
          toValue: 100,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(catPosition, {
          toValue: -100,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const intervalIdRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await handleScrape();
      if (response) {
        const data = await response.json();
        console.log(data);
        const { task_id } = data;
        intervalIdRef.current = setInterval(async () => {
          const status = await checkStatus(task_id);
          if (status) {
            clearInterval(intervalIdRef.current);
            fetchPredictedData();
            navigation.navigate("Dashboard");
          }
        }, 15000);
      }
    };
    fetchData();

    // Clear interval on component unmount or when fetchData is called again
    return () => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
      }
    };
  }, [authToken, scrape]); // re-run the effect if authToken or scrape changes

  useEffect(() => {
    if (isError) {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
        console.log("Error occurred, stopping the interval.");
      }
    }
  }, [isError]); // this effect runs when isError changes

  const handleRetry = async () => {
    setRetry(false);
    setIsError(false);
    setScrape(true);
    setModalVisible(false);
  };

  const handleLogout = () => {
    logout();
    setModalVisible(false);
    setRetry(false);
    setIsError(false);
    navigation.navigate("Signin");
  };

  const handleUpdateAccount = async () => {
    if (!accountNumber) {
      setError("Account number cannot be empty.");
      setModalVisible(true);
      return;
    }
    try {
      await updateUser(authToken, { ke_num: accountNumber });
      setModalVisible(false);
      setScrape(true);
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to update account number.");
      setModalVisible(true);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: Colors.color }]}>
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>{error}</Text>
            {errorCode === 404 && (
              <View
              style={[
                styles.inputContainer,
                { borderColor: inputError ? "red" : "#ccc" },
              ]}
            >
              <TextInput
                style={styles.input}
                placeholder="Account Number"
                value={accountNumber}
                onChangeText={setAccountNumber}
              />
              </View>
            )}
          <View style={styles.buttonFlex}>
            {errorCode === 404 && (
              <TouchableOpacity
                style={styles.addButton}
                onPress={handleUpdateAccount}
              >
                <Text style={styles.addButtonText}>Update Account</Text>
              </TouchableOpacity>
            )}
            {errorCode === 500 && (
            <TouchableOpacity style={styles.addButton} onPress={handleRetry}>
              <Text style={styles.addButtonText}>Retry</Text>
            </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.addButton} onPress={handleLogout}>
              <Text style={styles.addButtonText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View style={styles.backgroundCircle} />
      <Text style={styles.content}>
        We are preparing the best experience for you. This may take a few
        minutes. {"\n\n"}
        Meanwhile, enjoy watching our configuration assistant rushing to set
        your application for you.
      </Text>
      <Animated.View
        style={[styles.widget, { transform: [{ translateX: catPosition }] }]}
      >
        <Image
          source={require("../assets/Cat.gif")}
          style={{ width: 180, height: 150 }}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  // Add styles for modalContainer, modalText, input
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  backgroundCircle: {
    width: 504,
    height: 462,
    borderRadius: 9999,
    backgroundColor: "white",
    position: "absolute",
    top: -266,
  },
  content: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginTop: 30,
    fontFamily: "Lato-Bold",
    marginBottom: 30,
  },
  widget: {
    width: 100,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  button: {
    width: "70%",
    paddingVertical: 12,
    backgroundColor: "white",
    borderRadius: 26,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#171A1F",
    fontFamily: "Lato-Bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
  },
  input: {
    width: "80%",
    padding: 10,
    backgroundColor: "white",
    borderRadius: 10,
    marginBottom: 20,
  },
  modalView: {
    margin: 20, // Ensure there's some space around the modal to not touch the edges of the screen
    backgroundColor: "white",
    borderRadius: 20, // Soften the edges with a rounded border
    padding: 25, // Generous padding for internal spacing
    alignItems: "center", // Center-align items for a polished look
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 }, // Reduced height for a closer shadow
    shadowOpacity: 0.5, // Lower opacity for a softer appearance
    shadowRadius: 20, // Increased radius to blur edges more
    elevation: 10, // Adjust elevation for Android to match visual consistency
    justifyContent: "center", // Center the modal content vertically
    alignSelf: "center", // Center the modal content horizontally
    top: "20%",
  },
  modalTitle: {
    fontSize: 24, // Increased font size for greater emphasis
    fontFamily: "Lato-Bold", // Ensuring the font is bold
    color: "#007AFF", // A strong but not overwhelming color
    marginBottom: 20, // Increased bottom margin to separate from body text
    textAlign: "center", // Centered text to match the modal's alignment
  },
  buttonFlex: {
    flexDirection: "row", // Align buttons horizontally
    justifyContent: "space-between", // Distribute space evenly between buttons
    padding: 10, // Add padding around the buttons for touchability
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007AFF",
    borderRadius: 18,
    padding: 10,
    alignSelf: "center",
    margin: 10,
  },
  addButtonText: {
    color: "white",
    fontSize: 16,
    fontFamily: "Lato-Bold",
  },
});

export default HomeScreen;
