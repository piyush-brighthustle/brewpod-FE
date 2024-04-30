import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import styles from './BrewpodConnectScreen.styles';
import ImageLinks from '../../assets/images';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from 'navigator/RootNavigator';
import AppLogo from '../../components/AppLogo/AppLogo';
import TextOnImageCard from '../../components/TextOnImageCard/TextOnImageCard';
import MainContainer from '../../components/MainContainer/MainContainer';
import { STRINGS } from '../../types/strings';
import CircleButton from '../../components/CircleButton/CircleButton';

export type BrewpodConnectScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'BrewPodConnect'>;

const BrewpodConnectScreen = () => {
  const navigation = useNavigation<BrewpodConnectScreenNavigationProp>();

  return (
    <MainContainer navigation={navigation}>
      <ScrollView contentContainerStyle={styles.brewpodConnectContainer}>
        <AppLogo />

        <View style={styles.brewpodConnectHeader}>
          <View>
            <Text style={styles.brewpodConnectHeaderLineOne}>{STRINGS.LETS}</Text>
            <Text style={styles.brewpodConnectHeaderLineTwo}>{STRINGS.CONNECT_YOUR_BREWPOD}</Text>
          </View>
          <CircleButton type={'back'} icon={ImageLinks.ARROW_LEFT} text={STRINGS.BACK} />
        </View>

        {/* <TextOnImageCard backgroundImage={ImageLinks.QR_BACKGROUND_IMAGE} textOne={STRINGS.SCAN} textTwo={STRINGS.QR_CODE} /> */}
        <TextOnImageCard backgroundImage={ImageLinks.BREWPOD_BACKGROUND_IMAGE} textOne={STRINGS.BUY_YOUR_OWN} textTwo={STRINGS.BREWPOD} to="MultipleBrewpod" />
      </ScrollView>
    </MainContainer>
  );
};

export default BrewpodConnectScreen;
