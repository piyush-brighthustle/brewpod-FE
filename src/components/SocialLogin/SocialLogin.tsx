import { Text, TouchableOpacity, Image, ImageSourcePropType, View } from 'react-native';
import React from 'react';
import styles from './SocialLogin.styles';

type Props = {
  socialLogo: ImageSourcePropType;
  name: string;
};

const SocialLogin = ({ socialLogo, name }: Props) => {
  return (
    <TouchableOpacity style={styles.socialLoginContainer}>
      <View style={styles.socialLoginImageContainer}>
        <Image source={socialLogo} style={styles.socialLoginImage} />
      </View>

      <Text style={styles.socialLoginName}>{name}</Text>
    </TouchableOpacity>
  );
};

export default SocialLogin;
