import { StyleSheet } from 'react-native';
import { BACKGROUND_COLOR, TEXT_COLOR } from '../../types/enums';
import { scaleFont, scalePadding } from '../../utils/scale';

const styles = StyleSheet.create({
  bgImage: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: scalePadding(20),
  },
});

export default styles;
