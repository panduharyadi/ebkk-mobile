import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { colors } from '../../../common/styles/colors';
import DashboardTabs from './DashboardTabs';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../navigation/AppNavigator';

const { width } = Dimensions.get('window');

interface HeaderProps {
  activeTopTab: number;
  onBellPress?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  activeTopTab,
  onBellPress,
}) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const topTabs = ['Swap', 'Movers', 'Featured', 'Watchlist'];

  const handleTabPress = (index: number) => {
    switch (index) {
      case 0: // Swap
        navigation.navigate('Dashboard', { activeTab: 0 });
        break;
      case 1: // Movers
        navigation.navigate('Movers');
        break;
      case 2: // Featured
        navigation.navigate('Featured');
        break;
      case 3: // Watchlist
        navigation.navigate('Watchlist');
        break;
      default:
        navigation.navigate('Dashboard', { activeTab: index });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Image source={require('../../../../assets/ebk-splash-logo.png')} style={styles.logo} />
        
        <View style={styles.tabsContainer}>
          <DashboardTabs 
            tabs={topTabs} 
            activeTab={activeTopTab} 
            onTabPress={handleTabPress} 
          />
        </View>
        
        <TouchableOpacity onPress={onBellPress}>
          <Image source={require('../../../../assets/bell.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    paddingTop: 36,
    paddingBottom: 18,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 18,
    marginTop: 8,
    minHeight: 40,
  },
  logo: {
    width: 48,
    height: 24,
    resizeMode: 'contain',
  },
  icon: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
  },
  tabsContainer: {
    flex: 1,
    marginHorizontal: 20,
  },
});

export default Header; 