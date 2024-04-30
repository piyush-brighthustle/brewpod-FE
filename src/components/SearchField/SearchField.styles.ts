import { StyleSheet } from 'react-native';
import { scaleFont, scaleHeight, scalePadding } from '../../utils/scale';
import { BACKGROUND_COLOR } from '../../types/enums';
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: scaleHeight(40),
    borderColor: '#ccc',
    borderRadius: 4,
    padding: scalePadding(10),
    justifyContent: 'center',
  },
  input: {
    height: scaleHeight(40),
    borderColor: '#ccc',
    borderRadius: 4,
    padding: scalePadding(10),
    fontSize: scaleFont(16),
    color: BACKGROUND_COLOR.BLACK,
  },
  searchIcon: { alignSelf: 'center' },
  spaceBetween: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between' },
});
export default styles;
