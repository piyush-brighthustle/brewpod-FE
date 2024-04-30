import React from 'react';
import { View, Text, TouchableOpacity, Image, ImageSourcePropType } from 'react-native';
import styles from './CircleButton.styles';
import { lightTheme, darkTheme } from '../../utils/globalCss/theme';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from 'navigator/RootNavigator';
import { useSelector, useDispatch } from 'react-redux';
import { toggleSwitch } from '../../slices/toggleSlice';

interface CircleButtonProps {
  text?: string;
  icon?: ImageSourcePropType;
  type?: 'edit' | 'back' | 'navigate' | 'delete' | 'draft' | 'backTransparent';
  navigateTo?: string | undefined;
}
export type SwitchState = {
  switch: {
    active: boolean;
  };
};

type ScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, keyof RootStackParamList>;
const CircleButton: React.FC<CircleButtonProps> = ({ text = '', icon, type = 'navigate', navigateTo }) => {
  const navigate = useNavigation<ScreenNavigationProp>();
  const isToggled = useSelector((state: SwitchState) => state?.switch?.active);
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(toggleSwitch());
  };

  const handlePress = () => {
    if (navigateTo) {
      navigate.navigate(navigateTo as keyof RootStackParamList);
    } else {
      switch (type) {
        case 'back':
        case 'backTransparent':
          navigate.goBack();
          break;
        case 'edit':
          handleToggle();
          break;
        default:
          break;
      }
    }
  };

  const currentTheme = isToggled ? darkTheme : lightTheme;

  const buttonContainerStyle = {
    borderColor: currentTheme && currentTheme[type]?.borderColor,
    backgroundColor: currentTheme && currentTheme[type]?.backgroundColor,
  };

  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={handlePress}>
      <View style={[styles.imageContainer, buttonContainerStyle]}>{icon && <Image source={icon} style={styles.image} tintColor={currentTheme && currentTheme[type]?.imageTintColor} />}</View>
      <Text style={[styles.text, { color: currentTheme && currentTheme[type]?.textColor }]}>{text}</Text>
    </TouchableOpacity>
  );
};

export default CircleButton;
