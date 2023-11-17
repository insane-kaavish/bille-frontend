import React from 'react';
import { View, Text, StyleSheet ,TouchableOpacity} from 'react-native';

const DataComplete = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.backgroundCircle} />

      <TouchableOpacity
        // style={{ width: 348, height: 50, marginTop: 40, backgroundColor: '#535CE8', borderRadius: 26, overflow: 'hidden', justifyContent: 'center', alignItems: 'center' }}
        onPress={()=>navigation.navigate('Home')}
        style={styles.readyButton}
      >
        <Text style={styles.readyText}>Ready</Text>
      </TouchableOpacity>
{/*         
      <View style={styles.readyButton}>
        <Text style={styles.readyText}>Ready</Text>
      </View> */}

      <Text style={styles.congratulationsText}>
        Congratulations🎉{'\n'}
        You've just unlocked smarter energy management.{'\n\n'}
        Get ready to take control and start saving now!
      </Text>

      <Text style={styles.billEText}>Bill-E</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    position: 'relative',
    backgroundColor: '#535CE8',
    boxShadow: '0px 3px 6px rgba(18, 15, 40, 0.12)',
  },
  backgroundCircle: {
    width: 504,
    height: 462,
    left: -209,
    top: -266,
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 9999,
  },
  readyButton: {
    width: 348,
    paddingTop: 12,
    paddingBottom: 12,
    left: 21,
    top: 763,
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 26,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  readyText: {
    color: '#171A1F',
    fontSize: 18,
    fontFamily: 'Lato',
    fontWeight: '400',
    lineHeight: 28,
    // alignContent 'left',/
    wordWrap: 'wrap',
  },
  congratulationsText: {
    width: 311,
    left: 33,
    top: 230,
    position: 'absolute',
    color: 'white',
    fontSize: 32,
    fontFamily: 'Outfit',
    fontWeight: '600',
    lineHeight: 48,
    wordWrap: 'wrap',
    textAlign: 'left',
  },
  billEText: {
    left: 34,
    top: 38,
    position: 'absolute',
    color: '#171A1F',
    fontSize: 48,
    fontFamily: 'Outfit',
    fontWeight: '700',
    lineHeight: 68,
    wordWrap: 'wrap',
    textAlign: 'center',
  },
});

export default DataComplete;
