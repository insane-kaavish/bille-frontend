import React from 'react';
import {  View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { MenuProvider, Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native';
import WeatherComponent from './Weather';

const DashBoard = () => {
  const navigation = useNavigation(); // Hook to access the navigation prop

  const navigateToOverview = () => {
    navigation.navigate('DashBoard');
  };
  // Updated function to navigate to Prediction screen
  const navigateToPrediction = () => {
    navigation.navigate('Prediction'); // Ensure 'Prediction' matches the route name defined in your navigator
  };
  const navigateToRoomWise = () => {
    navigation.navigate('RoomwisePrediction');
  };
  const navigateToProfile = () => {
    navigation.navigate('EditProfile');
  };
  const units= 213
  const unitprice = 23.91;
  const expectedbill= unitprice*units
  const today = new Date();
  const dayOfWeek = today.getDay();
  const day = today.getDate();
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const dayName = daysOfWeek[dayOfWeek];
  const monthName = today.toLocaleString('default', { month: 'long' });

  const getOrdinalNum = (n) => {
    return n + (n > 0 ? ['th', 'st', 'nd', 'rd'][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10] : '');
  };

  const dateString = `${dayName} ${getOrdinalNum(day)} ${monthName}`;

  return (
    <MenuProvider skipInstanceCheck={true} style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.menuButtonContainer}>
          <Menu>
            <MenuTrigger>
              <Ionicons name="menu" size={30} color="black" />
            </MenuTrigger>
            <MenuOptions style={styles.menuOptionsStyle}>
              <MenuOption onSelect={() => {
                navigation.navigate('EditProfile');
              }}>
                <Text style={styles.menuOptionText}>Profile</Text>
              </MenuOption>
              <MenuOption onSelect={() => {
                navigation.navigate('Settings'); 
              }}>
                <Text style={styles.menuOptionText}>Settings</Text>
              </MenuOption>
              <MenuOption onSelect={() => {
                navigation.navigate('HelpCenter');
              }}>
                <Text style={styles.menuOptionText}>Help center</Text>
              </MenuOption>
              <MenuOption onSelect={() => {
                navigation.navigate('SignIn');
              }}>
                <Text style={styles.menuOptionText}>Sign out</Text>
              </MenuOption>
            </MenuOptions>
          </Menu>
        </View>
      </View>


      
      <View style={styles.BillEcontainer}>
        <Text style={styles.BillEtext}>Bill-E</Text>
      </View>
      <ScrollView>
        <View>

      <View style={styles.Datecontainer}>
        <Text style={styles.Datetext}>{dateString} <WeatherComponent/> </Text>
        
      </View>

      <View style={styles.OVcontainer}>
        <Text style={styles.OVtext}>Overview</Text>
      </View>

      <View style={styles.c4}>
        <View style={styles.c4circleContainer}>
          <View style={styles.c4innerCircleContainer}>
            <View style={styles.c4innermostCircleContainer}>
              <Image source={require('../extra/assets/OV.png')}/>
            </View>
          </View>
        </View>
        <Text style={styles.c4title}>Current Units</Text>
        <Text style={styles.c4description}>
          Based on your current consumption data, your predicted units are 213 and consider good.
        </Text>
        <Text style={styles.c4unitsCount}>213</Text>
      </View>

      <View style={styles.HLcontainer}>
        <Text style={styles.HLtitle}>Highlights</Text>
      </View>





              {/* highlights */}
      <TouchableOpacity style={styles.rectangle1} onPress = {navigateToOverview}>
        <Text style={styles.rectangle1Text}>Expected Bill: </Text>
        <Text style={styles.r1t2} > Rs. {expectedbill}</Text>
        <View style={styles.rectangle1icon}>

        <Image source={require('../extra/assets/EBIcon.png')}/>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.rectangle2} onPresss = {navigateToOverview}>
        <Text style={styles.rectangle2Text}>Per Unit Price: </Text>
        <Text style={styles.r2t2} > Rs. {unitprice}</Text>
        <View style={styles.rectangle2icon}>

        <Image source={require('../extra/assets/UPIcon.png')}/>
        </View>
      </TouchableOpacity>
      
      {/* Monthly reports */}
      <View style={styles.MRContainer}>
        <Text style={styles.MRtext}>Monthly Report</Text>
        <TouchableOpacity style={styles.RRcontainer} onPress={navigateToRoomWise}>
              <Text style={styles.RRText}>Room Report</Text> 
              <View style={styles.RRicon}><Image source={require('../extra/assets/RRIcon.png')}/></View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.MUGcontainer} onPress={navigateToPrediction}>
          <Text style={styles.MUGText}> Monthly Unit Graph</Text>
          <View style={styles.MUGicon}><Image source={require('../extra/assets/MUGIcon.png')}/></View>
        </TouchableOpacity>
      </View>
      

      {/* tips/news */}
      <View style={styles.ECTcontainer}>
        <Text style={styles.ECTtext}>Electricity Conservation Tips</Text>
        <Text>ggggg</Text>
        <Text>ggggg</Text>
        <Text>ggggg</Text>
        <Text>ggggg</Text>
        <Text>ggggg</Text>
        <Text>ggggg</Text>
        <Text>ggggg</Text>
        <Text>ggggg</Text>
        <Text>ggggg</Text>
        <Text>ggggg</Text>
        <Text>ggggg</Text>
        <Text>ggggg</Text>

      </View>
      {/* tips/news end */}







      {/* <View style={styles.c11cardContainer}>
        <Text style={styles.c11expectedBillText}>Expected Bill</Text>
        <Text style={styles.c11amountText}>Rs. 10,523.21</Text>
        <Text style={styles.c11usagePatternText}>Based on ongoing usage pattern</Text>
        <View style={styles.c11iconContainer}>
          <Image source={require('../extra/assets/c11.png')}/>
        </View>
      </View> */}

      {/* <View style={styles.c13cardContainer}>
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

      <View style={styles.c14container}>
        <Text style={styles.c14title}>Peak Hours</Text>
        <Text style={styles.c14time}>6:30 - 11:30 pm</Text>
        <Text style={styles.c14updated}>updated a week ago</Text>
        <View style={styles.c14iconContainer}>
          <Image source={require('../extra/assets/c14.png')}/>
        </View>
      </View>

      <View style={styles.c12container}>
        <Text style={styles.c12titleText}>Per Unit Price</Text>
        <Text style={styles.c12priceText}>Rs. 23.91</Text>
        <Text style={styles.c12updatedText}>updated 1 day ago</Text>
        <View style={styles.c12iconContainer}>
          <Image source={require('../extra/assets/c12.png')}/>
        </View>
      </View> */}
      </View>
      </ScrollView>

      <View style={styles.navBar}>
        <TouchableOpacity onPress={navigateToOverview}>
          <Ionicons name="home-outline" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={navigateToPrediction}>
          <Ionicons name="stats-chart-outline" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={navigateToRoomWise}>
          <Ionicons name="grid-outline" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={navigateToProfile}>
          <Ionicons name="person-outline" size={24} color="#000" /> 
        </TouchableOpacity>
      </View>
      
    </MenuProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    position: 'relative',
    backgroundColor: 'white',
    flex: 1,
    // boxShadow: '0px 2px 5px rgba(23, 26, 31, 0.17)',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
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
  headerContainer: {
    position: 'absolute',
    right: 5, // Adjust this as necessary to move horizontally
    top: 25, // Adjust this as necessary to move vertically
    zIndex: 10, // Ensure the menu is above other elements
  },
  scrollContainer: {
    flex: 1,
  },
  menuIcon: {
    // If you have padding here, it could be affecting the position as well
    padding: 10, // You might want to adjust this padding
    zIndex: 1,
  },
  menuButtonContainer: {
    padding: 30, // Increase touchable area
  },
  menuOptionsStyle: {
    marginTop: 30, // Adjust the position of the menu dropdown
  },
  menuOptionText: {
    padding: 10,
    fontSize: 16,
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
    fontSize: 13,
    fontFamily: 'Outfit-Regular',
    fontWeight: '500',
    lineHeight: 22,
    wordWrap: 'break-word',
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
//   c14
  c14container: {
    width: 166,
    height: 189,
    left: 21,
    top: 633,
    position: 'absolute',
    backgroundColor: '#125D95',
    borderRadius: 16,
    elevation: 3,
  },
  c14title: {
    left: 7,
    top: 90,
    position: 'absolute',
    color: 'white',
    fontSize: 14,
    fontFamily: 'Outfit-Bold',
    fontWeight: '500',
    lineHeight: 22,
  },
  c14time: {
    left: 7,
    top: 113,
    position: 'absolute',
    color: 'white',
    fontSize: 22,
    fontFamily: 'Outfit-Bold',
    fontWeight: '500',
    lineHeight: 34,
  },
  c14updated: {
    left: 7,
    top: 149,
    position: 'absolute',
    color: 'white',
    fontSize: 11,
    fontFamily: 'Lato-Regular',
    fontWeight: '400',
    lineHeight: 18,
  },
  c14iconContainer: {
    width: 58,
    height: 58,
    left: 90,
    top: 20,
    position: 'absolute',
  },
//   c12
  c12container: {
    width: 166,
    height: 189,
    left: 203,
    top: 633,
    position: 'absolute',
    backgroundColor: '#21A1A3',
    boxShadow: '0px 4px 9px rgba(23, 26, 31, 0.19)',
    borderRadius: 16,
  },
  c12titleText: {
    left: 12,
    top: 90,
    position: 'absolute',
    color: 'white',
    fontSize: 14,
    fontFamily: 'Outfit-Regular',
    fontWeight: '500',
    lineHeight: 22,
  },
  c12priceText: {
    left: 12,
    top: 112,
    position: 'absolute',
    color: 'white',
    fontSize: 24,
    fontFamily: 'Outfit-Regular',
    fontWeight: '500',
    lineHeight: 36,
  },
  c12updatedText: {
    left: 12,
    top: 149,
    position: 'absolute',
    color: 'white',
    fontSize: 11,
    fontFamily: 'Lato-Bold',
    fontWeight: '400',
    lineHeight: 18,
  },
  c12iconContainer: {
    width: 66,
    height: 66,
    left: 82,
    top: 16,
    position: 'absolute',
  },
  highlights:{


  },
  rectangle1:{
    position: 'absolute',
    width: 348,
    height: 180,
    left: 21,
    top: 430,
    // width: 
    height:94,
    backgroundColor: '#F1F2FDFF',
    borderRadius: 8,
  },
  rectangle1Text:{
    position:'absolute',
    fontFamily: 'Outfit-Bold',
    top:5,
    left:7,

    Fontsize : 40,
    color:'#171A1FFF',
  },
  r1t2:{
    position:'absolute',
    top: 30,
    left:1,
    fontSize:45,
    fontFamily: 'Outfit-Regular',
    color: '#171A1FFF',



  },
  rectangle1icon:{
    position: 'absolute',
    top: 9,
    left: 270,
    width: 76,
    height: 76,
    // backgroundColor: '#379AE6',

  },
  rectangle2:{
    position: 'absolute',
    width: 348,
    height: 180,
    left: 21,
    top: 540,
    // width: 
    height:94,
    backgroundColor: '#F1F2FDFF',
    borderRadius: 8,
  },
  rectangle2Text:{
    position:'absolute',
    fontFamily: 'Outfit-Bold',
    top:5,
    left:7,

    fontSize:17,
    color:'#171A1FFF',
  },
  r2t2:{
    position:'absolute',
    top: 30,
    left:1,
    fontSize:45,
    fontFamily: 'Outfit-Regular',
    color: '#171A1FFF',
    
  },
  rectangle2icon:{
    position: 'absolute',
    top: 5,
    left: 260,
    width: 76,
    height: 76,
    // backgroundColor: '#379AE6',
  },

  MRContainer:{
    position: 'absolute',
    top: 650,
    left: 21,
  },
  MRtext:{
    color: '#171A1F',
    fontSize: 20,
    fontFamily: 'Outfit-Bold',
    fontWeight: '600',
    lineHeight: 30,
    wordWrap: 'break-word',
  },
  RRcontainer: {
    position: 'absolute',
    top: 40,
    left: 0,
    width: 166,
    height: 91,
    backgroundColor: '#FFFFFF', // white
    borderRadius: 16,
    shadowColor: '#171A1F',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 9,
    elevation: 2, // for Android
  },
  RRText:{
    top: 13,
    left: 85,
    width: 100,
    height: 'auto',
    fontFamily: 'Outfit-Regular', // Heading
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 30,
    color: '#323842', // neutral-700
    flexWrap :'wrap',

  },
  RRicon:{
    top:-40,
    left: 15,
  },


  MUGcontainer: {
    position: 'absolute',
    top: 40,
    left: 182,
    width: 166,
    height: 91,
    backgroundColor: '#FFFFFF', // white
    borderRadius: 16,
    shadowColor: '#171A1F',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 9,
    elevation: 2, // for Android
  },
  MUGText:{
    top: 13,
    left: 60,
    width: 100,
    height: 'auto',
    fontFamily: 'Outfit-Regular', // Heading
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 30,
    color: '#323842', // neutral-700
    flexWrap :'wrap',

  },
  MUGicon:{
    top:-43,
    left: 6,


  },  
  ECTcontainer:{
    position: 'absolute',
    top: 800,
    left: 21,
  },
  ECTtext:{
    color: '#171A1F',
    fontSize: 20,
    fontFamily: 'Outfit-Bold',
    fontWeight: '600',
    lineHeight: 30,
    wordWrap: 'break-word',
  },




});


export default DashBoard;