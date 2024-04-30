import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from '../navigator/TabNavigator';
import BrewpodConnectScreen from '../screens/BrewpodConnectScreen/BrewpodConnectScreen';
import RecipeScreen from '../screens/BrewMasterScreen/BrewMasterScreen';
import CreateRecipeScreen from '../screens/CreateRecipeScreen/CreateRecipeScreen';
import RecipeCard from '../components/RecipeCard/RecipeCard';
import ShareRecipe from '../components/ShareRecipe/ShareRecipe';
import MultipleBrewpod from '../components/MultipleBrewpod/MultipleBrewpod';
import BrewMasterScreen from '../screens/BrewMasterScreen/BrewMasterScreen';
import FermentationStatusScreen from '../screens/FermentationStatusScreen/FermentationStatusScreen';

export type HomeStackParamList = {
  Main: undefined;
  Home: undefined;
  BrewPodConnect: undefined;
  BrewMaster: undefined;
  Recipe: undefined;
  CreateRecipe: undefined;
  RecipeCard: undefined;
  ShareRecipe: undefined;
  MultipleBrewpod: undefined;
  FermentationStatus: undefined;
  BrewpodBuffer: undefined;
};

const HomeStack = createNativeStackNavigator<HomeStackParamList>();
const HomeNavigator = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        animation: 'fade',
      }}>
      <HomeStack.Group>
        <HomeStack.Screen name="Main" component={TabNavigator} />
      </HomeStack.Group>
      <HomeStack.Screen name="BrewPodConnect" component={BrewpodConnectScreen} />
      <HomeStack.Screen name="BrewMaster" component={BrewMasterScreen} />
      <HomeStack.Screen name="Recipe" component={RecipeScreen} />
      <HomeStack.Screen name="CreateRecipe" component={CreateRecipeScreen} />
      <HomeStack.Screen name="RecipeCard" component={RecipeCard} />
      <HomeStack.Screen name="ShareRecipe" component={ShareRecipe} />
      <HomeStack.Screen name="MultipleBrewpod" component={MultipleBrewpod} />
      <HomeStack.Screen name="FermentationStatus" component={FermentationStatusScreen} />
    </HomeStack.Navigator>
  );
};
export default HomeNavigator;
