import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Image } from 'react-native';

const HomeScreen = ({ navigation }) => {
  const catPosition = useRef(new Animated.Value(-100)).current; // Changed initial value to -100

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(catPosition, {
          toValue: 100,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(catPosition, {
          toValue: -100,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: '#535CE8' }]}>
      <View style={styles.backgroundCircle} />
      <Text style={styles.content}>
        We are preparing the best experience for you. This may take a few minutes. {'\n\n'}
        Meanwhile, enjoy watching our configuration assistant rushing to set your application for you.
      </Text>

      <Animated.View style={[styles.widget, { transform: [{ translateX: catPosition }] }]}>
        <Image
          source={require('../assets/Cat.gif')} 
          style={{ width: 180, height: 150 }}
        />
      </Animated.View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('DashBoard')}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  backgroundCircle: {
    width: 504,
    height: 462,
    borderRadius: 9999,
    backgroundColor: 'white',
    position: 'absolute',
    top: -266,
  },
  content: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginTop: 30,
    fontFamily: 'Lato-Bold',
    marginBottom: 30,
  },
  widget: {
    width: 100,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  button: {
    width: '70%',
    paddingVertical: 12,
    backgroundColor: 'white',
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#171A1F',
    fontFamily: 'Lato-Bold',
  },
});

export default HomeScreen;
