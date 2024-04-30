import { NavigationProp, useNavigation } from '@react-navigation/native';
import AppLogo from '../../components/AppLogo/AppLogo';
import React, { useLayoutEffect } from 'react';
import { SafeAreaView, ScrollView, Text, View, ImageBackground, Image, ImageSourcePropType } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from 'navigator/RootNavigator';
import styles from './ShareRecipe.styles';
import NavigateBackCircle from '../../components/NavigateBackCircle/NavigateBackCircle';
import { COLOR_PALETTE } from '../../types/enums';
import ImageLinks from '../../assets/images';
import { STRINGS } from '../../types/strings';

interface socialMediaItem {
  id: string;
  image: ImageSourcePropType;
}

const socialMediaIcons: socialMediaItem[] = [
  {
    id: '1',
    image: ImageLinks.WA_ICON,
  },
  {
    id: '2',
    image: ImageLinks.GMAIL_ICON,
  },
  {
    id: '3',
    image: ImageLinks.INSTA_ICON,
  },
  {
    id: '4',
    image: ImageLinks.WA_ICON,
  },
  {
    id: '5',
    image: ImageLinks.GMAIL_ICON,
  },
];

export type ShareRecipeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ShareRecipe'>;
const ShareRecipe = () => {
  const navigate: NavigationProp<ShareRecipeScreenNavigationProp> = useNavigation();
  useLayoutEffect(() => {
    navigate.setOptions({
      headerShown: false,
    });
  });

  return (
    <SafeAreaView>
      <ScrollView>
        <AppLogo />
        <View style={styles.Container}>
          <View>
            <Text style={styles.textUp}>{STRINGS.LETS}</Text>
            <Text style={styles.textDown}>{STRINGS.SHARE_YOUR_STATUS}</Text>
          </View>
          <NavigateBackCircle tintColor={COLOR_PALETTE.APACHE} />
        </View>
        <View style={styles.imageContainer}>
          <ImageBackground source={ImageLinks.SHARE_RECIPE_BG} style={styles.imgBG} resizeMode="contain">
            <View style={styles.imgBGText}>
              <Text style={styles.drinkHeaderText}>{STRINGS.BREWING}</Text>
              <Text style={styles.drinkHeaderText}>{STRINGS.CLASSIC}</Text>
              <Text style={styles.drinkHeaderText}>{STRINGS.STRONG_LAGER}</Text>
              <Text style={styles.drinkDetail}>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe accusamus velit distinctio veritatis provident dicta quos quidem consectetur, explicabo earum qui. Dolore aliquid
                assumenda vel amet dolor quo ipsum nam est nostrum ex cumque consectetur.
              </Text>
              <Image source={ImageLinks.BREWPOD_VECTOR} />
            </View>
          </ImageBackground>
          <View style={styles.postButtonContainer}>
            <Text style={styles.postText}>{STRINGS.POST_ON_COMMUNITY}</Text>
          </View>
        </View>
        <View style={styles.shareMedia}>
          <Text style={styles.shareText}>{STRINGS.SHARE_ON}</Text>
          <View style={styles.mediaIcons}>
            {socialMediaIcons.map((item) => {
              return <Image source={item.image} key={item.id} />;
            })}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ShareRecipe;
