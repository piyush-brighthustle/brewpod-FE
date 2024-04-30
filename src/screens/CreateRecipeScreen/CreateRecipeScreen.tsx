import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { PropsWithChildren, useLayoutEffect, useState } from 'react';
import { Image, ImageBackground, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import styles from './CreateRecipeScreen.styles';
import ImageLinks from '../../assets/images';
import { COLOR_PALETTE } from '../../types/enums';
import TextField from '../../components/TextField/TextField';
import { scaleFont } from '../../utils/scale';
import LinearGradient from 'react-native-linear-gradient';
import { STRINGS } from '../../types/strings';
import CircleButton from '../../components/CircleButton/CircleButton';
import { labels } from '../../utils/data';
import { HomeStackParamList } from 'navigations/HomeNavigators';
import Accordion from '../../components/Accordion/Accordion';
import Divider from '../../components/Divider/Divider';

type AccordionItemPros = PropsWithChildren<{
  title?: string;
  children?: React.ReactNode;
  totalQuantity?: number;
  categoryId?: number;
}>;

export type ScreenNavigationProp = NativeStackNavigationProp<HomeStackParamList, keyof HomeStackParamList>;
const CreateRecipeScreen = () => {
  const navigation = useNavigation<ScreenNavigationProp>();
  const [drink, setDrink] = useState({ name: `Beer Name`, info: `Tell us about your amazing recipe`, by: `By Ninja Brewer` });
  const [drinkQuantity, setDrinkQuantity] = useState({ 10: '10 Litres', 20: '20 Litres' });
  const [ingredients, setIngredients] = useState({ quantity: 2 });
  const [labelData, setLabelData] = useState(labels);

  const handleSaveChanges = () => {
    console.log(
      'all changes saved',
      labelData.map((item) => item.items),
    );
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });

  const handleItemPress = (labelId: number, itemIndex: number, newQuantity: string) => {
    const labelIndex = labelData?.findIndex((label) => label?.id === labelId);
    const label = labelData[labelIndex];
    const item = label?.items[itemIndex];
    if (item?.quantity) {
      item.quantity = Number(newQuantity);
      label.totalQuantity = label?.items?.reduce((totalQuantity, item) => Number(totalQuantity) + Number(item?.quantity), 0);
      setLabelData([...labelData]);
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <ImageBackground source={ImageLinks.CREATE_RECIPE_BACKGROUND} blurRadius={10}>
          <View style={styles.Container}>
            <View>
              <TextField os={styles.textUp} text={STRINGS.LETS} />
              <TextField os={styles.textDown} text={`${STRINGS.CREATE} a ${STRINGS.RECIPE}`} />
            </View>
            <CircleButton icon={ImageLinks.ARROW_LEFT} type={'backTransparent'} text="Back" />
          </View>
          <View>
            <View style={styles.addPhotoContainer}>
              <Image source={ImageLinks.CAMERA_ICON} tintColor={COLOR_PALETTE.SEASHELL} style={styles.addPhotoImage} />
              <TextField text={`${STRINGS.ADD}\n${STRINGS.PHOTO}`} color={COLOR_PALETTE.SEASHELL} />
            </View>
          </View>
          <LinearGradient colors={[COLOR_PALETTE.TRANSPARENT, COLOR_PALETTE.SEASHELL]}>
            <View style={styles.drinkInfoContainer}>
              <TextField color={COLOR_PALETTE.APACHE} text={drink.name} />
              <TextField text={drink.info} os={styles.drinkInfoContainerMarginDown} />
              <TextField text={drink.by} os={styles.ft700} />
            </View>
          </LinearGradient>
        </ImageBackground>
        <View style={styles.moreAndQuantityContainer}>
          <View style={styles.moreAndQuantityTextCont}>
            <TextField text={drinkQuantity[10]} os={styles.moreAndQuantityText} />
            <TextField text={drinkQuantity[20]} os={styles.moreAndQuantityText} />
          </View>
          <Image source={ImageLinks.MORE_ICON} style={styles.moreIcon} />
        </View>
        <View style={styles.ingredientsText}>
          <TextField text={`${STRINGS.INGREDIENTS} (${ingredients.quantity})`} fontSize={scaleFont(20)} os={styles.ft700} />
        </View>
        <View>
          <View>
            {labelData?.map((category, index) => (
              <>
                <Accordion key={category.id} label={category} items={category.items} onItemPress={handleItemPress} />
                <Divider key={index} width={2} borderColor={COLOR_PALETTE.DRIFTWOOD} />
              </>
            ))}
          </View>
          <LinearGradient colors={[COLOR_PALETTE.TRANSPARENT, COLOR_PALETTE.SEASHELL]} style={styles.detailContainer}>
            <TouchableOpacity style={styles.labelImage} onPress={handleSaveChanges}>
              <TextField os={styles.detailText} text={`${STRINGS.CREATE} ${STRINGS.RECIPE}`} />
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateRecipeScreen;
