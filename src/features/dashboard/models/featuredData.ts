export interface TrendingItem {
  id: string;
  name: string;
  price?: string;
  network?: string;
  fullName?: string;
  icon: any;
  isHighlighted: boolean;
}

export interface CryptoItem {
  id: string;
  name: string;
  symbol: string;
  price: string;
  change: string;
  quantity: string;
  icon: any;
}

export interface FilterOption {
  id: string;
  name: string;
}

// Data dummy untuk Trending Now
export const getTrendingData = (): TrendingItem[] => {
  return [
    {
      id: '1',
      name: 'Mushmagic',
      price: '~ $27.000',
      network: 'Solana',
      icon: require('../../../../assets/crypto1.png'),
      isHighlighted: true,
    },
    {
      id: '2',
      name: 'SOL',
      price: '~ $17.000',
      network: 'Solana',
      icon: require('../../../../assets/crypto2.png'),
      isHighlighted: false,
    },
  ];
};

// Data dummy untuk Filter Options
export const getFilterOptions = (): FilterOption[] => {
  return [
    { id: '1', name: 'All' },
    { id: '2', name: 'Meme Coin' },
    { id: '3', name: 'Pump' },
    { id: '4', name: 'Top Movers' },
  ];
};

// Data dummy untuk Cryptocurrency List
export const getCryptoList = (): CryptoItem[] => {
  return [
    {
      id: '1',
      name: 'Ethereum',
      symbol: 'ETH',
      price: '$3,245.03',
      change: '-13.40%',
      quantity: '0.12543 ETH',
      icon: require('../../../../assets/crypto1.png'),
    },
    {
      id: '2',
      name: 'Bitcoin',
      symbol: 'BTC',
      price: '$3,245.03',
      change: '-6.00%',
      quantity: '0.12543 BTC',
      icon: require('../../../../assets/crypto2.png'),
    },
    {
      id: '3',
      name: 'Litecoin',
      symbol: 'LTC',
      price: '$3,245.03',
      change: '+14.25%',
      quantity: '0.12543 LTC',
      icon: require('../../../../assets/crypto1.png'),
    },
    {
      id: '4',
      name: 'Solana',
      symbol: 'SOL',
      price: '$3,245.03',
      change: '-2.00%',
      quantity: '0.12543 SOL',
      icon: require('../../../../assets/crypto2.png'),
    },
    {
      id: '5',
      name: 'Binance Coin',
      symbol: 'BNB',
      price: '$3,245.03',
      change: '+12.00%',
      quantity: '0.12543 BNB',
      icon: require('../../../../assets/crypto1.png'),
    },
  ];
};

export const getFilteredCryptoList = (filterIndex: number): CryptoItem[] => {
  const allCrypto = getCryptoList();
  
  switch (filterIndex) {
    case 0:
      return allCrypto;
    case 1:
      return allCrypto.filter(crypto => 
        crypto.name.toLowerCase().includes('meme') || 
        crypto.symbol.toLowerCase().includes('meme')
      );
    case 2: 
      return allCrypto.filter(crypto => 
        crypto.change.startsWith('+') && 
        parseFloat(crypto.change.replace('+', '').replace('%', '')) > 10
      );
    case 3:
      return allCrypto.filter(crypto => 
        Math.abs(parseFloat(crypto.change.replace(/[+-]/g, '').replace('%', ''))) > 5
      );
    default:
      return allCrypto;
  }
};

export const getTrendingDataByTime = (timeRange: '1h' | '24h' | '7d' = '24h'): TrendingItem[] => {
  
  return getTrendingData();
};

export const refreshFeaturedData = async (): Promise<{
  trending: TrendingItem[];
  cryptoList: CryptoItem[];
  filters: FilterOption[];
}> => {
  
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return {
    trending: getTrendingData(),
    cryptoList: getCryptoList(),
    filters: getFilterOptions(),
  };
}; 