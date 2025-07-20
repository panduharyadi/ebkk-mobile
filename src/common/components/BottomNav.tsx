import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../styles/colors';

const icons = [
  { name: 'home-outline', lib: Ionicons },
  { name: 'newspaper-variant-outline', lib: MaterialCommunityIcons },
  { name: 'plus-circle-outline', lib: MaterialCommunityIcons },
  { name: 'chatbubble-ellipses-outline', lib: Ionicons },
  { name: 'person-outline', lib: Ionicons },
];

interface BottomNavProps {
  activeTab: number;
  onTabPress: (idx: number) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabPress }) => {
  return (
    <View style={styles.container}>
      {icons.map((icon, idx) => {
        const IconLib = icon.lib;
        const isActive = idx === activeTab;
        return (
          <TouchableOpacity
            key={icon.name}
            style={styles.tab}
            onPress={() => onTabPress(idx)}
            activeOpacity={0.7}
          >
            <IconLib
              name={icon.name as any}
              size={28}
              color={isActive ? colors.accent : colors.textSecondary}
              style={isActive ? styles.activeIcon : undefined}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: colors.background,
    height: 60,
    borderTopWidth: 1,
    borderTopColor: '#23234A',
    paddingBottom: 6,
    paddingTop: 4,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeIcon: {
    // Optionally add shadow or scale for active tab
  },
});

export default BottomNav; 