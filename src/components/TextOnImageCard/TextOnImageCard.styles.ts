import { StyleSheet } from 'react-native';
import { scaleFont, scaleHeight, scaleMargin } from '../../utils/scale';
import { COLOR_PALETTE } from '../../types/enums';

const styles = StyleSheet.create({
  textOnImageContainer: { position: 'relative', marginTop: scaleMargin(15), width: '100%', marginLeft: 'auto', marginRight: 'auto' },
  bgImage: { width: '100%', height: scaleHeight(120), borderRadius: 10 },
  bgImage2: { height: scaleHeight(110), width: '55%', position: 'absolute', borderTopLeftRadius: 20, borderBottomLeftRadius: 20 },
  textContainer: { position: 'absolute', top: 8, left: 12 },
  text: { fontSize: scaleFont(22), fontWeight: '300', color: COLOR_PALETTE.SEASHELL },
});

export default styles;
