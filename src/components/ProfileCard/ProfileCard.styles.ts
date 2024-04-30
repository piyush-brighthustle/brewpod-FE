import { StyleSheet } from 'react-native';
import { BACKGROUND_COLOR, COLOR_CODE, COLOR_PALETTE, TEXT_COLOR } from '../../types/enums';
import { scaleFont, scaleHeight, scaleMargin, scalePadding, scaleWidth } from '../../utils/scale';

const styles = StyleSheet.create({
  imageBackgroundContainer: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  imageBackground: {
    flex: 1,
    paddingHorizontal: scalePadding(15),
    paddingTop: scalePadding(10),
    paddingBottom: scalePadding(10),
  },
  profileCardTop: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: scaleMargin(20),
  },
  profileCardTopInput: {
    flex: 1,
    fontSize: scaleFont(24),
    color: TEXT_COLOR.BLACK,
    fontWeight: '600',
    marginTop: scaleMargin(-20),
    marginLeft: scaleMargin(-4),
  },
  profileCardTopField: {
    flex: 1,
    marginBottom: scaleMargin(10),
  },
  lagerCardsContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
  },
  addPictureContainer: {
    position: 'absolute',
    bottom: 6,
    right: 12,
    gap: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addPictureImageContainer: {
    height: scaleHeight(30),
    width: scaleHeight(30),
    borderWidth: 1,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: BACKGROUND_COLOR.BLACK,
  },
  addPictureImage: {
    marginLeft: 1,
    height: scaleHeight(14),
    width: scaleWidth(14),
    objectFit: 'contain',
  },
  addPictureText: {
    textAlign: 'center',
    maxWidth: 30,
  },
  brewLagerContentContainer: {
    borderWidth: 0.5,
    borderColor: BACKGROUND_COLOR.WHITE,
    padding: scalePadding(5),
    paddingHorizontal: scalePadding(10),
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  brewLagerStarsContainer: {
    padding: scalePadding(3),
    display: 'flex',
    flexDirection: 'row',
    gap: 2,
  },
  userProfileContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  renderEdittingButton: { marginTop: scaleMargin(-7), marginRight: scaleMargin(-10) },
  renderEditButton: { marginTop: scaleMargin(-5), marginRight: scaleMargin(-7) },
  renderProfileCollapsedButton: {
    marginLeft: scaleMargin(15),
    fontSize: scaleFont(13),
    color: COLOR_PALETTE.SEASHELL,
  },
  collapseProfileContainer: {
    backgroundColor: COLOR_CODE.COMPLEMENTARY,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    padding: scalePadding(4),
  },
  notLoggedContainer: { fontWeight: '500', color: COLOR_PALETTE.SEASHELL, fontSize: scaleFont(20) },
});
export default styles;
