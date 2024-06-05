import React from 'react';
import { Text, StyleSheet } from 'react-native';

const TextComponent = ({ style, children }) => {
  return <Text style={[styles.text, style]}>{children}</Text>;
};

const styles = StyleSheet.create({
  text: {
    color: '#fff',
    fontFamily: 'Oswald-Regular',
  },
});

export default TextComponent;
