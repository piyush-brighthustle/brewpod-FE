import TextField from '../../components/TextField/TextField';
import ImageLinks from '../../assets/images';
import { DrinkCard } from '../../components/DrinkCard/DrinkCard';
import React from 'react';
import { View, Text, ImageSourcePropType } from 'react-native';
import { STRINGS } from '../../types/strings';
import { scaleFont } from '../../utils/scale';
import { dummyData } from '../../utils/data';
import styles from './SavedDraft.styles';

const SavedDraft = () => {
  return (
    <View>
      <View style={styles.textContainer}>
        <TextField text={`${STRINGS.MY} ${STRINGS.SAVED}`} fontSize={scaleFont(21)} os={{ fontWeight: '700' }} />
        <TextField text={`${STRINGS.DRAFTS}`} fontSize={scaleFont(21)} os={{ fontWeight: '400' }} />
      </View>
      <DrinkCard data={dummyData} draft={true} />
    </View>
  );
};

export default SavedDraft;
