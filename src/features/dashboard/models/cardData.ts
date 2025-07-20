export interface CardData {
  id: string;
  coinName: string;
  coinPair: string;
  coinValue: string;
  coinChange: string;
  marketCap: string;
  volume: string;
  avatar: any;
}

// Data dummy dulu
export const cardData: CardData[] = [
  {
    id: '1',
    coinName: 'mushroom',
    coinPair: 'shroom · USD',
    coinValue: '0.0000549',
    coinChange: '▲ 160.36%',
    marketCap: '$5489 K',
    volume: '$589 K',
    avatar: require('../../../../assets/avatar2.png'),
  },
  {
    id: '2',
    coinName: 'bitcoin',
    coinPair: 'btc · USD',
    coinValue: '43,250.00',
    coinChange: '▲ 2.5%',
    marketCap: '$850B',
    volume: '$25B',
    avatar: require('../../../../assets/crypto1.png'),
  },
  {
    id: '3',
    coinName: 'ethereum',
    coinPair: 'eth · USD',
    coinValue: '2,650.00',
    coinChange: '▼ 1.2%',
    marketCap: '$320B',
    volume: '$12B',
    avatar: require('../../../../assets/crypto2.png'),
  },
  {
    id: '4',
    coinName: 'dogecoin',
    coinPair: 'doge · USD',
    coinValue: '0.085',
    coinChange: '▲ 8.7%',
    marketCap: '$12B',
    volume: '$890M',
    avatar: require('../../../../assets/avatar1.png'),
  },
  {
    id: '5',
    coinName: 'cardano',
    coinPair: 'ada · USD',
    coinValue: '0.52',
    coinChange: '▼ 3.1%',
    marketCap: '$18B',
    volume: '$450M',
    avatar: require('../../../../assets/bell.png'),
  },
];

export const getCardData = async (): Promise<CardData[]> => {
  
  await new Promise(resolve => setTimeout(resolve, 100));
  
  return cardData;
};

export const buyCard = async (cardId: string): Promise<boolean> => {
  
  await new Promise(resolve => setTimeout(resolve, 500));
  
  console.log(`Buying card with ID: ${cardId}`);
  return true;
};

export const skipCard = async (cardId: string): Promise<boolean> => {
  
  await new Promise(resolve => setTimeout(resolve, 300));
  
  console.log(`Skipping card with ID: ${cardId}`);
  return true;
}; 