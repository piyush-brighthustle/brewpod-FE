import { StyleSheet } from 'react-native';
import { COLOR_PALETTE } from '../../types/enums';
import { scaleHeight, scaleMargin, scalePadding, scaleWidth } from '../../utils/scale';

const styles = StyleSheet.create({
  container: { backgroundColor: COLOR_PALETTE.SEASHELL, borderRadius: 50, padding: scalePadding(10) },
  button: { alignItems: 'center', marginTop: scaleMargin(10) },
  image: { width: scaleWidth(30), height: scaleHeight(30), marginRight: scaleMargin(10) },
  closeButton: { alignItems: 'center', marginTop: scaleMargin(10) },
});

export default styles;
