import { StyleSheet } from 'react-native';
import { scaleFont, scaleHeight, scaleMargin, scaleWidth } from '../../utils/scale';
import { TEXT_COLOR } from '../../types/enums';

export const styles = StyleSheet.create({
  beakerContainer: { display: 'flex', flex: 1, justifyContent: 'center', flexDirection: 'row', marginTop: scaleMargin(12), position: 'relative' },
  beakerImage: { height: scaleHeight(249), width: scaleWidth(120), objectFit: 'contain', marginTop: 50 },
  beakerPercentage: { position: 'absolute', color: TEXT_COLOR.WHITE, fontSize: scaleFont(25), fontWeight: 'bold', marginTop: scaleMargin(180) },
  gearContainer: { position: 'absolute', top: 310 },
});
