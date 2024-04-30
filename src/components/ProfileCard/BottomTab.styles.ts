import { StyleSheet } from 'react-native';
import { COLOR_CODE } from '../../types/enums';
import { scaleHeight, scaleMargin, scalePadding } from '../../utils/scale';

const styles = StyleSheet.create({
  bottomTabContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    position: 'relative',
    marginTop: scaleMargin(5),
  },
  bottomTabGradient: {
    width: scaleHeight(25),
    height: scaleHeight(25),
    borderradius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.7,
    padding: scalePadding(5),
  },
  bottomTabImage: {
    position: 'absolute',
    height: scaleHeight(28),
    width: scaleHeight(28),
  },
  bottomTabActiveIndicator: {
    marginBottom: scaleMargin(-70),
    width: scaleHeight(80),
    height: scaleHeight(70),
    backgroundColor: COLOR_CODE.PRIMARY,
    borderradius: 10,
  },
});

export default styles;
