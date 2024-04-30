import { View, Text, TouchableOpacity, Image, ImageSourcePropType, StyleProp, ViewStyle, ImageStyle } from 'react-native';
import React from 'react';
import styles from './TextOnImageCard.styles';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { HomeStackParamList } from 'navigations/HomeNavigators';

type Props = {
  backgroundImage: ImageSourcePropType;
  textOne: string;
  textTwo: string;
  containerStyle?: StyleProp<ViewStyle>;
  backgroundImageTwo?: ImageSourcePropType;
  to?: string;
  disabled?: boolean;
  imageStyle?: StyleProp<ImageStyle>;
};

export type ScreenNavigationProp = NativeStackNavigationProp<HomeStackParamList, keyof HomeStackParamList>;

const TextOnImageCard = ({ backgroundImage, textOne, textTwo, containerStyle, to, disabled, imageStyle }: Props) => {
  const navigation = useNavigation<ScreenNavigationProp>();

  return (
    <TouchableOpacity
      style={[
        styles.textOnImageContainer,
        containerStyle,
        {
          opacity: disabled ? 0.5 : 1,
        },
      ]}
      disabled={disabled}
      onPress={() => navigation?.navigate(to as keyof HomeStackParamList)}>
      <Image source={backgroundImage} style={[styles.bgImage, imageStyle]} resizeMode="contain" />

      <View style={styles.textContainer}>
        <Text style={styles.text}>{textOne}</Text>
        <Text style={[styles.text, { fontWeight: '600' }]}>{textTwo}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default TextOnImageCard;
