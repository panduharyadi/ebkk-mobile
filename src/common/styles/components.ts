import { StyleSheet } from 'react-native';
import { colors } from './colors';

export const componentStyles = StyleSheet.create({
  button: {
    width: '100%',
    height: 48,
    backgroundColor: colors.accent,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.accent,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonDisabled: {
    backgroundColor: colors.disabled,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 8,
    width: '100%',
    height: 48,
  },
  input: {
    flex: 1,
    height: 48,
    paddingHorizontal: 16,
    color: colors.text,
    fontSize: 16,
  },
  icon: {
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    height: 48,
  },
}); 