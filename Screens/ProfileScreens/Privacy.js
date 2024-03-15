import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  MenuProvider,
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import MenuComponent from "../Components/Header";
import NavBar from "../Components/NavBar";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

const PrivacyPolicyScreen = () => {
  const navigation = useNavigation();

  return (
    <>
      <StatusBar style="auto" />
      <SafeAreaView edges={["right", "top", "left"]} style={{ flex: 1 }}>
      <ScrollView style={styles.maincontainer}>
        {/* <Text style={styles.header}>Privacy Policy</Text> */}

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Information We Collect</Text>
          <Text style={styles.sectionText}>
            We collect information you provide directly to us, such as your
            name, email address, and any other information you choose to
            provide.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>How We Use Your Information</Text>
          <Text style={styles.sectionText}>
            The information we collect is used to provide, maintain, and improve
            our services. We may also use the information to send you updates
            and promotional content.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Information Sharing</Text>
          <Text style={styles.sectionText}>
            We do not share your personal information with third parties unless
            required by law or with your consent.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Security</Text>
          <Text style={styles.sectionText}>
            We take reasonable measures to protect your information from
            unauthorized access or disclosure.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>
            Changes to This Privacy Policy
          </Text>
          <Text style={styles.sectionText}>
            We may update our Privacy Policy from time to time. Any changes will
            be reflected on this page.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Contact Us</Text>
          <Text style={styles.sectionText}>
            If you have any questions about our Privacy Policy, please contact
            us at privacy@example.com.
          </Text>
        </View>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Back to Settings</Text>
        </TouchableOpacity>
      </ScrollView>

      <NavBar />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingHorizontal: 10,
    paddingTop: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  maincontainer: {
    flex: 1,
    // justifyContent:'center',
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: "white",
  },

  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  sectionText: {
    fontSize: 16,
    color: "#424955",
  },
  backButton: {
    backgroundColor: "#535CE8",
    borderRadius: 20,
    padding: 12,
    alignItems: "center",
    width: "70%",
    alignSelf: "center",
    marginVertical: 20,
  },
  backButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default PrivacyPolicyScreen;
