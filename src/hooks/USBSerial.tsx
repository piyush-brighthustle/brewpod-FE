import { useEffect, useRef, useState } from 'react';
import { Alert, DeviceEventEmitter } from 'react-native';
import { RNSerialport, actions, definitions } from 'brewpod-react-native-usb-serialport';
import { AIR, Fill, HOPS, LIFT_Down, LIFT_UP, MASH, System_Check, TEMP } from '../utils/serialActions';
import { useDispatch, useSelector } from 'react-redux';
import { selectUsbSerialState, setUsbSerialState } from '../slices/usbSerialStateSlice';

const ActionTypes = {
  FILL: 'fl',
  TEMP: 'tp',
  AIR: 'air',
  MASH: 'mash',
  HOPS: 'hops',
  LIFT_UP: 'liftUp',
  LIFT_DOWN: 'liftDown',
  SYSTEM_CHECK: 'systemCheck',
};

function useUSBSerial() {
  const usbSerialState = useSelector(selectUsbSerialState);
  const [servisStarted, setServisStarted] = useState(false);
  const [connected, setConnected] = useState(false);
  const [usbAttached, setUsbAttached] = useState(false);
  const [output, setOutput] = useState('');
  const [outputArray, setOutputArray] = useState([]);
  const [baudRate, setBaudRate] = useState('9600');
  const [interfaceValue, setInterfaceValue] = useState('-1');
  const [returnedDataType, setReturnedDataType] = useState(definitions?.RETURNED_DATA_TYPES.HEXSTRING);
  const [deviceName, setDeviceName] = useState<string | null>();
  const [actionFill, setActionFill] = useState<{ st: number; pv: number }>();
  const [actionTemp, setActionTemp] = useState<{ drum: { md: number; pv: number; sv: number }; cooler: { md: string; pv: number; sv: number } }>();
  const [actionAir, setActionAir] = useState<{ st: number }>();
  const [actionMash, setActionMash] = useState<{ st: number }>();
  const [actionHops, setActionHops] = useState<{ st: number }>();
  const [actionLiftUp, setActionLiftUp] = useState<{ st: string }>();
  const [actionLiftDown, setActionLiftDown] = useState<{ st: string }>();
  const [actionSystemCheck, setActionSystemCheck] = useState<{
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
  }>();
  const actionSentRef = useRef<string | null>(null);
  const dispatch = useDispatch();

  const startUsbListener = () => {
    DeviceEventEmitter.addListener(actions.ON_SERVICE_STARTED, onServiceStarted);
    DeviceEventEmitter.addListener(actions.ON_SERVICE_STOPPED, onServiceStopped);
    DeviceEventEmitter.addListener(actions.ON_DEVICE_ATTACHED, onDeviceAttached);
    DeviceEventEmitter.addListener(actions.ON_DEVICE_DETACHED, onDeviceDetached);
    DeviceEventEmitter.addListener(actions.ON_ERROR, onError);
    DeviceEventEmitter.addListener(actions.ON_CONNECTED, onDeviceConnected);
    DeviceEventEmitter.addListener(actions.ON_DISCONNECTED, onDisconnected);
    DeviceEventEmitter.addListener(actions.ON_READ_DATA, onReadData);

    RNSerialport.setReturnedDataType(returnedDataType);
    RNSerialport.setAutoConnectBaudRate(parseInt(baudRate, 10));
    RNSerialport.setInterface(parseInt(interfaceValue, 10));
    RNSerialport.setAutoConnect(true);
    RNSerialport.startUsbService();
  };

  useEffect(() => {
    startUsbListener();
  }, []);

  const dispatchToUsbSerialState = (property: string, value: any) => {
    // console.log('CALLED DISPATCH', property, ' ', value);
    dispatch(
      setUsbSerialState({
        property,
        value,
      }),
    );
  };

  const onDeviceConnected = (deviceName: any) => {
    setDeviceName(deviceName);
    dispatchToUsbSerialState('deviceName', deviceName);
    setConnected(true);
    dispatchToUsbSerialState('connected', true);
  };

  const onServiceStarted = (response: any) => {
    setServisStarted(true);
    dispatchToUsbSerialState('servisStarted', true);
    if (response.deviceAttached) {
      onDeviceAttached();
    }
  };

  const onServiceStopped = () => {
    setServisStarted(false);
    dispatchToUsbSerialState('servisStarted', false);
  };

  const onDeviceAttached = () => {
    setUsbAttached(true);
    dispatchToUsbSerialState('usbAttached', true);
  };

  const onDeviceDetached = () => {
    setUsbAttached(false);
    dispatchToUsbSerialState('usbAttached', false);
  };

  const onDisconnected = (res: any) => {
    console.log('disconnected ESP32', res);
    setConnected(false);
    dispatchToUsbSerialState('connected', false);
  };

  const onError = (error: any) => {
    if (usbSerialState.connected && usbSerialState.deviceName) {
      return;
    } else {
      console.error(error, 'emitter error');
    }
  };

  const handleClear = () => {
    setOutput('');
    dispatchToUsbSerialState('output', '');
    setOutputArray([]);
  };

  const handleSend = (action: string, params?: any) => {
    return new Promise<string>((resolve, reject) => {
      if (usbSerialState.connected && usbSerialState.deviceName) {
        actionSentRef.current = action;
        let str = '';
        switch (action) {
          case ActionTypes.FILL:
            str = JSON?.stringify(params);
            break;
          case ActionTypes.TEMP:
            str = JSON?.stringify(params);
            break;
          case ActionTypes.AIR:
            str = JSON?.stringify(AIR);
            break;
          case ActionTypes.MASH:
            str = JSON?.stringify(params);
            break;
          case ActionTypes.HOPS:
            str = JSON?.stringify(HOPS);
            break;
          case ActionTypes.LIFT_UP:
            str = JSON?.stringify(LIFT_UP);
            break;
          case ActionTypes.LIFT_DOWN:
            str = JSON?.stringify(LIFT_Down);
            break;
          case ActionTypes.SYSTEM_CHECK:
            str = JSON?.stringify(System_Check);
            break;
          default:
            break;
        }

        try {
          RNSerialport.writeString(deviceName, str);
          resolve(str);
        } catch (error) {
          reject(error);
        }
      } else {
        reject(new Error('Not connected or no deviceName usbserial page'));
      }
    });
  };

  let accumulatedString = '';
  let payloadString: string;
  let isResponseComplete = false;

  const onReadData = (data: any) => {
    if (returnedDataType === definitions.RETURNED_DATA_TYPES.INTARRAY) {
      payloadString = RNSerialport.intArrayToUtf16(data.payload);
    } else if (returnedDataType === definitions.RETURNED_DATA_TYPES.HEXSTRING) {
      payloadString = RNSerialport.hexToUtf16(data.payload);
    }

    // console.log('PAYLOAD =----> ', payloadString);

    const newPayloadString = payloadString.replace(/[\r\n]/g, '');

    accumulatedString += newPayloadString;
    // console.log('ACCUMULATED STRING -----', accumulatedString);
    isResponseComplete = accumulatedString.endsWith('$');
    console.log('isResponseComplete', isResponseComplete);

    if (isResponseComplete === true) {
      // const trimmedString = accumulatedString.slice(1, -1);
      const trimmedString = accumulatedString.replace(/[#$]/g, '');
      // console.log('----TRIMMED DATA----', trimmedString);
      const parsedData = JSON.parse(trimmedString);
      if (parsedData?.cd === 200) {
        const msg = parsedData?.msg;

        switch (actionSentRef?.current) {
          case 'fl':
            setActionFill({ st: msg?.st, pv: msg?.pv });
            dispatchToUsbSerialState('actionFill', { st: msg?.st, pv: msg?.pv });
            break;
          case 'tp':
            const tempValue = { drum: { md: msg?.drum?.md, pv: msg?.drum?.pv, sv: msg?.drum?.sv }, cooler: { md: msg?.drum?.md, pv: msg?.drum?.pv, sv: msg?.drum?.sv } };
            setActionTemp(tempValue);
            dispatchToUsbSerialState('actionTemp', tempValue);
            break;
          case 'air':
            setActionAir({ st: msg?.st });
            dispatchToUsbSerialState('actionAir', { st: msg?.st });
            break;
          case 'mash':
            setActionMash({ st: msg?.st });
            dispatchToUsbSerialState('actionMash', { st: msg?.st });
            break;
          case 'hops':
            setActionHops({ st: msg?.st });
            dispatchToUsbSerialState('actionHops', { st: msg?.st });
            break;
          case 'liftUp':
            setActionLiftUp({ st: msg?.st });
            dispatchToUsbSerialState('actionLiftUp', { st: msg?.st });
            break;
          case 'liftDown':
            setActionLiftDown({ st: msg?.st });
            dispatchToUsbSerialState('actionLiftDown', { st: msg?.st });
            break;
          case 'systemCheck':
            const systemCheckValue = {
              id: msg?.id,
              ver: msg?.ver,
              status: msg?.st,
              drum_pv: msg?.drum_pv,
              cool_pv: msg?.cool_pv,
              heater: msg?.heater,
              cooler: msg?.cooler,
              mash: msg?.mash,
              lift: msg?.lift,
              hops: msg?.hops,
              sg: msg?.sg,
            };
            setActionSystemCheck(systemCheckValue);
            dispatchToUsbSerialState('actionSystemCheck', systemCheckValue);
            break;
          default:
            console.error('Unhandled action:', actionSentRef?.current, parsedData);
        }
        setOutput(trimmedString);
        dispatchToUsbSerialState('output', trimmedString);
        accumulatedString = '';
        payloadString = '';
      }
    }

    isResponseComplete = false;
  };

  return {
    servisStarted,
    connected,
    usbAttached,
    output,
    baudRate,
    interfaceValue,
    returnedDataType,
    handleClear,
    handleSend,
    actionFill,
    setActionFill,
    actionAir,
    setActionAir,
    actionHops,
    setActionHops,
    actionLiftDown,
    setActionLiftDown,
    actionLiftUp,
    setActionLiftUp,
    actionSystemCheck,
    setActionSystemCheck,
    actionMash,
    actionTemp,
  };
}
export default useUSBSerial;
