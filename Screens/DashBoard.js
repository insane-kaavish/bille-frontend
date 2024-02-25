import React from 'react';
import { Image, View, StyleSheet, ScrollView, Text,TouchableOpacity } from 'react-native';
import Menu1 from './Menu1';
import NavBar from './NavBar';
import WeatherComponent from './Weather';

const Dashboard = ({ navigation }) => {

  // const navigation = useNavigation(); // Hook to access the navigation prop
  const navigateToOverview = () => {
    navigation.navigate('DashBoard');
  };
  
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
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.BillEcontainer}>
          <Text style={styles.BillEtext}>Bill-E</Text>
        </View>
        <View style={styles.Datecontainer}>
          <Text style={styles.Datetext}>{dateString} <WeatherComponent/> </Text>
        </View>
        <View style={styles.OVcontainer}>
          <Text style={styles.OVtext}>Overview</Text>
        </View>
        <TouchableOpacity style={styles.MC} onPress={navigateToPrediction}>
          <View style={styles.MCcircleContainer}>
            <View style={styles.MCinnerCircleContainer}>
              <View style={styles.MCinnermostCircleContainer}>
                <Image source={require('../extra/assets/OV.png')}/>
              </View>
            </View>
          </View>
          <Text style={styles.MCtitle}>Current Units</Text>
          <Text style={styles.MCdescription}>
            Based on your current consumption data, your predicted units are 213 and consider good.
          </Text>
          <Text style={styles.MCunitsCount}>{units}</Text>
        </TouchableOpacity>
        <View style={styles.HLcontainer}>
          <Text style={styles.HLtitle}>Highlights</Text>
        </View>
      
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
        {/* <View style={styles.ECTcontainer}>
          <Text style={styles.ECTtext}>Electricity Conservation Tips</Text>
        </View> */}
      </ScrollView>
      <NavBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent:'center',
    alignItems:'center',
  },
  
  scrollContainer: {
    // flexGrow: 1,
    // marginLeft:'5%',
    // alignItems:'center',
    // justifyContent:'center',
    marginBottom:'10%',
    backgroundColor: '',
  },
  BillEcontainer: {
    // left: 60,
    // left:'7%',
    // top: 40,
    top:'5%',
    // position: 'absolute',
    textAlign: 'center',
    color: '',
  },
  BillEtext: {
    fontSize: 48,
    fontFamily: 'Outfit-Bold',
    fontWeight: '700',
    lineHeight: 68,
    // wordWrap: 'wrap',
  },
  Datetext: {
    color: '#565E6C',
    fontSize: 12,
    fontFamily: 'Lato-Regular',
    fontWeight: '700',
    lineHeight: 20, 
    // wordWrap: 'break-word',
  },
  Datecontainer: {
    // left: '7%',
    // top: 114,
    top:'5%',
    // position: 'absolute',
  },
  OVcontainer: {
    // left: '7%',
    
    top: '5%',
    // top: 136,
    // position: 'absolute',
  },
  OVtext: {
    color: '#171A1F',
    fontSize: 32,
    fontFamily: 'Outfit-Bold',
    fontWeight: '700',
    lineHeight: 48,
    // wordWrap: 'break-word',
  },
  MC: {
    width: 348,
    height: 144,
    // alignItem:'center',
    justifyContent:'center',
    top: '6%',
    // position: 'absolute',
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
  MCcircleContainer: {
    width: 72,
    height: 72,
    left: 259,
    top: -1,
    position: 'absolute',
  },
  MCinnerCircleContainer: {
    width: 72,
    height: 72,
    left: 0,
    top: 1.31,
    position: 'absolute',
  },
  MCinnermostCircleContainer: {
    width: 72,
    height: 72,
    left: 0,
    top: 0,
    position: 'absolute',
  },
  MCblackCircle: {
    width: 72,
    height: 72,
    left: 0,
    top: 0,
    position: 'absolute',
    backgroundColor: 'black',
  },
  MCgreenCircle: {
    width: 62.35,
    height: 69.38,
    left: 4.82,
    top: 0,
    position: 'absolute',
    backgroundColor: '#2EE82E',
  },
  MCtitle: {
    left: 20,
    top: 8,
    position: 'absolute',
    color: '#171A1F',
    fontSize: 18,
    fontFamily: 'Outfit-Bold',
    fontWeight: '600',
    lineHeight: 28,
    // wordWrap: 'break-word',
  },
  MCdescription: {
    width: 198,
    left: 20,
    top: 40,
    position: 'absolute',
    color: '#171A1F',
    fontSize: 14,
    fontFamily: 'Lato-Bold',
    fontWeight: '400',
    lineHeight: 22,
    // wordWrap: 'break-word',
  },
  MCunitsCount: {
    left: 276,
    top: 12,
    position: 'absolute',
    color: 'white',
    fontSize: 24,
    fontFamily: 'Outfit-Regular',
    fontWeight: '700',
    lineHeight: 36,
    // wordWrap: 'break-word',
  },
  HLcontainer: {
    // left: '7%',
    top: '7%',
    // position: 'absolute',
  },
  HLtitle: {
    color: '#171A1F',
    fontSize: 20,
    fontFamily: 'Outfit-Bold',
    fontWeight: '600',
    lineHeight: 30,
    // wordWrap: 'break-word',
  },
  rectangle1:{
    // position: 'absolute',
    width: 348,
    height: 180,
    // left: 21,
    top: '8%',
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
    // position: 'absolute',
    width: 348,
    height: 180,
    // left: 21,
    top: '9%',
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
    // position: 'absolute',
    top: '10%',
    // left: 21,
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
    // position: 'absolute',
    top: '5%',
    left: '2%',
    width: 166,
    height: 91,
    backgroundColor: '#FFFFFF', // white
    borderRadius: 16,
    shadowColor: '#171A1F',
    shadowOffset: {
      width: .5,
      height: .5,
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
    // position: 'absolute',
    top: 0,
    top:'-37%',
    left: '51%',
    width: 166,
    height: 91,
    backgroundColor: '#FFFFFF', // white
    borderRadius: 16,
    shadowColor: '#171A1F',
    shadowOffset: {
      width: 0,
      height: 1,
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
    // position: 'absolute',
    top: '1%',
    // left: 21,
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

export default Dashboard;
