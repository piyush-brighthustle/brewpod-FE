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
};

export type ScreenNavigationProp = NativeStackNavigationProp<HomeStackParamList, keyof HomeStackParamList>;
