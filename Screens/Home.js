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
  Dimensions
} from "react-native";
import { useAuth } from "./Auth/AuthProvider";
import { Colors } from "./Styles/GlobalStyles";
import { useBill } from "./Components/BillProvider";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

const HomeScreen = ({ navigation }) => {
  const { authToken, logout } = useAuth(); // Assuming logout method is available via useAuth
  const { fetchPredictedData } = useBill();
  const [retry, setRetry] = useState(false);
  const [updateAccount, setUpdateAccount] = useState(false);
  const [accountNumber, setAccountNumber] = useState('');
  const [showAccountModal, setShowAccountModal] = useState(false);
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
      if (response.status !== 202) return false;
      return response;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const checkStatus = async (task_id) => {
    try {
      const response = await fetch(`${API_URL}/task_status/?task_id=${task_id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${authToken}`,
        },
      });
      const data = await response.json();
      if (data.status === "SUCCESS") {
        if (data.result.status === 500) {
          console.error("Error: Failed to scrape data");
          setRetry(true);
          return false
        }
        if (data.result.status === 404) {
          console.error("Error: Account not found");
          setUpdateAccount(true);
          return false;
        }
        return true;
      }
      return false;
    } catch (error) {
      console.error(error);
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

  useEffect(() => {
    const fetchData = async () => {
      const response = await handleScrape();
      if (response) {
        const data = await response.json();
        console.log(data);
        const { task_id } = data;
        let status = false;
        const intervalId = setInterval(async () => {
          status = await checkStatus(task_id);
          if (status) {
            clearInterval(intervalId);
            fetchPredictedData();
            navigation.navigate("Dashboard");
          }
          if (retry || updateAccount) clearInterval(intervalId);
        }, 15000);
      }
    };
    fetchData();
  }, [authToken, navigation]);

  const handleRetry = async () => {
    setRetry(false);
    const response = await handleScrape();
    if (response) {
      const data = await response.json();
      console.log(data);
      const { task_id } = data;
      let status = false;
      const intervalId = setInterval(async () => {
        status = await checkStatus(task_id);
        if (status) {
          clearInterval(intervalId);
          navigation.navigate("Dashboard");
        }
      }, 15000);
    }
  };

  const handleLogout = () => {
    setUpdateAccount(false);
    logout();
    navigation.navigate("Signin");
    setRetry(false);
  };

  return (
    <View style={[styles.container, { backgroundColor: Colors.color }]}>
      <Modal visible={retry} animationType="slide"
          transparent={true}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>A problem occurred, what would you like to do?</Text>
          <TouchableOpacity style={styles.button} onPress={handleRetry}>
            <Text style={styles.buttonText}>Retry</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleLogout}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <Modal visible={updateAccount} transparent>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Account not found, please update your account number or logout.</Text>
          <TouchableOpacity style={styles.button} onPress={() => setShowAccountModal(true)}>
            <Text style={styles.buttonText}>Update Account Number</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleLogout}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <Modal visible={showAccountModal} transparent>
        <View style={styles.modalContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter your new account number"
            value={accountNumber}
            onChangeText={setAccountNumber}
          />
          <TouchableOpacity style={styles.button} onPress={() => {
            // Add logic to handle account update
            setShowAccountModal(false);
          }}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalText: {
    color: "white",
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    padding: 10,
    backgroundColor: 'white',
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
    position: "absolute", // Positions the modal view absolutely relative to its parent
    top: "50%", // Places the top edge of the modal at the center of the parent
    left: "50%", // Places the left edge of the modal at the center of the parent
    transform: [
      { translateX: -Dimensions.get("window").width * 0.5 }, // Shifts the modal to the left by 40% of the screen width
      { translateY: -Dimensions.get("window").height * 0.31 },
    ],
  },
  modalTitle: {
    fontSize: 24, // Increased font size for greater emphasis
    fontFamily: "Lato-Bold", // Ensuring the font is bold
    color: "#007AFF", // A strong but not overwhelming color
    marginBottom: 20, // Increased bottom margin to separate from body text
    textAlign: "center", // Centered text to match the modal's alignment
  },
});

export default HomeScreen;
