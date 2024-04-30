import { StyleSheet } from 'react-native';
import { scaleFont, scaleHeight, scaleMargin } from '../../utils/scale';
import { BACKGROUND_COLOR, COLOR_PALETTE } from '../../types/enums';

const styles = StyleSheet.create({
  spaceBetween: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between' },
  textContainer: { marginLeft: scaleMargin(10) },
  headerText: { fontSize: scaleFont(20), color: BACKGROUND_COLOR.BLACK, fontWeight: '700' },
  subHeaderText: { fontSize: scaleFont(20), color: BACKGROUND_COLOR.BLACK },
  alignRow: { display: 'flex', flexDirection: 'row' },
});
export default styles;
