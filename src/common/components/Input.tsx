import React from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { componentStyles } from '../styles/components';
import { typography } from '../styles/typography';

interface InputProps extends TextInputProps {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
  label?: string;
}

const Input: React.FC<InputProps> = ({
  leftIcon,
  rightIcon,
  onRightIconPress,
  style,
  label,
  ...props
}) => {
  return (
    <View style={{ width: '100%', marginBottom: 14 }}>
      {label && <Text style={typography.label}>{label}</Text>}
      <View style={componentStyles.inputContainer}>
        {leftIcon && <View style={componentStyles.icon}>{leftIcon}</View>}
        <TextInput
          style={[componentStyles.input, style]}
          placeholderTextColor="#B0B0C3"
          {...props}
        />
        {rightIcon && (
          <TouchableOpacity onPress={onRightIconPress} style={componentStyles.icon}>
            {rightIcon}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Input; 