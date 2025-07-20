import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Dimensions, Modal, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { colors } from '../../../common/styles/colors';
import Header from '../components/Header';
import BottomNav from '../../../common/components/BottomNav';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../navigation/AppNavigator';
import { Ionicons } from '@expo/vector-icons';
import { 
  WatchlistItem,
  FilterOption,
  getWatchlistData,
  getFilterOptions,
  getFilteredWatchlistData,
  refreshWatchlistData,
  createCustomFilter
} from '../models/watchlistData';

const { width } = Dimensions.get('window');

const WatchlistScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [activeTopTab, setActiveTopTab] = useState(3);
  const [activeFilter, setActiveFilter] = useState(2);
  const [watchlistData, setWatchlistData] = useState<WatchlistItem[]>([]);
  const [filteredData, setFilteredData] = useState<WatchlistItem[]>([]);
  const [filterOptions, setFilterOptions] = useState<FilterOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [newWatchlistName, setNewWatchlistName] = useState('');

  useEffect(() => {
    loadWatchlistData();
  }, []);

  useEffect(() => {
    filterWatchlist();
  }, [activeFilter, watchlistData]);

  const loadWatchlistData = async () => {
    try {
      setLoading(true);
      const data = getWatchlistData();
      const filters = getFilterOptions();
      
      setWatchlistData(data);
      setFilterOptions(filters);
      setFilteredData(getFilteredWatchlistData(activeFilter));
    } catch (error) {
      console.error('Error loading watchlist data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterWatchlist = () => {
    const filtered = getFilteredWatchlistData(activeFilter);
    setFilteredData(filtered);
  };

  const refreshData = async () => {
    try {
      setLoading(true);
      const data = await refreshWatchlistData();
      setWatchlistData(data);
      setFilteredData(getFilteredWatchlistData(activeFilter));
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterPress = (index: number) => {
    setActiveFilter(index);
  };

  const handleAddFilter = () => {
    setModalVisible(true);
  };

  const handleCreateWatchlist = async () => {
    if (newWatchlistName.trim() === '') {
      return;
    }
    
    try {
      const newFilter = await createCustomFilter(newWatchlistName.trim(), {});
      setFilterOptions(prev => [...prev, newFilter]);
      setNewWatchlistName('');
      setModalVisible(false);
    } catch (error) {
      console.error('Error creating custom filter:', error);
    }
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setNewWatchlistName('');
  };

  const renderWatchlistItem = (item: WatchlistItem) => (
    <TouchableOpacity key={item.id} style={styles.watchlistItem}>
      <View style={styles.watchlistLeft}>
        <View style={styles.watchlistIconContainer}>
          <Image source={item.icon} style={styles.watchlistIcon} />
        </View>
        <View style={styles.watchlistInfo}>
          <Text style={styles.watchlistName}>{item.name}</Text>
          <Text style={styles.watchlistSubtitle}>{item.symbol} • {item.currency}</Text>
        </View>
      </View>
      <View style={styles.watchlistRight}>
        <Text style={styles.watchlistMarketCap}>{item.marketCap}</Text>
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
          {/* Filter Buttons */}
          <View style={styles.filterContainer}>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.filterScroll}
            >
              {filterOptions.map((filter, index) => (
                <TouchableOpacity
                  key={filter.id}
                  style={[
                    styles.filterButton,
                    activeFilter === index && styles.filterButtonActive
                  ]}
                  onPress={() => handleFilterPress(index)}
                >
                  <Text style={[
                    styles.filterButtonText,
                    activeFilter === index && styles.filterButtonTextActive
                  ]}>
                    {filter.name}
                  </Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity
                style={styles.addFilterButton}
                onPress={handleAddFilter}
              >
                <Ionicons name="add" size={20} color={colors.text} />
              </TouchableOpacity>
            </ScrollView>
          </View>

          {/* Watchlist */}
          <View style={styles.watchlistContainer}>
            {filteredData.map(renderWatchlistItem)}
          </View>
        </ScrollView>

        {/* Bottom Navigation */}
        <BottomNav activeTab={activeTopTab} onTabPress={setActiveTopTab} />

        {/* Create Watchlist Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={handleCloseModal}
        >
          <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.modalOverlay}
          >
            <TouchableOpacity 
              style={styles.modalBackground} 
              activeOpacity={1} 
              onPress={handleCloseModal}
            >
              <View style={styles.modalContent}>
                <TouchableOpacity 
                  style={styles.modalHandle} 
                  activeOpacity={1}
                  onPress={() => {}}
                >
                  <View style={styles.handleBar} />
                </TouchableOpacity>
                
                <Text style={styles.modalTitle}>Create new watchlist</Text>
                
                <TextInput
                  style={styles.modalInput}
                  placeholder="Enter watchlist name"
                  placeholderTextColor={colors.textSecondary}
                  value={newWatchlistName}
                  onChangeText={setNewWatchlistName}
                  autoFocus={true}
                />
                
                <TouchableOpacity
                  style={styles.createButton}
                  onPress={handleCreateWatchlist}
                >
                  <Text style={styles.createButtonText}>Create Watchlist</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </Modal>
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
  filterContainer: {
    marginBottom: 24,
  },
  filterScroll: {
    paddingHorizontal: 0,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: colors.surface,
    marginRight: 8,
  },
  filterButtonActive: {
    backgroundColor: '#8B5CF6',
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  filterButtonTextActive: {
    color: colors.text,
  },
  addFilterButton: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 4,
  },
  watchlistContainer: {
    marginBottom: 100,
  },
  watchlistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  watchlistLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  watchlistIconContainer: {
    marginRight: 12,
    alignItems: 'center',
  },
  watchlistIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  watchlistInfo: {
    flex: 1,
  },
  watchlistName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  watchlistSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  watchlistRight: {
    alignItems: 'flex-end',
  },
  watchlistMarketCap: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 30,
    minHeight: 250,
  },
  modalHandle: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  handleBar: {
    width: 40,
    height: 4,
    backgroundColor: colors.textSecondary,
    borderRadius: 2,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 20,
  },
  modalInput: {
    backgroundColor: colors.background,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.text,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.surface,
  },
  createButton: {
    backgroundColor: '#8B5CF6',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  createButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
  },
});

export default WatchlistScreen; 