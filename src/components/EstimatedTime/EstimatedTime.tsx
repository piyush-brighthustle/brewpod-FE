import { View, Text, Image } from 'react-native';
import React from 'react';
import ImageLinks from '../../assets/images';
import styles from './EstimatedTime.styles';

const EstimatedTime = () => {
  return (
    <View style={styles.estimatedTimeContainer}>
      <Image source={ImageLinks.TIMER} style={styles.estimatedTimeImage} />

      <View>
        <View style={styles.daysContainer}>
          <Text style={styles.estimatedTimeNumber}>20</Text>
          <Text style={styles.daysText}>days</Text>
        </View>

        <Text style={styles.timeCompletionText}>Estimated time of completion</Text>
      </View>
    </View>
  );
};

export default EstimatedTime;
