export interface MoverItem {
  id: string;
  name: string;
  network: string;
  currency: string;
  marketCap: string;
  icon: any;
}

export const getMoversData = (): MoverItem[] => {
  return [
    {
      id: '1',
      name: 'Btc Chan',
      network: 'Solana',
      currency: 'USD',
      marketCap: 'MC 4,230,000 K',
      icon: require('../../../../assets/crypto1.png'),
    },
    {
      id: '2',
      name: 'Bonk',
      network: 'Solana',
      currency: 'USD',
      marketCap: 'MC 3,150,000 K',
      icon: require('../../../../assets/crypto2.png'),
    },
    {
      id: '3',
      name: 'Mushroom Coin',
      network: 'Solana',
      currency: 'USD',
      marketCap: 'MC 2,890,000 K',
      icon: require('../../../../assets/crypto1.png'),
    },
    {
      id: '4',
      name: 'Bunkcoin',
      network: 'Solana',
      currency: 'USD',
      marketCap: 'MC 1,750,000 K',
      icon: require('../../../../assets/crypto2.png'),
    },
    {
      id: '5',
      name: 'BegeCoin',
      network: 'Solana',
      currency: 'USD',
      marketCap: 'MC 1,230,000 K',
      icon: require('../../../../assets/crypto1.png'),
    },
    {
      id: '6',
      name: 'bubz',
      network: 'Solana',
      currency: 'USD',
      marketCap: 'MC 890,000 K',
      icon: require('../../../../assets/crypto2.png'),
    },
    {
      id: '7',
      name: 'elMOON',
      network: 'Solana',
      currency: 'USD',
      marketCap: 'MC 650,000 K',
      icon: require('../../../../assets/crypto1.png'),
    },
  ];
};

export const getFilteredMoversData = (searchQuery: string): MoverItem[] => {
  const allMovers = getMoversData();
  
  if (searchQuery.trim() === '') {
    return allMovers;
  }
  
  return allMovers.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
};

export const getMoversByNetwork = (network: string): MoverItem[] => {
  const allMovers = getMoversData();
  
  if (network === 'All') {
    return allMovers;
  }
  
  return allMovers.filter(item => item.network === network);
};

export const getMoversByMarketCapRange = (minCap: number, maxCap: number): MoverItem[] => {
  const allMovers = getMoversData();
  
  return allMovers.filter(item => {
    const capValue = parseFloat(item.marketCap.replace(/[^0-9.]/g, ''));
    return capValue >= minCap && capValue <= maxCap;
  });
};

export const getTopMovers = (limit: number = 10): MoverItem[] => {
  const allMovers = getMoversData();
  
  return allMovers
    .sort((a, b) => {
      const capA = parseFloat(a.marketCap.replace(/[^0-9.]/g, ''));
      const capB = parseFloat(b.marketCap.replace(/[^0-9.]/g, ''));
      return capB - capA;
    })
    .slice(0, limit);
};

export const refreshMoversData = async (): Promise<MoverItem[]> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return getMoversData();
};

export const searchMoversWithDebounce = async (
  searchQuery: string,
  delay: number = 300
): Promise<MoverItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const results = getFilteredMoversData(searchQuery);
      resolve(results);
    }, delay);
  });
}; 