import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Dimensions, SafeAreaView } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { MenuProvider, Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';

const screenWidth = Dimensions.get('window').width;

const App = () => {
  const navigation = useNavigation(); // Hook to access the navigation prop

  const chartConfig = {
    backgroundGradientFrom: '#FFF',
    backgroundGradientTo: '#FFF',
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
  };

  const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      data: Array.from({ length: 7 }, () => Math.random() * 100),
    }],
  };

  return (
    <MenuProvider style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerIcon}>
            <Ionicons name="chevron-back" size={30} color="black" />
          </TouchableOpacity>
          <Menu>
            <MenuTrigger style={styles.headerIcon}>
              <Ionicons name="menu" size={30} color="black" />
            </MenuTrigger>
            <MenuOptions style={styles.menuOptionsStyle}>
              <MenuOption onSelect={() => navigation.navigate('EditProfile')}>
                <Text style={styles.menuOptionText}>Profile</Text>
              </MenuOption>
              <MenuOption onSelect={() => navigation.navigate('Settings')}>
                <Text style={styles.menuOptionText}>Settings</Text>
              </MenuOption>
              <MenuOption onSelect={() => navigation.navigate('HelpCenter')}>
                <Text style={styles.menuOptionText}>Help center</Text>
              </MenuOption>
              <MenuOption onSelect={() => navigation.navigate('SignIn')}>
                <Text style={styles.menuOptionText}>Sign out</Text>
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
            <Text style={styles.estimatedBill}>Your estimated bill for this month will be Pkr. 30,000</Text>
          </View>

          <BarChart
            style={styles.graphStyle}
            data={data}
            width={screenWidth}
            height={220}
            yAxisLabel="$"
            chartConfig={chartConfig}
            verticalLabelRotation={30}
          />
        </ScrollView>
        
        <View style={styles.bottomTabBar}>
          <TouchableOpacity onPress={() => navigation.navigate('DashBoard')}>
            <Ionicons name="home-outline" size={24} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Prediction')}>
            <Ionicons name="stats-chart-outline" size={24} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log('Navigate to Room Wise')}>
            <Ionicons name="grid-outline" size={24} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
            <Ionicons name="person-outline" size={24} color="#000" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </MenuProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  headerIcon: {
    padding: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
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
    width: 140,
    height: 140,
    borderRadius: 70,
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
  graphStyle: {
    marginVertical: 8,
    borderRadius: 16,
  },
  bottomTabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#EFEFEF',
    paddingVertical: 10,
  },
});

export default App;