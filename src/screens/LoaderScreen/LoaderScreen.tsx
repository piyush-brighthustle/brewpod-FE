/* eslint-disable quotes */
import { ActivityIndicator } from 'react-native';
import React, { useEffect } from 'react';
import MainContainer from '../../components/MainContainer/MainContainer';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from 'navigator/RootNavigator';
import { useNavigation } from '@react-navigation/native';
import { BACKGROUND_COLOR, COLOR_CODE } from '../../types/enums';

export type LoaderScreenScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Loader'>;

const measureBrixParams: BrewDataType = {
  // eslint-disable-next-line quotes
  screenTitle: "Let's",
  screenSubtitle: 'Measure Brix',
  carouselData: [
    {
      id: '1',
      initialTitle: 'Connect Water',
      colouredTitle: 'Water Connected',
    },
    {
      id: '2',
      initialTitle: 'Measure Brix',
    },
  ],
  carouselStartIndex: 0,
  pillButton: {
    title: 'Move to Boiling',
    to: 'Boiling Process',
  },
};

const measureBrixBeakerParams: BrewDataBeakerType = {
  screenTitle: "Let's",
  screenSubtitle: 'Measure Brix',
  pillButton: {
    title: '',
  },
  processName: 'Measure Brix',
};

const LoaderScreen = () => {
  const navigation = useNavigation<LoaderScreenScreenNavigationProp>();

  useEffect(() => {
    navigation.navigate('LiveTracker', {
      brewParams: measureBrixParams,
      beakerParams: measureBrixBeakerParams,
    });
  }, []);

  return (
    <MainContainer
      navigation={navigation}
      containerStyle={{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: BACKGROUND_COLOR.PRIMARY,
      }}>
      <ActivityIndicator size="large" color={COLOR_CODE.PRIMARY} />
    </MainContainer>
  );
};

export default LoaderScreen;
