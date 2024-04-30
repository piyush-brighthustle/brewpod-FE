import { StyleSheet } from 'react-native';
import { scaleHeight, scaleWidth } from '../../utils/scale';

const styles = StyleSheet.create({
  logo: {
    height: scaleHeight(55),
    width: scaleWidth(155),
    objectFit: 'contain',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 20,
  },
});

export default styles;
