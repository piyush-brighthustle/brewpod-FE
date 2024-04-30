import { StyleSheet } from 'react-native';
import { scaleFont, scaleHeight, scaleMargin, scalePadding, scaleWidth } from '../../utils/scale';
import { COLOR_CODE, COLOR_PALETTE } from '../../types/enums';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    height: scaleHeight(200),
    width: scaleWidth(180),
  },
  contentContainer: {
    alignItems: 'flex-end',
    margin: scaleMargin(5),
  },
  iconContainer: {
    borderWidth: 1,
    borderColor: COLOR_CODE.PRIMARY,
    borderRadius: 100,
    height: scaleHeight(30),
    width: scaleHeight(30),
    justifyContent: 'center',
    alignItems: 'center',
    padding: scalePadding(15),
    backgroundColor: COLOR_PALETTE.SEASHELL,
    margin: scaleMargin(10),
  },
  draftIcon: {
    width: scaleWidth(15),
    height: scaleHeight(15),
    objectFit: 'contain',
  },
  imageBackgroundWithIngredients: {
    height: scaleHeight(200),
    width: '100%',
  },
  imageBackgroundWithoutIngredients: {
    height: scaleHeight(200),
    width: '100%',
    justifyContent: 'flex-end',
  },
  cardContainerWithIngredients: { alignItems: 'flex-start', marginTop: scaleMargin(18), width: scaleWidth(170) },
  cardContainerWithoutIngredients: { alignItems: 'flex-start', marginTop: scaleMargin(18), width: scaleWidth(170), marginBottom: scaleMargin(25) },
  abvWithIngredients: {
    height: scaleHeight(200),
    width: '100%',
    justifyContent: 'flex-end',
  },
  abvWithoutIngredients: {
    height: scaleHeight(200),
    width: '100%',
    justifyContent: 'flex-end',
  },
  abvText: {
    color: COLOR_PALETTE.SEASHELL,
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: COLOR_PALETTE.DRIFTWOOD,
    borderColor: COLOR_PALETTE.SEASHELL,
    textAlign: 'center',
    height: scaleHeight(25),
    textAlignVertical: 'center',
    paddingHorizontal: scalePadding(10),
    marginHorizontal: scaleMargin(20),
  },
  buyIngredientsContainer: { marginHorizontal: scaleMargin(5), height: '70%', justifyContent: 'flex-end', alignItems: 'center' },
  buyIngredientsText: {
    color: COLOR_PALETTE.DRIFTWOOD,
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: COLOR_PALETTE.SEASHELL,
    width: scaleWidth(140),
    borderColor: COLOR_PALETTE.DRIFTWOOD,
    textAlign: 'center',
    height: scaleHeight(32),
    textAlignVertical: 'center',
    fontSize: scaleFont(13),
  },
  createRecipeContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: scaleHeight(100),
    justifyContent: 'flex-end',
  },
  createRecipeButtonContainer: { alignItems: 'center', marginBottom: scaleMargin(30) },
  createRecipeButtonText: {
    fontSize: scaleFont(13),
    color: 'white',
    backgroundColor: 'black',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: scalePadding(30),
    paddingVertical: scalePadding(5),
  },
});

export default styles;
