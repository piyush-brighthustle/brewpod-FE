import { StyleSheet } from 'react-native';
import { BACKGROUND_COLOR, TEXT_COLOR } from '../../types/enums';
import { scaleFont, scalePadding } from '../../utils/scale';

const styles = StyleSheet.create({
  brewpodConnectContainer: {
    minHeight: '100%',
    display: 'flex',
    backgroundColor: BACKGROUND_COLOR.PRIMARY,
    paddingHorizontal: scalePadding(15),
    paddingTop: scalePadding(10),
  },
  brewpodConnectHeader: { display: 'flex', flexDirection: 'row', marginTop: 25, justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 },
  brewpodConnectHeaderLineOne: { fontSize: scaleFont(14), fontWeight: '400', color: TEXT_COLOR.BLACK_1 },
  brewpodConnectHeaderLineTwo: { fontSize: scaleFont(22), fontWeight: '700', color: TEXT_COLOR.BLACK_1 },
});

export default styles;
