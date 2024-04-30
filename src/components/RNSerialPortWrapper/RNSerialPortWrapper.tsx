import React, { createContext, useContext } from 'react';
import useAction from '../../hooks/UseAction';

export type SerialPortContext = {
  percentageComplete: number;
  timer: number;
  startCleaning: () => Promise<void>;
  actionStatus: string;
  startMashing: () => Promise<void>;
  startBoiling: (currentBrix?: number) => Promise<void>;
  startPostMaltProcesses: () => Promise<void>;
  temperatureText: string;
  sleep: (ms: any) => Promise<unknown>;
  motorStartAction: () => Promise<void>;
  motorStopAction: () => Promise<void>;
  liftDownAction: () => Promise<void>;
  liftUpAction: () => Promise<void>;
  responseFromDeviceHandleSend: string;
  output: string;
  brewActionCycleCompleted: boolean;
  cleanup: () => void;
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const RNSerialPortContext = createContext<SerialPortContext>({});

export function useRNSerialPortContext() {
  return useContext(RNSerialPortContext);
}

type Props = {
  children: React.ReactNode;
};

export function RNSerialPortContextProvider({ children }: Props) {
  const {
    percentageComplete,
    timer,
    startCleaning,
    actionStatus,
    startMashing,
    startBoiling,
    startPostMaltProcesses,
    temperatureText,
    sleep,
    motorStartAction,
    motorStopAction,
    liftDownAction,
    liftUpAction,
    responseFromDeviceHandleSend,
    output,
    brewActionCycleCompleted,
    cleanup,
  } = useAction();

  return (
    <RNSerialPortContext.Provider
      value={{
        percentageComplete,
        timer,
        startCleaning,
        actionStatus,
        startMashing,
        startBoiling,
        startPostMaltProcesses,
        temperatureText,
        sleep,
        motorStartAction,
        motorStopAction,
        liftDownAction,
        liftUpAction,
        responseFromDeviceHandleSend,
        output,
        brewActionCycleCompleted,
        cleanup,
      }}>
      {children}
    </RNSerialPortContext.Provider>
  );
}
