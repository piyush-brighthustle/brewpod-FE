import { StyleSheet } from 'react-native';
import { scaleFont, scaleMargin, scalePadding } from '../../utils/scale';
import { COLOR_PALETTE, TEXT_COLOR } from '../../types/enums';

const styles = StyleSheet.create({
  brewPodContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: scaleMargin(3) },
  boldHeader: {
    marginTop: scaleMargin(10),
    fontWeight: '700',
    fontSize: scaleFont(20),
    color: TEXT_COLOR.BLACK,
  },
  deviceButton: {
    paddingVertical: scalePadding(5),
    paddingHorizontal: scalePadding(10),
    borderRadius: 10,
    alignItems: 'flex-start',
    paddingRight: scalePadding(100),
  },
  deviceButton1Text1: {
    color: COLOR_PALETTE.SEASHELL,
    fontSize: scaleFont(14),
    marginTop: scaleMargin(5),
  },
  deviceButton1Text2: {
    color: COLOR_PALETTE.SEASHELL,
    fontWeight: '700',
    fontSize: scaleFont(20),
  },
  deviceButton2Text1: {
    color: TEXT_COLOR.BLACK,
    fontSize: scaleFont(14),
    marginTop: scaleMargin(5),
  },
  deviceButton2Text2: {
    color: TEXT_COLOR.BLACK,
    fontWeight: '700',
    fontSize: scaleFont(20),
  },
  deviceButton2: {
    borderColor: COLOR_PALETTE.GREENISH_TEAL,
    borderRadius: 10,
    paddingVertical: scalePadding(5),
    paddingHorizontal: scalePadding(10),
    borderWidth: 1,
    paddingRight: scalePadding(100),
  },
});
export default styles;
