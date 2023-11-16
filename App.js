import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import IntroductionScreen from './Screens/IntroductionScreen'; // Adjust the import path as necessary
import SigninScreen from './Screens/SigninScreen'; // Adjust the import path as necessary
import CreateAccount from './Screens/CreateAccount';

const Stack = createNativeStackNavigator();

const App = () => {
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
          component={SigninScreen}
          // Add options here if you need to
        />
        <Stack.Screen
          name="CreateAccount"
          component={CreateAccount}
          options={{ headerShown: false }} // Assuming you don't want to show the header
        />
        {/* Add other screens as you create them */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// At the bottom of App.js
export default App;

