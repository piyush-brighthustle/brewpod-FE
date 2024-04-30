// tokenUtils.ts
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STRINGS } from '../types/strings';

export const setAuthToken = async (token: any) => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  await AsyncStorage.setItem(STRINGS.TOKEN_KEY, token);
};

export const removeAuthToken = async () => {
  delete axios.defaults.headers.common['Authorization'];
  await AsyncStorage.removeItem(STRINGS.TOKEN_KEY);
};

export const getAuthToken = async () => {
  try {
    const authToken = await AsyncStorage.getItem(STRINGS.TOKEN_KEY);
    return authToken;
  } catch (error) {
    console.error('Error fetching auth token:', error);
    throw error;
  }
};

export const setUser = async (res: any) => {
  await AsyncStorage.setItem(STRINGS.USER_DETAILS, JSON.stringify(res));
};

export const getUserDetail = async () => {
  const user = await AsyncStorage.getItem(STRINGS.USER_DETAILS);
  return user;
};

export const removeUser = async () => {
  await AsyncStorage.removeItem(STRINGS.USER_DETAILS);
};
