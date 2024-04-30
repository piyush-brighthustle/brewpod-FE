import { StyleSheet } from 'react-native';
import { BACKGROUND_COLOR, COLOR_CODE } from '../../types/enums';
import { scaleHeight, scaleMargin, scalePadding, scaleWidth } from '../../utils/scale';

const styles = StyleSheet.create({
  brewCardContainer: {
    display: 'flex',
    backgroundColor: BACKGROUND_COLOR.WHITE,
    padding: scalePadding(12),
    paddingTop: scalePadding(7),
    borderRadius: 12,
    margin: scaleMargin(5),
    marginHorizontal: scaleMargin(15),
    justifyContent: 'space-between',
    shadowColor: COLOR_CODE.PRIMARY,
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.9,
    shadowRadius: 3,
    elevation: 6,
  },
  brewCardTop: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ratingCard: {
    backgroundColor: BACKGROUND_COLOR.LIGHT_GOLD,
    display: 'flex',
    flexDirection: 'row',
    gap: 4,
    paddingVertical: 3,
    paddingRight: 8,
    paddingLeft: 3,
    alignItems: 'center',
    borderRadius: 100,
  },
  ratingCardImage: {
    height: scaleHeight(20),
    width: scaleWidth(20),
    resizeMode: 'contain',
  },
});

export default styles;
