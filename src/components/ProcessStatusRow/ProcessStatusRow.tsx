import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import styles from './ProcessStatusRow.styles';
import ImageLinks from '../../assets/images';
import LinearGradient from 'react-native-linear-gradient';
import CircularProgress from '../../components/CircularProgress/CircularProgress';
import { scaleHeight } from '../../utils/scale';

type Props = {
  name: string;
  progress: number;
};

const ProcessStatusRow = ({ name, progress }: Props) => {
  const StatusProgress = () => (
    <View style={{ alignItems: 'center', width: 30 }}>
      {progress === 100 ? (
        <Image source={ImageLinks.GOLDEN_DONE} style={styles.processDoneImage} />
      ) : progress === 0 ? (
        <LinearGradient colors={['#DDE0DF', '#ABABAB']} style={styles.processNotStarted} />
      ) : (
        <View style={{ position: 'relative', justifyContent: 'center', alignItems: 'center' }}>
          <CircularProgress percentage={progress} radius={scaleHeight(15)} strokeWidth={scaleHeight(6)} />
          <Text style={styles.progressPercentage}>{progress}%</Text>
        </View>
      )}
    </View>
  );

  return (
    <TouchableOpacity>
      <View style={styles.processStatusContainer}>
        <View style={styles.prcessStatusRow}>
          <Text style={styles.processName}>{name}</Text>

          <StatusProgress />
        </View>
      </View>

      <View style={styles.processSeperator} />
    </TouchableOpacity>
  );
};

export default ProcessStatusRow;
