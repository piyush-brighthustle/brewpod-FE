import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AppLogo from '../../components/AppLogo/AppLogo';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, Image, FlatList, ScrollView } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import styles from './RecipeScreen.styles';
import { STRINGS } from '../../types/strings';
import SearchField from '../../components/SearchField/SearchField';
import { BACKGROUND_COLOR, RECIPE_TYPE } from '../../types/enums';
import { DrinkCard } from '../../components/DrinkCard/DrinkCard';
import TextField from '../../components/TextField/TextField';
import { liquorList, ILiquorItem } from '../../utils/data';
import Divider from '../../components/Divider/Divider';
import MainContainer from '../../components/MainContainer/MainContainer';
import { scalePadding } from '../../utils/scale';
import ImageLinks from '../../assets/images';
import CircleButton from '../../components/CircleButton/CircleButton';
import { fetchUserRecipes } from '../../utils/recipes.helper';
import { useSelector } from 'react-redux';
import { selectUser } from '../../slices/userSlice';
import { RootStackParamList } from 'navigator/RootNavigator';

export type RecipeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Recipe'>;

const RecipeScreen = () => {
  const navigation = useNavigation<RecipeScreenNavigationProp>();
  const [recipesByUser, setRecipesByUser] = useState([]);
  const [recipesForUser, setRecipesForUser] = useState([]);
  const isFocused = useIsFocused();
  const user = useSelector(selectUser);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });

  const getUserRecipes = async (type: string) => {
    const resultRecipes = await fetchUserRecipes(type);
    if (resultRecipes && resultRecipes.data.recipe.length > 0) {
      if (type === RECIPE_TYPE.BY_YOU) setRecipesByUser(resultRecipes.data.recipe);
      else if (type === RECIPE_TYPE.FOR_YOU) setRecipesForUser(resultRecipes.data.recipe);
    }
  };

  useEffect(() => {
    if (isFocused) {
      if (user) {
        // console.log('USER', JSON.stringify(user, null, 3));
        getUserRecipes(RECIPE_TYPE.BY_YOU);
      }
      getUserRecipes(RECIPE_TYPE.FOR_YOU);
    }
  }, [isFocused]);

  const LiquorGrid: React.FC<{ liquorList: ILiquorItem[] }> = ({ liquorList }) => {
    const renderLiquorItem = ({ item }: { item: ILiquorItem }) => (
      <View style={styles.gridItem}>
        {item.image && <Image source={item.image} />}
        <Text style={{ color: 'black', fontSize: 12 }}>{item.name}</Text>
      </View>
    );

    return <FlatList data={liquorList} renderItem={renderLiquorItem} keyExtractor={(item) => item.id.toString()} numColumns={4} />;
  };

  return (
    <MainContainer navigation={navigation}>
      <ScrollView style={styles.recipesContainer}>
        <AppLogo />
        <View style={{ marginHorizontal: scalePadding(15), marginBottom: scalePadding(30) }}>
          <View style={styles.Container}>
            <View>
              <TextField os={styles.textUp} text={'Hi John Doe,'} />
              <TextField os={styles.textDown} text={`${STRINGS.LETS} ${STRINGS.EXPLORE} ${STRINGS.RECIPES}`} />
            </View>
            <CircleButton type={'back'} icon={ImageLinks.ARROW_LEFT} text={STRINGS.BACK} />
          </View>
          <View style={styles.searchContainer}>
            <SearchField placeholder={`${STRINGS.SEARCH} ${STRINGS.AMAZING} ${STRINGS.RECIPES}`} searchContainerCss={styles.customSearchContainerStyles} />
          </View>
          <View style={styles.liquorListContainer}>
            <LiquorGrid liquorList={liquorList} />
          </View>
          {/* <Divider borderColor={BACKGROUND_COLOR.BLACK} marginVertical={20} width={0.2} /> */}
          {/* <View style={styles.listContainer}>
            <TextField os={styles.listText} text={`${STRINGS.YOUR} ${STRINGS.PREVIOUS} ${STRINGS.BREWS}`} />
            <DrinkCard data={dummyData} draft={false} buyIngredients={false} createRecipe={true} createNavigate={'CreateRecipe'} dummy />
          </View> */}
          {recipesByUser.length > 0 && (
            <>
              <Divider borderColor={BACKGROUND_COLOR.BLACK} marginVertical={20} width={0.2} />
              <View style={styles.listContainer}>
                <TextField os={styles.listText} text={`${STRINGS.RECIPES} ${STRINGS.BY} ${STRINGS.YOU}`} />
                <DrinkCard data={recipesByUser} draft={false} buyIngredients={false} />
              </View>
            </>
          )}
          {recipesForUser.length > 0 && (
            <>
              <Divider borderColor={BACKGROUND_COLOR.BLACK} marginVertical={20} width={0.2} />
              <View style={styles.listContainer}>
                <TextField os={styles.listText} text={`${STRINGS.RECIPES} ${STRINGS.FOR} ${STRINGS.YOU}`} />
                <DrinkCard data={recipesForUser} draft={false} buyIngredients={false} />
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </MainContainer>
  );
};

export default RecipeScreen;
