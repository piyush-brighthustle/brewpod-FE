import { ImageBackground } from 'react-native';
import React, { useEffect, useState } from 'react';
import AppLogo from '../../components/AppLogo/AppLogo';
import ImageLinks from '../../assets/images';
import TextField from '../../components/TextField/TextField';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import styles from './BrewpodBufferScreen.style';
import MainContainer from '../../components/MainContainer/MainContainer';
import { scaleFont, scaleMargin } from '../../utils/scale';
import { TabStackParamList } from 'navigator/TabNavigator';

export type BrewpodBufferScreenProp = NativeStackNavigationProp<TabStackParamList>;

const BrewpodBufferScreen = () => {
  const navigation = useNavigation<BrewpodBufferScreenProp>();
  const [showHomeScreen, setShowHomeScreen] = useState(false);

  const brewParams: BrewDataType = {
    // eslint-disable-next-line quotes
    screenTitle: "Let's Prepare",
    screenSubtitle: 'Brewpod',
    carouselData: [
      {
        id: '1',
        initialTitle: 'Connect the Water',
        colouredTitle: 'Water is Connected',
      },
      {
        id: '2',
        initialTitle: 'Put the Cleaning Tablets',
        colouredTitle: 'Cleaning Tablets Are In',
      },
      {
        id: '3',
        initialTitle: 'Clean the Accessories',
        colouredTitle: 'Accessories are Cleaned',
      },
    ],
    carouselStartIndex: 0,
    pillButton: {
      title: ['Done'],
    },
  };

  const beakerParams: BrewDataBeakerType = {
    screenTitle: 'Cleaning',
    screenSubtitle: 'Your Brewpod',
    pillButton: {
      // eslint-disable-next-line quotes
      title: ['Close the valve', 'Repeat Sequence'],
    },
    processName: 'Prepare',
    beakerBottomText: 'Please open the valve',
  };

  useEffect(() => {
    if (showHomeScreen) {
      navigation.navigate('LiveTracker', {
        brewParams,
        beakerParams,
      });
    }
  }, [showHomeScreen]);

  useEffect(() => {
    setTimeout(() => {
      setShowHomeScreen(true);
    }, 2000);
  }, []);

  return (
    <MainContainer navigation={navigation}>
      <ImageBackground source={ImageLinks.BREWPOD_BUFFER_BACKGROUND} resizeMode="cover" style={styles.bgImage}>
        <AppLogo
          tintColor="white"
          logoStyle={{
            marginTop: scaleMargin(-5),
          }}
        />
        <TextField text="It's time to move" color="white" os={{ marginTop: scaleMargin(28) }} fontSize={scaleFont(18)} />
        <TextField text="to the Brewpod!" color="white" fontSize={scaleFont(26)} fontWeight={500} />
      </ImageBackground>
    </MainContainer>
  );
};

export default BrewpodBufferScreen;
