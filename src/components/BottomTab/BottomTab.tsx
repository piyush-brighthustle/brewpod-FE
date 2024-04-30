import { View, Text, Image, ImageSourcePropType } from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { BACKGROUND_COLOR, COLOR_CODE } from '../../types/enums';
import styles from './BottomTab.styles';

type Props = {
  focused: boolean;
  imageSource: ImageSourcePropType;
  label: string;
};

const BottomTab = ({ focused, imageSource, label }: Props) => {
  return (
    <View style={[styles.bottomTabContainer]}>
      <LinearGradient colors={focused ? ['transparent', COLOR_CODE.COMPLEMENTARY] : ['transparent', 'transparent']} style={styles.bottomTabGradient} />
      <Image
        source={imageSource}
        style={[
          styles.bottomTabImage,
          {
            tintColor: focused ? BACKGROUND_COLOR.WHITE : 'gray',
          },
        ]}
      />

      <Text style={[styles.bottomTabText, { color: focused ? COLOR_CODE.COMPLEMENTARY : 'gray' }]}>{label}</Text>
    </View>
  );
};

export default BottomTab;
