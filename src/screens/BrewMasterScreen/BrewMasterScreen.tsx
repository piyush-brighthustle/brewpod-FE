import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import MainContainer from '../../components/MainContainer/MainContainer';
import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import AppLogo from '../../components/AppLogo/AppLogo';
import TextOnImageCard from '../../components/TextOnImageCard/TextOnImageCard';
import { STRINGS } from '../../types/strings';
import ImageLinks from '../../assets/images';
import styles from './BrewMasterScreen.style';
import SavedRecipes from '../../components/SavedRecipes/SavedRecipes';
import SavedDraft from '../../components/SavedDraft/SavedDraft';
import CircleButton from '../../components/CircleButton/CircleButton';
import Divider from '../../components/Divider/Divider';
import { BACKGROUND_COLOR } from '../../types/enums';
import { HomeStackParamList } from 'navigations/HomeNavigators';
import { scalePadding } from '../../utils/scale';
import ComingSoon from '../../components/CommingSoon/CommingSoon';

export type RecipeScreenNavigationProp = NativeStackNavigationProp<HomeStackParamList, keyof HomeStackParamList>;
const BrewMasterScreen = () => {
  const navigation = useNavigation<RecipeScreenNavigationProp>();

  return (
    <MainContainer navigation={navigation}>
      <ScrollView style={styles.container}>
        <AppLogo />

        <View style={styles.headerContainer}>
          <View>
            <Text style={styles.textUp}>{STRINGS.UNLEASH_UNBROKEN}</Text>
            <Text style={styles.textDown}>{STRINGS.BREWMASTER}</Text>
          </View>
          <CircleButton type={'back'} icon={ImageLinks.ARROW_LEFT} text={STRINGS.BACK} />
        </View>

        <View style={{ marginHorizontal: scalePadding(15) }}>
          <TextOnImageCard imageStyle={styles.cardImageStyle} backgroundImage={ImageLinks.EXPLORE_RECIPES} textOne={STRINGS.EXPLORE} textTwo={STRINGS.RECIPES} to={'Recipe'} />

          <TextOnImageCard imageStyle={styles.cardImageStyle} backgroundImage={ImageLinks.CREATE_RECIPES} textOne={STRINGS.CREATE} textTwo={STRINGS.YOUR_OWN_RECIPES} to={'CreateRecipe'} disabled />

          <TextOnImageCard imageStyle={styles.cardImageStyle} backgroundImage={ImageLinks.HOPS_ESSENTIALS_RECIPES} textOne={STRINGS.HOPS} textTwo={STRINGS.AND_ESSENTIALS} to="BrewMaster" disabled />
          {/* <Divider borderColor={BACKGROUND_COLOR.BLACK} marginVertical={25} width={0.2} /> */}
          {/* <SavedRecipes />
          <SavedDraft /> */}
        </View>
      </ScrollView>
    </MainContainer>
  );
};

export default BrewMasterScreen;
