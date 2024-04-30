import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import MainContainer from '../../components/MainContainer/MainContainer';
import React from 'react';
import { View } from 'react-native';
import Video from 'react-native-video';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from 'navigator/RootNavigator';

export type SplashScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;
type SplashRouteProp = RouteProp<RootStackParamList, 'Splash'>;

const Splash = () => {
  const navigation = useNavigation<SplashScreenNavigationProp>();
  const route = useRoute<SplashRouteProp>();
  const { showMainScreenNow } = route.params;

  return (
    <MainContainer navigation={navigation}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', width: null, height: null }}>
        <Video
          source={require('../../assets/videos/splashAnimation.mp4')}
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
          muted={true}
          resizeMode="cover"
          onEnd={() => showMainScreenNow(true)}
        />
        {/* <View>{StatusBar.setBackgroundColor('black', true)}</View>  */}
        {/*<Image style={{ width: windowSize.width, height: windowSize.height}} source={require('./images/splash.png')}></Image>*/}
      </View>
    </MainContainer>
  );
};

export default Splash;
