import React from 'react';
import { View } from 'react-native';
import styles from './Divider.styles';
import { scaleMargin } from '../../utils/scale';

interface DividerProps {
  borderColor?: string;
  width?: number;
  marginVertical?: number;
}

const Divider: React.FC<DividerProps> = ({ borderColor, width, marginVertical }) => {
  const scaledMarginVertical = typeof marginVertical === 'number' ? scaleMargin(marginVertical) : 0;
  return <View style={[styles.divider, { borderBottomColor: borderColor, borderBottomWidth: width, marginVertical: scaleMargin(scaledMarginVertical) }]} />;
};
export default Divider;
