import { StyleSheet } from 'react-native';
import { TEXT_COLOR } from '../../types/enums';

const styles = StyleSheet.create({
  welcomeText: {
    color: TEXT_COLOR.BLACK_1,
    fontSize: 24,
    fontWeight: '600',
    letterSpacing: 0.7,
    textAlign: 'center',
    marginTop: 30,
  },
});

export default styles;
