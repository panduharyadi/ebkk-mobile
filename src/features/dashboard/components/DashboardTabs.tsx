import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../../../common/styles/colors';

interface DashboardTabsProps {
  tabs: string[];
  activeTab: number;
  onTabPress?: (idx: number) => void;
}

const DashboardTabs: React.FC<DashboardTabsProps> = ({ tabs, activeTab, onTabPress }) => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabs} contentContainerStyle={{ alignItems: 'center' }}>
      {tabs.map((tab, idx) => (
        <TouchableOpacity key={tab} onPress={() => onTabPress && onTabPress(idx)}>
          <View style={[styles.tab, idx === activeTab && styles.tabActive]}>
            <Text style={[styles.tabText, idx === activeTab && styles.tabTextActive]}>{tab}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  tabs: {
    flexGrow: 0,
    marginBottom: 0,
    paddingLeft: 0,
  },
  tab: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 6,
  },
  tabActive: {
    backgroundColor: colors.surface,
  },
  tabText: {
    color: colors.textSecondary,
    fontSize: 14,
    fontWeight: '600',
  },
  tabTextActive: {
    color: colors.text,
    fontWeight: 'bold',
  },
});

export default DashboardTabs; 