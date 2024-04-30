import { StyleSheet } from 'react-native';
import { COLOR_CODE } from '../../types/enums';
import { scaleFont, scaleHeight, scaleMargin, scaleWidth } from '../../utils/scale';

const styles = StyleSheet.create({
  buttonContainer: { alignItems: 'center', marginRight: scaleMargin(2), marginLeft: scaleMargin(5) },
  imageContainer: {
    borderWidth: 1,
    borderColor: COLOR_CODE.PRIMARY,
    borderRadius: 100,
    height: scaleHeight(30),
    width: scaleHeight(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: { width: scaleWidth(15), height: scaleHeight(15), objectFit: 'contain' },
  text: { fontSize: scaleFont(10), fontWeight: '400', color: COLOR_CODE.PRIMARY, marginTop: scaleMargin(5) },
});

export default styles;
