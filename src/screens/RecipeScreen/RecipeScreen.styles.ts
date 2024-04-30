import { StyleSheet } from 'react-native';
import { scaleFont, scaleMargin, scalePadding } from '../../utils/scale';
import { BACKGROUND_COLOR, COLOR_PALETTE } from '../../types/enums';

const styles = StyleSheet.create({
  recipesContainer: { flex: 1, backgroundColor: BACKGROUND_COLOR.PRIMARY, paddingTop: scalePadding(10) },
  Container: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 25 },
  textContainer: { position: 'absolute', top: 8, left: 12 },
  textUp: { fontSize: scaleFont(15), fontWeight: '400' },
  textDown: { fontWeight: '700', fontSize: scaleFont(20), color: BACKGROUND_COLOR.BLACK },
  customSearchContainerStyles: {
    backgroundColor: COLOR_PALETTE.SEASHELL,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: COLOR_PALETTE.DRIFTWOOD,
    color: BACKGROUND_COLOR.BLACK,
  },
  liquorListContainer: { marginTop: scalePadding(15) },
  gridItem: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    margin: scaleMargin(5),
  },
  searchContainer: { marginTop: scalePadding(15) },
  listContainer: { marginTop: scalePadding(5) },
  listText: { fontSize: scaleFont(14), fontWeight: '700', color: BACKGROUND_COLOR.BLACK, marginLeft: scaleMargin(10) },
});

export default styles;
