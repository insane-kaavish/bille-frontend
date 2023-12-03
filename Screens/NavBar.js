import React from 'react';
import { TouchableOpacity, StyleSheet, ScrollView, Image, View, Text } from 'react-native';

const NavBar = () => {
  const handleTabPress = (tabIndex) => {
    // Implement your navigation logic here based on the tabIndex
    console.log(`Tab ${tabIndex + 1} pressed`);
  };

  return (
    /* Navigation */
    <View style={styles.navcontainer}>
      <TouchableOpacity style={styles.navtab} onPress={() => handleTabPress(0)}>
        <Image source={require('../extra/assets/nav1.png')} />
        <Text style={styles.navlabel}>Overview</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navtab} onPress={() => handleTabPress(1)}>
        <Image source={require('../extra/assets/nav2.png')} />
        <Text style={styles.navlabel}>Prediction</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navtab} onPress={() => handleTabPress(2)}>
        <Image source={require('../extra/assets/nav3.png')} />
        <Text style={styles.navlabel}>Room Wise</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navtab} onPress={() => handleTabPress(3)}>
        <Image source={require('../extra/assets/nav4.png')} />
        <Text style={styles.navlabel}>Insights</Text>
      </TouchableOpacity>
    </View>
    /* end nav */
  );
};

const styles = StyleSheet.create({
  navcontainer: {
    flexDirection: 'row',
    height: 64,
    backgroundColor: 'white',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    elevation: 5, // Android shadow
    shadowColor: '#171A1F',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
  },
  navtab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navlabel: {
    fontSize: 11,
    color: '#9095A0',
    marginTop: 4,
  },
});

export default NavBar;
