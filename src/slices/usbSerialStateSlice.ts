import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'store';

type ActionSystemCheckType =
  | {
      id: string;
      ver: number;
      status: number;
      drum_pv: number;
      cool_pv: number;
      heater: string;
      cooler: string;
      mash: string;
      lift: string;
      hops: number;
      sg: number;
    }
  | undefined;

type ActionTempType =
  | {
      drum: {
        md: number;
        pv: number;
        sv: number;
      };
      cooler: {
        md: string;
        pv: number;
        sv: number;
      };
    }
  | undefined;

type ActionFillType =
  | {
      st: number;
      pv: number;
    }
  | undefined;

type ActionType =
  | {
      st: number;
    }
  | undefined;

export type UsbSerialStates = {
  usbSerialState: {
    servisStarted: boolean;
    connected: boolean;
    deviceName: string;
    usbAttached: boolean;
    output: string;
    baudRate: string;
    interfaceValue: string;
    returnedDataType: number;
    actionFill: ActionFillType;
    actionAir: ActionType;
    actionHops: ActionType;
    actionLiftDown: ActionType;
    actionLiftUp: ActionType;
    actionSystemCheck: ActionSystemCheckType;
    actionMash: ActionType;
    actionTemp: ActionTempType;
  };
};

const initialState: UsbSerialStates = {
  usbSerialState: {
    servisStarted: false,
    connected: false,
    deviceName: '',
    usbAttached: false,
    output: '',
    baudRate: '',
    interfaceValue: '',
    returnedDataType: 0,
    actionFill: undefined,
    actionAir: undefined,
    actionHops: undefined,
    actionLiftDown: undefined,
    actionLiftUp: undefined,
    actionSystemCheck: undefined,
    actionMash: undefined,
    actionTemp: undefined,
  },
};

const usbSerialStateSlice = createSlice({
  name: 'usbSerialState',
  initialState,
  reducers: {
    setUsbSerialState(state: UsbSerialStates, action) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      state.usbSerialState[action.payload.property] = action.payload.value;
    },
  },
});

export const { setUsbSerialState } = usbSerialStateSlice.actions;
export const selectUsbSerialState = (state: RootState) => state.usbSerialState.usbSerialState;

export default usbSerialStateSlice.reducer;
