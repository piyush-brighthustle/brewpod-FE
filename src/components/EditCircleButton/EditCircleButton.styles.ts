import { StyleSheet } from 'react-native';
import { COLOR_CODE } from '../../types/enums';
import { scaleFont, scaleHeight, scaleMargin, scalePadding, scaleWidth } from '../../utils/scale';

const styles = StyleSheet.create({
  editButtonContainer: { alignItems: 'center', marginRight: scaleMargin(10) },
  editImageContainer: {
    borderWidth: 1,
    borderColor: COLOR_CODE.PRIMARY,
    borderRadius: 100,
    height: scaleHeight(30),
    width: scaleHeight(30),
    justifyContent: 'center',
    alignItems: 'center',
    padding: scalePadding(15),
  },
  editImage: { width: scaleWidth(15), height: scaleHeight(15), objectFit: 'contain' },
  editText: { fontSize: scaleFont(8), fontWeight: '400', color: COLOR_CODE.PRIMARY, marginTop: scaleMargin(5) },
});

export default styles;
