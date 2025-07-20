import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Dimensions, Alert } from 'react-native';
import { colors } from '../../../common/styles/colors';
import Header from '../components/Header';
import BottomNav from '../../../common/components/BottomNav';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../navigation/AppNavigator';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  TrendingItem, 
  CryptoItem, 
  FilterOption,
  getTrendingData,
  getFilterOptions,
  getFilteredCryptoList,
  refreshFeaturedData
} from '../models/featuredData';

const { width } = Dimensions.get('window');

const FeaturedScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [activeTopTab, setActiveTopTab] = useState(2);
  const [activeFilter, setActiveFilter] = useState(0);
  const [trendingData, setTrendingData] = useState<TrendingItem[]>([]);
  const [filterOptions, setFilterOptions] = useState<FilterOption[]>([]);
  const [cryptoList, setCryptoList] = useState<CryptoItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFeaturedData();
  }, []);

  const loadFeaturedData = async () => {
    try {
      setLoading(true);
      const trending = getTrendingData();
      const filters = getFilterOptions();
      const crypto = getFilteredCryptoList(activeFilter);
      
      setTrendingData(trending);
      setFilterOptions(filters);
      setCryptoList(crypto);
    } catch (error) {
      console.error('Error loading featured data:', error);
      Alert.alert('Error', 'Failed to load featured data');
    } finally {
      setLoading(false);
    }
  };

  const refreshData = async () => {
    try {
      setLoading(true);
      const data = await refreshFeaturedData();
      setTrendingData(data.trending);
      setFilterOptions(data.filters);
      setCryptoList(getFilteredCryptoList(activeFilter));
    } catch (error) {
      console.error('Error refreshing data:', error);
      Alert.alert('Error', 'Failed to refresh data');
    } finally {
      setLoading(false);
    }
  };



  const handleFilterPress = (index: number) => {
    setActiveFilter(index);
    const filteredCrypto = getFilteredCryptoList(index);
    setCryptoList(filteredCrypto);
  };

  const renderTrendingCard = (item: TrendingItem, index: number) => (
    <View key={item.id} style={styles.trendingCardWrapper}>
      <LinearGradient
        colors={['#2D76F9', '#F92D8F']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.trendingCardGradientBorder}
      >
        <View style={styles.trendingCard}>
        <View style={styles.trendingLeftSection}>
            <View style={{ alignItems: 'center' }}>
                <Image source={item.icon} style={styles.trendingIcon} />
                {item.network && <Text style={styles.trendingNetwork}>{item.network}</Text>}
            </View>
            <View style={styles.trendingTextSection}>
                <Text style={styles.trendingName}>{item.name}</Text>
                {item.fullName && <Text style={styles.trendingFullName}>{item.fullName}</Text>}
            </View>
        </View>
          <View style={styles.trendingRightSection}>
            {item.price && <Text style={styles.trendingPrice}>{item.price}</Text>}
          </View>
        </View>
      </LinearGradient>
    </View>
  );

  const renderCryptoItem = (item: CryptoItem) => (
    <TouchableOpacity key={item.id} style={styles.cryptoItem}>
      <View style={styles.cryptoLeft}>
        <Image source={item.icon} style={styles.cryptoIcon} />
        <View style={styles.cryptoInfo}>
          <Text style={styles.cryptoName}>{item.name}</Text>
          <Text style={styles.cryptoQuantity}>{item.quantity}</Text>
        </View>
      </View>
      <View style={styles.cryptoRight}>
        <Text style={styles.cryptoPrice}>{item.price}</Text>
        <Text style={[
          styles.cryptoChange,
          { color: item.change.startsWith('+') ? '#22C55E' : '#F87171' }
        ]}>
          {item.change}
        </Text>
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
        
          {/* Trending Now Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Trending Now</Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={styles.trendingScroll}
              contentContainerStyle={styles.trendingContainer}
            >
              {trendingData.map(renderTrendingCard)}
            </ScrollView>
          </View>

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
            </ScrollView>
          </View>

          {/* Crypto List */}
          <View style={styles.cryptoList}>
            {cryptoList.map(renderCryptoItem)}
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
  },
  trendingScroll: {
    marginHorizontal: -20,
  },
  trendingContainer: {
    paddingHorizontal: 20,
  },
  trendingCardWrapper: {
    marginRight: 18,
  },
  trendingCardGradientBorder: {
    width: 244,
    height: 120,
    borderRadius: 16,
    padding: 2,
  },
  trendingCard: {
    width: 240,
    height: '100%',
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  trendingLeftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  trendingTextSection: {
    marginLeft: 12,
  },
  trendingRightSection: {
    alignItems: 'flex-end',
  },
  trendingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  trendingName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  trendingPrice: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text,
  },
  trendingNetwork: {
    fontSize: 10,
    color: colors.textSecondary,
    marginTop: 4,
  },
  trendingFullName: {
    fontSize: 12,
    color: colors.textSecondary,
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
    borderRadius: 20,
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
  cryptoList: {
    marginBottom: 100,
  },
  cryptoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.surface,
  },
  cryptoLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  cryptoIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: 12,
  },
  cryptoInfo: {
    flex: 1,
  },
  cryptoName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  cryptoQuantity: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  cryptoRight: {
    alignItems: 'flex-end',
  },
  cryptoPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  cryptoChange: {
    fontSize: 14,
    fontWeight: '500',
  },
});

export default FeaturedScreen; 