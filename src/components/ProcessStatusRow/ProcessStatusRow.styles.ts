import { StyleSheet } from 'react-native';
import { COLOR_CODE, TEXT_COLOR } from '../../types/enums';
import { scaleFont, scaleHeight, scaleMargin, scalePadding } from '../../utils/scale';

const styles = StyleSheet.create({
  processName: {
    fontSize: scaleFont(14),
    color: TEXT_COLOR.BLACK_1,
    fontWeight: '400',
    width: '80%',
  },
  processDoneImage: {
    height: scaleHeight(25),
    width: scaleHeight(25), // Keeping scaleHeight() for width, so that both height and width are same of an element.
  },
  processNotStarted: {
    height: scaleHeight(13),
    width: scaleHeight(13), // Keeping scaleHeight() for width, so that both height and width are same of an element.
    borderRadius: 100,
  },
  processStatusContainer: { paddingVertical: scalePadding(10) },
  prcessStatusRow: { display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  processSeperator: { backgroundColor: 'gray', opacity: 0.2, height: scaleHeight(1) },
  progressPercentage: { color: COLOR_CODE.PRIMARY, position: 'absolute', right: scaleMargin(30), fontSize: scaleFont(12), fontWeight: '600', width: 33 },
});

export default styles;
