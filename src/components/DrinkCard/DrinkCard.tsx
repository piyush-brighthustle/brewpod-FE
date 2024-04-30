import ImageLinks from '../../assets/images';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, ImageSourcePropType, FlatList, NativeSyntheticEvent, NativeScrollEvent, Image } from 'react-native';
import { BACKGROUND_COLOR, COLOR_CODE, COLOR_PALETTE, TEXT_COLOR } from '../../types/enums';
import { scaleWidth } from '../../utils/scale';
import styles from './DrinkCard.styles';
import LinearGradient from 'react-native-linear-gradient';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import TextField from '../../components/TextField/TextField';
import { STRINGS } from '../../types/strings';
import CircleButton from '../CircleButton/CircleButton';
import { RootStackParamList } from 'navigator/RootNavigator';

interface DrinkItem {
  id: string;
  image: ImageSourcePropType;
  abv: number;
}

interface DrinkCardProps {
  data?: DrinkItem[];
  draft?: boolean;
  buyIngredients?: boolean;
  createRecipe?: boolean;
  createNavigate?: string;
  dummy?: boolean;
}

export type ScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, keyof RootStackParamList>;

export const DrinkCard: React.FC<DrinkCardProps> = ({ data, draft, buyIngredients = true, createRecipe = false, createNavigate }) => {
  const navigation = useNavigation<ScreenNavigationProp>();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const xOffset = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(xOffset / scaleWidth(280));

    if (newIndex !== currentIndex) {
      setCurrentIndex(newIndex);
    }
  };

  const createRecipeNavigate = () => {
    navigation.navigate(createNavigate as keyof RootStackParamList);
  };

  const renderItem = ({ item }: { item: any }) => {
    const abvObject = item?.brew_inputs?.filter((input: any) => input.input_name === 'abv')[0];
    const abvValue = abvObject?.input_value[0]?.value;
    return !item?.image?.url ? (
      <TouchableOpacity onPress={() => navigation.navigate('RecipeCard', { recipe: null })}>
        <ImageBackground source={item.image} resizeMode="cover" style={buyIngredients ? styles.imageBackgroundWithIngredients : styles.imageBackgroundWithoutIngredients}>
          <View style={buyIngredients ? styles.cardContainerWithIngredients : styles.cardContainerWithoutIngredients}>
            <TextField text={`${item.abv}% ABV`} os={styles.abvText} />
          </View>

          {buyIngredients && (
            <View style={styles.buyIngredientsContainer}>
              <TouchableOpacity>
                <TextField text={`${STRINGS.BUY} ${STRINGS.INGREDIENTS}`} os={styles.buyIngredientsText} />
              </TouchableOpacity>
            </View>
          )}
        </ImageBackground>
      </TouchableOpacity>
    ) : (
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() =>
          navigation.navigate('RecipeCard', {
            recipe: item,
          })
        }
        style={{ margin: 10, position: 'relative' }}>
        <View>
          <Image
            source={{
              uri: item?.image?.url,
            }}
            resizeMode="stretch"
            height={177}
            width={154}
            style={{
              borderRadius: 15,
            }}
          />
        </View>
        {abvValue && (
          <Text
            style={{
              paddingHorizontal: 6,
              paddingVertical: 3,
              backgroundColor: COLOR_CODE.COMPLEMENTARY,
              fontSize: 12,
              color: TEXT_COLOR.WHITE,
              width: 'auto',
              borderRadius: 20,
              position: 'absolute',
              bottom: 35,
              left: 10,
            }}>
            {abvValue}% ABV
          </Text>
        )}
        <Text
          style={{
            color: TEXT_COLOR.BLACK,
            fontSize: 16,
            marginTop: 2,
            fontWeight: '600',
          }}>
          {item.title.length > 20 ? item.title.slice(0, 16) + '...' : item.title}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      {!draft ? (
        <>
          <View style={styles.container}>
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              horizontal
              pagingEnabled
              onScroll={handleScroll}
              showsHorizontalScrollIndicator={false}
              snapToInterval={280}
              decelerationRate="normal"
            />
            {createRecipe && (
              <LinearGradient colors={[COLOR_PALETTE.TRANSPARENT, BACKGROUND_COLOR.PRIMARY]} style={styles.createRecipeContainer}>
                <TouchableOpacity onPress={createRecipeNavigate} style={styles.createRecipeButtonContainer}>
                  <Text style={styles.createRecipeButtonText}>{`${STRINGS.CREATE} ${STRINGS.RECIPE}`}</Text>
                </TouchableOpacity>
              </LinearGradient>
            )}
          </View>
        </>
      ) : (
        <View>
          <ImageBackground source={ImageLinks.WHEAT_BEER} style={styles.image} resizeMode="contain" blurRadius={15}>
            <View style={styles.contentContainer}>
              <CircleButton icon={ImageLinks.DRAFT_ICON} type={'draft'} />
            </View>
          </ImageBackground>
        </View>
      )}
    </View>
  );
};
