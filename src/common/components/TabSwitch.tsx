import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../../common/styles/colors';
import { typography } from '../../common/styles/typography';

interface TabSwitchProps {
  tabs: string[];
  activeTab: number;
  onTabPress: (index: number) => void;
  style?: ViewStyle;
}

const TabSwitch: React.FC<TabSwitchProps> = ({ tabs, activeTab, onTabPress, style }) => {
  return (
    <View style={[styles.tabContainer, style]}>
      {tabs.map((tab, idx) => (
        <TouchableOpacity
          key={tab}
          style={[styles.tab, activeTab === idx && styles.tabActive]}
          onPress={() => onTabPress(idx)}
        >
          <Text style={[styles.tabText, activeTab === idx && styles.tabTextActive]}>{tab}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#23234A',
    borderRadius: 12,
    marginBottom: 24,
    width: '100%',
    height: 48,
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  tabActive: {
    backgroundColor: '#fff',
  },
  tabText: {
    color: '#B0B0C3',
    fontSize: 16,
    fontWeight: '600',
  },
  tabTextActive: {
    color: '#181833',
    fontWeight: 'bold',
  },
});

export default TabSwitch; 