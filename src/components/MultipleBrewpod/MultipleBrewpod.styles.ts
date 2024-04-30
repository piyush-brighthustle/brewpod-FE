import { StyleSheet } from 'react-native';
import { scaleMargin, scalePadding } from '../../utils/scale';
import { COLOR_PALETTE } from '../../types/enums';

const styles = StyleSheet.create({
  brewpodlistContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 120,
    marginHorizontal: scaleMargin(10),
    marginVertical: scaleMargin(3),
    shadowColor: COLOR_PALETTE.DRIFTWOOD,
    shadowRadius: 10,
  },
  brewpodStatus: {
    padding: scalePadding(5),
    borderRadius: 10,
  },
  container: { height: '100%', alignItems: 'center' },
  brewpodContainer: { margin: scaleMargin(20), backgroundColor: COLOR_PALETTE.SEASHELL, borderWidth: 1, borderColor: COLOR_PALETTE.APACHE, borderRadius: 10, padding: scalePadding(5) },
  brewText: {
    borderRadius: 20,
    paddingHorizontal: scalePadding(30),
    paddingVertical: scalePadding(5),
  },
});

export default styles;
