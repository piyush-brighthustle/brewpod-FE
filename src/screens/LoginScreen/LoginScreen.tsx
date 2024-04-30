import { View, Text, ScrollView, TouchableOpacity, Button, Alert, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from './LoginScreen.styles';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ImageLinks from '../../assets/images';
import LoginField from '../../components/LoginField/LoginField';
import PillButton from '../../components/PillButton/PillButton';
import AppLogo from '../../components/AppLogo/AppLogo';
import SocialLogin from '../../components/SocialLogin/SocialLogin';
import MainContainer from '../../components/MainContainer/MainContainer';
import { STRINGS } from '../../types/strings';
import CircleButton from '../../components/CircleButton/CircleButton';
import { loginUser } from '../../utils/loginHelper';
import { useDispatch } from 'react-redux';
import { setUser } from '../../slices/userSlice';
import { RootStackParamList } from 'navigator/RootNavigator';

export type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

const LoginScreen = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    setLoading(true);
    try {
      const user = await loginUser({ email, password });
      dispatch(setUser(user));
      navigation.navigate('Home');
      setLoading(false);
    } catch (err) {
      console.log('err', err);
      setLoading(false);
    }
  };

  return (
    <MainContainer navigation={navigation}>
      <ScrollView contentContainerStyle={styles.loginContainer}>
        <AppLogo />

        <View style={styles.loginHeader}>
          <View>
            <Text style={styles.loginHeaderLineOne}>{STRINGS.LETS}</Text>
            <Text style={styles.loginHeaderLineTwo}>{STRINGS.LOGIN}</Text>
          </View>

          <CircleButton type={'back'} icon={ImageLinks.ARROW_LEFT} text={STRINGS.BACK} />
        </View>

        {/* Login Fields */}
        <View style={styles.loginFieldsContainer}>
          <LoginField text="Email" placeholder="Email" onChangeText={setEmail} value={email} type="email" />
          <LoginField text="Password" placeholder="Password" onChangeText={setPassword} value={password} type="password" />
        </View>

        {/* <Text style={styles.loginORLine}>{STRINGS.OR_LOGIN_WITH}</Text> */}

        {/* <View style={styles.loginSocialContainer}>
          <SocialLogin socialLogo={ImageLinks.GOOGLE_ICON} name={STRINGS.GOOGLE} />
          <SocialLogin socialLogo={ImageLinks.INSTAGRAM_ICON} name={STRINGS.INSTAGRAM} />
        </View> */}
        <PillButton buttonTitle={STRINGS.LOGIN} pillButtonStyle={styles.loginButton} onPress={handleLogin} loading={loading} />
      </ScrollView>
    </MainContainer>
  );
};

export default LoginScreen;
