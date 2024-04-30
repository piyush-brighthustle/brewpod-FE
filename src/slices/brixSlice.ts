import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'store';

export type CounterState = {
  brixValue: number;
};

const initialState: CounterState = {
  brixValue: 12,
};

const brixValueSlice = createSlice({
  name: 'brewCounter',
  initialState,
  reducers: {
    setBrix(state: CounterState, action) {
      state.brixValue = action.payload;
    },
  },
});

export const { setBrix } = brixValueSlice.actions;
export const selectBrixValue = (state: RootState) => state.brixValue.brixValue;

export default brixValueSlice.reducer;
