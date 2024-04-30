import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../slices/userSlice';
import brewCounterReducer from '../slices/brewCounter';
import brixValueReducer from '../slices/brixSlice';
import usbSerialStateReducer from '../slices/usbSerialStateSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    brewCounter: brewCounterReducer,
    brixValue: brixValueReducer,
    usbSerialState: usbSerialStateReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
