import { createSlice } from '@reduxjs/toolkit';

export type SwitchState = {
  active: boolean;
};

const initialState: SwitchState = {
  active: false,
};

const switchSlice = createSlice({
  name: 'switch',
  initialState,
  reducers: {
    toggleSwitch(state: SwitchState) {
      state.active = !state.active;
    },
  },
});

export const { toggleSwitch } = switchSlice.actions;
export default switchSlice.reducer;
