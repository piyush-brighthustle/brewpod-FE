import { StyleSheet } from 'react-native';
import { scaleFont, scaleHeight, scalePadding } from '../../utils/scale';

const styles = StyleSheet.create({
  bottomTabContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    position: 'relative',
  },
  bottomTabGradient: {
    width: scaleHeight(25),
    height: scaleHeight(25),
    borderRadius: 100,
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
  bottomTabText: { width: '100%', fontSize: scaleFont(14) },
});

export default styles;
