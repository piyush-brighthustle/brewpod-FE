import TextField from '../../components/TextField/TextField';
import React, { FC } from 'react';
import { Alert, Button, TouchableOpacity, View, Text } from 'react-native';
import styles from './WelcomeHead.styles';
import { STRINGS } from '../../types/strings';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../utils/loginHelper';
import { COLOR_PALETTE } from '../../types/enums';
import { scaleFont } from '../../utils/scale';
import { selectUser } from '../../slices/userSlice';

type WelcomeHeadProps = {
  loggedIn?: boolean;
};

const WelcomeHead: FC<WelcomeHeadProps> = ({ loggedIn }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const handleLogout = () => {
    Alert.alert('Logout!', 'Are you sure you want to logout?', [
      {
        text: 'Cancel',
        onPress: () => {
          console.log('CANCELLED LOGOUT');
        },
      },

      {
        text: 'OK',
        onPress: async () => {
          logoutUser(dispatch);
        },
      },
    ]);
  };

  return (
    <View style={styles.welcomeBackContainer}>
      <View>
        <TextField text={STRINGS.WELCOME_BACK} os={styles.welcomeBack} />
        <TextField text={STRINGS.MY_BREWPOD} os={styles.myBrewpod} />
      </View>
      {user && (
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <TextField text="LOGOUT" color={COLOR_PALETTE.SEASHELL} fontSize={scaleFont(13)} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default WelcomeHead;
