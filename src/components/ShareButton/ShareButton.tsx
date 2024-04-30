import { Text, Image, TouchableOpacity, ViewStyle, StyleProp, ImageStyle } from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import ImageLinks from '../../assets/images';
import styles from './ShareButton.styles';
import { STRINGS } from '../../types/strings';

type Props = {
  shareContainerStyle?: StyleProp<ViewStyle>;
  showProgressText?: boolean;
  gradientColors?: (string | number)[];
  gradientStyle?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
};

const ShareButton = ({ showProgressText = true, gradientColors, gradientStyle, shareContainerStyle, imageStyle }: Props) => {
  return (
    <TouchableOpacity style={[styles.shareButtonContainer, shareContainerStyle]}>
      <LinearGradient colors={gradientColors || ['#40DB9C', '#29BCCCFA']} style={[styles.shareButtonBackground, gradientStyle]}>
        <Image source={ImageLinks.SHARE} style={[styles.shareButtonImage, imageStyle]} />
      </LinearGradient>

      {showProgressText && <Text style={styles.shareProgressText}>{STRINGS.SHARE_PROGRESS}</Text>}
    </TouchableOpacity>
  );
};

export default ShareButton;
