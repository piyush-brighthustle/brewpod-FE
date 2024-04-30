import { Text, TouchableOpacity } from 'react-native';
import React from 'react';
import styles from './SignInFooter.styles';

type Props = {
  text1: string;
  text2: string;
  onPress: () => void;
};

const SignInFooter = ({ text1, text2, onPress }: Props) => {
  return (
    <TouchableOpacity style={styles.footer} onPress={onPress}>
      <Text style={styles.footerText}>
        {text1}{' '}
        <Text
          style={{
            fontWeight: '600',
            textDecorationLine: 'underline',
          }}>
          {text2}
        </Text>
      </Text>
    </TouchableOpacity>
  );
};

export default SignInFooter;
