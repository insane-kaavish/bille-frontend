import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { MenuProvider } from 'react-native-popup-menu';
import MenuComponent from '../Components/Menu';
import NavBar from '../Components/NavBar';

const height = Dimensions.get('window').height;

const HelpCenter = ({ navigation }) => {
  return (
    <MenuProvider skipInstanceCheck={true} style={styles.container}>
      <View style={styles.header}>
        <View style={{ flex: 1 }}>
          <Text style={{ fontFamily: 'Lato-Bold', fontSize: 20, color: '#171A1F', textAlign: 'left' }}>
            <Text>Help Center</Text>
          </Text>
        </View>
        <MenuComponent navigation={navigation} />
      </View>
      <ScrollView style={styles.maincontainer}>
        {/* <Text style={styles.title}>Help Center</Text> */}
        <Text style={styles.subtitle}>About the App</Text>
        <Text style={styles.paragraph}>
          Bill-E is an intuitive app designed to help you manage and track your utility expenses.
          With real-time data analytics, Bill-E offers insights into your consumption patterns,
          helping you make informed decisions to reduce your monthly bills.
          Whether you're looking to monitor electricity, water, or gas usage,
          Bill-E provides a comprehensive overview of your utility consumption and expenses.
        </Text>
        <Text style={styles.paragraph}>
          In addition to tracking, Bill-E also provides predictive analysis based on your past usage
          to forecast future bills, allowing for better budgeting and expense planning.
          Our goal is to empower users with the knowledge to save on their utilities
          and promote a more sustainable lifestyle.
        </Text>
        <Text style={styles.subtitle}>Need Assistance?</Text>
        <Text style={styles.paragraph}>
          Our support team is here to help! If you have any questions or require technical assistance,
          please feel free to reach out to us at support@example.com. Our dedicated team is available
          24/7 to provide you with the support you need.
        </Text>
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
    paddingTop: height * 0.001,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  maincontainer: {
    flexGrow: 1,
    // justifyContent: 'center',
    // alignItems: 'flex-start',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 15,
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 10,
    lineHeight: 24,
  },
});

export default HelpCenter;
