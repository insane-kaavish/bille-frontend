import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  MenuProvider,
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

const EditProfile = ({ navigation }) => {
  const handlePasswordChange = () => {
    navigation.navigate('ChangePassword');
  };
//   const handleEmailChange = () => navigation.navigate('ChangeEmail');
  const handleSettings = () => navigation.navigate('Settings');

  const handleUsernameChange = () => {
    navigation.navigate('ChangeUserName');
};

  const handleEmailChange = () => {
    navigation.navigate('ChangeEmail');
  };
  
  // Bottom Navigation Bar Actions (replace these placeholders with your actual navigation logic)
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
          <Text>Bill-E Profile</Text>
        </Text>  
      </View>
        <Menu>
        <MenuTrigger>
            <Ionicons name="menu" size={30} color="black" style={styles.menuIcon} />
          </MenuTrigger>
          <MenuOptions style={styles.menuOptionsStyle}>
            <MenuOption onSelect={() => navigation.navigate('EditProfile')}>
              <Text style={styles.menuOptionText}>Profile</Text>
            </MenuOption>
            <MenuOption onSelect={() => navigation.navigate('Settings')}>
              <Text style={styles.menuOptionText}>Settings</Text>
            </MenuOption>
            <MenuOption onSelect={() => navigation.navigate('HelpCenter')}>
              <Text style={styles.menuOptionText}>Help Center</Text>
            </MenuOption>
            <MenuOption onSelect={() => navigation.navigate('SignIn')}>
              <Text style={styles.menuOptionText}>Sign Out</Text>
            </MenuOption>
          </MenuOptions>
        </Menu>
      </View>

    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.optionsContainer}>
          <TouchableOpacity style={styles.optionButton} onPress={handleUsernameChange}>
            <Text style={styles.optionText}>Change Username</Text>
            <Ionicons name="chevron-forward-outline" size={20} color="#000" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionButton} onPress={handlePasswordChange}>
            <Text style={styles.optionText}>Change Password</Text>
            <Ionicons name="chevron-forward-outline" size={20} color="#000" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionButton} onPress={handleEmailChange}>
            <Text style={styles.optionText}>Change Email</Text>
            <Ionicons name="chevron-forward-outline" size={20} color="#000" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionButton} onPress={handleSettings}>
            <Text style={styles.optionText}>Settings</Text>
            <Ionicons name="chevron-forward-outline" size={20} color="#000" />
          </TouchableOpacity>
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
    </View>
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
    marginTop: 0,
    marginVertical: 2,
    zIndex: 1,
  },
  menuOptionText: {
    fontSize: 16,
    padding: 10,
    fontFamily: 'Outfit-Bold',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#171A1F',
  },
  email: {
    fontSize: 16,
    color: '#707070',
    marginBottom: 32,
  },
  optionsContainer: {
    marginHorizontal: 20,
  },
  optionButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    marginBottom: 16,
  },
  optionText: {
    fontSize: 18,
    color: '#000',
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
});

export default EditProfile;