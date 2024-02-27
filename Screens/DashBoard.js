import React from 'react';
import { Image, View, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';
import NavBar from './Components/NavBar';
import {
  MenuProvider,
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesomeicons from 'react-native-vector-icons/FontAwesome';

const units = 300;

let perUnitCost;
if (units >= 1 && units <= 100) {
  perUnitCost = 5.79;
} else if (units >= 101 && units <= 200) {
  perUnitCost = 8.11;
} else if (units >= 201 && units <= 300) {
  perUnitCost = 10.20;
} else if (units >= 301 && units <= 700) {
  perUnitCost = 17.60;
} else {
  perUnitCost = 20.70;
}

const totalCost = units * perUnitCost;

const Dashboard = ({ navigation }) => {

  const navigateToOverview = () => {
    navigation.navigate('DashBoard');
  };

  const navigateToPrediction = () => {
    navigation.navigate('Prediction');
  };
  const navigateToRoomWise = () => {
    navigation.navigate('RoomwisePrediction');
  };
  const navigateToProfile = () => {
    navigation.navigate('EditProfile');
  };

  return (
    <MenuProvider skipInstanceCheck={true} style={styles.container}>
      <View style={styles.header}>
      <View style={{ flex: 1 }}> 
        <Text style={{ fontFamily: 'Lato-Bold', fontSize: 20, color: '#171A1F', textAlign: 'left' }}>
          <Text>Bill-E Dashboard</Text>
        </Text>  
      </View>
        <Menu>
          <MenuTrigger>
            <Ionicons name="menu" size={30} color="black" style={styles.menuIcon} />
          </MenuTrigger>
          <MenuOptions style={styles.menuOptionsStyle}>
        
            <MenuOption onSelect={() => navigation.navigate('EditProfile')}>
            <Text style={styles.menuOptionText}>
              Profile         
            </Text>
            <FontAwesomeicons name="user" size={30} color="black" style={styles.menuOptionIcon}/>
            </MenuOption>
            <MenuOption onSelect={() => navigation.navigate('Settings')}>
            
              <Text style={styles.menuOptionText}>
                Settings
              </Text>
                <FontAwesomeicons name="gear" size={30} color="black" style={styles.menuOptionIcon}/>
            </MenuOption>
            <MenuOption onSelect={() => navigation.navigate('HelpCenter')}>
            
              <Text style={styles.menuOptionText}>
                Help Center
              </Text>
              <Ionicons name="help-circle" size={30} color="black" style={styles.menuOptionIcon}/>
            </MenuOption>
            <MenuOption onSelect={() => navigation.navigate('SignIn')}>
              
              <Text style={styles.menuOptionText}>
                Sign Out   
              </Text>
              <Ionicons name="log-out-outline" size={30} color="black" style={styles.menuOptionIcon}/>

            </MenuOption>
          </MenuOptions>
        </Menu>
      </View>

      <ScrollView style={styles.scrollContainer}>
        <TouchableOpacity style={styles.MC} onPress={navigateToPrediction}>
          <View style={styles.MCcircleContainer}>
            <View style={styles.MCinnermostCircleContainer}>
              <Image source={require('../extra/assets/OV.png')} />
            </View>
          </View>
          <Text style={styles.MCtitle}>Current Units</Text>
          <Text style={styles.MCdescription}>
            Based on your current consumption data, your predicted units are {units} and consider good.
          </Text>
          <Text style={styles.MCunitsCount}>{units}</Text>
        </TouchableOpacity>

        <View style={styles.HLcontainer}>
          <Text style={styles.HLtitle}>Highlights</Text>
        </View>

        <View style={styles.cardsContainer}>
        <View style={[styles.card, { backgroundColor: '#F1F2FDFF' }]}>
            <Text style={styles.cardTitle}>Expected Bill</Text>
            <Text style={styles.cardAmount}>Rs. {totalCost}</Text>
            <Text style={styles.cardText}>Based on usage pattern</Text>
            <View style={styles.cardIconContainer}>
              <Image source={require('../extra/assets/c11.png')} />
            </View>
          </View>

          <View style={[styles.card, { backgroundColor: '#F1F2FDFF' }]}>
            <Text style={styles.cardTitle}>Per Unit Price</Text>
            <Text style={styles.cardAmount}>Rs. {perUnitCost}</Text>
            <Text style={styles.cardText}>Based on the slab rates</Text>
            <View style={styles.cardIconContainer}>
              <Image source={require('../extra/assets/c12.png')} />
            </View>
          </View>
        </View>

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

      </ScrollView>

      <NavBar />
    </MenuProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
    paddingTop: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  menuIcon: {
    marginTop: 5,
    marginRight: 10,
  },
  menuOptionsStyle: {
    // width:'auto',
    flex:1,
    marginTop: 5,
    marginVertical: 10,
  },
  menuOptionText: {
    textAlign:'center',
    fontSize: 16,
    fontFamily: 'Outfit-Bold',
  },
  // menuOptionIcon: {
  //   // marginLeft: 10,
  //   // marginTop:10000,
  //   // alignItems: 'left',
  //   // paddingVertical: -10,
  //   // justifyContent:'space-bet/ween',
  //   // top:-26,
  //   // right:0,
  // },
  scrollContainer: {
    flex: 1,
  },
  MC: {
    width: 348,
    height: 144,
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: '6%',
    backgroundColor: '#F1F2FDFF',
    borderRadius: 16,
    shadowColor: 'rgba(23, 26, 31, 0.19)',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 9,
    elevation: 2,
  },
  MCcircleContainer: {
    left: 259,
    top: -1,
    position: 'absolute',
  },
  MCtitle: {
    left: 20,
    top: 8,
    position: 'absolute',
    color: '#171A1F',
    fontSize: 18,
    fontFamily: 'Lato-Bold',
    fontWeight: '600',
    lineHeight: 28,
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
  },
  MCunitsCount: {
    left: 276,
    top: 12,
    position: 'absolute',
    color: 'white',
    fontSize: 24,
    fontFamily: 'Lato-Bold',
    fontWeight: '700',
    lineHeight: 36,
  },
  HLcontainer: {
    left: '5%',
    top: '3%',
  },
  HLtitle: {
    color: '#171A1F',
    fontSize: 20,
    fontFamily: 'Lato-Bold',
    fontWeight: '600',
    lineHeight: 30,
  },
  cardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingHorizontal: 10,
  },
  card: {
    width: '48%',
    height: 180,
    backgroundColor: '#F1F2FD',
    borderRadius: 16,
    padding: 10,
    shadowColor: 'rgba(23, 26, 31, 0.19)',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 9,
    elevation: 2,
  },
  cardTitle: {
    color: '#171A1F',
    fontSize: 18,
    fontFamily: 'Lato-Bold',
    fontWeight: '500',
    lineHeight: 22,
  },
  cardAmount: {
    color: '#171A1F',
    fontSize: 28,
    fontFamily: 'Lato-Bold',
    fontWeight: '500',
    lineHeight: 36,
    marginTop: 10,
  },
  cardText: {
    color: '#171A1F',
    fontSize: 12,
    fontFamily: 'Lato-Bold',
    fontWeight: '400',
  },
  cardIconContainer: {
    width: 66,
    height: 66,
    position: 'absolute',
    right: 10,
    bottom: 10,
  },
  MRContainer: {
    marginLeft: '3%', // Aligning "Monthly Report" with "Highlights"
    marginTop: '5%', // Adjust the margin as needed
    justifyContent: 'space-between',
  },
  MRtext:{
    color: '#171A1F',
    fontSize: 20,
    fontFamily: 'Lato-Bold',
    fontWeight: '600',
    lineHeight: 30,
    // wordWrap: 'break-word',
  },
  RRcontainer: {
    width: '45.5%', // Match the width of the cards
    height: 91, // Adjust the height as needed
    backgroundColor: '#F1F2FDFF',
    borderRadius: 16,
    shadowColor: '#171A1F',
    shadowOffset: {
      width: 0.5,
      height: 0.5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 9,
    elevation: 2,
    marginTop: '2%', // Adjust the margin as needed
  },
  RRText: {
    fontFamily: 'Lato-Bold',
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 30,
    color: '#323842',
    flexWrap: 'wrap',
    marginLeft: '40%', // Adjust the left margin to center the text
    marginTop: 13, // Adjust the margin as needed
  },
  RRicon: {
    // position: 'absolute',
    left: '5%', // Adjust the left position as needed
    top: '-50%', // Adjust the top position as needed
    // transform: [{ translateY: -40 }], // Centering the icon vertically
  },
  MUGcontainer: {
    // position: 'absolute',
    top:'-41.5%',
    left: '51%',
    width: '45.5%', // Match the width of the cards
    height: 91, 
    backgroundColor: '#F1F2FDFF', // white
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
});

export default Dashboard;
