import { StyleSheet } from 'react-native';
import { TEXT_COLOR } from '../../types/enums';
import { scaleFont } from '../../utils/scale';

const styles = StyleSheet.create({
  loginFieldContainer: {
    display: 'flex',
  },
  loginFieldName: { fontSize: scaleFont(14), fontWeight: '400', color: TEXT_COLOR.BLACK },
  loginFieldInputContainer: { borderBottomWidth: 1, borderBottomColor: TEXT_COLOR.GRAY2 },
  loginFieldInput: {
    fontSize: scaleFont(18),
    marginTop: -5,
    marginBottom: -10,
    color: TEXT_COLOR.BLACK
  },
});

export default styles;
