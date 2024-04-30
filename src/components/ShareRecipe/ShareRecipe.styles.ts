import { StyleSheet } from 'react-native';
import { scaleFont, scaleHeight, scaleMargin, scalePadding, scaleWidth } from '../../utils/scale';
import { BACKGROUND_COLOR, COLOR_PALETTE } from '../../types/enums';

const styles = StyleSheet.create({
  Container: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', margin: scaleMargin(15), marginHorizontal: scaleMargin(20) },
  textUp: { fontSize: scaleFont(15), fontWeight: '400' },
  textDown: { fontWeight: '700', fontSize: scaleFont(20) },
  shareMedia: {
    backgroundColor: COLOR_PALETTE.SEASHELL,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: scalePadding(30),
    paddingVertical: scalePadding(5),
    borderColor: COLOR_PALETTE.APACHE,
    shadowOffset: { width: scaleWidth(-2), height: scaleHeight(4) },
    shadowOpacity: 0.9,
    shadowRadius: 3,
    elevation: 6,
  },
  shareText: { fontSize: scaleFont(20), fontWeight: '700' },
  mediaIcons: { display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', gap: 30 },
  imageContainer: { justifyContent: 'center', alignItems: 'center' },
  imgBG: { borderRadius: 15, overflow: 'hidden', marginLeft: scaleMargin(40), width: '100%' },
  imgBGText: { backgroundColor: COLOR_PALETTE.APACHE, width: scaleWidth(150), borderRadius: 15, padding: scalePadding(10) },
  drinkHeaderText: { color: COLOR_PALETTE.SEASHELL, fontSize: scaleFont(20) },
  drinkDetail: { color: COLOR_PALETTE.SEASHELL, marginVertical: scaleMargin(20), marginBottom: scaleMargin(70) },
  postButtonContainer: { marginVertical: scaleMargin(25), borderRadius: 20, backgroundColor: BACKGROUND_COLOR.BLACK },
  postText: { color: COLOR_PALETTE.SEASHELL, paddingHorizontal: scalePadding(100), paddingVertical: scalePadding(8), fontSize: scaleFont(14) },
});

export default styles;
