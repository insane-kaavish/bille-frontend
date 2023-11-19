import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const RoomData = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Bill-E</Text>
      <Text style={styles.setupTitle}>Setup</Text>

      {/* Room Option */}
      <View style={[styles.roomContainer, { top: height * 0.25 }]}>
        <View style={styles.iconPlaceholder} />
        <Text style={styles.roomTitle}>Room</Text>
        <Text style={styles.inputLabel}>Enter Room Name</Text>
      </View>

      {/* Add Room Option */}
      <View style={[styles.roomContainer, { top: height * 0.4, backgroundColor: 'rgba(123, 97, 255, 0.4)' }]}>
        <View style={[styles.iconPlaceholder, { backgroundColor: 'transparent' }]} />
        <Text style={[styles.roomTitle, { opacity: 0.4 }]}>Add Room</Text>
        <Text style={styles.inputLabel}>Enter Room Name</Text>
      </View>

      {/* Submit Button */}
      <TouchableOpacity
        style={styles.submitButton}
        onPress={() => {navigation.navigate('DataComplete')}}
      >
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width,
    height: '100%',
    backgroundColor: 'white',
  },
  header: {
    textAlign: 'center',
    fontSize: 48,
    fontWeight: 'bold',
    color: '#171A1F',
    position: 'absolute',
    top: height * 0.05,
    alignSelf: 'center',
  },
  setupTitle: {
    // position: 'absolute',
    top: height * 0.15,
    left: 21,
    fontSize: 32,
    // fontWeight: 'bold',
    fontFamily: 'Outfit-Bold',
    color: '#171A1F',
  },
  roomContainer: {
    position: 'absolute',
    width: '90%',
    height: 79,
    left: 20,
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
  },
  iconPlaceholder: {
    width: 54,
    height: 54,
    backgroundColor: 'rgba(123, 97, 255, 1)',
    borderRadius: 12,
    marginRight: 20,
  },
  roomTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#171A1F',
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#BCC1CA',
    position: 'absolute',
    right: 26,
  },
  submitButton: {
    position: 'absolute',
    width: '90%',
    paddingVertical: 18,
    backgroundColor: '#535CE8',
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 10,
    alignSelf: 'center',
  },
  submitText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'normal',
  },
});

export default RoomData;
