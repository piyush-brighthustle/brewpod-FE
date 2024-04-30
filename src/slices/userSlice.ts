import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../store';
import { User } from 'types/authTypes';

type UserInitialState = {
    user: User | null;
}

const initialState: UserInitialState = {
  user: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const {setUser} = userSlice.actions;

export const selectUser = (state: RootState) => state.user.user;

export default userSlice.reducer;