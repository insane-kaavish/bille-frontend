import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const IconMenu = () => {
  return (
    <View style={styles.container}>
      <View style={styles.borderLine}></View>
      <View style={styles.circleContainer}>
        <View style={styles.circle}></View>
      </View>
      <View style={styles.rowContainer}>
        <View style={styles.columnContainer}>
          <View style={styles.iconContainer}>
            <View style={styles.icon}></View>
          </View>
          <Text style={styles.labelText}>Night mode</Text>
        </View>
      </View>
      <View style={styles.largeBox}>
        <View style={styles.rowContainer}>
          <View style={styles.columnContainer}>
            <View style={styles.editProfileIconContainer}>
              <View style={styles.editProfileIcon}></View>
            </View>
            <Text style={styles.labelTextBold}>Edit profile</Text>
          </View>
          <View style={styles.columnContainer}>
            <View style={styles.settingsIconContainer}>
              <View style={styles.settingsIcon}></View>
            </View>
            <Text style={styles.labelText}>Settings</Text>
          </View>
        </View>
      </View>
      <View style={styles.borderLine}></View>
      <View style={styles.profileImageContainer}>
        <Image style={styles.profileImage} source={{ uri: 'https://via.placeholder.com/51x51' }} />
      </View>
      <Text style={styles.profileName}>Bashir</Text>
      <Text style={styles.profileEmail}>Bashir@gmail.com</Text>
      <View style={styles.borderLine}></View>
      <View style={styles.largeBox}>
        <View style={styles.rowContainer}>
          <View style={styles.columnContainer}>
            <View style={styles.goProIconContainer}>
              <View style={styles.goProIcon}></View>
            </View>
            <Text style={styles.labelText}>Go Pro</Text>
          </View>
          <View style={styles.columnContainer}>
            <View style={styles.helpCenterIconContainer}>
              <View style={styles.helpCenterIcon}></View>
            </View>
            <Text style={styles.labelText}>Help center</Text>
          </View>
        </View>
      </View>
      <View style={styles.smallBox}>
        <View style={styles.rowContainer}>
          <View style={styles.columnContainer}>
            <View style={styles.signOutIconContainer}>
              <View style={styles.signOutIcon}></View>
            </View>
            <Text style={styles.labelText}>Sign out</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      width: 252,
      height: 368,
      left: -185,
      top: 0,
      position: 'absolute',
      backgroundColor: 'white',
      borderRadius: 4,
      shadowColor: 'rgba(23, 26, 31, 0.19)',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowRadius: 9,
      shadowOpacity: 1,
    },
    borderLine: {
      width: 252,
      height: 1,
      position: 'absolute',
      borderBottomWidth: 1,
      borderBottomColor: '#DEE1E6',
      top: 75,
    },
    circleContainer: {
      width: 48,
      height: 28,
      left: 184,
      top: 181,
      position: 'absolute',
      backgroundColor: '#BCC1CA',
      borderRadius: 14,
    },
    circle: {
      width: 23.4,
      height: 23.4,
      left: 2.3,
      top: 2.3,
      position: 'absolute',
      backgroundColor: 'white',
      borderRadius: 9999,
    },
    rowContainer: {
      flexDirection: 'row',
    },
    columnContainer: {
      flex: 1,
      alignSelf: 'stretch',
      paddingTop: 8,
      paddingBottom: 8,
      paddingLeft: 16,
      paddingRight: 57,
      backgroundColor: 'rgba(0, 0, 0, 0)',
      borderRadius: 4,
      overflow: 'hidden',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      gap: 8,
      display: 'flex',
    },
    iconContainer: {
      width: 24,
      height: 24,
      position: 'relative',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      display: 'flex',
    },
    icon: {
      width: 15,
      height: 20,
      backgroundColor: '#565E6C',
    },
    labelText: {
      color: '#565E6C',
      fontSize: 14,
      fontFamily: 'Lato',
      fontWeight: '400',
      lineHeight: 22,
      wordWrap: 'break-word',
    },
    largeBox: {
      width: 240,
      height: 80,
      left: 6,
      top: 82,
      position: 'absolute',
      backgroundColor: 'rgba(0, 0, 0, 0)',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-start',
      display: 'inline-flex',
    },
    editProfileIconContainer: {
      width: 24,
      height: 24,
      position: 'relative',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      display: 'flex',
    },
    editProfileIcon: {
      width: 18.86,
      height: 18.86,
      borderStyle: 'solid',
      borderWidth: 2.06,
      borderColor: '#535CE8',
    },
    labelTextBold: {
      color: '#535CE8',
      fontSize: 14,
      fontFamily: 'Lato',
      fontWeight: '700',
      lineHeight: 22,
      wordWrap: 'break-word',
    },
    profileImageContainer: {
      width: 51,
      height: 51,
      left: 18,
      top: 12,
      position: 'absolute',
      backgroundColor: '#CACDF8',
      borderRadius: 26,
      overflow: 'hidden',
      justifyContent: 'center',
      alignItems: 'center',
      display: 'inline-flex',
    },
    profileImage: {
      width: 51,
      height: 51,
    },
    profileName: {
      width: 163,
      height: 27,
      left: 81,
      top: 12,
      position: 'absolute',
      color: '#171A1F',
      fontSize: 14,
      fontFamily: 'Lato',
      fontWeight: '400',
      lineHeight: 22,
      wordWrap: 'break-word',
    },
    profileEmail: {
      width: 163,
      height: 24,
      left: 81,
      top: 39,
      position: 'absolute',
      color: '#9095A0',
      fontSize: 12,
      fontFamily: 'Lato',
      fontWeight: '400',
      lineHeight: 20,
      wordWrap: 'break-word',
    },
    smallBox: {
      width: 240,
      height: 40,
      left: 6,
      top: 321,
      position: 'absolute',
      backgroundColor: 'rgba(0, 0, 0, 0)',
      justifyContent: 'center',
      alignItems: 'center',
      display: 'inline-flex',
    },
    goProIconContainer: {
      width: 24,
      height: 24,
      position: 'relative',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      display: 'flex',
    },
    goProIcon: {
      width: 22,
      height: 22,
      backgroundColor: '#565E6C',
    },
    helpCenterIconContainer: {
      width: 24,
      height: 24,
      position: 'relative',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      display: 'flex',
    },
    helpCenterIcon: {
      width: 7.05,
      height: 10.29,
      borderStyle: 'solid',
      borderWidth: 2.06,
      borderColor: '#565E6C',
    },
    signOutIconContainer: {
      width: 24,
      height: 24,
      position: 'relative',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      display: 'flex',
    },
    signOutIcon: {
      width: 10.29,
      height: 18.86,
      borderStyle: 'solid',
      borderWidth: 2.06,
      borderColor: '#565E6C',
    },
  });
  export default IconMenu