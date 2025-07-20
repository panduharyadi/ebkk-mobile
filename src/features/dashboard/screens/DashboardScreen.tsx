import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, SafeAreaView, Platform, Alert } from 'react-native';
import { colors } from '../../../common/styles/colors';
import Header from '../components/Header';
import SwipeableCard from '../components/SwipeableCard';
import BottomNav from '../../../common/components/BottomNav';
import { CardData, getCardData, buyCard, skipCard } from '../models/cardData';
import { useNavigation, useRoute, RouteProp, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../navigation/AppNavigator';

const chartTimes = ['1M', '15M', '1H'];
const amounts = ['$5', '$10', '$20', 'Custom'];

const DashboardScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'Dashboard'>>();
  const [activeTab, setActiveTab] = useState(route.params?.activeTab || 0);

  const [activeTopTab, setActiveTopTab] = useState(route.params?.activeTab || 0);
  const [activeTime, setActiveTime] = useState(1); // 15M
  const [activeAmount, setActiveAmount] = useState(0);
  const [activeNav, setActiveNav] = useState(0);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [cardData, setCardData] = useState<CardData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCardData();
  }, []);

  const loadCardData = async () => {
    try {
      setLoading(true);
      const data = await getCardData();
      setCardData(data);
    } catch (error) {
      console.error('Error loading card data:', error);
      Alert.alert('Error', 'Failed to load card data');
    } finally {
      setLoading(false);
    }
  };

  const handleSwipeRight = async () => {
    if (cardData.length === 0) return;
    
    const currentCard = cardData[currentCardIndex];
    try {
      const success = await buyCard(currentCard.id);
      if (success) {
        Alert.alert('Buy Action', `Buying ${currentCard.coinName}!`);
        
        setCurrentCardIndex((prev) => (prev + 1) % cardData.length);
      }
    } catch (error) {
      console.error('Error buying card:', error);
      Alert.alert('Error', 'Failed to buy card');
    }
  };

  const handleSwipeLeft = async () => {
    if (cardData.length === 0) return;
    
    const currentCard = cardData[currentCardIndex];
    try {
      const success = await skipCard(currentCard.id);
      if (success) {
        Alert.alert('Skip Action', `Skipping ${currentCard.coinName}!`);
        
        setCurrentCardIndex((prev) => (prev + 1) % cardData.length);
      }
    } catch (error) {
      console.error('Error skipping card:', error);
      Alert.alert('Error', 'Failed to skip card');
    }
  };

  const handleButtonSkip = async () => {
    if (cardData.length === 0) return;
    
    const currentCard = cardData[currentCardIndex];
    try {
      const success = await skipCard(currentCard.id);
      if (success) {
        Alert.alert('Skip Action', `Skipping ${currentCard.coinName}!`);
        
        setCurrentCardIndex((prev) => (prev + 1) % cardData.length);
      }
    } catch (error) {
      console.error('Error skipping card:', error);
      Alert.alert('Error', 'Failed to skip card');
    }
  };

  const handleButtonBuy = async () => {
    if (cardData.length === 0) return;
    
    const currentCard = cardData[currentCardIndex];
    try {
      const success = await buyCard(currentCard.id);
      if (success) {
        Alert.alert('Buy Action', `Buying ${currentCard.coinName}!`);
        
        setCurrentCardIndex((prev) => (prev + 1) % cardData.length);
      }
    } catch (error) {
      console.error('Error buying card:', error);
      Alert.alert('Error', 'Failed to buy card');
    }
  };

  const currentCard = cardData[currentCardIndex] || null;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Header
          activeTopTab={activeTopTab}
          onBellPress={() => {
            Alert.alert('Notifications', 'Bell icon pressed!');
          }}
        />
        {/* Balance */}
        <View style={styles.balanceRow}>
          <Image source={require('../../../../assets/avatar1.png')} style={styles.balanceAvatar} />
          <View>
            <Text style={styles.balanceLabel}>Your Balance</Text>
            <Text style={styles.balanceValue}>$58.52 <Text style={{fontSize: 18}}>🪙</Text></Text>
          </View>
        </View>
        {/* Chart Card */}
        <View style={styles.cardWrap}>
          {cardData.length > 1 && !loading && (
            <>
              {cardData.length > 2 && (
                <View style={[styles.card, styles.cardBackground3]}>
                  <View style={styles.cardHeader}>
                    <Image source={cardData[(currentCardIndex + 2) % cardData.length].avatar} style={styles.coinAvatar} />
                    <View style={{ flex: 1 }}>
                      <Text style={styles.coinName}>{cardData[(currentCardIndex + 2) % cardData.length].coinName}</Text>
                      <Text style={styles.coinPair}>{cardData[(currentCardIndex + 2) % cardData.length].coinPair}</Text>
                    </View>
                    <View style={{ alignItems: 'flex-end' }}>
                      <Text style={styles.coinValue}>{cardData[(currentCardIndex + 2) % cardData.length].coinValue}</Text>
                      <Text style={[styles.coinChange, { color: cardData[(currentCardIndex + 2) % cardData.length].coinChange.includes('▲') ? '#22C55E' : '#F87171' }]}> {cardData[(currentCardIndex + 2) % cardData.length].coinChange}</Text>
                    </View>
                  </View>
                  <Image source={require('../../../../assets/image/dashboard/Chart.png')} style={styles.chartImg} />
                  <View style={styles.cardFooter}>
                    <View style={styles.cardFooterColLeft}>
                      <Text style={styles.cardFooterLabel}>Market Cap</Text>
                      <Text style={styles.cardFooterValue}>{cardData[(currentCardIndex + 2) % cardData.length].marketCap}</Text>
                    </View>
                    <View style={styles.cardFooterColRight}>
                      <Text style={styles.cardFooterLabel}>Volume</Text>
                      <Text style={styles.cardFooterValue}>{cardData[(currentCardIndex + 2) % cardData.length].volume}</Text>
                    </View>
                  </View>
                </View>
              )}
            
              <View style={[styles.card, styles.cardBackground2]}>
                <View style={styles.cardHeader}>
                  <Image source={cardData[(currentCardIndex + 1) % cardData.length].avatar} style={styles.coinAvatar} />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.coinName}>{cardData[(currentCardIndex + 1) % cardData.length].coinName}</Text>
                    <Text style={styles.coinPair}>{cardData[(currentCardIndex + 1) % cardData.length].coinPair}</Text>
                  </View>
                  <View style={{ alignItems: 'flex-end' }}>
                    <Text style={styles.coinValue}>{cardData[(currentCardIndex + 1) % cardData.length].coinValue}</Text>
                    <Text style={[styles.coinChange, { color: cardData[(currentCardIndex + 1) % cardData.length].coinChange.includes('▲') ? '#22C55E' : '#F87171' }]}> {cardData[(currentCardIndex + 1) % cardData.length].coinChange}</Text>
                  </View>
                </View>
                <Image source={require('../../../../assets/image/dashboard/Chart.png')} style={styles.chartImg} />
                <View style={styles.cardFooter}>
                  <View style={styles.cardFooterColLeft}>
                    <Text style={styles.cardFooterLabel}>Market Cap</Text>
                    <Text style={styles.cardFooterValue}>{cardData[(currentCardIndex + 1) % cardData.length].marketCap}</Text>
                  </View>
                  <View style={styles.cardFooterColRight}>
                    <Text style={styles.cardFooterLabel}>Volume</Text>
                    <Text style={styles.cardFooterValue}>{cardData[(currentCardIndex + 1) % cardData.length].volume}</Text>
                  </View>
                </View>
              </View>
            </>
          )}
          {loading ? (
            <View style={styles.card}>
              <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>Loading...</Text>
              </View>
            </View>
          ) : currentCard ? (
            <SwipeableCard
              onSwipeRight={handleSwipeRight}
              onSwipeLeft={handleSwipeLeft}
            >
              <View style={styles.card}>
                <View style={styles.cardHeader}>
                  <Image source={currentCard.avatar} style={styles.coinAvatar} />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.coinName}>{currentCard.coinName}</Text>
                    <Text style={styles.coinPair}>{currentCard.coinPair}</Text>
                  </View>
                  <View style={{ alignItems: 'flex-end' }}>
                    <Text style={styles.coinValue}>{currentCard.coinValue}</Text>
                    <Text style={[styles.coinChange, { color: currentCard.coinChange.includes('▲') ? '#22C55E' : '#F87171' }]}> {currentCard.coinChange}</Text>
                  </View>
                </View>
                <Image source={require('../../../../assets/image/dashboard/Chart.png')} style={styles.chartImg} />
                <View style={styles.cardFooter}>
                  <View style={styles.cardFooterColLeft}>
                    <Text style={styles.cardFooterLabel}>Market Cap</Text>
                    <Text style={styles.cardFooterValue}>{currentCard.marketCap}</Text>
                  </View>
                  <View style={styles.cardFooterColRight}>
                    <Text style={styles.cardFooterLabel}>Volume</Text>
                    <Text style={styles.cardFooterValue}>{currentCard.volume}</Text>
                  </View>
                  <View style={styles.timeTabsWrap}>
                    <View style={styles.timeTabs}>
                      {chartTimes.map((t, i) => (
                        <TouchableOpacity
                          key={t}
                          style={[styles.timeTab, i === activeTime && styles.timeTabActive]}
                          onPress={() => setActiveTime(i)}
                        >
                          <Text style={[styles.timeTabText, i === activeTime && styles.timeTabTextActive]}>{t}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>
                </View>
              </View>
            </SwipeableCard>
          ) : (
            <View style={styles.card}>
              <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>No cards available</Text>
              </View>
            </View>
          )}
        </View>
        {/* Amount Tabs */}
        <View style={styles.amountTabs}>
          {amounts.map((amt, i) => (
            <TouchableOpacity
              key={amt}
              style={[styles.amountTab, i === activeAmount && styles.amountTabActive]}
              onPress={() => setActiveAmount(i)}
            >
              <Text style={[styles.amountTabText, i === activeAmount && styles.amountTabTextActive]}>{amt}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {/* Action Buttons */}
        <View style={styles.actionRow}>
          <TouchableOpacity 
            style={[styles.actionBtn, styles.skipBtn]}
            onPress={handleButtonSkip}
          >
            <Text style={styles.actionBtnText}>Skip</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.actionBtn, styles.buyBtn]}
            onPress={handleButtonBuy}
          >
            <Text style={styles.actionBtnText}>Buy</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionBtn, styles.sendBtn, { flex: 0, width: 44 }]}> 
            <Image
              source={require('../../../../assets/image/icon/share.png')}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        <BottomNav activeTab={activeNav} onTabPress={setActiveNav} />
      </View>
    </SafeAreaView>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
    paddingBottom: Platform.OS === 'android' ? 18 : 0,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingBottom: 24,
  },
  balanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -10,
    marginBottom: 30,
    paddingHorizontal: 24,
  },
  balanceAvatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    marginRight: 12,
  },
  balanceLabel: {
    color: colors.textSecondary,
    fontSize: 14,
    marginBottom: 2,
  },
  balanceValue: {
    color: colors.text,
    fontSize: 20,
    fontWeight: 'bold',
  },
  cardWrap: {
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 18,
  },
  cardStack: {
    position: 'absolute',
    top: -20,
    width: width - 100,
    height: 330,
    borderRadius: 20,
    backgroundColor: colors.surface,
    opacity: 0.15,
    zIndex: 0,
  },
  cardStack2: {
    position: 'absolute',
    top: -10,
    width: width - 85,
    height: 320,
    borderRadius: 20,
    backgroundColor: colors.surface,
    opacity: 0.5,
    zIndex: 1,
  },
  card: {
    width: width - 70,
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 18,
    zIndex: 2,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    minHeight: 320,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  coinAvatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    marginRight: 10,
  },
  coinName: {
    color: colors.text,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 0,
  },
  coinPair: {
    color: colors.textSecondary,
    fontSize: 13,
    marginBottom: 0,
  },
  coinValue: {
    color: colors.text,
    fontSize: 16,
    fontWeight: 'bold',
  },
  coinChange: {
    color: '#22C55E',
    fontSize: 13,
    fontWeight: 'bold',
  },
  chartImg: {
    width: '100%',
    height: 110,
    resizeMode: 'contain',
    marginBottom: 8,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginTop: 8,
    position: 'relative',
    minHeight: 48,
  },
  cardFooterColLeft: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },
  cardFooterColRight: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  cardFooterLabel: {
    color: colors.textSecondary,
    fontSize: 12,
    marginBottom: 2,
  },
  cardFooterValue: {
    color: colors.text,
    fontSize: 14,
    fontWeight: 'bold',
  },
  timeTabsWrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: -60,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  timeTabs: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    justifyContent: 'center',
  },
  timeTab: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: 'transparent',
    marginLeft: 4,
  },
  timeTabActive: {
    backgroundColor: '#23234A',
  },
  timeTabText: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: '600',
  },
  timeTabTextActive: {
    color: colors.text,
    fontWeight: 'bold',
  },
  amountTabs: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 12,
  },
  amountTab: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    backgroundColor: '#23234A',
    marginHorizontal: 6,
  },
  amountTabActive: {
    backgroundColor: '#6C7AFA',
  },
  amountTabText: {
    color: colors.textSecondary,
    fontSize: 15,
    fontWeight: '600',
  },
  amountTabTextActive: {
    color: colors.text,
    fontWeight: 'bold',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 24,
    marginBottom: 24,
    marginTop: 8,
  },
  actionBtn: {
    flex: 1,
    height: 44,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 6,
  },
  skipBtn: {
    backgroundColor: '#F87171',
  },
  buyBtn: {
    backgroundColor: '#22C55E',
  },
  sendBtn: {
    backgroundColor: '#3B82F6',
  },
  actionBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 200,
  },
  loadingText: {
    color: colors.textSecondary,
    fontSize: 16,
    fontWeight: '600',
  },
  cardBackground2: {
    position: 'absolute',
    top: -15,
    width: width - 80,
    height: 310,
    backgroundColor: '#23234A',
    opacity: 0.7,
    borderRadius: 20,
    zIndex: 1,
  },
  cardBackground3: {
    position: 'absolute',
    top: -30,
    width: width - 90,
    height: 300,
    backgroundColor: '#FF4444',
    opacity: 0.3,
    borderRadius: 20,
    zIndex: 0,
  },
});

export default DashboardScreen; 