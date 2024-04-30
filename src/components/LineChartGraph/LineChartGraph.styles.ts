import { StyleSheet } from 'react-native';
import { BACKGROUND_COLOR, COLOR_PALETTE } from '../../types/enums';
import { scaleFont, scaleMargin } from '../../utils/scale';

const styles = StyleSheet.create({
  container: { backgroundColor: COLOR_PALETTE.SEASHELL, borderRadius: 16, marginTop: scaleMargin(15), borderColor: COLOR_PALETTE.APACHE, borderWidth: 1 },
  headerFirst: { marginHorizontal: scaleMargin(20), marginTop: scaleMargin(10), color: BACKGROUND_COLOR.BLACK1, fontSize: scaleFont(12) },
  headerSecond: { marginHorizontal: scaleMargin(20), color: COLOR_PALETTE.DRIFTWOOD, fontSize: scaleFont(18) },
  verticalGraphTextContainer: { flex: 1, alignItems: 'flex-end', justifyContent: 'flex-end' },
  verticalGraphText: { transform: [{ rotate: '-90deg' }] },
  horizontalGraphText: { marginHorizontal: scaleMargin(50), color: BACKGROUND_COLOR.BLACK1, fontSize: scaleFont(12), marginBottom: scaleMargin(10) },
  spaceBetween: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between' },
});
export default styles;
