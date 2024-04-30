import React, { useEffect } from 'react';
import { Image } from 'react-native';
import Animated, { Easing, withTiming, useSharedValue, useAnimatedStyle } from 'react-native-reanimated';
import styles from './CommingSoon.style';
import ImageLinks from '../../assets/images';
import MainContainer from '../../components/MainContainer/MainContainer';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../../navigations/HomeNavigators';
import { useNavigation } from '@react-navigation/native';

export type ScreenNavigationProp = NativeStackNavigationProp<HomeStackParamList, keyof HomeStackParamList>;
const ComingSoon = () => {
  const navigation = useNavigation<ScreenNavigationProp>();
  const fadeAnim = useSharedValue(0);

  useEffect(() => {
    fadeAnim.value = withTiming(1, { duration: 1000, easing: Easing.inOut(Easing.ease) });
  }, [fadeAnim]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: fadeAnim.value,
    };
  });

  return (
    <MainContainer navigation={navigation}>
      <Animated.View style={[styles.container, animatedStyle]}>
        <Image source={ImageLinks.COMING_SOON} style={{ height: '100%', width: '100%' }} resizeMode="contain" />
      </Animated.View>
    </MainContainer>
  );
};

export default ComingSoon;
