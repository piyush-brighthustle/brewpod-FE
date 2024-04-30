import React, { useState } from 'react';
import { View, ScrollView, Button, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AppLogo from '../../components/AppLogo/AppLogo';
import ImageLinks from '../../assets/images';
import styles from './HomeScreen.styles';
import ProfileCard from '../../components/ProfileCard/ProfileCard';
import BrewpodConnect from '../../components/BrewpodConnect/BrewpodConnect';
import WelcomeHead from '../../components/WelcomeHead/WelcomeHead';
import TextOnImageCard from '../../components/TextOnImageCard/TextOnImageCard';
import { STRINGS } from '../../types/strings';
import LineChartGraph from '../../components/LineChartGraph/LineChartGraph';
import { selectUser } from '../../slices/userSlice';
import { useSelector } from 'react-redux';
import MainContainer from '../../components/MainContainer/MainContainer';
import { scalePadding } from '../../utils/scale';
import useUSBSerial from '../../hooks/USBSerial';
import TextField from '../../components/TextField/TextField';
import { COLOR_CODE, TEXT_COLOR } from '../../types/enums';
import { RootStackParamList } from 'navigator/RootNavigator';
import apiClient from '../../services/apiClient';

export type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [profileCollapsed, setProfileCollapsed] = useState(true);
  const [editing, setEditing] = useState(false);
  const [brewpodConnect, setBrewpodConnect] = useState(false);
  const [multipleBrewpod, setMultipleBrewpod] = useState(true);
  const user = useSelector(selectUser);

  // const clickDurationCall = async () => {
  //   const url = 'graphql';
  //   const query = `
  //    mutation {
  //      addBrew(input: {
  //        recipe_id: "64b9330a7f36a4084c5b2677",
  //        device_id: "64b9330a7f36a4084c5b2678",
  //        overall_progress: 4,
  //        estimated_time_of_completion: "2023-12-03",
  //        brix_value: 14,
  //        steps: [
  //          {
  //            name: "cleaning",
  //            continued: Continue,
  //            prerequisites: [
  //              {
  //                step: 1,
  //                action:"fill",
  //                values: [
  //                  {
  //                   temp: 8,
  //                   date_time: "2023-12-20T09:25:46.782Z"
  //                  }
  //                ],
  //                status: Pending,
  //              },
  //              {
  //               step: 2,
  //               action:"temp",
  //               values: [
  //                 {
  //                  temp: 8,
  //                  date_time: "2023-12-20T09:25:46.782Z"
  //                 },
  //                 {
  //                   step: 3,
  //                   action:"fill",
  //                   values: [
  //                     {
  //                      temp: 8,
  //                      date_time: "2023-12-20T09:25:46.782Z"
  //                     }
  //                   ],
  //                   status: Pending,
  //                 },
  //                 {
  //                  step: 4,
  //                  action:"temp",
  //                  values: [
  //                    {
  //                     temp: 8,
  //                     date_time: "2023-12-20T09:25:46.782Z"
  //                    }
  //               ],
  //               status: Pending,
  //             }
  //            ],
  //            steps_status: Pending
  //          },
  //          {
  //           name: "mashing",
  //           continued: Continue,
  //           prerequisites: [
  //             {
  //               step: 1,
  //               action:"fill",
  //               values: [
  //                 {
  //                  temp: 8,
  //                  date_time: "2023-12-20T09:25:46.782Z"
  //                 }
  //               ],
  //               status: Pending,
  //             },
  //           ],
  //           steps_status: Pending
  //         }
  //        ]
  //      }) {
  //        _id
  //        device_id
  //        overall_progress
  //        estimated_time_of_completion
  //      }
  //    }
  //   `;

  //   const response = await apiClient.post(url, { query });
  //   console.log(response.data);
  // };

  return (
    <MainContainer navigation={navigation}>
      <ScrollView style={styles.homeContainer}>
        <AppLogo />
        {/* <Button title="call" onPress={clickDurationCall} /> */}
        <View style={{ marginHorizontal: scalePadding(15), marginBottom: scalePadding(30) }}>
          {/* Welcome Header */}
          <WelcomeHead />
          {/* Welcome Header */}

          {/* Profile Card */}
          <ProfileCard user={user} navigation={navigation} />
          {/* Profile Card */}

          {/* Brewpod Connect */}
          {/* <BrewpodConnect brewpodConnect={brewpodConnect} multiple={multipleBrewpod} /> */}
          {/* Brewpod Connect */}

          {user && (
            <View
              style={{
                marginTop: 20,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                gap: 10,
              }}>
              <TouchableOpacity
                style={{
                  borderWidth: 1,
                  borderColor: COLOR_CODE.COMPLEMENTARY,
                  padding: 5,
                  width: '49%',
                  borderRadius: 10,
                }}>
                <TextField text="Brewpod" color={TEXT_COLOR.GRAY} fontSize={14} />
                <TextField text="Offline" color={TEXT_COLOR.GRAY} fontSize={22} fontWeight={200} />
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  borderWidth: 1,
                  borderColor: COLOR_CODE.COMPLEMENTARY,
                  padding: 5,
                  width: '49%',
                  borderRadius: 10,
                }}>
                <TextField text="Floaty" color={TEXT_COLOR.GRAY} fontSize={14} />
                <TextField text="Offline" color={TEXT_COLOR.GRAY} fontSize={22} fontWeight={200} />
              </TouchableOpacity>
            </View>
          )}

          {/* Brew Master */}
          <TextOnImageCard backgroundImage={ImageLinks.UNLEASH_BREWMASTER_BACKGROUND_IMAGE} textOne={STRINGS.UNLEASH} textTwo={STRINGS.BREWMASTER} to="BrewMaster" />
          {/* Brew Master */}

          {/* LineChartGraph */}
          {/* <LineChartGraph /> */}
          {/* LineChartGraph */}

          {/* <Button title="fermentation status" onPress={navigateFermSt} /> */}
        </View>
      </ScrollView>
    </MainContainer>
  );
};

export default HomeScreen;
