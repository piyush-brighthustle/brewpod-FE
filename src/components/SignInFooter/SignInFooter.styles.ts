import { StyleSheet } from 'react-native';
import { TEXT_COLOR } from '../../types/enums';

const styles = StyleSheet.create({
  footer: {
    width: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  footerText: {
    fontSize: 14,
    fontWeight: '400',
    color: TEXT_COLOR.BLACK_1,
    textAlign: 'center',
  },
});

export default styles;
