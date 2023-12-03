import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, Image, View, Text } from 'react-native';
import IconMenu from './IconMenu';

const NewComponent = () => {
  // Implement the content and behavior of the new component here
  return (
    <View >
      {/* Content of the new component */}
      {/* <Text>New Component Content</Text> */}
      <IconMenu/>
    </View>
  );
};

const IconButton = () => {
  const [isNewComponentVisible, setNewComponentVisible] = useState(false);

  const handleIconPress = () => {
    console.log('icon pressed');
    // Set the state to make the new component visible
    if(setNewComponentVisible(false)){setNewComponentVisible(true);}
    else if (setNewComponentVisible(true)){setNewComponentVisible(false);}
    
  };

  return (
    <View style={styles.container}>
      {/* Your existing IconButton */}
      <TouchableOpacity style={styles.iconContainer} onPress={handleIconPress}>
        <View style={styles.iconImageContainer}>
          <Image
            style={styles.iconImage}
            // source={{ uri: 'https://via.placeholder.com/44x44' }}
          />
          <View style={styles.iconOverlay}></View>
        </View>
      </TouchableOpacity>

      {/* Conditionally render the NewComponent based on state */}
      {isNewComponentVisible && <NewComponent />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: '',
    top: 52 ,
    left: 316,
  },
  iconContainer: {
    width: 44,
    height: 44,
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

const newComponentStyles = StyleSheet.create({
  container: {
    width: '252',
    height: '368',
    position: 'relative',
    backgroundColor: 'white',
  },
});

export default IconButton;
