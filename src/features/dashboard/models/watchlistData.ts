export interface WatchlistItem {
  id: string;
  name: string;
  symbol: string;
  currency: string;
  marketCap: string;
  icon: any;
}

export interface FilterOption {
  id: string;
  name: string;
}

export const getWatchlistData = (): WatchlistItem[] => {
  return [
    {
      id: '1',
      name: 'Mushroom Coin',
      symbol: 'mushroom',
      currency: 'USD',
      marketCap: 'MC 4,230,000 K',
      icon: require('../../../../assets/crypto1.png'),
    },
    {
      id: '2',
      name: 'Bonk',
      symbol: 'bonk',
      currency: 'USD',
      marketCap: 'MC 3,150,000 K',
      icon: require('../../../../assets/crypto2.png'),
    },
    {
      id: '3',
      name: 'Btc Chan',
      symbol: 'btcchan',
      currency: 'USD',
      marketCap: 'MC 2,890,000 K',
      icon: require('../../../../assets/crypto1.png'),
    },
    {
      id: '4',
      name: 'Bunkcoin',
      symbol: 'bunk',
      currency: 'USD',
      marketCap: 'MC 1,750,000 K',
      icon: require('../../../../assets/crypto2.png'),
    },
    {
      id: '5',
      name: 'BegeCoin',
      symbol: 'bege',
      currency: 'USD',
      marketCap: 'MC 1,230,000 K',
      icon: require('../../../../assets/crypto1.png'),
    },
  ];
};

export const getFilterOptions = (): FilterOption[] => {
  return [
    { id: '1', name: 'Default' },
    { id: '2', name: 'Alt Coin' },
    { id: '3', name: 'Meme Coin' },
  ];
};

export const getFilteredWatchlistData = (filterIndex: number): WatchlistItem[] => {
  const allWatchlist = getWatchlistData();
  
  switch (filterIndex) {
    case 0: // Default
      return allWatchlist.filter(item => 
        item.name === 'Mushroom Coin' || item.name === 'Bonk'
      );
    case 1: // Alt Coin
      return allWatchlist.filter(item => 
        item.name === 'Btc Chan' || item.name === 'Bunkcoin'
      );
    case 2: // Meme Coin
      return allWatchlist.filter(item => 
        item.name === 'Mushroom Coin' || item.name === 'BegeCoin'
      );
    default:
      return allWatchlist;
  }
};

export const getWatchlistBySymbol = (symbol: string): WatchlistItem[] => {
  const allWatchlist = getWatchlistData();
  
  return allWatchlist.filter(item => 
    item.symbol.toLowerCase().includes(symbol.toLowerCase())
  );
};

export const getWatchlistByMarketCapRange = (minCap: number, maxCap: number): WatchlistItem[] => {
  const allWatchlist = getWatchlistData();
  
  return allWatchlist.filter(item => {
    const capValue = parseFloat(item.marketCap.replace(/[^0-9.]/g, ''));
    return capValue >= minCap && capValue <= maxCap;
  });
};

export const getTopWatchlistByMarketCap = (limit: number = 5): WatchlistItem[] => {
  const allWatchlist = getWatchlistData();
  
  return allWatchlist
    .sort((a, b) => {
      const capA = parseFloat(a.marketCap.replace(/[^0-9.]/g, ''));
      const capB = parseFloat(b.marketCap.replace(/[^0-9.]/g, ''));
      return capB - capA;
    })
    .slice(0, limit);
};

export const refreshWatchlistData = async (): Promise<WatchlistItem[]> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return getWatchlistData();
};

export const addToWatchlist = async (item: WatchlistItem): Promise<boolean> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return true;
};

export const removeFromWatchlist = async (itemId: string): Promise<boolean> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return true;
};

export const createCustomFilter = async (filterName: string, criteria: any): Promise<FilterOption> => {
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return {
    id: Date.now().toString(),
    name: filterName,
  };
}; 