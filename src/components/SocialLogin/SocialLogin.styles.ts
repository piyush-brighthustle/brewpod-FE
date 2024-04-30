import { StyleSheet } from 'react-native';
import { BACKGROUND_COLOR, TEXT_COLOR } from '../../types/enums';
import { scaleFont, scaleHeight, scaleWidth } from '../../utils/scale';

const styles = StyleSheet.create({
  socialLoginContainer: { alignItems: 'center', gap: 10 },
  socialLoginImageContainer: {
    borderWidth: 1,
    borderColor: BACKGROUND_COLOR.BLACK,
    height: scaleHeight(78),
    width: scaleHeight(78), // Keeping scaleHeight() for width, so that both height and width are same of an element.
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },
  socialLoginImage: { width: scaleWidth(40), height: scaleHeight(40), objectFit: 'contain' },
  socialLoginName: { fontSize: scaleFont(14), fontWeight: '400', color: TEXT_COLOR.BLACK },
});

export default styles;
