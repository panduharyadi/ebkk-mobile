import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../features/splash/SplashScreen';
import SplashUnlockScreen from '../features/splash/SplashUnlockScreen';
import PasscodeScreen from '../features/splash/PasscodeScreen';
import DashboardScreen from '../features/dashboard/screens/DashboardScreen';
import FeaturedScreen from '../features/dashboard/screens/FeaturedScreen';
import MoversScreen from '../features/dashboard/screens/MoversScreen';
import WatchlistScreen from '../features/dashboard/screens/WatchlistScreen';

export type RootStackParamList = {
  Splash: undefined;
  SplashUnlock: undefined;
  Passcode: undefined;
  Dashboard: { activeTab?: number } | undefined;
  Featured: undefined;
  Movers: undefined;
  Watchlist: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Splash">
        <Stack.Screen name="Splash" component={SplashScreenWithTimer} />
        <Stack.Screen name="SplashUnlock" component={SplashUnlockScreenWithNav} />
        <Stack.Screen name="Passcode" component={PasscodeScreenWithNav} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="Featured" component={FeaturedScreen} />
        <Stack.Screen name="Movers" component={MoversScreen} />
        <Stack.Screen name="Watchlist" component={WatchlistScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const SplashScreenWithTimer = ({ navigation }: any) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('SplashUnlock');
    }, 5000); // 5 detik
    return () => clearTimeout(timer);
  }, [navigation]);
  return <SplashScreen />;
};

const SplashUnlockScreenWithNav = ({ navigation }: any) => {
  return <SplashUnlockScreen onUnlock={() => navigation.replace('Passcode')} />;
};

const PasscodeScreenWithNav = ({ navigation }: any) => {
  const handleSuccess = (code: string) => {
    
    navigation.replace('Dashboard');
  };
  return <PasscodeScreen onSuccess={handleSuccess} onCancel={() => navigation.replace('SplashUnlock')} />;
};

export default AppNavigator;
