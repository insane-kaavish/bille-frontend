import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const RoomData = ({navigation}) => {
  return (
    <View style={styles.container}>
        <TouchableOpacity 
        style={styles.submitButton}
        onPress={() => navigation.navigate('DataComplete')}>
            <Text style={styles.submitText}>Submit</Text>    
        </TouchableOpacity>
      
      <View style={styles.roomSection}>
        <View style={styles.closeIcon} />
        <Text style={styles.roomName}>Enter Room Name</Text>
        <Text style={styles.roomTitle}>Room</Text>
        <View style={styles.addRoomIcon} />
      </View>

      <View style={styles.setupTitle}>
        <Text style={styles.setupText}>Setup</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    position: 'relative',
    backgroundColor: 'white',
    boxShadow: '0px 3px 6px rgba(18, 15, 40, 0.12)',
  },
  submitButton: {
    width: 348,
    paddingTop: 12,
    paddingBottom: 12,
    left: 23,
    top: 761,
    position: 'absolute',
    backgroundColor: '#535CE8',
    borderRadius: 26,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  submitText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Lato',
    fontWeight: '400',
    lineHeight: 28,
    wordWrap: 'wrap',
  },
  roomSection: {
    width: 348,
    height: 79,
    left: 20,
    top: 179,
    position: 'absolute',
  },
  closeIcon: {
    width: 348,
    height: 79,
    paddingLeft: 302,
    paddingRight: 26,
    left: 0,
    top: 0,
    position: 'absolute',
    backgroundColor: '#FAFAFB',
    boxShadow: '0px 8px 17px rgba(23, 26, 31, 0.23)',
    borderRadius: 16,
    justifyContent: 'flex-end',
    alignItems: 'center',
    display: 'flex',
  },
  roomName: {
    left: 82,
    top: 39,
    position: 'absolute',
    color: '#BCC1CA',
    fontSize: 14,
    fontFamily: 'Outfit',
    fontWeight: '600',
    lineHeight: 22,
    wordWrap: 'wrap',
  },
  roomTitle: {
    left: 82,
    top: 11,
    position: 'absolute',
    color: '#171A1F',
    fontSize: 24,
    fontFamily: 'Outfit',
    fontWeight: '600',
    lineHeight: 36,
    wordWrap: 'wrap',
  },
  addRoomIcon: {
    width: 54,
    height: 54,
    padding: 13,
    left: 16,
    top: 11,
    position: 'absolute',
    backgroundColor: '#7B48CC',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  setupTitle: {
    left: 21,
    top: 115,
    position: 'absolute',
  },
  setupText: {
    textAlign: 'center',
    color: '#171A1F',
    fontSize: 32,
    fontFamily: 'Outfit',
    fontWeight: '700',
    lineHeight: 48,
    wordWrap: 'wrap',
  },
});

export default RoomData;
