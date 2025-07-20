import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { componentStyles } from '../styles/components';
import { typography } from '../styles/typography';

interface ButtonProps {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ title, onPress, style, textStyle, disabled }) => {
  return (
    <TouchableOpacity
      style={[componentStyles.button, style, disabled && componentStyles.buttonDisabled]}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={disabled}
    >
      <Text style={[typography.button, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 48,
    backgroundColor: '#4F8CFF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#4F8CFF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
    flexDirection: 'row',
  },
  text: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  disabled: {
    backgroundColor: '#A0BFFF',
  },
});

export default Button; 