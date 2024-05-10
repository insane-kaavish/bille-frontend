import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Image,
} from "react-native";
import { useAuth } from "./Auth/AuthProvider";
import { Colors } from "./Styles/GlobalStyles";

// const API_URL = process.env.EXPO_PUBLIC_API_URL;
const API_URL = "http://10.15.4.82:8000a"

const handleScrape = async (token) => {
  try {
    const response = await fetch(`${API_URL}/scrape/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    });
    if (response.status !== 202) return false;
    return response;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const checkStatus = async (token, task_id) => {
  try {
    const response = await fetch(`${API_URL}/task_status/?task_id=${task_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    });
    const data = await response.json();
    if (data.status === "SUCCESS") {
      return true;
    }
    return false;
  } catch (error) {
    console.error(error);
  }
};

const HomeScreen = ({ navigation }) => {
  const { authToken } = useAuth();
  const catPosition = useRef(new Animated.Value(-100)).current; // Changed initial value to -100

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
      const response = await handleScrape(authToken);
      if (response) {
        const data = await response.json();
        console.log(data);
        const { task_id } = data;
        let status = false;
        const intervalId = setInterval(async () => {
          status = await checkStatus(authToken, task_id);
          if (status) {
            clearInterval(intervalId);
            navigation.navigate("Dashboard");
          }
        }, 15000);
      }
    };
    fetchData();
  }, [authToken, navigation]);

  return (
    <View style={[styles.container, { backgroundColor: Colors.color }]}>
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
});

export default HomeScreen;
