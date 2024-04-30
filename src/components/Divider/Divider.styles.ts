import { StyleSheet } from 'react-native';
import { BACKGROUND_COLOR } from '../../types/enums';
import { scaleMargin } from '../../utils/scale';

const styles = StyleSheet.create({
  divider: { borderBottomColor: BACKGROUND_COLOR.BLACK, borderBottomWidth: 0.2, marginVertical: scaleMargin(25) },
});

export default styles;
