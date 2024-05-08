import React from 'react';
import { View, Text } from 'react-native';
import { GlobalStyles } from './Styles/GlobalStyles';

const InsightsScreen = () => {
    return (
        <>
            <Header screenName="Dashboard" navigation={navigation} />
            <View style={GlobalStyles.screenContainer}>
                <Text>Insights Screen</Text>
            </View>
        </>
    );
};

export default InsightsScreen;