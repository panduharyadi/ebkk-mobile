import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/ebk-splash-logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#131229',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: Dimensions.get('window').width * 0.7,
    height: Dimensions.get('window').height * 0.25,
  },
});

export default SplashScreen; 