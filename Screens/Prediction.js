import React from 'react';
import MenuComponent from './Components/Menu';
import NavBar from './Components/NavBar';
import { LineChart, ProgressChart } from 'react-native-chart-kit';
// import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { useNavigation } from '@react-navigation/native';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import {
  MenuProvider,
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

const screenWidth = Dimensions.get('window').width;
const units = 300;

let perUnitCost;
if (units >= 1 && units <= 100) {
  perUnitCost = 5.79;
} else if (units >= 101 && units <= 200) {
  perUnitCost = 8.11;
} else if (units >= 201 && units <= 300) {
  perUnitCost = 10.20;
} else if (units >= 301 && units <= 700) {
  perUnitCost = 17.60;
} else {
  perUnitCost = 20.70;
}

const totalCost = units * perUnitCost;

const App = () => {
  const navigation = useNavigation();

  const data1 = {
    Actual_units: {
      "Jul-23": [199],
      "Aug-23": [1000],
      "Sep-23": [750],
      "Oct-23": [400],
      "Nov-23": [500],
      "Dec-23": [100],
      "Jan-24": [299],
      "Feb-24": [400],
    },
    Predicted_units: {
      "Jul-23": [250],
      "Aug-23": [872],
      "Sep-23": [549],
      "Oct-23": [333],
      "Nov-23": [512],
      "Dec-23": [72],
      "Jan-24": [349],
      "Feb-24": [612],
    }
  };

  const labels = Object.keys(data1.Actual_units).map((label) => {
    const month = label.split('-')[0];
    const year = label.split('-')[1];
    if (month === 'Dec' || month === 'Jan') {
      return `${month}\n${year}`;
    } else {
      return `${month}`;
    }
  });

  const actualValues = Object.values(data1.Actual_units).map(
    (valueArray) => valueArray[0]
  );
  const predictedValues = Object.values(data1.Predicted_units).map(
    (valueArray) => valueArray[0]
  );

  const data = {
    labels: labels,
    datasets: [
      {
        data: actualValues,
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
        strokeWidth: 2,
        label: 'Actual Units',
      },
      {
        data: predictedValues,
        color: (opacity = 1) => `rgba(244, 65, 134, ${opacity})`,
        strokeWidth: 2,
        label: 'Predicted Units',
      },
    ],
  };

  // Calculate progress for the ProgressChart
  const progress = units / 300; // Assuming 300 units is 100% progress

  return (
    <MenuProvider skipInstanceCheck={true} style={styles.container}>
      <View style={styles.header}>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontFamily: 'Lato-Bold',
              fontSize: 20,
              color: '#171A1F',
              textAlign: 'left',
            }}
          >
            Bill-E Prediction Summary
          </Text>
        </View>
        <MenuComponent navigation={navigation} />
      </View>

      <ScrollView style={styles.scrollContainer}>
        <View style={styles.predictionCard}>
          
          <Text style={styles.progressText}>{units} Units</Text>

          <Text style={styles.consumptionUnit}>Predicted Units</Text>
          <Text style={styles.estimatedBill}>
            Your estimated bill for this month will be Rs.{totalCost.toFixed(1)}
          </Text>
          <TouchableOpacity
            style={styles.detailsButton}
            onPress={() => navigation.navigate('RoomwisePrediction')}
          >
            <Text style={styles.detailsButtonText}>View Room Details</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.graphCard}>
          <ScrollView horizontal>
            <LineChart
              data={data}
              width={screenWidth * 1.5}
              height={300}
              yAxisLabel=""
              yAxisSuffix=""
              verticalLabelRotation={0}
              fromZero={true}
              segments={4}
              chartConfig={{
                backgroundGradientFrom: '#FFF',
                backgroundGradientTo: '#FFF',
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                strokeWidth: 5,
                barPercentage: 0.3,
                propsForLabels: { fontsize: 2 },
                withInnerLines: false, // Remove grid lines
                decimalPlaces: 0,
                formatYLabel: (yLabel) => yLabel.toFixed(0),
                yAxisInterval: 250,
                decimalPlaces: 0,
              }}
              bezier
              style={{ marginVertical: 8, borderRadius: 16 }}
            />
          </ScrollView>
          <Text style={styles.graphDescription}>Comparison between the actual and predicted units.</Text>
        </View>
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
    fontFamily: 'Lato-Bold',
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
    elevation: 3, // for the main shadow
    shadowColor: '#000', // color of the shadow
    shadowOffset: { width: 0, height: 0 }, // same as the CSS code
    shadowOpacity: 0.3, // opacity of the shadow
    shadowRadius: 1, // blur radius of the shadow
  },
  consumptionValue: {
    fontSize: 48,
    color: '#000',
    fontFamily: 'Lato-Bold',
  },
  consumptionUnit: {
    fontSize: 18,
    color: '#666',
    fontFamily: 'Lato-Bold',
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
    fontFamily: 'Lato-Bold',
  },
  graphCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 1,
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    marginTop: 10,
    marginBottom: 70,
    elevation: 3, // for the main shadow
    shadowColor: '#000', // color of the shadow
    shadowOffset: { width: 0, height: 0 }, // same as the CSS code
    shadowOpacity: 0.3, // opacity of the shadow
    shadowRadius: 1, // blur radius of the shadow
  },
  graphDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 10,
    fontFamily: 'Lato-Bold',
  },
  progressChartContainer: {
    alignItems: 'center',
    marginTop: 20,
    position: 'relative',
  },
  progressText: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -10 }, { translateY: -10 }], // Center the text
    fontSize: 18,
    fontFamily: 'Lato-Bold',
  },
});

export default App;
