/* eslint-disable @typescript-eslint/ban-ts-comment */
import { View, Animated, Easing, Text, ViewStyle, StyleProp } from 'react-native';
import React, { useEffect, useRef } from 'react';
import Svg, { G, Circle } from 'react-native-svg';
import { BACKGROUND_COLOR, COLOR_CODE } from '../../types/enums';
import styles from './CircularProgress.styles';
import { convertSeconds } from '../../utils/globalFunctions/GlobalFunctions';

type Props = {
  percentage?: number;
  radius?: number;
  strokeWidth?: number;
  duration?: number;
  color?: string;
  delay?: number;
  textColor?: string;
  max?: number;
  progressText?: string;
  percentageColor?: string;
  showTimerValues?: boolean;
  circularProgressStyle?: StyleProp<ViewStyle>;
};

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const CircularProgress = ({
  percentage = 75,
  radius = 100,
  strokeWidth = 25,
  duration = 500,
  color = COLOR_CODE.COMPLEMENTARY,
  delay = 500,
  textColor,
  percentageColor,
  max = 100,
  circularProgressStyle,
  showTimerValues,
}: Props) => {
  const animated = useRef(new Animated.Value(0)).current;
  const circleRef = useRef();
  const inputRef = useRef();
  const circleCircumference = 2 * Math.PI * radius;
  const halfCircle = radius + strokeWidth;
  const timer = convertSeconds(duration);

  const animation = (toValue: number) => {
    return Animated.timing(animated, {
      delay,
      toValue,
      duration,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease),
    }).start();
  };

  useEffect(() => {
    animation(percentage);
    animated.addListener((v) => {
      const maxPercentage = (100 * v.value) / max;
      const strokeDashoffset = circleCircumference - (circleCircumference * maxPercentage) / 100;
      if (inputRef?.current) {
        // @ts-ignore
        inputRef.current.setNativeProps({
          text: `${Math.round(v.value)}%`,
        });
      }
      if (circleRef?.current) {
        // @ts-ignore
        circleRef.current.setNativeProps({
          strokeDashoffset,
        });
      }
    });

    return () => {
      animated.removeAllListeners();
    };
  }, [max, percentage]);

  return (
    <View style={[styles.circularProgressContainer, circularProgressStyle]}>
      <Svg width={radius * 2} height={radius * 2} viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}>
        <G rotation="-90" origin={`${halfCircle}, ${halfCircle}`}>
          <Circle cx="50%" cy="50%" stroke={color} strokeWidth={strokeWidth} r={radius} strokeOpacity={0.2} fill={BACKGROUND_COLOR.PRIMARY} />
          <AnimatedCircle
            // @ts-ignore
            ref={circleRef}
            cx="50%"
            cy="50%"
            stroke={color}
            strokeWidth={strokeWidth}
            r={radius}
            fill="transparent"
            strokeDasharray={circleCircumference}
            strokeDashoffset={circleCircumference}
            strokeLinecap="round"
          />
        </G>
      </Svg>

      {showTimerValues && (
        <View
          style={{
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={[
              styles.timerContainer,
              {
                gap: 12,
              },
            ]}>
            <Text style={styles.timerHeader}>minutes</Text>
            <Text style={styles.timerHeader}>seconds</Text>
          </View>
          <View
            style={[
              styles.timerContainer,
              {
                gap: 5,
              },
            ]}>
            <Text style={styles.timerText}>{timer}</Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default CircularProgress;
