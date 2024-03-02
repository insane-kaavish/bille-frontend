import {
  MenuProvider,
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import { useNavigation } from '@react-navigation/native';
import MenuComponent from './Components/Menu';
import NavBar from './Components/NavBar';
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const RoomDetail = () => {
  // const RoomDetail = ({ route }) => {
  // Extracting roomName parameter from the route
  // const { roomId } = route.params;
  const navigation = useNavigation();

  const roomdetail = [
    {
      "id": 1,
      "tag": "LR",
      "alias": "Living Room",
      "appliances": [
          {
              "id": 5,
              "alias": "Living Room TV",
              "category": "Television",
              "sub_category": "LED",
              "units": 1
          },
          {
              "id": 2,
              "alias": "Living Room Micro",
              "category": "Microwave Oven",
              "sub_category": "Solo",
              "units": 8
          }
      ],
      "units": 9
  }
  ]

  return (
    <MenuProvider skipInstanceCheck={true} style={styles.container}>
      <View style={styles.header}>
      <View style={{ flex: 1 }}> 
        <Text style={{ fontFamily: 'Lato-Bold', fontSize: 20, color: '#171A1F', textAlign: 'left' }}>
          <Text>Bill-E Ali's Room Detail</Text>
        </Text>  
      </View>
        <MenuComponent navigation={navigation} />
      </View>

      <ScrollView style={styles.scrollContainer}>
        
        {/* {roomdetail.map((appliances, index) => ( */}
        {roomdetail.map((room, index) => (
          <View key={index} >
            <Text style={styles.roomName}>{room.alias}</Text>
              {room.appliances.map((appliance, index) => (
                <TouchableOpacity key={index} style={styles.applianceCard}>
                  <Text style={styles.categorycard}>{appliance.category}</Text>
                  <Text style={styles.categorycard}>{appliance.sub_category}</Text>
                  <Text >{`${appliance.units} Units`}</Text>
                </TouchableOpacity>
              ))}
            
            {/* <Text style={styles.roomUnits}>{`${room.units} Units`}</Text> */}

          </View>
      ))}
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
    paddingTop: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  applianceCard: {
    // flexDirection: 'row',
    // alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FAFAFBFF',
    borderRadius: 16,
    padding: 15,
    width: Dimensions.get('window').width - 30,
    marginVertical: 5,
    marginHorizontal: 15,
    shadowColor: '#171a1f',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.17,
    shadowRadius: 2,
    elevation: 10,
  },
});

export default RoomDetail;
