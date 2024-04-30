import { StyleSheet } from 'react-native';
import { scaleHeight, scaleMargin, scalePadding, scaleWidth } from '../../utils/scale';

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#efefef',
    height: scaleHeight(50),
    zIndex: 1,
  },
  buttonText: {
    flex: 1,
    textAlign: 'center',
  },
  icon: {
    marginRight: scaleMargin(10),
  },
  dropdown: {
    position: 'absolute',
    backgroundColor: '#fff',
    shadowColor: '#000000',
    shadowRadius: 4,
    shadowOffset: { height: scaleHeight(4), width: scaleWidth(10) },
    shadowOpacity: 0.5,
    alignSelf: 'center',
    width: scaleWidth(10),
  },
  overlay: {
    width: '100%',
    height: '100%',
  },
  item: {
    paddingHorizontal: scalePadding(10),
    paddingVertical: scalePadding(10),
    borderBottomWidth: 1,
  },
});

export default styles;
