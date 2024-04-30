import { Image, ImageStyle, StyleProp } from 'react-native';
import React from 'react';
import ImageLinks from '../../assets/images';
import styles from './AppLogo.styles';

type Props = {
  logoStyle?: StyleProp<ImageStyle>;
  tintColor?: string;
};

const AppLogo = ({ logoStyle, tintColor }: Props) => {
  return <Image style={[styles.logo, logoStyle]} source={ImageLinks.LOGO} tintColor={tintColor} />;
};

export default AppLogo;
