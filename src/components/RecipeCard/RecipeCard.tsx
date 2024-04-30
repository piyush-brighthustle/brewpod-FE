import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useLayoutEffect, useState } from 'react';
import { Image, ImageBackground, ScrollView, Text, TouchableOpacity, View, FlatList, TextInput } from 'react-native';
import styles from './RecipeCard.styles';
import ImageLinks from '../../assets/images';
import { BACKGROUND_COLOR, COLOR_CODE, COLOR_PALETTE, TEXT_COLOR } from '../../types/enums';
import TextField from '../../components/TextField/TextField';
import LinearGradient from 'react-native-linear-gradient';
import NavigateBackCircle from '../../components/NavigateBackCircle/NavigateBackCircle';
import { STRINGS } from '../../types/strings';
import { useSelector } from 'react-redux';
import MainContainer from '../../components/MainContainer/MainContainer';
import { RootStackParamList } from 'navigator/RootNavigator';
import { selectUser } from '../../slices/userSlice';
import PillButton from '../../components/PillButton/PillButton';
import _ from 'lodash';
import Divider from '../../components/Divider/Divider';
import BeerCard from '../../components/BeerCard/BeerCard';
import { createUserRecipe } from '../../utils/recipes.helper';

type SwitchState = {
  active: boolean;
};

type TSubIngredient = {
  name: string;
  quantity: string[];
};

type TIngredient = {
  values: any;
  name: string;
  sub_ingredients?: TSubIngredient[];
};

type TIngredientWithCount = {
  name: string;
  values: TSubIngredient[];
  count: number;
};

export type ScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'RecipeCard'>;

type RecipeCardRouteProp = RouteProp<RootStackParamList, 'RecipeCard'>;

const RecipeCard = () => {
  const navigation = useNavigation<ScreenNavigationProp>();
  const route = useRoute<RecipeCardRouteProp>();
  const { recipe } = route.params;
  const drink = { name: recipe.title, info: recipe.descp, by: 'Ninja Brewer' };
  const [ingredients, setIngredients] = useState(recipe?.ingredients);
  const abvObject = recipe.brew_inputs?.filter((input: any) => input.input_name === 'abv')[0];
  const abvValue = abvObject?.input_value[0]?.value;
  const [expandedName, setExpandedName] = useState<string | null>(null);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [closeLoginGradient, setCloseLoginGradient] = useState(false);
  const [edit, setEdit] = useState<boolean>(false);
  const [editFieldName, setEditFieldName] = useState<string>('');

  const user = useSelector(selectUser);

  function getAllIngredients(ingredients: TIngredient[]): TIngredientWithCount[] {
    return _.flatMap(ingredients, ({ name, sub_ingredients = [] }: TIngredient): TIngredientWithCount => {
      const values = sub_ingredients.map(({ name: subName, quantity }: TSubIngredient) => ({ name: subName, quantity }));
      return { name, values, count: values.length };
    });
  }
  const allIngredients = getAllIngredients(ingredients);
  const totalCount = allIngredients?.reduce((sum, ingredient) => sum + ingredient.values.length, 0);
  const toggleButton = useSelector((state: { switch: SwitchState }) => state?.switch?.active);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });

  const saveBrew = () => {
    navigation.navigate('BrewpodBuffer');
  };

  const handlePress = (itemName: string) => {
    setExpandedName((prevId) => (prevId === itemName ? null : itemName));
  };

  const saveNewRecipe = async () => {
    const newRecipe = { ...recipe };
    newRecipe.created_by = user?._id;
    delete newRecipe._id;
    delete newRecipe.active;
    delete newRecipe.createdAt;
    delete newRecipe.updatedAt;
    delete newRecipe.__v;
    await createUserRecipe(newRecipe);
  };

  const renderSublist = (item: TIngredient, ingredientIndex: number) => {
    let total = 0;
    if (item.name === expandedName) {
      item?.values?.forEach((subItem: TSubIngredient) => {
        const numericValue = typeof subItem?.quantity?.[0] === 'string' ? parseFloat(subItem.quantity[0].match(/[\d.]+/)?.[0] || '0') : 0;
        total += numericValue;
      });

      setTotalQuantity(total);

      return (
        <View style={styles.sublistContainer}>
          {item?.values?.map((subItem: TSubIngredient, index: number) => (
            <View key={index}>
              <View style={[styles.spaceBetween, styles.sublistBox]}>
                <TextField text={subItem.name} fontSize={14} fontWeight={500} os={{ color: COLOR_PALETTE.APACHE }} />
                {edit && editFieldName === `${String(ingredientIndex)}_${String(index)}_${subItem.name}` ? (
                  <TextInput
                    onEndEditing={(e) => {
                      subItem.quantity[0] = e.nativeEvent.text;
                      setEdit(false);
                    }}
                    autoFocus
                    style={{
                      padding: 0,
                      fontSize: 14,
                      fontWeight: '500',
                    }}
                    defaultValue={subItem.quantity[0]}
                  />
                ) : (
                  <TextField
                    onPress={() => {
                      setEdit(true);
                      setEditFieldName(`${String(ingredientIndex)}_${String(index)}_${subItem.name}`);
                    }}
                    text={subItem.quantity}
                    fontSize={14}
                    fontWeight={500}
                    os={{ color: COLOR_PALETTE.APACHE }}
                  />
                )}
              </View>
              {index < item?.values.length - 1 && <Divider borderColor={COLOR_PALETTE.APACHE} width={1} marginVertical={5} />}
            </View>
          ))}
          <Divider borderColor={COLOR_PALETTE.DRIFTWOOD} width={1.5} marginVertical={5} />
          <View style={styles.spaceBetween}>
            <TextField text="Total Quantity" fontSize={14} fontWeight={500} os={{ color: COLOR_PALETTE.APACHE }} />
            <TextField text={totalQuantity} fontSize={14} fontWeight={500} os={{ color: COLOR_PALETTE.APACHE }} />
          </View>
        </View>
      );
    }

    return null;
  };

  return (
    <MainContainer navigation={navigation}>
      <ScrollView style={styles.recipesCardContainer}>
        <ImageBackground
          source={{
            uri: recipe.image.url,
          }}
          resizeMode="cover">
          <View style={styles.container}>
            <View>
              {abvValue && <Text style={styles.textUp}>{`${abvValue}% ABV`}</Text>}
              <Text style={styles.textDown}>{'33 IBU'}</Text>
              {/* <Image source={ImageLinks.MORE_ICON} style={styles.moreIcon} /> */}
            </View>
            <NavigateBackCircle tintColor={COLOR_PALETTE.SEASHELL} textColor={COLOR_PALETTE.SEASHELL} />
          </View>

          <LinearGradient colors={[COLOR_PALETTE.TRANSPARENT, COLOR_PALETTE.SEASHELL]}>
            <BeerCard title={drink.name} description={drink.info} name={drink.by} rating={`${recipe?.history[0]?.rating}`} />
          </LinearGradient>
        </ImageBackground>
        <View style={styles.moreAndQuantityContainer}>
          <View style={styles.moreAndQuantityTextCont}>
            <TextField text="10 Litres" color={TEXT_COLOR.GRAY} fontSize={12} os={styles.moreAndQuantityText} />
            <TextField
              fontSize={12}
              text="20 Litres"
              color={TEXT_COLOR.WHITE}
              os={[
                styles.moreAndQuantityText,
                {
                  backgroundColor: COLOR_CODE.PRIMARY,
                },
              ]}
            />
          </View>
        </View>
        <View style={styles.ingredientsText}>
          <TextField text={`Ingredients (${totalCount})`} fontSize={20} os={styles.ft700} />
        </View>
        <View style={{ height: 1, backgroundColor: COLOR_PALETTE.APACHE }} />
        <FlatList
          data={allIngredients}
          keyExtractor={(item: TIngredient) => item.name}
          ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: COLOR_PALETTE.APACHE }} />}
          renderItem={({ item, index }: { item: TIngredient; index: number }) => {
            return (
              <View style={styles.labelContainer}>
                <TouchableOpacity style={styles.labelButton} onPress={() => handlePress(item.name)}>
                  <TextField text={item.name.toUpperCase()} fontSize={18} fontWeight={500} os={{ color: COLOR_PALETTE.APACHE }} />
                </TouchableOpacity>
                {renderSublist(item, index)}
              </View>
            );
          }}
        />
        <View style={{ height: 1, backgroundColor: COLOR_PALETTE.APACHE }} />

        {toggleButton && (
          <LinearGradient colors={[COLOR_PALETTE.TRANSPARENT, COLOR_PALETTE.SEASHELL]} style={styles.editOptionContainer}>
            <View style={styles.editOptionBox}>
              <TouchableOpacity>
                <Text style={styles.editOptionText}>{`${STRINGS.SAVE}`}</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.editOptionText}>{`${STRINGS.SAVE} ${STRINGS.AS} ${STRINGS.NEW}`}</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.editOptionText}>{`${STRINGS.CANCEL}`}</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        )}
      </ScrollView>

      {user && (
        <LinearGradient
          colors={[BACKGROUND_COLOR.PRIMARY, COLOR_PALETTE.CHEROKEE]}
          style={{
            height: 70,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
          }}>
          <PillButton
            buttonTitle="Saved for Brew"
            pillButtonStyle={{
              height: 30,
              width: 150,
            }}
            onPress={saveBrew}
          />
          <PillButton
            buttonTitle="Saved as New"
            pillButtonStyle={{
              height: 30,
              width: 150,
            }}
            onPress={saveNewRecipe}
          />
        </LinearGradient>
      )}

      {!user && !closeLoginGradient && (
        <LinearGradient
          colors={[BACKGROUND_COLOR.PRIMARY, '#BFBFBF', 'gray']}
          style={{
            height: 150,
            justifyContent: 'flex-end',
            padding: 15,
          }}>
          <TouchableOpacity
            style={{
              marginLeft: 'auto',
              alignItems: 'center',
            }}
            activeOpacity={0.5}
            onPress={() => setCloseLoginGradient(true)}>
            <View
              style={{
                borderWidth: 1,
                borderColor: 'white',
                padding: 3,
                borderRadius: 100,
              }}>
              <Image
                source={ImageLinks.CROSS}
                style={{
                  height: 9,
                  width: 9,
                }}
              />
            </View>
            <TextField color={TEXT_COLOR.WHITE} text="Close" fontSize={13} />
          </TouchableOpacity>
          <Text
            style={{
              color: TEXT_COLOR.WHITE,
              marginBottom: 15,
              width: 110,
              fontWeight: '500',
            }}>
            Please Log in to start Brewing.
          </Text>
          <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate('Login')}>
            <Text
              style={{
                color: TEXT_COLOR.WHITE,
                fontSize: 20,
                textDecorationLine: 'underline',
                fontWeight: 'bold',
                marginBottom: 10,
              }}>
              Log In
            </Text>
          </TouchableOpacity>
        </LinearGradient>
      )}
    </MainContainer>
  );
};

export default RecipeCard;
