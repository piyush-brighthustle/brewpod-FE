import { View, Text } from 'react-native';
import React from 'react';
import AppLogo from '../AppLogo/AppLogo';
import styles from './SignInHeader.styles';

const SignInHeader = () => {
  return (
    <View>
      <AppLogo />
      <Text style={styles.welcomeText}>Welcome to BrewPod</Text>
    </View>
  );
};

export default SignInHeader;
