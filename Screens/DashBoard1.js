import React from 'react';
import {  View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
// import { MenuProvider, Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
// import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native';
import WeatherComponent from './Weather';
import Menu1 from './Menu1';


const DashBoard1 =()=>{

    return(
        <View style={styles.container}>
            <Menu1/>
        </View>
    );

};
const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent:'center',
        // alignItems:'center'
    },
});

export default DashBoard1;