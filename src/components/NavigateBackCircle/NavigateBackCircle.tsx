import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import ImageLinks from '../../assets/images';
import styles from './NavigateBackCircle.styles';
import { STRINGS } from '../../types/strings';
import { useNavigation } from '@react-navigation/native';

interface NavigateBackCircleProps {
  tintColor?: string;
  textColor?: string;
}

const NavigateBackCircle: React.FC<NavigateBackCircleProps> = ({ tintColor, textColor }) => {
  const navigate = useNavigation();
  return (
    <TouchableOpacity style={styles.backButtonContainer} onPress={() => navigate.goBack()}>
      <View style={[styles.backImageContainer, { borderColor: tintColor }]}>
        <Image source={ImageLinks.ARROW_LEFT} style={styles.backImage} tintColor={tintColor} />
      </View>
      <Text style={[styles.backText, { color: textColor }]}>{STRINGS.BACK}</Text>
    </TouchableOpacity>
  );
};

export default NavigateBackCircle;
