import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { colors } from '../../../common/styles/colors';

interface ArticleCardProps {
  image: any;
  title: string;
  author: string;
  avatar: any;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ image, title, author, avatar }) => {
  return (
    <View style={styles.card}>
      <Image source={image} style={styles.cardImage} />
      <View style={styles.cardInfo}>
        <Image source={avatar} style={styles.avatar} />
        <View style={{ flex: 1 }}>
          <Text style={styles.cardTitle} numberOfLines={2}>{title}</Text>
          <Text style={styles.cardAuthor}>{author}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    marginHorizontal: 16,
    marginBottom: 18,
    overflow: 'hidden',
    elevation: 2,
  },
  cardImage: {
    width: '100%',
    height: 140,
    resizeMode: 'cover',
  },
  cardInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    gap: 10,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 10,
  },
  cardTitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  cardAuthor: {
    color: colors.textSecondary,
    fontSize: 13,
  },
});

export default ArticleCard; 