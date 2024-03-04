import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; // Import modern icons
import { MaterialIcons } from '@expo/vector-icons';

const NavBar = () => {
  const navigation = useNavigation(); // Hook to access the navigation prop

  const navigateToOverview = () => {
    navigation.navigate('DashBoard');
  };

  const navigateToPrediction = () => {
    navigation.navigate('Prediction');
  };

  const navigateToRoomWise = () => {
    navigation.navigate('RoomwisePrediction');
  };

  return (
    <View style={styles.navBar}>
      <TouchableOpacity onPress={navigateToOverview} style={styles.navtab}>
        <MaterialCommunityIcons name="home-outline" size={32} color="#555" />
      </TouchableOpacity>
      <TouchableOpacity onPress={navigateToPrediction} style={styles.navtab}>
        <MaterialCommunityIcons name="chart-bar" size={32} color="#555" />
      </TouchableOpacity>
      <TouchableOpacity onPress={navigateToRoomWise} style={styles.navtab}>
        <MaterialIcons name="hotel" size={32} color="#555" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#EFEFEF',
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  navtab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NavBar;
