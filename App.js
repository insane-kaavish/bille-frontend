import React ,{ useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Font from 'expo-font';
import IntroductionScreen from './Screens/IntroductionScreen'; // Adjust the import path as necessary
import SignInScreen from './Screens/SigninScreen'; // Adjust the import path as necessary
import CreateAccount from './Screens/CreateAccount';
import LoginLaunch from './Screens/LoginLaunch';
// import InitialDataInput from './Screens/DataInput';
import DataInput from './Screens/DataInput';
import RoomData from './Screens/RoomData';
import DataComplete from './Screens/DataComplete';
import Home from './Screens/Home';
import DashBoard from './Screens/DashBoard';


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
        // Add other font weights and styles as needed
        // 'Lato-Bold': require('./assets/fonts/Lato-Bold.ttf'),
        // 'Outfit-Regular': require('./assets/fonts/Outfit-Regular.ttf'),
      });
      setFontsLoaded(true);
    };

    loadFonts();
  }, []);

  // if (!fontsLoaded) {
  //   return <Text>Loading...</Text>;
  // }
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Introduction">
        <Stack.Screen
          name="Introduction"
          component={IntroductionScreen}
          options={{ headerShown: false }} // Assuming you don't want a header for the intro screen
        />
        <Stack.Screen
          name="SignIn"
          component={SignInScreen}
          options={{ headerShown: false }}
          // Add options here if you need to
        />
        <Stack.Screen
          name="CreateAccount"
          component={CreateAccount}
          options={{ headerShown: false }} // Assuming you don't want to show the header
        />
        <Stack.Screen
          name="LoginLaunch"
          component={LoginLaunch}
          options={{ headerShown: false }} // Assuming you don't want to show the header
        />
        <Stack.Screen
          name="DataInput"
          component={DataInput}
          options={{ headerShown: false }} // Assuming you don't want to show the header
        />
        <Stack.Screen
          name="RoomData"
          component={RoomData}
          options={{ headerShown: false }} // Assuming you don't want to show the header
        />
        <Stack.Screen
          name="DataComplete"
          component={DataComplete}
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
        {/* Add other screens as you create them */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// At the bottom of App.js
export default App;

