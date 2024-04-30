import React, { useEffect, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './AuthNavigator';
import { GlobalContext } from '../context/Provider';
import { ActivityIndicator } from 'react-native';
import HomeNavigator from './HomeNavigators';
import { getUserDetail } from '../utils/tokenUtils';
import { AuthContextData } from '../types/authTypes';

const AppNavContainer = () => {
  const {
    authState: { isLoggedIn },
  } = useContext(GlobalContext) as AuthContextData;

  const [isAuthenticated, setIsAuthenticated] = React.useState(isLoggedIn);
  const [authLoaded, setAuthLoaded] = React.useState(false);

  const getUser = async () => {
    try {
      const user = await getUserDetail();
      if (user) {
        setAuthLoaded(true);
        setIsAuthenticated(true);
      } else {
        setAuthLoaded(true);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    getUser();
  }, [isLoggedIn]);

  return <>{authLoaded ? <NavigationContainer>{isAuthenticated ? <HomeNavigator /> : <AuthNavigator />}</NavigationContainer> : <ActivityIndicator />}</>;
};

export default AppNavContainer;
