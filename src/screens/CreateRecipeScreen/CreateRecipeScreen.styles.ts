import { StyleSheet } from 'react-native';
import { scaleFont, scaleHeight, scaleMargin, scalePadding, scaleWidth } from '../../utils/scale';
import { BACKGROUND_COLOR, COLOR_PALETTE } from '../../types/enums';

const styles = StyleSheet.create({
  Container: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', margin: scaleMargin(15) },
  textUp: { fontSize: scaleFont(15), fontWeight: '400', color: COLOR_PALETTE.SEASHELL },
  textDown: { fontWeight: '700', fontSize: 25, color: COLOR_PALETTE.SEASHELL },
  addPhotoContainer: { height: scaleHeight(200), borderColor: COLOR_PALETTE.SEASHELL, borderWidth: 2, margin: scaleMargin(10), borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  addPhotoImage: { height: scaleHeight(25), width: scaleWidth(25) },
  drinkInfoContainer: {
    backgroundColor: COLOR_PALETTE.SEASHELL,
    padding: scalePadding(12),
    borderRadius: 12,
    margin: scaleMargin(10),
    shadowColor: COLOR_PALETTE.DRIFTWOOD,
    shadowOffset: { width: scaleWidth(-2), height: scaleHeight(4) },
    shadowOpacity: 0.9,
    shadowRadius: 3,
    elevation: 6,
  },
  drinkInfoContainerMarginDown: { marginBottom: scaleMargin(15) },
  ft700: { fontWeight: '700' },
  moreAndQuantityContainer: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: scaleMargin(10) },
  moreAndQuantityTextCont: { display: 'flex', flexDirection: 'row', gap: 10, marginLeft: scaleMargin(15) },
  moreAndQuantityText: { borderRadius: 20, borderWidth: 1, borderColor: 'black', paddingHorizontal: scalePadding(10), alignSelf: 'center' },
  moreIcon: { marginHorizontal: scaleMargin(15), alignSelf: 'center' },
  ingredientsText: { marginLeft: scaleMargin(15), marginVertical: scaleMargin(15) },
  subListContainer: { padding: scalePadding(10) },
  subListText: { fontSize: scaleFont(13), borderColor: 'black', paddingBottom: scalePadding(5), marginLeft: scaleMargin(10) },
  labelContainer: { borderTopWidth: 2, padding: scalePadding(10), borderColor: COLOR_PALETTE.APACHE },
  labelButton: { display: 'flex', flexDirection: 'row', gap: 20 },
  labelImage: { alignSelf: 'center' },
  labelText: { color: COLOR_PALETTE.APACHE },
  detailContainer: {
    height: scaleHeight(40),
    justifyContent: 'flex-end',
    marginBottom: scaleMargin(20),
  },
  detailText: {
    fontSize: scaleFont(16),
    color: 'black',
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
});

export default styles;
