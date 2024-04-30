import { StyleSheet } from 'react-native';
import { BACKGROUND_COLOR, COLOR_CODE, COLOR_PALETTE, TEXT_COLOR } from '../../types/enums';
import { scaleFont, scaleHeight, scaleMargin, scalePadding, scaleWidth } from '../../utils/scale';

const styles = StyleSheet.create({
  container: { marginHorizontal: scaleMargin(10) },
  spaceBetween: { flexDirection: 'row', justifyContent: 'space-between' },
  accordianHeader: { fontSize: scaleFont(18), fontWeight: '700', color: COLOR_PALETTE.DRIFTWOOD, alignSelf: 'center' },
  totalQuantity: { alignSelf: 'center' },
  itemName: { height: scaleHeight(25), color: COLOR_PALETTE.DRIFTWOOD, fontSize: scaleFont(12), textAlignVertical: 'center' },
  inputContainer: { flexDirection: 'row' },
  input: { height: scaleHeight(25), padding: scalePadding(1), color: COLOR_PALETTE.DRIFTWOOD, fontSize: scaleFont(13), textAlignVertical: 'center', textAlign: 'center' },
  inputSuffix: { textAlignVertical: 'center', marginLeft: scaleMargin(5) },
});

export default styles;
