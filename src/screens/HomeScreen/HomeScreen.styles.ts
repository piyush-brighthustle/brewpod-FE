import { StyleSheet } from 'react-native';
import { scalePadding } from '../../utils/scale';
import { BACKGROUND_COLOR } from '../../types/enums';

const styles = StyleSheet.create({
  homeContainer: { flex: 1, backgroundColor: BACKGROUND_COLOR.PRIMARY, paddingTop: scalePadding(10) },
});
export default styles;
