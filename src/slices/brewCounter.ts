import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'store';

export type CounterState = {
  brewCounter: number;
};

const initialState: CounterState = {
  brewCounter: 0,
};

const brewCounterSlice = createSlice({
  name: 'brewCounter',
  initialState,
  reducers: {
    incrementBrewCounter(state: CounterState) {
      state.brewCounter = state.brewCounter + 1;
    },
  },
});

export const { incrementBrewCounter } = brewCounterSlice.actions;
export const selectBrewCounter = (state: RootState) => state.brewCounter.brewCounter;

export default brewCounterSlice.reducer;
