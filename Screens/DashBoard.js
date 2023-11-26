import React from 'react';
import { TouchableOpacity ,StyleSheet, ScrollView ,Image,  View, Text } from 'react-native';
// import styles from './YourStyleSheet';

const DashBoard = () => {
  return (
    <View style={styles.container}>
         {/* BillE */}
        <View style={styles.BillEcontainer}>
            <Text style={styles.BillEtext}>Bill-E</Text>
        </View>
        {/* Icon */}
        <View style={styles.Iconcontainer}>
            <View style={styles.IconimageContainer}>
                <Image
                    style={styles.Iconimage}
                    // source={{ uri: 'https://via.placeholder.com/44x44' }}
                />
                <View style={styles.Iconoverlay}>
                <View></View>
                </View>
            </View>
        </View>
        {/* Date*/}
        <View style={styles.Datecontainer}>
            <Text style={styles.Datetext}>TUES 11 JUL</Text>
        </View>
        {/* over view text */}
        <View style={styles.OVcontainer}>
            <Text style={styles.OVtext}>Overview</Text>
        </View>
        {/* Current units container or container 4 */}
        <View style={styles.c4}>
            <View style={styles.c4circleContainer}>
                <View style={styles.c4innerCircleContainer}>
            <View style={styles.c4innermostCircleContainer}>
            {/* <View style={styles.c4blackCircle}></View> */}
            <View style={styles.c4greenCircle}></View>
          </View>
        </View>
      </View>
      <Text style={styles.c4title}>Current Units</Text>
      <Text style={styles.c4description}>
        Based on your current consumption data, your predicted units are 213 and consider good.
      </Text>
      <Text style={styles.c4unitsCount}>213</Text>
        </View>
    {/* Highlights */}
        <View style={styles.HLcontainer}>
            <Text style={styles.HLtitle}>Highlights</Text>
        </View>
    {/* "View more" button */}
    <View style={styles.VMbuttonContainer}>
      <TouchableOpacity style={styles.VMbutton}>
        <Text style={styles.VMbuttonText}>View more</Text>
        <View style={styles.VMarrowContainer}>
          <View style={styles.VMarrowLine}></View>
        </View>
      </TouchableOpacity>
    </View>
    {/* c11 or Expected bill container */}
    <View style={styles.c11cardContainer}>
      <Text style={styles.c11expectedBillText}>Expected Bill</Text>
      <Text style={styles.c11amountText}>Rs. 10,523.21</Text>
      <Text style={styles.c11usagePatternText}>Based on ongoing usage pattern</Text>
      <View style={styles.c11iconContainer}>
        <Image source={require('../extra/assets/c11.png')}/>

      </View>
    </View>
    {/* c13 */}
    <View style={styles.c13cardContainer}>
      <Text style={styles.c13titleText}>Latest Consumption Data</Text>
      <View style={styles.c13dateContainer}>
        <Text style={styles.c13numberText}>35</Text>
        <Text style={styles.c13daysAgoText}>days ago</Text>
      </View>
      <View style={styles.c13iconContainer}>
        <View style={styles.c13iconInnerContainer}>
        <Image source={require('../extra/assets/c13.png')}/>
        </View>
      </View>
      <Text style={styles.c13updateRequiredText}>Data Update Required!</Text>
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
    boxShadow: '0px 2px 5px rgba(23, 26, 31, 0.17)',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  BillEcontainer: {
    left: 60,
    top: 40,
    position: 'absolute',
    textAlign: 'center',
    color: '#171A1F',
    
  },
  BillEtext: {
    fontSize: 48,
    fontFamily: 'Outfit-Bold',
    fontWeight: '700',
    lineHeight: 68,
    wordWrap: 'wrap',
  },
  Iconcontainer: {
    width: 44,
    height: 44,
    left: 316,
    top: 52,
    position: 'absolute',
    backgroundColor: '#CACDF8',
    borderRadius: 22,
    overflow: 'hidden',
  },
  IconimageContainer: {
    width: 44,
    height: 44,
    position: 'absolute',
  },
  Iconimage: {
    width: 44,
    height: 44,
    position: 'absolute',
    left: 0,
    top: 0,
  },
  Iconoverlay: {
    width: 11,
    height: 11,
    left: 32,
    top: 32,
    position: 'absolute',
    backgroundColor: '#1DD75B',
    borderRadius: 5.5,
    borderWidth: 1.5,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  Datetext: {
    color: '#565E6C',
    fontSize: 12,
    fontFamily: 'Lato-Regular',
    fontWeight: '700',
    lineHeight: 20, 
    wordWrap: 'break-word',
  },
  Datecontainer: {
    left: 52,
    top: 114,
    position: 'absolute',
  },
  OVcontainer: {
    left: 21,
    top: 136,
    position: 'absolute',
  },
  OVtext: {
    color: '#171A1F',
    fontSize: 32,
    fontFamily: 'Outfit-Bold',
    fontWeight: '700',
    lineHeight: 48,
    wordWrap: 'break-word',
  },
//   c4
c4: {
    width: 348,
    height: 144,
    left: 21,
    top: 208,
    position: 'absolute',
    backgroundColor: '#F1F2FD',
    borderRadius: 16,
    shadowColor: 'rgba(23, 26, 31, 0.19)',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 9,
    elevation: 2, // for Android
  },
  c4circleContainer: {
    width: 72,
    height: 72,
    left: 259,
    top: -1,
    position: 'absolute',
  },
  c4innerCircleContainer: {
    width: 72,
    height: 72,
    left: 0,
    top: 1.31,
    position: 'absolute',
  },
  c4innermostCircleContainer: {
    width: 72,
    height: 72,
    left: 0,
    top: 0,
    position: 'absolute',
  },
  c4blackCircle: {
    width: 72,
    height: 72,
    left: 0,
    top: 0,
    position: 'absolute',
    backgroundColor: 'black',
  },
  c4greenCircle: {
    width: 62.35,
    height: 69.38,
    left: 4.82,
    top: 0,
    position: 'absolute',
    backgroundColor: '#2EE82E',
  },
  c4title: {
    left: 20,
    top: 8,
    position: 'absolute',
    color: '#171A1F',
    fontSize: 18,
    fontFamily: 'Outfit-Bold',
    fontWeight: '600',
    lineHeight: 28,
    wordWrap: 'break-word',
  },
  c4description: {
    width: 198,
    left: 20,
    top: 40,
    position: 'absolute',
    color: '#171A1F',
    fontSize: 14,
    fontFamily: 'Lato-Bold',
    fontWeight: '400',
    lineHeight: 22,
    wordWrap: 'break-word',
  },
  c4unitsCount: {
    left: 276,
    top: 12,
    position: 'absolute',
    color: 'white',
    fontSize: 24,
    fontFamily: 'Outfit-Regular',
    fontWeight: '700',
    lineHeight: 36,
    wordWrap: 'break-word',
  },
//   Highlight text
  HLcontainer: {
    left: 21,
    top: 384,
    position: 'absolute',
  },
  HLtitle: {
    color: '#171A1F',
    fontSize: 20,
    fontFamily: 'Outfit-Bold',
    fontWeight: '600',
    lineHeight: 30,
    wordWrap: 'break-word',
  },
//   View more button
  VMbuttonContainer: {
    position: 'absolute',
    left: 285,
    top: 385,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 3,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  VMbutton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  VMbuttonText: {
    color: '#424955',
    fontSize: 11,
    fontFamily: 'Lato-Bold',
    fontWeight: '400',
    lineHeight: 18,
    wordWrap: 'break-word',
  },
  VMarrowContainer: {
    width: 12,
    height: 12,
    marginLeft: 4,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  VMarrowLine: {
    width: 1.80,
    height: 3.60,
    borderWidth: 0.72,
    borderColor: '#424955',
  },
//   c11
c11cardContainer: {
    width: 166,
    height: 180,
    left: 21,
    top: 430,
    position: 'absolute',
    backgroundColor: '#7C83ED',
    borderRadius: 16,
    boxShadow: '0px 4px 9px rgba(23, 26, 31, 0.19)',
  },
  c11expectedBillText: {
    left: 8,
    top: 91,
    position: 'absolute',
    color: 'white',
    fontSize: 14,
    fontFamily: 'Outfit-Regular',
    fontWeight: '500',
    lineHeight: 22,
    wordWrap: 'break-word',
  },
  c11amountText: {
    left: 7,
    top: 113,
    position: 'absolute',
    color: 'white',
    fontSize: 24,
    fontFamily: 'Outfit-Bold',
    fontWeight: '500',
    lineHeight: 36,
    wordWrap: 'break-word',
  },
  c11usagePatternText: {
    left: 7,
    top: 149,
    position: 'absolute',
    color: 'white',
    fontSize: 11,
    fontFamily: 'Lato-Bold',
    fontWeight: '400',
    lineHeight: 18,
    wordWrap: 'break-word',
  },
  c11iconContainer: {
    width: 58,
    height: 58,
    left: 90,
    top: 17,
    position: 'absolute',
  },
  c11icon: {
    width: 38.67,
    height: 48.33,
    left: 9.67,
    top: 4.83,
    position: 'absolute',
    backgroundColor: 'white',
  },
//   c13
c13cardContainer: {
    width: 166,
    height: 180,
    left: 202,
    top: 430,
    position: 'absolute',
    backgroundColor: '#2ACCCF',
    borderRadius: 16,
    boxShadow: '0px 4px 9px rgba(23, 26, 31, 0.19)',
  },
  c13titleText: {
    left: 4,
    top: 94,
    position: 'absolute',
    color: 'white',
    fontSize: 14,
    fontFamily: 'Outfit-Regular',
    fontWeight: '500',
    lineHeight: 22,
    // wordWrap: 'break-word',
  },
  c13dateContainer: {
    left: 9,
    top: 113,
    position: 'absolute',
    flexDirection: 'row',
  },
  c13numberText: {
    color: '#FE8754',
    fontSize: 24,
    fontFamily: 'Outfit-Regular',
    fontWeight: '500',
    lineHeight: 36,
    // wordWrap: 'break-word',
  },
  c13daysAgoText: {
    top: 11,
    color: '#FE8754',
    fontSize: 14,
    fontFamily: 'Outfit-Regular',
    fontWeight: '500',
    lineHeight: 22,
    // wordWrap: 'break-word',
  },
  c13iconContainer: {
    width: 60,
    height: 60,
    left: 88,
    top: 16,
    position: 'absolute',
  },
  c13iconInnerContainer: {
    width: 50.05,
    height: 50.69,
    left: 6.04,
    top: 4.36,
    position: 'absolute',
  },
  
  c13updateRequiredText: {
    left: 12,
    top: 149,
    position: 'absolute',
    color: 'white',
    fontSize: 11,
    fontFamily: 'Lato-Bold',
    fontWeight: '400',
    lineHeight: 18,
    // wordWrap: 'break-word',
  },

});


export default DashBoard;