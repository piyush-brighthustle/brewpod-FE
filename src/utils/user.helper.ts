import { UPDATE_PROFIILE, USER } from '../constants/routeNames';
import apiClient from '../services/apiClient';
import { User } from 'types/authTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STRINGS } from '../types/strings';
import { Dispatch } from 'react';
import { AnyAction } from '@reduxjs/toolkit';
import { setUser } from '../slices/userSlice';

export const updateUsername = async (username: string, existingUser: User, dispatch: Dispatch<AnyAction>) => {
  await apiClient
    .post(`${USER}${UPDATE_PROFIILE}`, {
      name: username,
    })
    ?.then(async () => {
      const newUser = { ...existingUser, name: username };
      await AsyncStorage.setItem(STRINGS.USER_DETAILS, JSON.stringify(newUser)).then(() => dispatch(setUser(newUser)));
    })
    .catch((e) => console.log(e));
};
