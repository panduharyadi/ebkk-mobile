import { StyleSheet } from 'react-native';
import { colors } from './colors';

export const typography = StyleSheet.create({
  title: {
    color: colors.text,
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: 15,
    textAlign: 'center',
  },
  label: {
    color: colors.textSecondary,
    fontSize: 15,
    marginBottom: 6,
    marginLeft: 2,
  },
  button: {
    color: colors.text,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  link: {
    color: colors.accent,
    fontSize: 14,
    fontWeight: '600',
  },
}); 