/* eslint-disable quotes */
import { Text, TouchableOpacity, View, Image, Dimensions } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp, useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import AppLogo from '../../components/AppLogo/AppLogo';
import MainContainer from '../../components/MainContainer/MainContainer';
import styles from './FermentationStatusScreen.styles';
import FermentationStatus from '../../components/FermentationStatus/FermentationStatus';
import ImageLinks from '../../assets/images';
import PillButton from '../../components/PillButton/PillButton';
import { scaleFont, scaleHeight } from '../../utils/scale';
import { TabStackParamList } from 'navigator/TabNavigator';
import Carousel from 'react-native-snap-carousel';
import { CAROUSEL_NAVIGATION, COLOR_CODE } from '../../types/enums';
import TextField from '../../components/TextField/TextField';
import { useRNSerialPortContext } from '../../components/RNSerialPortWrapper/RNSerialPortWrapper';

export type FermentationStatusScreenNavigationProp = NativeStackNavigationProp<TabStackParamList, 'LiveTracker'>;
type FermentationStatusScreenRouteProp = RouteProp<TabStackParamList, 'LiveTracker'>;

const measureBrixParams: BrewDataType = {
  // eslint-disable-next-line quotes
  screenTitle: "Let's",
  screenSubtitle: 'Measure Brix',
  carouselData: [
    {
      id: '1',
      initialTitle: 'Connect Water',
      colouredTitle: 'Water Connected',
    },
    {
      id: '2',
      initialTitle: 'Measure Brix',
    },
  ],
  carouselStartIndex: 0,
  pillButton: {
    title: ['Move to Boiling'],
    to: 'Boiling Process',
  },
};

const measureBrixBeakerParams: BrewDataBeakerType = {
  screenTitle: "Let's start",
  screenSubtitle: 'Boiling',
  pillButton: {
    title: [''],
  },
  beakerBottomText: 'Please wait for 60 minutes',
  processName: 'Boiling',
};

const FermentationStatusScreen = () => {
  const navigation = useNavigation<FermentationStatusScreenNavigationProp>();
  const route = useRoute<FermentationStatusScreenRouteProp>();

  if (!route.params)
    return (
      <MainContainer navigation={navigation}>
        <View style={styles.fermentationStatusContainer}>
          <AppLogo />

          <TextField text="No Brewing taking place at the moment." fontSize={scaleFont(22)} os={styles.idleStateLine} color={COLOR_CODE.PRIMARY} fontWeight={500} />
        </View>
      </MainContainer>
    );

  const { brewParams, beakerParams } = route.params;
  const { motorStartAction, motorStopAction } = useRNSerialPortContext();
  const { carouselData, pillButton, screenSubtitle, screenTitle, carouselStartIndex } = brewParams;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const carouselRef = useRef<Carousel>();
  const [index, setIndex] = useState(carouselStartIndex);
  const isFocused = useIsFocused();
  const [showStatusColoured, setShowStatusColoured] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const [hidePillButton, setHidePillButton] = useState(false);
  const { width: screenWidth } = Dimensions.get('window');
  const disableCarouselNextButton = carouselData[index]?.initialTitle === 'Press to Lift the Bag Up';

  useEffect(() => {
    carouselRef.current.snapToItem(carouselStartIndex);
  }, [isFocused, carouselStartIndex]);

  const callProcesses = async () => {
    if (pillButton.title[0] === "I've Added the Malt") {
      setButtonDisabled(true);
      await motorStartAction();
      setButtonDisabled(false);
    }
  };

  useEffect(() => {
    if (isFocused) {
      callProcesses();
    }
  }, [isFocused]);

  const handleClick = async () => {
    if (pillButton.to && pillButton.to === 'Measure Brix') {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // navigation.navigate('Loader');
      navigation.navigate('LiveTracker', {
        brewParams: measureBrixParams,
        beakerParams: measureBrixBeakerParams,
      });
    } else if (pillButton.title[0] === "I've Added the Malt") {
      setButtonDisabled(true);
      await motorStopAction();
      setButtonDisabled(false);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      navigation.navigate('Beaker', {
        beakerParams,
        brewParams,
      });
    } else {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      navigation.navigate('Beaker', {
        beakerParams,
        brewParams,
      });
    }
  };

  const handleCarouselNavigation = (location: CAROUSEL_NAVIGATION) => {
    // setShowStatusColoured(true);
    // setTimeout(() => {
    //   if (location === CAROUSEL_NAVIGATION.NEXT) {
    //     carouselRef.current.snapToItem(index + 1);
    //   } else if (location === CAROUSEL_NAVIGATION.PREV) {
    //     carouselRef.current.snapToItem(index - 1);
    //   }
    //   setShowStatusColoured(false);
    // }, 1000);
    if (location === CAROUSEL_NAVIGATION.NEXT) {
      carouselRef.current.snapToItem(index + 1);
    } else if (location === CAROUSEL_NAVIGATION.PREV) {
      carouselRef.current.snapToItem(index - 1);
    }
  };

  const renderFermentationStatus = ({ item, index: fIndex }: { item: CarouselDataType; index: number }) => {
    return (
      <FermentationStatus
        key={item.id}
        focused={fIndex === index}
        showStatusColoured={showStatusColoured}
        initialTitle={item.initialTitle}
        colouredTitle={item.colouredTitle}
        screenWidth={screenWidth}
        setHidePillButton={setHidePillButton}
        handleCarouselNavigation={handleCarouselNavigation}
        handleClick={handleClick}
      />
    );
  };

  return (
    <MainContainer navigation={navigation}>
      <View style={styles.fermentationStatusContainer}>
        <AppLogo />

        <Text style={styles.lineOne}>{screenTitle}</Text>
        <Text style={styles.lineTwo}>{screenSubtitle}</Text>

        <View
          style={{
            alignItems: 'center',
            marginTop: 20,
          }}>
          <Carousel
            ref={carouselRef}
            scrollEnabled={false}
            data={carouselData}
            // initialScrollIndex={index}
            renderItem={renderFermentationStatus}
            sliderWidth={screenWidth}
            sliderHeight={screenWidth}
            itemWidth={screenWidth - 60}
            // sliderWidth={400}
            // itemWidth={400}
            onSnapToItem={(snapIndex: number) => {
              setIndex(snapIndex);
            }}
          />
        </View>

        {carouselData.length > 1 && (
          <View style={{ position: 'absolute', display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'center', bottom: 0, top: 0 }}>
            {index > 0 && (
              <TouchableOpacity
                activeOpacity={0.5}
                style={{ marginLeft: 15 }}
                onPress={() => {
                  if (index === 0) return;
                  handleCarouselNavigation(CAROUSEL_NAVIGATION.PREV);
                }}>
                <Image source={ImageLinks.CHEVRON_LEFT_CIRCLE} style={{ height: 50, width: 50 }} />
              </TouchableOpacity>
            )}
            {index < carouselData.length - 1 && (
              <TouchableOpacity
                activeOpacity={0.5}
                disabled={disableCarouselNextButton}
                style={{ marginRight: 15, marginLeft: 'auto', opacity: disableCarouselNextButton ? 0.5 : 1 }}
                onPress={() => {
                  if (index === carouselData.length - 1) return;
                  handleCarouselNavigation(CAROUSEL_NAVIGATION.NEXT);
                }}>
                <Image source={ImageLinks.CHEVRON_RIGHT_CIRCLE} style={{ height: 50, width: 50 }} />
              </TouchableOpacity>
            )}
          </View>
        )}

        {index === carouselData.length - 1 && !hidePillButton && (
          <PillButton onPress={handleClick} buttonTitle={pillButton.title[0]} disabled={buttonDisabled} pillButtonStyle={{ marginTop: 'auto', bottom: 30, width: '45%', height: scaleHeight(34) }} />
        )}
      </View>
    </MainContainer>
  );
};

export default FermentationStatusScreen;
