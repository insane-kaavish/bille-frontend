import React from "react";
import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
import { Colors, GlobalStyles } from "../Styles/GlobalStyles";
import Navbar from "../Components/Navbar";
import Header from "../Components/Header";

const height = Dimensions.get("window").height;

const HelpCenterScreen = ({ navigation }) => {
  return (
    <>
      <Header screenName="Help Center" navigation={navigation} />
      <ScrollView style={GlobalStyles.screenContainer}>
        <View style={styles.mainContainer}>
          {/* <Text style={styles.title}>Help Center</Text> */}

          <Text style={styles.subtitle}>About the App</Text>
          <Text style={styles.paragraph}>
            Bill-E is an intuitive app designed to help you manage and track your utility expenses. With real-time data analytics, Bill-E offers insights into your consumption patterns, helping you make informed decisions to reduce your monthly bills. Whether you're looking to monitor electricity, water, or gas usage, Bill-E provides a comprehensive overview of your utility consumption and expenses.
          </Text>
          <Text style={styles.paragraph}>
            In addition to tracking, Bill-E also provides predictive analysis based on your past usage to forecast future bills, allowing for better budgeting and expense planning. Our goal is to empower users with the knowledge to save on their utilities and promote a more sustainable lifestyle.
          </Text>

          <Text style={styles.subtitle}>Need Assistance?</Text>
          <Text style={styles.paragraph}>
            Our support team is here to help! If you have any questions or require technical assistance, please feel free to reach out to us at support@example.com. Our dedicated team is available 24/7 to provide you with the support you need.
          </Text>

          {/* Empty space to ensure content is not hidden behind navbar */}
          <View style={{ height: 50 }} />
        </View>
      </ScrollView>
      <Navbar />
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 24,
    fontWeight: "600",
    marginTop: 15,
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 18,
    marginBottom: 20,
    lineHeight: 28,
  },
});

export default HelpCenterScreen;
