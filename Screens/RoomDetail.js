import React, { useState, useEffect } from 'react';
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
import { Picker } from '@react-native-picker/picker';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Modal,
  TextInput
} from 'react-native';
import AddApplianceModal from './Data/ApplianceModal';

const RoomDetail = () => {
  const navigation = useNavigation();

  const [roomDetail, setRoomDetail] = useState([
    {
      id: 1,
      tag: "LR",
      alias: "Living Room",
      appliances: [
        {
          id: 5,
          alias: "Living Room TV",
          category: "Television",
          sub_category: "LED",
          units: 1
        },
        {
          id: 2,
          alias: "Living Room Micro",
          category: "Microwave Oven",
          sub_category: "Solo",
          units: 8
        }
      ],
      units: 9
    }
    // Add more rooms as needed
  ]);

  const [showAddApplianceModal, setShowAddApplianceModal] = useState(false);
  const [selectedAppliance, setSelectedAppliance] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [usage, setUsage] = useState('');

  const addAppliance = () => {
    // Logic to add appliance
  };

  // List of appliances
  const appliances = [
    { name: 'Television', categories: ['LED', 'LCD', 'Plasma'] },
    { name: 'Microwave Oven', categories: ['Solo', 'Grill', 'Convection'] },
    // Add more appliances as needed
  ];

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
        {roomDetail.map((room, roomIndex) => (
          <View key={roomIndex}>
            <Text style={styles.roomName}>{room.alias}</Text>
            {room.appliances && room.appliances.map((appliance, applianceIndex) => (
              <TouchableOpacity key={applianceIndex} style={styles.applianceCard}>
                <Text style={styles.categorycard}>{appliance.category}</Text>
                <Text style={styles.subcategorycard}>{appliance.sub_category}</Text>
                <Text style={styles.unitscard}>{`${appliance.units} Units`}</Text>
              </TouchableOpacity>
            ))} 
          </View>
        ))}
      </ScrollView>

      {/* Add Appliance Button */}
      <TouchableOpacity
        style={styles.addApplianceButton}
        onPress={() => setShowAddApplianceModal(true)}
      >
        <Text style={styles.addApplianceText}>+ Add Appliance</Text>
      </TouchableOpacity>

      {/* Add Appliance Modal */}
      <AddApplianceModal
        visible={showAddApplianceModal}
        onClose={() => setShowAddApplianceModal(false)}
        appliances={appliances}
        selectedAppliance={selectedAppliance}
        setSelectedAppliance={setSelectedAppliance}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        usage={usage}
        setUsage={setUsage}
        addAppliance={addAppliance}
      />
    </MenuProvider>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    alignContent: 'center',
    justifyContent: 'center',
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
  categorycard:{
    fontSize: 24,
    fontFamily: 'Lato-Bold',
    color: '#171A1F',
    textAlign: 'left',
    marginLeft: 25,
  },
  subcategorycard:{
    fontSize: 18,
    fontFamily: 'Lato-Bold',
    color: '#171A1F',
    textAlign: 'left',
    marginLeft: 25,
  },
  unitscard:{
    fontSize: 16,
    fontFamily: 'Lato-Bold',
    color: '#171A1F',
    textAlign: 'left',
    marginLeft: 25,
  },
  

});

export default RoomDetail;
