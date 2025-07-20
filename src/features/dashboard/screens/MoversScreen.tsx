import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, TextInput, Dimensions } from 'react-native';
import { colors } from '../../../common/styles/colors';
import Header from '../components/Header';
import BottomNav from '../../../common/components/BottomNav';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../navigation/AppNavigator';
import { Ionicons } from '@expo/vector-icons';
import { 
  MoverItem,
  getMoversData,
  getFilteredMoversData,
  refreshMoversData,
  searchMoversWithDebounce
} from '../models/moversData';

const { width } = Dimensions.get('window');

const MoversScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [activeTopTab, setActiveTopTab] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [moversList, setMoversList] = useState<MoverItem[]>([]);
  const [filteredList, setFilteredList] = useState<MoverItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMoversData();
  }, []);

  useEffect(() => {
    filterMovers();
  }, [searchQuery, moversList]);

  const loadMoversData = async () => {
    try {
      setLoading(true);
      const data = getMoversData();
      setMoversList(data);
      setFilteredList(data);
    } catch (error) {
      console.error('Error loading movers data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterMovers = () => {
    const filtered = getFilteredMoversData(searchQuery);
    setFilteredList(filtered);
  };

  const refreshData = async () => {
    try {
      setLoading(true);
      const data = await refreshMoversData();
      setMoversList(data);
      setFilteredList(getFilteredMoversData(searchQuery));
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderMoverItem = (item: MoverItem) => (
    <TouchableOpacity key={item.id} style={styles.moverItem}>
      <View style={styles.moverLeft}>
        <View style={styles.moverIconContainer}>
          <Image source={item.icon} style={styles.moverIcon} />
        </View>
        <View style={styles.moverInfo}>
          <Text style={styles.moverName}>{item.name}</Text>
          <Text style={styles.moverSubtitle}>{item.network} • {item.currency}</Text>
        </View>
      </View>
      <View style={styles.moverRight}>
        <Text style={styles.moverMarketCap}>{item.marketCap}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <Header
          activeTopTab={activeTopTab}
          onBellPress={() => {
            console.log('Bell pressed');
          }}
        />

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <View style={styles.searchBar}>
              <Ionicons name="search" size={20} color={colors.textSecondary} style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search token"
                placeholderTextColor={colors.textSecondary}
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
          </View>

          {/* Movers List */}
          <View style={styles.moversList}>
            {filteredList.map(renderMoverItem)}
          </View>
        </ScrollView>

        {/* Bottom Navigation */}
        <BottomNav activeTab={activeTopTab} onTabPress={setActiveTopTab} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  searchContainer: {
    marginBottom: 24,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: colors.surface,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
  },
  moversList: {
    marginBottom: 100,
  },
  moverItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  moverLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  moverIconContainer: {
    marginRight: 12,
    alignItems: 'center',
  },
  moverIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  moverInfo: {
    flex: 1,
  },
  moverName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  moverSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  moverRight: {
    alignItems: 'flex-end',
  },
  moverMarketCap: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
});

export default MoversScreen; 