import ImageLinks from '../../assets/images';
import React, { useLayoutEffect } from 'react';
import { View, Text } from 'react-native';
import { BACKGROUND_COLOR } from '../../types/enums';
import { DrinkCard } from '../../components/DrinkCard/DrinkCard';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from 'navigator/RootNavigator';
import CircleButton from '../CircleButton/CircleButton';
import { STRINGS } from '../../types/strings';
import styles from './SavedRecipes.styles';
import { dummyData } from '../../utils/data';
import Divider from '../../components/Divider/Divider';

export type ScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, keyof RootStackParamList>;
const SavedRecipes = () => {
  const navigation = useNavigation<ScreenNavigationProp>();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });

  return (
    <View>
      <View style={styles.spaceBetween}>
        <View style={styles.textContainer}>
          <Text allowFontScaling style={styles.headerText}>
            {`${STRINGS.MY} ${STRINGS.SAVED}`}
          </Text>
          <Text allowFontScaling style={styles.subHeaderText}>
            {STRINGS.RECIPES}
          </Text>
        </View>
        <View style={styles.alignRow}>
          <CircleButton icon={ImageLinks.SHARE} text={STRINGS.SHARE} navigateTo={'ShareRecipe'} type="navigate" />
          <CircleButton icon={ImageLinks.DELETE} text={STRINGS.DELETE} type="delete" />
        </View>
      </View>
      <DrinkCard data={dummyData} draft={false} />
      <Divider borderColor={BACKGROUND_COLOR.BLACK} marginVertical={25} width={0.2} />
    </View>
  );
};

export default SavedRecipes;
