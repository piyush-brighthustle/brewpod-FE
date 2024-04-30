import { Animated, Easing } from 'react-native';
import React from 'react';
import ImageLinks from '../../assets/images';

type Props = {
  gearHeight: number;
  gearWidth: number;
  antiClockwise?: boolean;
  top?: number | string;
  left?: number | string;
  right?: number | string;
  bottom?: number | string;
};

const GearRotation = ({ gearHeight, gearWidth, top, bottom, left, right, antiClockwise }: Props) => {
  const spinValue = new Animated.Value(0);

  // First set up animation
  Animated.loop(
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 3000,
      easing: Easing.linear,
      useNativeDriver: true,
    }),
  ).start();

  // Next, interpolate beginning and end values (in this case 0 and 1)
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: antiClockwise ? ['360deg', '0deg'] : ['0deg', '360deg'],
  });

  return (
    <Animated.Image
      source={ImageLinks.GEAR_ICON}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      style={{ height: gearHeight, width: gearWidth, transform: [{ rotate: spin }], bottom, right, left, top }}
    />
  );
};

export default GearRotation;
