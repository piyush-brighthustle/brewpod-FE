import { Text, TouchableOpacity, ImageSourcePropType, Image, StyleProp, ViewStyle } from 'react-native';
import React from 'react';
import styles from './PillButton.styles';

type Props = {
  buttonTitle: string;
  imageSource?: ImageSourcePropType;
  pillButtonStyle?: StyleProp<ViewStyle>;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
};

const PillButton = ({ buttonTitle, imageSource, pillButtonStyle, onPress, loading, disabled }: Props) => {
  return (
    <TouchableOpacity
      style={[
        styles.pillButtonContainer,
        pillButtonStyle,
        {
          opacity: disabled ? 0.5 : 1,
        },
      ]}
      onPress={onPress}
      disabled={loading || disabled}>
      <Text style={styles.pillButtonText}>{buttonTitle}</Text>

      {imageSource && <Image source={imageSource} style={styles.pillButtonImage} />}
    </TouchableOpacity>
  );
};

export default PillButton;
