import { Alert } from 'react-native';
import useUSBSerial from './USBSerial';
import { useCallback, useEffect, useRef, useState } from 'react';
import apiClient from '../services/apiClient';
import { getValueByName, pwmGenerator } from '../utils/globalFunctions/GlobalFunctions';
import useTimer from './useTimer';
import { useSelector } from 'react-redux';
import { selectUsbSerialState } from '../slices/usbSerialStateSlice';
import { calculatePercentage } from '../utils/calculatePercentage';

const CLEAN_FILL_TIMER = 10000;
const CLEAN_Temp_TIMER = 120000;
const MASH_FILL_TIMER = 10000;
const MASH_TEMP_TIMER = 60000;
const MASHMOTOR_START_TIMER = 150000;
const MASHMOTOR_STOP_TIMER = 60000;
export const MASHMOTOR_LIFTUP_TIMER = 3600000;
const MASHMOTOR_LIFTDOWN_TIMER = 60000;
export const BOILING_TIMER = 3600000;

const ye = { code: 200, msg: { cool: { md: 0, pv: 48, sv: 4 }, drum: { md: 0, pv: 21, sv: 92 } } };

const useAction = () => {
  const { handleSend, connected, output, actionFill, actionAir, actionHops, actionLiftDown, actionLiftUp, actionSystemCheck, actionMash, actionTemp } = useUSBSerial();
  const { startCountdown, timeLeft, setTimeLeft } = useTimer();
  const [percentageComplete, setPercentageCompleted] = useState(0);
  const usbSerialState = useSelector(selectUsbSerialState);
  const [responseFromDeviceHandleSend, setResponseFromDeviceHandleSend] = useState('');
  const [brewActionCycleCompleted, setBrewActionCycleCompleted] = useState(false);
  const [actions, setActions] = useState<
    {
      action: string;
      params?: any;
    }[]
  >([]);

  const [currentActionIndex, setCurrentActionIndex] = useState(0);

  const [actionStatus, setActionStatus] = useState('idle');
  const sleep = (ms: any) => new Promise((r) => setTimeout(r, ms));
  const coolerTemp = 4;
  const [temperatureText, setTemperatureText] = useState('');

  const cleanup = (excludeCycleState?: boolean) => {
    console.log('------$$$$ CLEANUP CALLED $$$$------');
    if (!excludeCycleState) setBrewActionCycleCompleted(false);
    setPercentageCompleted(0);
    setResponseFromDeviceHandleSend('');
    setCurrentActionIndex(0);
    setActions([]);
  };

  const updateActions = useCallback(
    (actionName: string, params: any) => {
      const updatedAction = {
        action: actionName,
        params,
      };
      const tempActions = [...actions];
      tempActions[currentActionIndex] = updatedAction;
      setActions(tempActions);
    },
    [actions, currentActionIndex],
  );

  const startFillAction = useCallback(
    async (volume = 10) => {
      setActionStatus('filling');
      updateActions('fill', volume);
      const res = await handleSend('fill', { action: 'fill', params: { volume } });
      console.log('FILL HANDLESEND RESPONSE------ ', res);
      setResponseFromDeviceHandleSend(res);
    },
    [updateActions, handleSend],
  );

  const startTempAction = useCallback(
    async (temp = 80, params?: any) => {
      setActionStatus('heating');

      if (params && Object.keys(params).length > 0) {
        updateActions('temp', params);
        const res = await handleSend('temp', { action: 'temp', params });
        console.log('TEMP PARAMS HANDLESEND RESPONSE------ ', res);
        setResponseFromDeviceHandleSend(res);
      } else {
        // const defaultParams = { drum: temp, cooler: 4 };
        const defaultParams = { drum: temp, cooler: 10 };
        updateActions('temp', defaultParams);
        const res = await handleSend('temp', { action: 'temp', params: defaultParams });
        console.log('TEMP SIMPLE HANDLESEND RESPONSE------ ', res);
        setResponseFromDeviceHandleSend(res);
      }
    },
    [updateActions, handleSend],
  );

  const startDrainAction = async () => {
    return new Promise<void>(async (resolve, reject) => {
      try {
        setActionStatus('draining');
        await startCountdown(5);

        const checkTimer = setInterval(() => {
          if (timeLeft === 0) {
            clearInterval(checkTimer);
            setActionStatus('idle');
            Alert.alert('Cleaning stage completed');
            resolve();
          }
        }, 6000);
      } catch (error) {
        console.error('Error sending "drain" action:', error);
        reject(error);
      }
    });
  };

  const motorStartAction = async () => {
    try {
      if (usbSerialState.connected && usbSerialState.deviceName) {
        setActions([
          {
            action: 'motorStart',
          },
        ]);
      } else {
        console.error('motorStart function did not work');
      }
    } catch (error) {
      console.error('Error during motorStartAction: ', error);
      throw error;
    }
  };

  const motorStopAction = async () => {
    cleanup();
    try {
      if (usbSerialState.connected && usbSerialState.deviceName) {
        setActions([
          {
            action: 'motorStop',
          },
        ]);
      } else {
        console.error('motorStop function did not work');
      }
    } catch (error) {
      console.error('Error during motorStopAction: ', error);
      throw error;
    }
  };

  const motorStart = useCallback(async () => {
    setActionStatus('motorStart');
    const params = { motor: 1 };
    const res = await handleSend('mash', { action: 'mash', params });
    console.log('MOTOR START HANDLESEND RESPONSE------ ', res);
    setResponseFromDeviceHandleSend(res);
  }, [handleSend]);

  const motorStop = useCallback(async () => {
    setActionStatus('motorStop');
    const params = { motor: 0 };
    const res = await handleSend('mash', { action: 'mash', params });
    console.log('MOTOR STOP HANDLESEND RESPONSE------ ', res);
    setResponseFromDeviceHandleSend(res);
  }, [handleSend]);

  // const motorStartAction = async () => {
  //   return new Promise<void>(async (resolve, reject) => {
  //     try {
  //       const res = await handleSend('mash');
  //       console.log('MOTOR START HANDLESEND RESPONSE------ ', res);
  //       setResponseFromDeviceHandleSend(res);
  //       // await sleep(2000);
  //       setActionStatus('motor started');
  //       await startCountdown(10);
  //       const checkTimer = setInterval(() => {
  //         if (timeLeft === 0) {
  //           clearInterval(checkTimer);
  //           setActionStatus('idle');
  //           resolve();
  //         }
  //       }, 11000);
  //     } catch (error) {
  //       console.error('Error sending "mash" action:', error);
  //       reject(error);
  //     }
  //   });
  // };

  // const motorStopAction = async () => {
  //   return new Promise<void>(async (resolve, reject) => {
  //     try {
  //       const res = await handleSend('mash');
  //       console.log('MOTOR STOP HANDLESEND RESPONSE------ ', res);
  //       setResponseFromDeviceHandleSend(res);
  //       // await sleep(2000);
  //       setActionStatus('motor stopped');
  //       await startCountdown(10);

  //       const checkTimer = setInterval(() => {
  //         if (timeLeft === 0) {
  //           clearInterval(checkTimer);
  //           setActionStatus('idle');
  //           resolve();
  //         }
  //       }, 2000);
  //     } catch (error) {
  //       console.error('Error sending "mash" action:', error);
  //       reject(error);
  //     }
  //   });
  // };

  const liftUpAction = async () => {
    return new Promise<void>(async (resolve, reject) => {
      try {
        const res = await handleSend('liftUp');
        console.log('LIFTUP HANDLESEND RESPONSE------ ', res);
        setResponseFromDeviceHandleSend(res);
        // await sleep(10);

        setActionStatus('liftingUp');

        await startCountdown(10);

        const checkTimer = setInterval(() => {
          if (timeLeft === 0) {
            clearInterval(checkTimer);
            setActionStatus('idle');
            resolve();
          }
        }, 11000);
      } catch (error) {
        console.error('Error sending "liftUp" action:', error);
        reject(error);
      }
    });
  };
  const liftDownAction = async () => {
    return new Promise<void>(async (resolve, reject) => {
      try {
        const res = await handleSend('liftDown');
        console.log('LIFT DOWN HANDLESEND RESPONSE------ ', res);
        setResponseFromDeviceHandleSend(res);

        // await sleep(10);
        setActionStatus('liftingDown');

        await startCountdown(10);

        const checkTimer = setInterval(() => {
          if (timeLeft === 0) {
            clearInterval(checkTimer);
            setActionStatus('idle');
            resolve();
          }
        }, 11000);
      } catch (error) {
        console.error('Error sending "liftDown" action:', error);
        reject(error);
      }
    });
  };

  const startCleaning = async () => {
    try {
      if (usbSerialState.connected && usbSerialState.deviceName) {
        setActions([
          {
            action: 'fill',
          },
          {
            action: 'temp',
          },
        ]);
      } else {
        console.error('startCleaningfunction did not work');
      }
    } catch (error) {
      console.error('Error during startFillAction: ', error);
      throw error;
    }
  };

  const startMashing = async () => {
    const resRecipes = await apiClient.get('recipe');
    const brewInputs = resRecipes?.data?.recipe[0]?.brew_inputs;

    if (brewInputs && usbSerialState.connected && usbSerialState.deviceName) {
      const temperatureInput = getValueByName(brewInputs, 'temperature', 'mash');
      // setActions([
      //   {
      //     action: 'fill',
      //   },
      //   {
      //     action: 'temp',
      //     params: temperatureInput[0],
      //   },
      // ]);
      const params = {
        drum: 63,
        cooler: 4,
      };
      setActions([
        {
          action: 'fill',
          params: 23,
        },
        {
          action: 'temp',
          params,
        },
      ]);
    } else {
      console.error('Brew inputs not found in recipe data');
    }
  };

  const startPostMaltProcesses = async () => {
    const resRecipes = await apiClient.get('recipe');
    const brewInputs = resRecipes?.data?.recipe[0]?.brew_inputs;

    if (brewInputs && usbSerialState.connected && usbSerialState.deviceName) {
      const temperatureInput = getValueByName(brewInputs, 'temperature', 'mash');
      setBrewActionCycleCompleted(false);
      // setActions([
      //   {
      //     action: 'temp',
      //     params: temperatureInput[1],
      //   },
      // ]);
      const params = {
        drum: 63,
        cooler: 4,
      };
      setActions([
        {
          action: 'temp',
          params,
        },
      ]);
    } else {
      console.error('Brew inputs not found in recipe data');
    }
  };

  const startBoiling = async (currentBrix = 12) => {
    const resRecipes = await apiClient.get('recipe');
    const brewInputs = resRecipes?.data?.recipe[0]?.brew_inputs;

    if (brewInputs && usbSerialState.connected && usbSerialState.deviceName) {
      const targetBrix = getValueByName(brewInputs, 'brix', 'postmash');
      const volumetricbrixratio = getValueByName(brewInputs, 'volumebrixratio', 'volumebrixratio');
      const boilDuration = getValueByName(brewInputs, 'duration', 'boil');

      const boilTemperature = getValueByName(brewInputs, 'temperature', 'boil');
      const pwm = pwmGenerator(currentBrix, volumetricbrixratio, targetBrix, boilDuration);
      // const params = {
      //   drum: boilTemperature[0],
      //   pwm: pwm,
      //   cooler: coolerTemp,
      // };
      const params = {
        drum: 94,
        cooler: 4,
      };
      setActions([
        {
          action: 'temp',
          params,
        },
      ]);
      // await startTempAction(boilTemperature, params);
    } else {
      console.error('Brew inputs not found in recipe data');
    }
  };

  const startCooling = async (currentBrix = 12) => {
    cleanup();
    const resRecipes = await apiClient.get('recipe');
    const brewInputs = resRecipes?.data?.recipe[0]?.brew_inputs;

    if (brewInputs && usbSerialState.connected && usbSerialState.deviceName) {
      const volumetricbrixratio = getValueByName(brewInputs, 'volumebrixratio', 'volumebrixratio');
      const targetBrix = getValueByName(brewInputs, 'brix', 'postmash');
      const boilDuration = getValueByName(brewInputs, 'duration', 'boil');
      const pitching = getValueByName(brewInputs, 'temperature', 'fermentation');

      const pwm = pwmGenerator(currentBrix, volumetricbrixratio, targetBrix, boilDuration);
      // const params = {
      //   drum: pitching[0],
      //   pwm: pwm,
      //   cooler: coolerTemp,
      // };
      const params = {
        drum: 27,
        cooler: 4,
      };
      setActions([
        {
          action: 'temp',
          params,
        },
      ]);
      // await startTempAction(pitching[0], params);
    }
  };

  const startFermentation = async (currentBrix = 12) => {
    const resRecipes = await apiClient.get('recipe');
    const brewInputs = resRecipes?.data?.recipe[0]?.brew_inputs;

    if (brewInputs && usbSerialState.connected && usbSerialState.deviceName) {
      const volumetricbrixratio = getValueByName(brewInputs, 'volumebrixratio', 'volumebrixratio');
      const targetBrix = getValueByName(brewInputs, 'brix', 'postmash');
      const boilDuration = getValueByName(brewInputs, 'duration', 'boil');
      const fermentStage = getValueByName(brewInputs, 'temperature', 'fermentation');

      const pwm1 = pwmGenerator(currentBrix, volumetricbrixratio, targetBrix, boilDuration);
      const pwm2 = pwmGenerator(currentBrix, volumetricbrixratio, targetBrix, boilDuration);
      const params1 = {
        drum: fermentStage[0],
        pwm: pwm1,
        cooler: coolerTemp,
      };
      const params2 = {
        drum: fermentStage[1],
        pwm: pwm2,
        cooler: coolerTemp,
      };
      await startTempAction(fermentStage[0], params1);
      await startTempAction(fermentStage[1], params2);
    }
  };

  const startAging = async (currentBrix = 12) => {
    const resRecipes = await apiClient.get('recipe');
    const brewInputs = resRecipes?.data?.recipe[0]?.brew_inputs;

    if (brewInputs && usbSerialState.connected && usbSerialState.deviceName) {
      const volumetricbrixratio = getValueByName(brewInputs, 'volumebrixratio', 'volumebrixratio');
      const targetBrix = getValueByName(brewInputs, 'brix', 'postmash');
      const boilDuration = getValueByName(brewInputs, 'duration', 'boil');
      const agingTemperature = getValueByName(brewInputs, 'temperature', 'aging');

      const pwm = pwmGenerator(currentBrix, volumetricbrixratio, targetBrix, boilDuration);
      const params = {
        drum: agingTemperature[0],
        pwm: pwm,
        cooler: coolerTemp,
      };
      await startTempAction(agingTemperature[0], params);
    }
  };

  const startDispense = async () => {
    Alert.alert('Dispense action is under construction');
  };

  const runBrewAction = async (name: string, params?: any) => {
    if (params) {
      if (name === 'fill') await startFillAction(params);
      if (name === 'temp') {
        if (params && Object.keys(params).length > 0) await startTempAction(0, params);
        else await startTempAction(params);
      }
    } else {
      if (name === 'fill') await startFillAction();
      if (name === 'temp') await startTempAction();
      if (name === 'motorStart') await motorStart();
      if (name === 'motorStop') await motorStop();
    }
    return;
  };

  const executeActionCallAndPercentage = async (params: any, pv: number, action: string) => {
    let percentage;
    if (typeof params === 'object') {
      const { drum } = params;
      percentage = calculatePercentage(drum, pv);
    } else {
      percentage = calculatePercentage(params, pv);
    }
    if (percentage > 100) setPercentageCompleted(100);
    else setPercentageCompleted(percentage);

    if (percentage < 100) {
      await sleep(30000);
      await runBrewAction(action, params);
    } else {
      if (action === 'temp') {
        if (typeof params === 'object') setTemperatureText(`Temperature reached ${params.drum}°C`);
        else setTemperatureText(`Temperature reached ${params}°C`);
        await sleep(2000);
        setTemperatureText('');
      }
      setActionStatus('idle');
      setResponseFromDeviceHandleSend('');
      // await sleep(6000);
      // setPercentageCompleted(0);
      setCurrentActionIndex((prev) => prev + 1);

      // IF ONLY TEMP IS THERE IN ACTION AND IT HAS ALREADY COMPLETED THEN DO A CLEANUP
      if (action === 'temp' && actions.length === 1) cleanup();
    }
  };

  const callProcessesRecursively = useCallback(async () => {
    if (actions.length > 0) {
      const { action, params } = actions[currentActionIndex];
      const parsedOutput = JSON.parse(output);

      if (action === 'fill') {
        const {
          msg: { pv },
        } = parsedOutput;
        executeActionCallAndPercentage(params, pv, action);
      } else if (action === 'temp') {
        const {
          msg: {
            drum: { pv },
          },
        } = parsedOutput;

        if (params && Object.keys(params).length > 0) {
          executeActionCallAndPercentage(params, pv, action);
        } else {
          const { drum } = params;
          executeActionCallAndPercentage(drum, pv, action);
        }
      } else if (action === 'motorStart') {
        const {
          msg: { st },
        } = parsedOutput;

        if (st !== 1) {
          await sleep(30000);
          await runBrewAction(action);
        } else {
          await sleep(10000);
          setActionStatus('idle');
          setResponseFromDeviceHandleSend('');
          setCurrentActionIndex((prev) => prev + 1);
        }
      } else if (action === 'motorStop') {
        const {
          msg: { st },
        } = parsedOutput;

        if (st !== 0) {
          await sleep(30000);
          await runBrewAction(action);
        } else {
          await sleep(10000);
          setActionStatus('idle');
          setResponseFromDeviceHandleSend('');
          setCurrentActionIndex((prev) => prev + 1);
        }
      }
    }
  }, [output, actions, currentActionIndex, sleep, runBrewAction]);

  console.log('CURRENT ACTION ------', actions[currentActionIndex]);
  console.log('CURRENT ACTION INDEX -----', currentActionIndex);

  useEffect(() => {
    if (output) {
      console.log('###### OUTPUT ###### ', output);
      callProcessesRecursively();
    }
  }, [output]);

  const executeActions = useCallback(async () => {
    const { action, params } = actions[currentActionIndex];
    await runBrewAction(action, params);
  }, [actions, currentActionIndex]);

  useEffect(() => {
    if (actions.length > 0) {
      if (currentActionIndex === actions.length) setBrewActionCycleCompleted(true);
      else executeActions();
    }
  }, [actions.length, currentActionIndex]);

  return {
    actionStatus,
    temperatureText,
    timer: timeLeft,
    startFillAction,
    percentageComplete: percentageComplete,
    startTempAction,
    startCleaning,
    startMashing,
    startBoiling,
    startCooling,
    sleep,
    startFermentation,
    startAging,
    responseFromDeviceHandleSend,
    startPostMaltProcesses,
    motorStartAction,
    motorStopAction,
    startDispense,
    liftUpAction,
    liftDownAction,
    output,
    brewActionCycleCompleted,
    cleanup,
  };
};

export default useAction;
