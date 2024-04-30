import { StyleSheet } from 'react-native';
import { BACKGROUND_COLOR, TEXT_COLOR } from '../../types/enums';
import { scaleFont, scaleHeight, scalePadding, scaleWidth } from '../../utils/scale';

const styles = StyleSheet.create({
  loginContainer: {
    minHeight: '100%',
    display: 'flex',
    backgroundColor: BACKGROUND_COLOR.PRIMARY,
    paddingHorizontal: scalePadding(15),
    paddingTop: scalePadding(10),
  },
  loginHeader: { display: 'flex', flexDirection: 'row', marginTop: 25, justifyContent: 'space-between', alignItems: 'center' },
  loginHeaderLineOne: { fontSize: scaleFont(14), fontWeight: '400', color: TEXT_COLOR.BLACK_1 },
  loginHeaderLineTwo: { fontSize: scaleFont(22), fontWeight: '700', color: TEXT_COLOR.BLACK_1 },
  loginFieldsContainer: { marginTop: 25, gap: 25 },
  loginORLine: { fontSize: scaleFont(18), fontWeight: '400', color: TEXT_COLOR.BLACK, textAlign: 'center', marginTop: scaleWidth(70) },
  loginSocialContainer: { display: 'flex', flexDirection: 'row', gap: 25, marginLeft: 'auto', marginRight: 'auto', marginTop: 20 },
  loginButton: { marginTop: 'auto', bottom: 20, width: '70%', height: scaleHeight(34) },
});

export default styles;
