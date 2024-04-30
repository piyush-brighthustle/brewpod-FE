import apiClient from '../services/apiClient';
import { LOGIN, LOGOUT, USER } from '../constants/routeNames';
import { Credentials, User } from 'types/authTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STRINGS } from '../types/strings';
import { removeAuthToken, removeUser } from './tokenUtils';
import { AnyAction } from '@reduxjs/toolkit';
import { Dispatch } from 'react';
import { setUser } from '../slices/userSlice';

export const loginUser = async ({ email, password }: Credentials) => {
  let user: User | null = null;
  await apiClient
    .post(`${USER}/${LOGIN}`, {
      email,
      password,
    })
    ?.then(async (res) => {
      if (res.data.user) {
        user = res.data.user;
        await AsyncStorage.setItem(STRINGS.USER_DETAILS, JSON.stringify(res.data.user));
      }
    });

  return user;
};

const executeLogout = async (dispatch: Dispatch<AnyAction>) => {
  dispatch(setUser(null));
  await AsyncStorage.removeItem(STRINGS.USER_DETAILS);
};

export const logoutUser = async (dispatch: Dispatch<AnyAction>) => {
  removeAuthToken();
  removeUser();
  await apiClient
    .post(`${USER}/${LOGOUT}`)
    ?.then(() => {
      executeLogout(dispatch);
    })
    .catch((err) => {
      if (err.message === 'Request failed with status code 401') {
        executeLogout(dispatch);
      }
      console.log('err', err.message);
    });
};
