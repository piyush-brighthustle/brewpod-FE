/* eslint-disable @typescript-eslint/no-non-null-assertion */
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
      act: string;
      typ?: string;
      prs?: any;
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
    (actionName: string, params: any, type: string) => {
      const updatedAction = {
        act: actionName,
        typ: type,
        prs: params,
      };
      const tempActions = [...actions];
      tempActions[currentActionIndex] = updatedAction;
      setActions(tempActions);
    },
    [actions, currentActionIndex],
  );

  const startFillAction = useCallback(
    async (type: string, vol = 10) => {
      setActionStatus('filling');
      if (type === 'strt') updateActions('fl', { vol }, 'read');
      else updateActions('fl', { vol }, type);
      const res = await handleSend('fl', { act: 'fl', typ: type, prs: { vol } });
      console.log('FILL HANDLESEND RESPONSE------ ', res);
      setResponseFromDeviceHandleSend(res);
    },
    [updateActions, handleSend],
  );

  const startTempAction = useCallback(
    async (type: string, temp = 80, params?: any) => {
      setActionStatus('heating');

      if (params && Object.keys(params).length > 0) {
        if (type === 'strt') updateActions('tp', params, 'read');
        else updateActions('tp', params, type);
        const res = await handleSend('tp', { act: 'tp', typ: type, prs: params });
        console.log('TEMP PARAMS HANDLESEND RESPONSE------ ', res);
        setResponseFromDeviceHandleSend(res);
      } else {
        // const defaultParams = { drum: temp, cooler: 4 };
        const defaultParams = { drm: temp };
        if (type === 'strt') updateActions('tp', defaultParams, 'read');
        else updateActions('fl', defaultParams, type);
        const res = await handleSend('tp', { act: 'tp', typ: type, prs: defaultParams });
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
            act: 'motorStart',
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
            act: 'motorStop',
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
    const params = { mtr: 1 };
    const res = await handleSend('mash', { act: 'mh', prs: params });
    console.log('MOTOR START HANDLESEND RESPONSE------ ', res);
    setResponseFromDeviceHandleSend(res);
  }, [handleSend]);

  const motorStop = useCallback(async () => {
    setActionStatus('motorStop');
    const params = { mtr: 0 };
    const res = await handleSend('mash', { act: 'mh', prs: params });
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
            act: 'fl',
            typ: 'strt',
          },
          {
            act: 'tp',
            typ: 'strt',
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
        drm: 68,
      };
      setActions([
        {
          act: 'fl',
          typ: 'strt',
          prs: {
            vol: 23,
          },
        },
        {
          act: 'tp',
          typ: 'strt',
          prs: params,
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
        drm: 63,
      };
      setActions([
        {
          act: 'tp',
          typ: 'strt',
          prs: params,
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
        drm: 99,
      };
      setActions([
        {
          act: 'tp',
          typ: 'strt',
          prs: params,
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
        drm: 24,
        clr: 4,
      };
      setActions([
        {
          act: 'tp',
          typ: 'strt',
          prs: params,
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

  const runBrewAction = async (name: string, type: string, params?: any) => {
    if (params) {
      if (name === 'fl') {
        if (Object.keys(params).length > 0) {
          const { vol } = params;
          await startFillAction(type, vol);
        } else await startFillAction(type, params);
      }
      if (name === 'tp') {
        if (params && Object.keys(params).length > 0) await startTempAction(type, 0, params);
        else await startTempAction(type, params);
      }
    } else {
      if (name === 'fl') await startFillAction(type);
      if (name === 'tp') await startTempAction(type);
      if (name === 'motorStart') await motorStart();
      if (name === 'motorStop') await motorStop();
    }
    return;
  };

  const executeActionCallAndPercentage = async (params: any, pv: number, action: string, type: string) => {
    // console.log('PARAMS', params);
    // console.log('PV', pv);
    let percentage = 0;
    if (typeof params === 'object') {
      const { drm, vol } = params;
      if (drm) percentage = calculatePercentage(drm, pv);
      else if (vol) percentage = calculatePercentage(vol, pv);
    } else {
      percentage = calculatePercentage(params, pv);
    }
    if (percentage > 100) setPercentageCompleted(100);
    else setPercentageCompleted(percentage);

    console.log('percentage', percentage);

    if (percentage < 100) {
      await sleep(30000);
      await runBrewAction(action, type, params);
    } else {
      if (action === 'tp') {
        if (typeof params === 'object') setTemperatureText(`Temperature reached ${params.drm}°C`);
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
      if (action === 'tp' && actions.length === 1) cleanup();
    }
  };

  const callProcessesRecursively = useCallback(async () => {
    if (actions.length > 0) {
      const { act, prs, typ } = actions[currentActionIndex];
      const parsedOutput = JSON.parse(output);

      console.log('ACTION ---> ', JSON.stringify(actions[currentActionIndex]));

      if (act === 'fl') {
        const {
          msg: { pv },
        } = parsedOutput;
        executeActionCallAndPercentage(prs, pv, act, typ!);
      } else if (act === 'tp') {
        const {
          msg: {
            drm: { pv },
          },
        } = parsedOutput;

        if (prs && Object.keys(prs).length > 0) {
          executeActionCallAndPercentage(prs, pv, act, typ!);
        } else {
          const { drm } = prs;
          executeActionCallAndPercentage(drm, pv, act, typ!);
        }
      } else if (act === 'motorStart') {
        const {
          msg: { st },
        } = parsedOutput;

        if (st !== 1) {
          await sleep(30000);
          await runBrewAction(act, '');
        } else {
          await sleep(10000);
          setActionStatus('idle');
          setResponseFromDeviceHandleSend('');
          setCurrentActionIndex((prev) => prev + 1);
        }
      } else if (act === 'motorStop') {
        const {
          msg: { st },
        } = parsedOutput;

        if (st !== 0) {
          await sleep(30000);
          await runBrewAction(act, '');
        } else {
          await sleep(10000);
          setActionStatus('idle');
          setResponseFromDeviceHandleSend('');
          setCurrentActionIndex((prev) => prev + 1);
        }
      }
    }
  }, [output, actions, currentActionIndex, sleep, runBrewAction]);

  useEffect(() => {
    console.log('###### OUTPUT ###### ', output);
    if (output) {
      callProcessesRecursively();
    }
  }, [output]);

  const executeActions = useCallback(async () => {
    const { act, typ, prs } = actions[currentActionIndex];
    if (typ) await runBrewAction(act, typ, prs);
    else await runBrewAction(act, '', prs);
  }, [actions, currentActionIndex]);

  useEffect(() => {
    console.log('CURRENT ACTION ------', actions[currentActionIndex]);
    console.log('CURRENT ACTION INDEX -----', currentActionIndex);
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
