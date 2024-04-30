import { StyleSheet } from 'react-native';
import { BACKGROUND_COLOR, TEXT_COLOR } from '../../types/enums';
import { scaleFont, scalePadding } from '../../utils/scale';

const defaultHorizontalMargin = scalePadding(15);

const styles = StyleSheet.create({
  beakerContainer: { flex: 1, backgroundColor: BACKGROUND_COLOR.PRIMARY, paddingTop: scalePadding(10) },
  lineOne: { fontSize: scaleFont(15), color: TEXT_COLOR.BLACK_1, marginHorizontal: defaultHorizontalMargin, marginTop: 25 },
  lineTwo: { fontSize: scaleFont(22), color: TEXT_COLOR.BLACK_1, marginHorizontal: defaultHorizontalMargin, fontWeight: 'bold' },
});

export default styles;
