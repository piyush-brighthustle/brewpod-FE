import { Animated, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import ImageLinks from '../../assets/images';
import styles from './FermentationStatus.styles';
import { scaleFont, scaleHeight } from '../../utils/scale';
import { CAROUSEL_NAVIGATION, COLOR_CODE, TEXT_COLOR } from '../../types/enums';
import { Overlay } from '@rneui/themed';
import LinearGradient from 'react-native-linear-gradient';
import TextField from '../../components/TextField/TextField';
import PillButton from '../../components/PillButton/PillButton';
import { useDispatch } from 'react-redux';
import { setBrix } from '../../slices/brixSlice';
import { useRNSerialPortContext } from '../../components/RNSerialPortWrapper/RNSerialPortWrapper';

type Props = {
  initialTitle: string;
  colouredTitle?: string;
  showStatusColoured: boolean;
  focused: boolean;
  screenWidth: number;
  setHidePillButton: React.Dispatch<React.SetStateAction<boolean>>;
  handleCarouselNavigation: (location: CAROUSEL_NAVIGATION) => void;
  handleClick: () => void;
};

const FermentationStatus = ({ initialTitle, colouredTitle, showStatusColoured, focused, screenWidth, setHidePillButton, handleCarouselNavigation, handleClick }: Props) => {
  const imageHeight = useRef(new Animated.Value(100)).current;
  const [showLiftActiveIcon, setShowLiftActiveIcon] = useState(false);
  const [brixValue, setBrixValue] = useState(12);
  const [showLiftIcon, setShowLiftIcon] = useState(false);
  const [showBrixInputModal, setShowBrixInputModal] = useState(false);
  const showTextInput = initialTitle === 'Measure Brix';

  const { liftDownAction, liftUpAction } = useRNSerialPortContext();

  const dispatch = useDispatch();

  const showLiftIcons = () => {
    if (initialTitle === 'Press to Lift the Bag Up' || initialTitle === 'Press to Get the Bag Down') {
      setHidePillButton(true);
      setShowLiftIcon(true);
    } else if (initialTitle === 'Measure Brix') {
      setHidePillButton(true);
    } else {
      setShowLiftIcon(false);
    }
  };

  useEffect(() => {
    showLiftIcons();
  }, [initialTitle]);

  useEffect(() => {
    const targetHeight = focused ? scaleHeight(250) : scaleHeight(200); // Adjust the target height as needed

    Animated.timing(imageHeight, {
      toValue: targetHeight,
      duration: 300, // Animation duration in milliseconds
      useNativeDriver: false, // You can set it to true for better performance on some platforms
    }).start();
  }, [focused]);

  const getLiftInactiveImage = () => {
    switch (initialTitle) {
      case 'Press to Lift the Bag Up':
        return ImageLinks.LIFT_UP_INACTIVE;
      case 'Press to Get the Bag Down':
        return ImageLinks.LIFT_DOWN_INACTIVE;
      default:
        return;
    }
  };

  const getLiftActiveImage = () => {
    switch (initialTitle) {
      case 'Press to Lift the Bag Up':
        return ImageLinks.LIFT_UP_ACTIVE;
      case 'Press to Get the Bag Down':
        return ImageLinks.LIFT_DOWN_ACTIVE;
      default:
        return;
    }
  };

  const callLiftUpDown = async () => {
    if (initialTitle === 'Press to Lift the Bag Up' && liftUpAction) {
      await liftUpAction().then(() => {
        handleCarouselNavigation(CAROUSEL_NAVIGATION.NEXT);
      });
    } else if (initialTitle === 'Press to Get the Bag Down' && liftDownAction) {
      await liftDownAction().then(() => {
        setShowLiftIcon(false);
        setHidePillButton(false);
      });
    }
  };

  return (
    <Animated.View
      style={[
        styles.fermentationContainer,
        {
          width: screenWidth - 60,
        },
      ]}>
      <Animated.Image
        source={ImageLinks.BREWPOD_MACHINE}
        style={[
          styles.machineImage,
          {
            height: imageHeight,
          },
        ]}
      />
      <Text
        style={[
          styles.text,
          {
            fontSize: focused ? 15 : 12,
            // color: showStatusColoured ? COLOR_CODE.PRIMARY : TEXT_COLOR.BLACK,
            fontWeight: '400',
          },
        ]}>
        {/* {showStatusColoured ? colouredTitle : initialTitle} */}
        {initialTitle}
      </Text>

      {showLiftIcon && showLiftActiveIcon && (
        <TouchableOpacity onPress={callLiftUpDown}>
          <Image source={getLiftActiveImage()} style={styles.liftImage} />
        </TouchableOpacity>
      )}

      {showLiftIcon && !showLiftActiveIcon && (
        <TouchableOpacity onPress={() => setShowLiftActiveIcon(true)}>
          <Image source={getLiftInactiveImage()} style={styles.liftImage} />
        </TouchableOpacity>
      )}

      {showTextInput && (
        <View style={styles.brixContainer}>
          <TouchableOpacity activeOpacity={0.5} onPress={() => setShowBrixInputModal(true)}>
            <LinearGradient colors={['#02AB97', '#26DE93']} style={styles.brixInputContainer}>
              <TextField text={`${brixValue >= 0 ? brixValue.toString() : '12'}  Bx`} color={TEXT_COLOR.WHITE} fontSize={scaleFont(20)} />
            </LinearGradient>
          </TouchableOpacity>

          <PillButton
            buttonTitle="Move to Boiling"
            pillButtonStyle={styles.brixButton}
            onPress={() => {
              dispatch(setBrix(brixValue));
              handleClick();
            }}
          />
        </View>
      )}

      <Overlay
        isVisible={showBrixInputModal}
        animationType="slide"
        onBackdropPress={() => setShowBrixInputModal(false)}
        overlayStyle={{
          backgroundColor: 'transparent',
          elevation: 0,
          shadowOpacity: 0,
        }}>
        <LinearGradient colors={['#02AB97', '#26DE93']} style={styles.brixInputContainer}>
          <TextInput
            keyboardType="numeric"
            style={styles.brixInput}
            placeholder={brixValue ? brixValue.toString() : '12'}
            placeholderTextColor={TEXT_COLOR.WHITE}
            onEndEditing={(e) => {
              setShowBrixInputModal(false);
              setBrixValue(parseInt(e.nativeEvent.text));
            }}
          />
          <TextField
            text="Bx"
            color={TEXT_COLOR.WHITE}
            fontSize={scaleFont(20)}
            os={{
              marginTop: -1,
            }}
          />
        </LinearGradient>
      </Overlay>
    </Animated.View>
  );
};

export default FermentationStatus;
