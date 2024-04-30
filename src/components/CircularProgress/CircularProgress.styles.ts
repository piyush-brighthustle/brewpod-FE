import { StyleSheet } from 'react-native';
import { scaleFont } from '../../utils/scale';
import { COLOR_CODE, TEXT_COLOR } from '../../types/enums';

const styles = StyleSheet.create({
  circularProgressContainer: { position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' },
  timerContainer: { display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  timerHeader: { fontSize: scaleFont(11), color: TEXT_COLOR.BLACK },
  timerText: { fontSize: scaleFont(26), color: COLOR_CODE.PRIMARY, fontWeight: '700' },
});

export default styles;
