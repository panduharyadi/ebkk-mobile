import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

const PASSCODE_LENGTH = 6;
const KEYS = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
  ['', '0', ''],
];

const PasscodeScreen = ({ onSuccess, onCancel }: { onSuccess: (code: string) => void; onCancel?: () => void }) => {
  const [code, setCode] = useState('');

  const handleKeyPress = (key: string) => {
    if (key === '' || code.length >= PASSCODE_LENGTH) return;
    const newCode = code + key;
    setCode(newCode);
    if (newCode.length === PASSCODE_LENGTH) {
      setTimeout(() => {
        onSuccess(newCode);
      }, 200);
    }
  };

  const handleBackspace = () => {
    setCode(code.slice(0, -1));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Iphone Passcode For</Text>
      <Text style={styles.titleApp}>EbkApp</Text>
      <Text style={styles.subtitle}>Authenticate to unlock</Text>
      <View style={styles.dotsContainer}>
        {Array.from({ length: PASSCODE_LENGTH }).map((_, idx) => (
          <View key={idx} style={[styles.dot, code.length > idx && styles.dotFilled]} />
        ))}
      </View>
      <View style={styles.keypad}>
        {KEYS.map((row, rowIdx) => (
          <View key={rowIdx} style={styles.keypadRow}>
            {row.map((key, colIdx) => (
              <TouchableOpacity
                key={colIdx}
                style={key ? styles.key : styles.keyEmpty}
                onPress={() => handleKeyPress(key)}
                activeOpacity={key ? 0.7 : 1}
                disabled={!key}
              >
                <Text style={styles.keyText}>{key}</Text>
                {key && (
                  <Text style={styles.keySub}>{
                    key === '1' ? '' :
                    key === '2' ? 'ABC' :
                    key === '3' ? 'DEF' :
                    key === '4' ? 'GHI' :
                    key === '5' ? 'JKL' :
                    key === '6' ? 'MNO' :
                    key === '7' ? 'PQRS' :
                    key === '8' ? 'TUV' :
                    key === '9' ? 'WXYZ' : ''
                  }</Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
      <TouchableOpacity style={styles.backspace} onPress={handleBackspace} activeOpacity={0.7}>
        <Text style={styles.backspaceText}>{code.length > 0 ? '⌫' : ''}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.cancel} onPress={onCancel} activeOpacity={0.7}>
        <Text style={styles.cancelText}>Batalkan</Text>
      </TouchableOpacity>
    </View>
  );
};

const { width } = Dimensions.get('window');
const keySize = (width - 80) / 3;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#131229',
    alignItems: 'center',
    paddingTop: 60,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'center',
    marginBottom: 0,
  },
  titleApp: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    color: '#B0B0C3',
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 32,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 32,
  },
  dot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#fff',
    marginHorizontal: 8,
    backgroundColor: 'transparent',
  },
  dotFilled: {
    backgroundColor: '#fff',
  },
  keypad: {
    marginBottom: 16,
  },
  keypadRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  key: {
    width: keySize,
    height: keySize,
    borderRadius: keySize / 2,
    borderWidth: 1.5,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    backgroundColor: 'transparent',
  },
  keyEmpty: {
    width: keySize,
    height: keySize,
    marginHorizontal: 10,
    backgroundColor: 'transparent',
  },
  keyText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  keySub: {
    color: '#B0B0C3',
    fontSize: 10,
    marginTop: 2,
    textAlign: 'center',
  },
  backspace: {
    marginTop: 0,
    marginBottom: 8,
    alignSelf: 'center',
  },
  backspaceText: {
    color: '#fff',
    fontSize: 28,
    textAlign: 'center',
  },
  cancel: {
    marginTop: 12,
    alignSelf: 'center',
  },
  cancelText: {
    color: '#fff',
    fontSize: 15,
    opacity: 0.7,
  },
});

export default PasscodeScreen; 