import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { BarChart, LineChart } from 'react-native-chart-kit';

const App = () => {
  // Generate random data for demonstration
  const chartConfig = {
    backgroundGradientFrom: '#FFF',
    backgroundGradientTo: '#FFF',
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2, // optional, default 3
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

  const screenWidth = 320; // replace with your screen width

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Predicted Consumption</Text>
        <Text style={styles.consumptionValue}>213 kWh</Text>
        <Text style={styles.estimatedBill}>Your estimated bill for this month will be $68.00</Text>
        <BarChart
          style={styles.graphStyle}
          data={data}
          width={screenWidth}
          height={220}
          yAxisLabel="$"
          chartConfig={chartConfig}
          verticalLabelRotation={30}
        />
        <LineChart
          data={data}
          width={screenWidth}
          height={220}
          chartConfig={chartConfig}
          bezier
        />
      </View>
      {/* You can add more components for Alerts and other parts as needed */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 16,
    margin: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  consumptionValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
  },
  estimatedBill: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  graphStyle: {
    marginVertical: 8,
    borderRadius: 16,
  },
});

export default App;