import React, { useState } from 'react';
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
import AddApplianceModal from './Data/ApplianceModal'; // Update import statement

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
          category: "Television",
          subcategories: ["LED", "LCD", "Plasma"],
          units: 1
        },
        {
          id: 2,
          category: "Microwave Oven",
          subcategories: ["Solo", "Grill", "Convection"],
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
    if (!selectedAppliance || !selectedCategory || !usage) {
      console.log('Please fill in all the fields');
      return;
    }

    const newAppliance = {
      id: Math.random(),
      category: selectedAppliance,
      sub_category: selectedCategory, // Here we're using sub_category as subcategory
      units: parseInt(usage),
    };

    setRoomDetail(prevRoomDetail => {
      const updatedRoomDetail = [...prevRoomDetail];
      updatedRoomDetail[0].appliances.push(newAppliance);
      return updatedRoomDetail;
    });

    // Reset modal state
    setSelectedAppliance('');
    setSelectedCategory('');
    setSelectedSubcategory('');
    setUsage('');

    setShowAddApplianceModal(false);
  };

  return (
    <MenuProvider skipInstanceCheck={true} style={styles.container}>
      <View style={styles.header}>
        <View style={{ flex: 1 }}> 
          <Text style={{ fontFamily: 'Lato-Bold', fontSize: 20, color: '#171A1F', textAlign: 'left' }}>
            Bill-E Ali's Room Detail
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

      <TouchableOpacity
        style={styles.addApplianceButton}
        onPress={() => setShowAddApplianceModal(true)}
      >
        <Text style={styles.addApplianceText}>+ Add Appliance</Text>
      </TouchableOpacity>

      <AddApplianceModal
        visible={showAddApplianceModal}
        onClose={() => setShowAddApplianceModal(false)}
        appliances={roomDetail[0].appliances} // Pass appliances from the room detail
        selectedAppliance={selectedAppliance}
        setSelectedAppliance={setSelectedAppliance}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedSubcategory={selectedSubcategory}
        setSelectedSubcategory={setSelectedSubcategory}
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
  addApplianceButton: {
    backgroundColor: '#007BFF',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  addApplianceText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default RoomDetail;
