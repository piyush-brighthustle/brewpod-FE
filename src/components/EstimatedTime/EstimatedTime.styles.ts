import { StyleSheet } from 'react-native';
import { COLOR_CODE, TEXT_COLOR } from '../../types/enums';
import { scaleFont, scaleWidth } from '../../utils/scale';

const styles = StyleSheet.create({
  estimatedTimeContainer: { marginHorizontal: 15, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10 },
  estimatedTimeImage: {
    height: '100%',
    width: scaleWidth(31),
    objectFit: 'contain',
    tintColor: COLOR_CODE.PRIMARY,
    marginTop: 4,
  },
  daysContainer: { display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 4 },
  estimatedTimeNumber: { fontSize: scaleFont(22), fontWeight: '600', color: TEXT_COLOR.DARK_BLUE },
  daysText: { fontSize: scaleFont(14), fontWeight: '600', color: TEXT_COLOR.DARK_BLUE, marginTop: 'auto', marginBottom: 3 },
  timeCompletionText: { fontSize: scaleFont(10), color: TEXT_COLOR.GRAY2, marginRight: 'auto' },
});

export default styles;
