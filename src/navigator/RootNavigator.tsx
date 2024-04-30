import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from '../navigator/TabNavigator';
import BrewpodConnectScreen from '../screens/BrewpodConnectScreen/BrewpodConnectScreen';
import RecipeScreen from '../screens/RecipeScreen/RecipeScreen';
import CreateRecipeScreen from '../screens/CreateRecipeScreen/CreateRecipeScreen';
import RecipeCard from '../components/RecipeCard/RecipeCard';
import ShareRecipe from '../components/ShareRecipe/ShareRecipe';
import MultipleBrewpod from '../components/MultipleBrewpod/MultipleBrewpod';
import BrewMasterScreen from '../screens/BrewMasterScreen/BrewMasterScreen';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, setUser } from '../slices/userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STRINGS } from '../types/strings';
import Splash from '../screens/SplashScreen/SplashScreen';
import BrewpodBufferScreen from '../screens/BrewpodBufferScreen/BrewpodBufferScreen';
import BeakerScreen from '../screens/BeakerScreen/BeakerScreen';
import LoaderScreen from '../screens/LoaderScreen/LoaderScreen';
import { RNSerialPortContextProvider } from '../components/RNSerialPortWrapper/RNSerialPortWrapper';

export type RootStackParamList = {
  Splash: {
    showMainScreenNow: Dispatch<SetStateAction<boolean>>;
  };
  Main: undefined;
  Home: undefined;
  Login: undefined;
  BrewPodConnect: undefined;
  BrewMaster: undefined;
  Recipe: undefined;
  CreateRecipe: undefined;
  RecipeCard: {
    recipe: any;
  };
  Beaker: {
    brewParams: BrewDataType;
    beakerParams: BrewDataBeakerType;
  };
  LiveTracker: {
    brewParams: BrewDataType;
    beakerParams?: BrewDataBeakerType;
  };
  Loader: undefined;
  ShareRecipe: undefined;
  MultipleBrewpod: undefined;
  BrewpodBuffer: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [showMainScreen, setShowMainScreen] = useState(false);

  const getUserDetailsFromAsync = async () => {
    const userValue = await AsyncStorage.getItem(STRINGS.USER_DETAILS);
    if (userValue) {
      dispatch(setUser(JSON.parse(userValue)));
    }
  };

  useEffect(() => {
    if (!user) {
      getUserDetailsFromAsync();
    }
  }, [user]);

  return (
    <RNSerialPortContextProvider>
      <NavigationContainer>
        <RootStack.Navigator>
          {showMainScreen ? (
            <>
              <RootStack.Group>
                <RootStack.Screen name="Main" component={TabNavigator} />
              </RootStack.Group>
              <RootStack.Screen name="Login" component={LoginScreen} />
              <RootStack.Screen name="BrewPodConnect" component={BrewpodConnectScreen} />
              <RootStack.Screen name="BrewMaster" component={BrewMasterScreen} />
              <RootStack.Screen name="Recipe" component={RecipeScreen} />
              <RootStack.Screen name="CreateRecipe" component={CreateRecipeScreen} />
              <RootStack.Screen name="RecipeCard" component={RecipeCard} />
              <RootStack.Screen name="ShareRecipe" component={ShareRecipe} />
              <RootStack.Screen name="MultipleBrewpod" component={MultipleBrewpod} />
              <RootStack.Screen name="BrewpodBuffer" component={BrewpodBufferScreen} />
              <RootStack.Screen name="Beaker" component={BeakerScreen} />
              <RootStack.Screen name="Loader" component={LoaderScreen} />
            </>
          ) : (
            <RootStack.Screen
              name="Splash"
              component={Splash}
              initialParams={{
                showMainScreenNow: setShowMainScreen,
              }}
            />
          )}
        </RootStack.Navigator>
      </NavigationContainer>
    </RNSerialPortContextProvider>
  );
};

export default RootNavigator;
