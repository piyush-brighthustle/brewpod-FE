import React, { useLayoutEffect } from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ImageLinks from '../assets/images';
import { BACKGROUND_COLOR, COLOR_CODE } from '../types/enums';
import BottomTab from '../components/BottomTab/BottomTab';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { scaleHeight, scaleMargin } from '../utils/scale';
import { HomeStackParamList } from 'navigations/HomeNavigators';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import ComingSoon from '../components/CommingSoon/CommingSoon';
import FermentationStatusScreen from '../screens/FermentationStatusScreen/FermentationStatusScreen';

export type TabStackParamList = {
  Home: undefined;
  LiveTracker: {
    brewParams: BrewDataType;
    beakerParams?: BrewDataBeakerType;
  };
  Community: undefined;
  About: undefined;
};

function CommunityScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ComingSoon />
    </View>
  );
}

function AboutScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ComingSoon />
    </View>
  );
}

const Tab = createBottomTabNavigator<TabStackParamList>();

export type TabNavigatorNavigationProp = NativeStackNavigationProp<HomeStackParamList, 'Main'>;

export default function TabNavigator() {
  const navigation = useNavigation<TabNavigatorNavigationProp>();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: BACKGROUND_COLOR.GRAY_2,
          height: scaleHeight(70),
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        },
        tabBarIndicatorStyle: {
          backgroundColor: COLOR_CODE.COMPLEMENTARY,
        },
        tabBarItemStyle: { marginTop: -scaleMargin(8) },
        tabBarShowLabel: false,
        tabBarActiveTintColor: COLOR_CODE.COMPLEMENTARY,
        tabBarIcon: ({ focused }) => {
          if (route.name === 'Home') {
            return <BottomTab focused={focused} imageSource={ImageLinks.HOME} label={route.name} />;
          }
          if (route.name === 'LiveTracker') {
            return <BottomTab focused={focused} imageSource={ImageLinks.TIMER} label="Live Tracker" />;
          }
          if (route.name === 'Community') {
            return <BottomTab focused={focused} imageSource={ImageLinks.COMMUNITY} label={route.name} />;
          }
          if (route.name === 'About') {
            return <BottomTab focused={focused} imageSource={ImageLinks.QUESTION_CIRCLE} label={route.name} />;
          }
        },
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="LiveTracker" component={FermentationStatusScreen} />
      <Tab.Screen name="Community" component={ComingSoon} />
      <Tab.Screen name="About" component={ComingSoon} />
    </Tab.Navigator>
  );
}
