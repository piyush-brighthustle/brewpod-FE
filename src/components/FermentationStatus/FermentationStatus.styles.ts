import { StyleSheet } from 'react-native';
import { COLOR_CODE, TEXT_COLOR } from '../../types/enums';
import { scaleFont, scaleHeight, scaleMargin, scalePadding } from '../../utils/scale';

const styles = StyleSheet.create({
  fermentationContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  machineImage: {
    objectFit: 'contain',
  },
  text: {
    fontWeight: '400',
    color: TEXT_COLOR.BLACK,
    textAlign: 'center',
    width: 150,
  },
  liftImage: {
    height: scaleHeight(50),
    objectFit: 'contain',
    marginTop: 20,
  },
  brixContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: scaleMargin(30),
  },
  brixInputContainer: {
    padding: scalePadding(10),
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  brixInput: {
    padding: 0,
    paddingHorizontal: scalePadding(10),
    color: TEXT_COLOR.WHITE,
    fontSize: scaleFont(20),
  },
  brixButton: {
    width: 150,
    height: 40,
    marginTop: -5,
    backgroundColor: COLOR_CODE.PRIMARY,
  },
});

export default styles;
