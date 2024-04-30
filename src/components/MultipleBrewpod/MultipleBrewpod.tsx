import React, { useState } from 'react';
import { Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from 'navigator/RootNavigator';
import LinearGradient from 'react-native-linear-gradient';
import { BACKGROUND_COLOR, COLOR_PALETTE } from '../../types/enums';
import styles from './MultipleBrewpod.styles';
import TextField from '../../components/TextField/TextField';
import { STRINGS } from '../../types/strings';
import { scaleFont } from '../../utils/scale';
import Divider from '../../components/Divider/Divider';
import { brewPodList } from '../../utils/data';

export type BrewpodConnectScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'MultipleBrewpod'>;

const MultipleBrewpod = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleBrewpodClick = (id: number) => {
    if (selectedId === id) {
      setSelectedId(null);
    } else {
      setSelectedId(id);
    }
  };
  const BrewPods = () =>
    brewPodList.map((item, index) => (
      <>
        <TouchableOpacity key={item.id} onPress={() => handleBrewpodClick(item.id)} disabled={item.status === 'Busy'}>
          <View style={{ backgroundColor: selectedId === item?.id ? COLOR_PALETTE.APACHE : COLOR_PALETTE.TRANSPARENT, borderRadius: 10 }}>
            <View style={styles.brewpodlistContainer}>
              <TextField fontSize={scaleFont(16)} text={`${item.name} ${item.id}`} />
              <Text style={[styles.brewpodStatus, { backgroundColor: selectedId === item.id ? COLOR_PALETTE.GREENISH_TEAL : COLOR_PALETTE.SEASHELL, borderWidth: selectedId !== item.id ? 0.5 : 0 }]}>
                {selectedId === item.id ? 'Selected' : item.status}
              </Text>
            </View>
          </View>
          {index !== brewPodList.length - 1 && <Divider borderColor={BACKGROUND_COLOR.BLACK} marginVertical={3} width={0.2} />}
        </TouchableOpacity>
      </>
    ));
  return (
    <SafeAreaView>
      <View>
        <LinearGradient colors={[COLOR_PALETTE.TRANSPARENT, COLOR_PALETTE.APACHE]} style={styles.container}>
          <View style={styles.brewpodContainer}>
            <BrewPods />
          </View>
          <TouchableOpacity>
            <Text
              style={[
                styles.brewText,
                { backgroundColor: !selectedId ? COLOR_PALETTE.SEASHELL : BACKGROUND_COLOR.BLACK, color: !selectedId ? BACKGROUND_COLOR.BLACK : COLOR_PALETTE.SEASHELL },
              ]}>{`${STRINGS.LETS} ${STRINGS.BREW}`}</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </SafeAreaView>
  );
};

export default MultipleBrewpod;
