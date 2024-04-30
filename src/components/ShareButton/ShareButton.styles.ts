import { StyleSheet } from 'react-native';
import { TEXT_COLOR } from '../../types/enums';
import { scaleFont, scaleHeight, scalePadding, scaleWidth } from '../../utils/scale';

const styles = StyleSheet.create({
  shareButtonContainer: { gap: 5, display: 'flex', justifyContent: 'center', alignItems: 'center' },
  shareButtonBackground: { height: scaleHeight(29), width: scaleHeight(29), borderRadius: 100, justifyContent: 'center', alignItems: 'center', padding: scalePadding(5) },
  shareButtonImage: { marginRight: '10%', height: '100%', width: scaleWidth(14), objectFit: 'contain' },
  shareProgressText: {
    fontSize: scaleFont(10),
    fontWeight: '400',
    color: TEXT_COLOR.GRAY2,
    width: scaleWidth(40),
    textAlign: 'center',
  },
});

export default styles;
