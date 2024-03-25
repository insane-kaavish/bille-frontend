import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import {
  SigninScreen,
  SignupScreen,
  HomeScreen,
  DashboardScreen,
  ProfileScreen,
  SettingsScreen,
  PrivacyScreen,
  ContactScreen,
  HelpCenterScreen,
  PredictionScreen,
  RoomDetailScreen,
  RoomOverviewScreen,
  RoomDataScreen,
  DataInputScreen,
  SplashScreen,
} from "./Screens";

import { AuthProvider } from "./Screens/Auth/AuthProvider";
import { BillProvider } from "./Screens/Components/BillProvider";
import { RoomProvider } from "./Screens/Components/RoomProvider";

import * as Font from "expo-font";
import { MenuProvider } from "react-native-popup-menu";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

const Stack = createNativeStackNavigator();

const ScreenOptions = {
  headerShown: false,
};

const App = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'Lato-Regular': require('./extra/fonts/Lato/Lato-Regular.ttf'),
        'Lato-Bold': require('./extra/fonts/Lato/Lato-Bold.ttf'),
        'Outfit-Bold': require('./extra/fonts/Outfit/static/Outfit-Bold.ttf'),
        'Outfit-Regular': require('./extra/fonts/Outfit/static/Outfit-Regular.ttf'),
        'Roboto-Regular': require('./extra/fonts/Roboto/Roboto-Regular.ttf'),
        'Roboto-Bold': require('./extra/fonts/Roboto/Roboto-Bold.ttf'),
        'Roboto-Light': require('./extra/fonts/Roboto/Roboto-Light.ttf'),
      });
      setFontsLoaded(true);
    };

    loadFonts();
  }, []);

  return (
    <>
              <NavigationContainer>
      <AuthProvider>
        <BillProvider>
          <RoomProvider>
          <MenuProvider>
            <StatusBar style="auto" />
            <SafeAreaView edges={["right", "top", "left"]} style={{ flex: 1 }}>
              <Stack.Navigator
                  initialRouteName="Splash"
                  screenOptions={ScreenOptions}
                >
                  <Stack.Screen name="Splash" component={SplashScreen} />
                  <Stack.Screen name="Signin" component={SigninScreen} />
                  <Stack.Screen name="Signup" component={SignupScreen} />
                  <Stack.Screen name="RoomData" component={RoomDataScreen} />
                  <Stack.Screen name="Home" component={HomeScreen} />
                  <Stack.Screen name="Dashboard" component={DashboardScreen} />
                  <Stack.Screen name="Profile" component={ProfileScreen} />
                  <Stack.Screen name="Settings" component={SettingsScreen} />
                  <Stack.Screen name="HelpCenter" component={HelpCenterScreen} />
                  <Stack.Screen name="Prediction" component={PredictionScreen} />
                  <Stack.Screen name="Contact" component={ContactScreen} />
                  <Stack.Screen name="Privacy" component={PrivacyScreen} />
                  <Stack.Screen name="RoomOverview" component={RoomOverviewScreen} />
                  <Stack.Screen name="RoomDetail" component={RoomDetailScreen} />
                </Stack.Navigator>
            </SafeAreaView>
          </MenuProvider>
          </RoomProvider>
        </BillProvider>
      </AuthProvider>
              </NavigationContainer>
    </>
  );
};

export default App;
