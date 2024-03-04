import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MenuProvider } from 'react-native-popup-menu';

import MenuComponent from '../Components/Menu';
import NavBar from '../Components/NavBar';

const EditProfile = () => {
    const navigation = useNavigation();
  

    return (
        <MenuProvider skipInstanceCheck={true} style={styles.container}>
        <View style={styles.header}>
            <View style={{ flex: 1 }}>
            <Text style={{ fontFamily: 'Lato-Bold', fontSize: 20, color: '#171A1F', textAlign: 'left' }}>
                <Text>Edit Profile</Text>
            </Text>
            </View>
            <MenuComponent navigation={navigation} />
        </View>

        <ScrollView>

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
});

export default EditProfile;