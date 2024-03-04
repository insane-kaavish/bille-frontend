import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignInScreen from './Screens/AuthScreens/Signin'; 
import CreateAccount from './Screens/AuthScreens/Signup';
// import DataInput from './Screens/Data/DataInput';
import RoomData from './Screens/Data/RoomData';
import Home from './Screens/Home';
import DashBoard from './Screens/DashBoard';
import Profile from './Screens/ProfileScreens/Profile';
// import ChangeUserName from './Screens/ProfileScreens/ChangeUserName';
import ChangeEmail from './Screens/ProfileScreens/ChangeEmail';
// import ChangePassword from './Screens/ProfileScreens/ChangePassword';
import Settings from './Screens/ProfileScreens/Settings';
import HelpCenter from './Screens/ProfileScreens/HelpCenter';
import Prediction from './Screens/Prediction';
import ContactUs from './Screens/ProfileScreens/ContactUs';
import Privacy from './Screens/ProfileScreens/Privacy';
import RoomwisePrediction from './Screens/RoomwisePrediction';
import { AuthProvider } from './Screens/AuthScreens/AuthProvider';


import * as Font from 'expo-font';
import RoomDetail from './Screens/RoomDetail';

const Stack = createNativeStackNavigator();

const App = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'Lato-Regular': require('./extra/fonts/Lato/Lato-Regular.ttf'),
        'Lato-Bold': require('./extra/fonts/Lato/Lato-Bold.ttf'),
        'Outfit-Bold': require('./extra/fonts/Outfit/static/Outfit-Bold.ttf'),
        'Outfit-Regular': require('./extra/fonts/Outfit/static/Outfit-Regular.ttf'),
      });
      setFontsLoaded(true);
    };

    loadFonts();
  }, []);

  return (
    <AuthProvider>
      <NavigationContainer>
      <Stack.Navigator initialRouteName="SignIn">
        <Stack.Screen
          name="SignIn"
          component={SignInScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CreateAccount"
          component={CreateAccount}
          options={{ headerShown: false }} // Assuming you don't want to show the header
        />
        {/* <Stack.Screen
          name="DataInput"
          component={DataInput}
          options={{ headerShown: false }} // Assuming you don't want to show the header
        /> */}
        <Stack.Screen
          name="RoomData"
          component={RoomData}
          options={{ headerShown: false }} // Assuming you don't want to show the header
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }} // Assuming you don't want to show the header
        />
        <Stack.Screen
          name="DashBoard"
          component={DashBoard}
          options={{headerShown: false }} // Assuming you don't want to show the header
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{headerShown: false }} // Assuming you don't want to show the header
        />
        <Stack.Screen
          name="ChangeEmail"
          component={ChangeEmail}
          options={{headerShown: false }} // Assuming you don't want to show the header
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{headerShown: false }} // Assuming you don't want to show the header
        />
        <Stack.Screen
          name="HelpCenter"
          component={HelpCenter}
          options={{headerShown: false }} // Assuming you don't want to show the header
        />
        <Stack.Screen
          name="Prediction"
          component={Prediction}
          options={{headerShown: false }} // Assuming you don't want to show the header
        />
        <Stack.Screen
          name="ContactUs"
          component={ContactUs}
          options={{headerShown: false }} // Assuming you don't want to show the header
        />
        <Stack.Screen
          name="Privacy"
          component={Privacy}
          options={{headerShown: false }} // Assuming you don't want to show the header
        />
        <Stack.Screen
          name="RoomwisePrediction"
          component={RoomwisePrediction}
          options={{headerShown: false }} // Assuming you don't want to show the header
        />
        <Stack.Screen
          name="RoomDetail"
          component={RoomDetail}
          options={{headerShown: false }} // Assuming you don't want to show the header
        />
      </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;

