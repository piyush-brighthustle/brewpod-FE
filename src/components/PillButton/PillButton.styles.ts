import { StyleSheet } from 'react-native';
import { BACKGROUND_COLOR, TEXT_COLOR } from '../../types/enums';
import { scaleFont, scaleHeight, scaleWidth } from '../../utils/scale';

const styles = StyleSheet.create({
  pillButtonContainer: {
    backgroundColor: BACKGROUND_COLOR.BLACK,
    borderRadius: 100,
    height: scaleHeight(14),
    width: scaleWidth(140),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 20,
  },
  pillButtonText: {
    color: TEXT_COLOR.WHITE,
    fontSize: scaleFont(14),
    fontWeight: '700',
  },
  pillButtonImage: {
    height: scaleHeight(11),
    width: scaleWidth(11),
  },
});

export default styles;
