import React, { ReactNode } from 'react';
import { Text, StyleSheet, TextStyle, StyleProp, ViewStyle } from 'react-native';

interface TextFieldProps {
  fontSize?: number;
  color?: string;
  text: ReactNode;
  os?: StyleProp<TextStyle>;
  fontWeight?: number;
  onPress?: () => void;
}

const TextField: React.FC<TextFieldProps> = ({ fontSize, color, text, os, fontWeight, onPress }) => {
  const textStyle: StyleProp<TextStyle> = {
    fontSize: fontSize ? fontSize : 16,
    color: color ? color : 'black',
    fontWeight: fontWeight || 'normal',
  };

  return (
    <Text onPress={onPress} style={[styles.text, textStyle, os]}>
      {text}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: { marginBottom: 0 },
});

export default TextField;
