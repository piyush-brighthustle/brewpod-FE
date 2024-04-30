import { Text, TextInput, View } from 'react-native';
import React from 'react';
import styles from './LoginField.styles';
import { TEXT_COLOR } from '../../types/enums';

type Props = {
  text: string;
  placeholder: string;
  type?: string;
  value?: string;
  onChangeText?: (text: string) => void;
};

const LoginField = ({ placeholder, text, type, value, onChangeText }: Props) => {
  return (
    <View style={styles.loginFieldContainer}>
      <Text style={styles.loginFieldName}>{text}</Text>

      <View style={styles.loginFieldInputContainer}>
        <TextInput secureTextEntry={type === 'password'} style={styles.loginFieldInput} placeholder={placeholder} placeholderTextColor={TEXT_COLOR.GRAY2} value={value} onChangeText={onChangeText} />
      </View>
    </View>
  );
};

export default LoginField;
