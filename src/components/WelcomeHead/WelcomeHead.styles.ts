import { StyleSheet } from 'react-native';
import { BACKGROUND_COLOR } from '../../types/enums';
import { scaleFont, scaleHeight, scaleMargin, scaleWidth } from '../../utils/scale';

const styles = StyleSheet.create({
  welcomeBackContainer: {
    marginLeft: scaleMargin(5),
    marginTop: scaleMargin(15),
    marginBottom: scaleMargin(10),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  welcomeBack: {
    fontSize: scaleFont(13),
  },
  myBrewpod: {
    fontWeight: '700',
    color: BACKGROUND_COLOR.BLACK,
    fontSize: scaleFont(20),
  },
  logoutButton: {
    backgroundColor: BACKGROUND_COLOR.BLACK,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scaleMargin(18),
  },
});
export default styles;
