import { StyleSheet } from 'react-native';
import { COLOR_CODE } from '../../types/enums';
import { scaleFont, scaleHeight, scalePadding, scaleWidth } from '../../utils/scale';

const styles = StyleSheet.create({
  backButtonContainer: { alignItems: 'center' },
  backImageContainer: {
    borderWidth: 1,
    borderColor: COLOR_CODE.PRIMARY,
    borderRadius: 100,
    height: scaleHeight(30),
    width: scaleHeight(30),
    justifyContent: 'center',
    alignItems: 'center',
    padding: scalePadding(15),
  },
  backImage: { width: scaleWidth(15), height: scaleHeight(15), objectFit: 'contain' },
  backText: { fontSize: scaleFont(10), fontWeight: '400', color: COLOR_CODE.PRIMARY },
});

export default styles;
