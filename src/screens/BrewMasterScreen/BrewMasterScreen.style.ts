import { StyleSheet } from 'react-native';
import { scaleFont, scaleHeight, scalePadding } from '../../utils/scale';
import { BACKGROUND_COLOR } from '../../types/enums';

const defaultHorizontalMargin = scalePadding(15);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: BACKGROUND_COLOR.PRIMARY, paddingTop: scalePadding(10) },
  headerContainer: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: defaultHorizontalMargin, marginTop: 25 },
  cardImageStyle: {
    height: scaleHeight(90),
  },
  textContainer: { position: 'absolute', top: 8, left: 12 },
  textUp: { fontSize: scaleFont(15), fontWeight: '400' },
  textDown: { fontWeight: '700', fontSize: scaleFont(22), color: BACKGROUND_COLOR.BLACK },
});

export default styles;
