import { Text, Image, Animated, View, Dimensions } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import ImageLinks from '../../assets/images';
import GearRotation from '../../components/GearRotation/GearRotation';
import { scaleHeight, scaleWidth } from '../../utils/scale';
import { styles } from './BeakerContainer.styles';

type Props = {
  percentageValue: number;
};

const BeakerContainer = ({ percentageValue }: Props) => {
  // const [containerHeight, setContainerHeight] = useState(0);

  // const containerRef = useRef<View>(null);

  // useEffect(() => {
  //   // Assuming you have a ref to the container view, you can measure it to get its height
  //   containerRef.current?.measure((x, y, width, height) => {
  //     setContainerHeight(height);
  //   });
  // }, []);
  // const fillHeight = containerHeight * (percentageValue / 100);
  return (
    <Animated.View style={styles.beakerContainer}>
      <Image
        source={ImageLinks.BEAKER_CONTAINER}
        style={styles.beakerImage}
        // onLayout={(event) => {
        //   const layout = event.nativeEvent.layout;
        //   console.log('height:', layout.height);
        //   console.log('width:', layout.width);
        //   console.log('x:', layout.x);
        //   console.log('y:', layout.y);
        // }}
      />
      {/* <View style={{ ...styles.beakerImage, position: 'absolute', bottom: 0, overflow: 'hidden' }}>
        <Image source={ImageLinks.BEAKER_CONTAINER} style={{ height: fillHeight, tintColor: 'blue' }} />
      </View> */}

      <Text style={styles.beakerPercentage}>{percentageValue.toFixed(0)}%</Text>
      <View style={styles.gearContainer}>
        <GearRotation gearHeight={scaleHeight(35)} gearWidth={scaleWidth(35)} left={5} />
        <GearRotation gearHeight={scaleHeight(39)} gearWidth={scaleHeight(39)} antiClockwise bottom={11} right={17} />
        <GearRotation gearHeight={scaleHeight(43)} gearWidth={scaleWidth(43)} bottom={20} left={2} />
      </View>
    </Animated.View>
  );
};

export default BeakerContainer;
