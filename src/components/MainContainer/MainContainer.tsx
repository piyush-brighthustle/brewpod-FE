import { SafeAreaView, StatusBar, StyleProp, ViewStyle } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { BACKGROUND_COLOR } from '../../types/enums';

type Props = {
  children: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  navigation: any;
};

const MainContainer = ({ children, containerStyle, navigation }: Props) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });

  return (
    <SafeAreaView style={[{ flex: 1 }, containerStyle]}>
      <StatusBar barStyle="dark-content" backgroundColor={BACKGROUND_COLOR.WHITE} />

      {children}
    </SafeAreaView>
  );
};

export default MainContainer;
