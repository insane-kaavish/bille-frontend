import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

const DataInput = ({navigation}) => {
  return (
    <View style={{ flex: 1, backgroundColor: 'white', padding: 16, boxShadow: '0px 3px 6px rgba(18, 15, 40, 0.12)' }}>
      <View style={{ height: 40, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View style={{ width: 72, height: 40 }}>
          {/* Replace the content of this view with your desired icon or image */}
        </View>
        <View style={{ width: 96, height: 40 }}>
          {/* Replace the content of this view with your desired icon or image */}
        </View>
      </View>

      <Text style={{ textAlign: 'left', color: '#171A1F', fontSize: 32, fontFamily: 'Outfit', fontWeight: '700', lineHeight: 48, marginTop: 130 }}>Get Started</Text>

      {/* Repeat the following block for each input section */}
      <View style={{ marginTop: 15, marginBottom: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start' }}>
        <Text style={{ color: '#424955', fontSize: 14, fontFamily: 'Lato', fontWeight: '700', lineHeight: 26 }}>What is the size of your house?</Text>
        <View style={{ height: 43, marginTop: 8, backgroundColor: '#F3F4F6', borderRadius: 16, flexDirection: 'row', alignItems: 'center' }}>
          <TextInput
            placeholder="Please enter numerics"
            style={{ flex: 1, paddingLeft: 16, fontSize: 14, fontFamily: 'Lato', fontWeight: '400', lineHeight: 26 }}
          />
        </View>
        <Text style={{ color: '#424955', fontSize: 14, fontFamily: 'Lato', fontWeight: '700', lineHeight: 26 }}>How many floors do you have in your house?</Text>
        <View style={{ height: 43, marginTop: 8, backgroundColor: '#F3F4F6', borderRadius: 16, flexDirection: 'row', alignItems: 'center' }}>
          <TextInput
            placeholder="Enter Number of floors"
            style={{ flex: 1, paddingLeft: 16, fontSize: 14, fontFamily: 'Lato', fontWeight: '400', lineHeight: 26 }}
          />
        </View>
        <Text style={{ color: '#424955', fontSize: 14, fontFamily: 'Lato', fontWeight: '700', lineHeight: 26 }}>How many people live in your house?</Text>
        <View style={{ height: 43, marginTop: 8, backgroundColor: '#F3F4F6', borderRadius: 16, flexDirection: 'row', alignItems: 'center' }}>
          <TextInput
            placeholder="Enter number of people in the House"
            style={{ flex: 1, paddingLeft: 16, fontSize: 14, fontFamily: 'Lato', fontWeight: '400', lineHeight: 26 }}
          />
        </View>

        <Text style={{ color: '#424955', fontSize: 14, fontFamily: 'Lato', fontWeight: '700', lineHeight: 26 }}>How many elctricity units were consumed previous month?</Text>
        <View style={{ height: 43, marginTop: 8, backgroundColor: '#F3F4F6', borderRadius: 16, flexDirection: 'row', alignItems: 'center' }}>
          <TextInput
            placeholder="Electircty units previous month"
            style={{ flex: 1, paddingLeft: 16, fontSize: 14, fontFamily: 'Lato', fontWeight: '400', lineHeight: 26 }}
          />
        </View>
        <Text style={{ color: '#424955', fontSize: 14, fontFamily: 'Lato', fontWeight: '700', lineHeight: 26 }}>How many elctricity units were consumed the month before the previous month?</Text>
        <View style={{ height: 43, marginTop: 8, backgroundColor: '#F3F4F6', borderRadius: 16, flexDirection: 'row', alignItems: 'center' }}>
          <TextInput
            placeholder="Electircty units of month before previous month"
            style={{ flex: 1, paddingLeft: 16, fontSize: 16, fontFamily: 'Lato', fontWeight: '400', lineHeight: 26 }}
          />
        </View>


      </View>
      
      



      {/* Continue button */}
      <TouchableOpacity
        style={{ width: 348, height: 50, marginTop: 40, backgroundColor: '#535CE8', borderRadius: 26, overflow: 'hidden', justifyContent: 'center', alignItems: 'center' }}
      >
        <Text style={{ color: 'white', fontSize: 18, fontFamily: 'Lato', fontWeight: '400', lineHeight: 28 }}>Continue</Text>
      </TouchableOpacity>

      {/* Repeat the following block for each input section */}
      {/* ... */}
    </View>
  );
};

export default DataInput;
