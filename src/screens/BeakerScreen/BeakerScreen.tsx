/* eslint-disable quotes */
import { Alert, ScrollView, Text, TouchableOpacity } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from 'navigator/RootNavigator';
import { RouteProp, useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import MainContainer from '../../components/MainContainer/MainContainer';
import styles from './BeakerScreen.styles';
import CircularProgress from '../../components/CircularProgress/CircularProgress';
import { scaleWidth } from '../../utils/scale';
import BeakerContainer from '../../components/BeakerContainer/BeakerContainer';
import AppLogo from '../../components/AppLogo/AppLogo';
import PillButton from '../../components/PillButton/PillButton';
import { useDispatch, useSelector } from 'react-redux';
import { incrementBrewCounter, selectBrewCounter } from '../../slices/brewCounter';
import TextField from '../../components/TextField/TextField';
import { TEXT_COLOR } from '../../types/enums';
import { selectBrixValue } from '../../slices/brixSlice';
import { selectUsbSerialState } from '../../slices/usbSerialStateSlice';
import { useRNSerialPortContext } from '../../components/RNSerialPortWrapper/RNSerialPortWrapper';
import { BOILING_TIMER, MASHMOTOR_LIFTUP_TIMER } from '../../hooks/UseAction';

export type BeakerScreenScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Beaker'>;
type BeakerScreenScreenRouteProp = RouteProp<RootStackParamList, 'Beaker'>;

const newBrewParams: BrewDataType = {
  // eslint-disable-next-line quotes
  screenTitle: "Let's Prepare",
  screenSubtitle: 'Brewpod',
  carouselData: [
    {
      id: '1',
      initialTitle: 'Attach The Bag',
      colouredTitle: 'Bag is Attached',
    },
    {
      id: '2',
      initialTitle: 'Attach The Lid',
      colouredTitle: 'Lid is Attached',
    },
    {
      id: '3',
      initialTitle: 'Connect Lid to The Power',
      colouredTitle: 'Lid Is Connected To The Power',
    },
  ],
  carouselStartIndex: 0,
  pillButton: {
    title: ['Done'],
  },
};

const newBeakerParams: BrewDataBeakerType = {
  screenTitle: "Let's Start",
  screenSubtitle: 'Mashing',
  pillButton: {
    title: [''],
  },
  processName: 'Mashing',
};

const maltBrewParams: BrewDataType = {
  screenTitle: "Let's Start",
  screenSubtitle: 'Mashing',
  carouselData: [
    {
      id: '1',
      initialTitle: 'Please Add Malt',
    },
  ],
  carouselStartIndex: 0,
  pillButton: {
    title: ["I've Added the Malt"],
  },
};

const maltBeakerParams: BrewDataBeakerType = {
  screenTitle: "Let's Start",
  screenSubtitle: 'Mashing',
  pillButton: {
    title: [''],
  },
  processName: 'Malt',
};

const afterMaltBrewParams: BrewDataType = {
  // eslint-disable-next-line quotes
  screenTitle: "Let's Prepare",
  screenSubtitle: 'Mashing',
  carouselData: [
    {
      id: '1',
      initialTitle: 'Remove The Lid',
      colouredTitle: 'Lid Is Removed',
    },
    {
      id: '2',
      initialTitle: 'Connect the Bag to Lift Hook',
      colouredTitle: 'Bag Connected to Lift Hook',
    },
    {
      id: '3',
      initialTitle: 'Press to Lift the Bag Up',
      colouredTitle: 'Lifting the Bag Up',
    },
    {
      id: '4',
      initialTitle: 'Turn the Bag to the Side',
      colouredTitle: 'Bag Turned to the side',
    },
    {
      id: '5',
      initialTitle: 'Press to Get the Bag Down',
      colouredTitle: 'Getting the Bag Down',
    },
  ],
  carouselStartIndex: 0,
  pillButton: {
    title: ['Done'],
    to: 'Measure Brix',
  },
};

const fermentationBeakerParams: BrewDataBeakerType = {
  screenTitle: "We're in the",
  screenSubtitle: 'Fermentation Stage',
  pillButton: {
    title: [''],
  },
  processName: 'Fermentation',
};

const BeakerScreen = () => {
  const navigation = useNavigation<BeakerScreenScreenNavigationProp>();
  const route = useRoute<BeakerScreenScreenRouteProp>();
  const brewCounter = useSelector(selectBrewCounter);
  const usbSerialState = useSelector(selectUsbSerialState);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
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
    responseFromDeviceHandleSend,
    output,
    brewActionCycleCompleted,
    cleanup,
    startCooling,
  } = useRNSerialPortContext();
  const [showButton, setShowButton] = useState(false);
  const [textIndex, setTextIndex] = useState(0);
  const [showBeakerText, setShowBeakerText] = useState(false);

  const brixValue = useSelector(selectBrixValue);

  const { beakerParams, brewParams } = route.params;
  const { pillButton, screenSubtitle, screenTitle, beakerBottomText, processName } = beakerParams;

  function showAlertForHop(text: string) {
    return new Promise<void>((resolve, reject) => {
      Alert.alert(text, '', [
        {
          text: 'OK',
          onPress: async () => {
            await sleep(5000);
            resolve();
          },
        },
      ]);
    });
  }

  const callProcesses = async () => {
    if (usbSerialState.connected) {
      console.log('IN CALL PROCESSES');
      if (processName === 'Mashing') {
        await startMashing();
      } else if (processName === 'Malt') {
        console.log('POST MALT WILL START NOW');
        await startPostMaltProcesses();
      } else if (processName === 'Boiling') {
        if (brixValue > 0) {
          await startBoiling(brixValue);
        } else {
          await startBoiling();
        }
      } else {
        await startCleaning();
      }
    }
  };

  useEffect(() => {
    if (isFocused && usbSerialState.connected) {
      setShowButton(false);
      callProcesses();
    }
  }, [isFocused, usbSerialState.connected]);

  const handleNavigationAfterBrewCycleCompleted = useCallback(async () => {
    if (brewActionCycleCompleted) {
      console.log('------ CYCLE COMPLETED ------');
      if (processName === 'Mashing') {
        navigation.navigate('LiveTracker', {
          brewParams: maltBrewParams,
          beakerParams: maltBeakerParams,
        });

        cleanup();
      } else if (processName === 'Malt') {
        await sleep(MASHMOTOR_LIFTUP_TIMER);
        navigation.navigate('LiveTracker', {
          brewParams: afterMaltBrewParams,
        });

        cleanup();
      } else if (processName === 'Boiling') {
        await sleep(BOILING_TIMER);
        await startCooling();
        // await showAlertForHop('Add Hops 1');
        // await showAlertForHop('Add Hops 2');
        // await showAlertForHop('Add Hops 3');
        // await showAlertForHop('Add Hops 4');

        // cleanup();
      }
    }
  }, [processName, brewActionCycleCompleted]);

  useEffect(() => {
    setShowBeakerText(brewActionCycleCompleted);
    handleNavigationAfterBrewCycleCompleted();
  }, [brewActionCycleCompleted]);

  const handleButtonClick = async () => {
    if (showBeakerText && beakerBottomText === 'Please open the valve') {
      setShowButton(true);
      // setShowBeakerText(false);
      cleanup();
      return;
    }
    // if (brewCounter < 1) {
    //   dispatch(incrementBrewCounter());
    //   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //   // @ts-ignore
    //   navigation.navigate('LiveTracker', {
    //     brewParams,
    //     beakerParams: {
    //       ...beakerParams,
    //       pillButton: {
    //         title: ['Close the valve', 'Proceed with Mashing'],
    //       },
    //     },
    //   });
    // }
    // // else if (processName === 'Malt') {
    // // }
    // else {
    //   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //   // @ts-ignore
    //   navigation.navigate('LiveTracker', {
    //     brewParams: newBrewParams,
    //     beakerParams: newBeakerParams,
    //   });
    // }
    navigation.navigate('LiveTracker', {
      brewParams: newBrewParams,
      beakerParams: newBeakerParams,
    });
  };

  const incrementPillButtonTextIndex = () => {
    if (textIndex !== pillButton.title.length - 1) {
      setTextIndex(textIndex + 1);
    } else {
      handleButtonClick();
    }
  };

  return (
    <MainContainer navigation={navigation}>
      <ScrollView contentContainerStyle={styles.beakerContainer}>
        <AppLogo />

        <Text style={styles.lineOne}>{screenTitle}</Text>
        <Text style={styles.lineTwo}>{screenSubtitle}</Text>
        <Text style={{ color: 'green', fontSize: 14, textTransform: 'uppercase', fontWeight: '700' }}>{actionStatus}</Text>
        <Text style={{ color: 'red', fontSize: 13 }}>SEND - {responseFromDeviceHandleSend}</Text>
        <Text style={{ color: 'blue', fontSize: 13 }}>OUTPUT - {output}</Text>

        <CircularProgress
          percentage={percentageComplete}
          radius={scaleWidth(78)}
          strokeWidth={18}
          circularProgressStyle={{
            position: 'absolute',
            top: '33%',
            left: 0,
            right: 0,
            zIndex: 200,
          }}
          duration={timer}
          showTimerValues={false}
        />
        <BeakerContainer percentageValue={percentageComplete} />

        {/* SHOW TEXT ON PRIORITY -> 1. TEMPERATURE TEXT, 2. BEAKER BOTTOM TEXT */}
        {((showBeakerText && beakerBottomText) || temperatureText) && (
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              if (temperatureText) return;
              handleButtonClick();
            }}>
            <TextField
              text={temperatureText || beakerBottomText}
              color={TEXT_COLOR.BLACK}
              os={{
                marginLeft: 'auto',
                marginRight: 'auto',
                marginBottom: 20,
              }}
            />
          </TouchableOpacity>
        )}

        {/* IF BUTTON IS HAVING SEVERAL TEXTS OR NOT */}
        {showButton && pillButton.title.length > 1 ? (
          <PillButton
            buttonTitle={pillButton.title[textIndex]}
            onPress={incrementPillButtonTextIndex}
            pillButtonStyle={{
              marginBottom: 30,
              height: 40,
              width: 200,
            }}
          />
        ) : (
          showButton && (
            <PillButton
              buttonTitle={pillButton.title[0]}
              onPress={handleButtonClick}
              pillButtonStyle={{
                marginBottom: 30,
                height: 350,
                width: 150,
              }}
            />
          )
        )}
      </ScrollView>
    </MainContainer>
  );
};

export default BeakerScreen;
