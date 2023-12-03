import React from 'react';
import { TouchableOpacity, StyleSheet, Image, View } from 'react-native';


const IconButton = () => {
  return (
    /* Icon */
    <TouchableOpacity style={styles.iconContainer}
    onPress={() =>
        console.log('icon pressed')
        }
    >
      <View style={styles.iconImageContainer}>
        <Image
          style={styles.iconImage}
          // source={{ uri: 'https://via.placeholder.com/44x44' }}
        />
        <View style={styles.iconOverlay}></View>
      </View>
      {/* <TouchableOpacity onPress={() =>
        // console.log('icon pressed');
        navigation.navigate('DataInput')
        }>
        
      </TouchableOpacity> */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    width: 44,
    height: 44,
    left: 316,
    top: 52,
    position: 'absolute',
    backgroundColor: '#CACDF8',
    borderRadius: 22,
    overflow: 'hidden',
  },
  iconImageContainer: {
    width: 44,
    height: 44,
    position: 'absolute',
  },
  iconImage: {
    width: 44,
    height: 44,
    position: 'absolute',
    left: 0,
    top: 0,
  },
  iconOverlay: {
    width: 11,
    height: 11,
    left: 32,
    top: 32,
    position: 'absolute',
    backgroundColor: '#1DD75B',
    borderRadius: 5.5,
    borderWidth: 1.5,
    borderColor: 'white',
  },
});

export default IconButton;
