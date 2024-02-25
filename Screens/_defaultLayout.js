import React from 'react';
import { View, StatusBar } from 'react-native';

const DefaultLayout = ({ children }) => {
  return (
    <View style={{ flex: 1, backgroundColor: 'white', paddingTop: StatusBar.currentHeight }}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      {children}
    </View>
  );
};

export default DefaultLayout;
