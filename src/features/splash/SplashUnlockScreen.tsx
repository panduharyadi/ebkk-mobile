import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

const SplashUnlockScreen = ({ onUnlock }: { onUnlock: () => void }) => {
  return (
    <View style={styles.container}>
      <Image source={require('../../../assets/image/splash/splash-unlock.png')} style={styles.bg} />
      <View style={styles.content}>
        <Image source={require('../../../assets/ebk-splash-logo.png')} style={styles.logo} resizeMode="contain" />
      </View>
      <TouchableOpacity style={styles.button} onPress={onUnlock} activeOpacity={0.8}>
        <Text style={styles.buttonText}>Unlock</Text>
      </TouchableOpacity>
    </View>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B1022',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bg: {
    position: 'absolute',
    width: width,
    height: height,
    top: 0,
    left: 0,
    resizeMode: 'cover',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  logo: {
    width: 220,
    height: 120,
    marginTop: 60,
  },
  button: {
    width: width - 40,
    height: 52,
    backgroundColor: '#22C55E',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default SplashUnlockScreen; 