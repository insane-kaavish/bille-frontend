import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import {
  MenuProvider,
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

const screenWidth = Dimensions.get('window').width;

const App = () => {
  const navigation = useNavigation();

  const chartConfig = {
    backgroundGradientFrom: '#FFF',
    backgroundGradientTo: '#FFF',
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
  };

  const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: Array.from({ length: 7 }, () => Math.random() * 100),
      },
    ],
  };

  return (
    <MenuProvider style={styles.container}>
      <View style={styles.header}>
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

      <ScrollView style={styles.scrollContainer}>
        <View style={styles.predictionCard}>
          <Text style={styles.title}>Predicted Consumption</Text>
          <View style={styles.consumptionCircle}>
            <Text style={styles.consumptionValue}>213</Text>
            <Text style={styles.consumptionUnit}>Predicted Units</Text>
          </View>
          <Text style={styles.estimatedBill}>
            Your estimated bill for this month will be Pkr. 30,000
          </Text>
          <TouchableOpacity
            style={styles.detailsButton}
            onPress={() => navigation.navigate('RoomwisePrediction')}
          >
            <Text style={styles.detailsButtonText}>View Room Details</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.graphCard}>
        <BarChart
          style={styles.graphStyle}
          data={data}
          width={screenWidth - 64} // Subtract total horizontal padding and margins
          height={220}
          yAxisLabel="$"
          chartConfig={chartConfig}
          verticalLabelRotation={30}
        />
        </View>
      </ScrollView>

      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => navigation.navigate('DashBoard')}>
          <Ionicons name="home-outline" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Prediction')}>
          <Ionicons name="stats-chart-outline" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('RoomwisePrediction')}>
          <Ionicons name="grid-outline" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
          <Ionicons name="person-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>
    </MenuProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 10,
    top: 25,
    right : 5,
    zIndex: 1,
  },
  menuButtonContainer: {
    padding: 30, // Increase touchable area
  },
  menuIcon: {
    padding: 10,
    zIndex: 1, 
  },
  menuOptionsStyle: {
    marginTop: 40,
    marginVertical: 10,
    zIndex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  predictionCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 16,
    margin: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  consumptionCircle: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderColor: '#00BCD4',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  consumptionValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#000',
  },
  consumptionUnit: {
    fontSize: 18,
    color: '#666',
  },
  estimatedBill: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  detailsButton: {
    backgroundColor: '#535CE8',
    borderRadius: 20,
    padding: 12,
    alignItems: 'center',
    width: '70%',
    alignSelf: 'center',
    marginVertical: 20,
  },
  detailsButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  graphCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 16, // Adjust padding as needed
    marginHorizontal: 16,
    marginTop: 10,
    marginBottom: 20,
    overflow: 'hidden', // Ensures that the graph does not overflow the card
  },
  graphStyle: {
    marginVertical: 8,
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
    zIndex: 1, // Ensures that navBar is clickable
  },
  menuOptionText: {
    fontSize: 16,
    padding: 10,
  },
});

export default App;