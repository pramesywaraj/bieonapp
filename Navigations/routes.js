import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';

import Icon from 'react-native-vector-icons/FontAwesome5';

import SplashScreen from '../Containers/SplashScreen';
import LoginScreen from '../Containers/LoginScreen';
// import RegisterScreen from '../Containers/RegisterScreen';
import ProfileScreen from '../Containers/ProfileScreen';
import EditProfileScreen from '../Containers/EditProfileScreen';
import HomeScreen from '../Containers/HomeScreen';
import ArticleDetailScreen from '../Containers/ArticleDetailScreen';
// import ForgetPasswordScreen from '../Containers/ForgetPasswordScreen';
import SettingScreen from '../Containers/SettingScreen';
import DeviceInfoScreen from '../Containers/DeviceInfoScreen';
import PrivacyPolicyScreen from '../Containers/PrivacyPolicyScreen';
import TermsConditionScreen from '../Containers/TermsConditionScreen';
import HelpFeedbackScreen from '../Containers/HelpFeedbackScreen';
import RetrieveDataScreen from '../Containers/RetrieveDataScreen';
import PopUpBluetoothScreen from '../Containers/PopUpBluetoothScreen';
import SelectedDeviceScreen from '../Containers/SelectedDeviceScreen';
import ScanningDeviceScreen from '../Containers/ScanningDeviceScreen';
import TableDataScreen from '../Containers/TableDataScreen';
import ContainScreen from '../Containers/ContainScreen';
import ContainDetailNaclScreen from '../Containers/ContainDetailNaclScreen';
import ContainDetailIodiumScreen from '../Containers/ContainDetailIodiumScreen';

// App path stack
const HomeNavigator = createStackNavigator({
  HomeScreen: {
    screen: HomeScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  ArticleDetailScreen: {
    screen: ArticleDetailScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
});

const RetrieveDataNavigator = createStackNavigator({
  RetrieveDataScreen: {
    screen: RetrieveDataScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  ScanningDeviceScreen: {
    screen: ScanningDeviceScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  PopUpBluetoothScreen: {
    screen: PopUpBluetoothScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  SelectedDeviceScreen: {
    screen: SelectedDeviceScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  ContainScreen: {
    screen: ContainScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  ContainDetailNaclScreen: {
    screen: ContainDetailNaclScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  ContainDetailIodiumScreen: {
    screen: ContainDetailIodiumScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
});

const ViewDataNavigator = createStackNavigator({
  TableDataScreen: {
    screen: TableDataScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
});

const ProfileNavigator = createStackNavigator({
  ProfileScreen: {
    screen: ProfileScreen,
    navigationOptions: {
      headerShown: false,
    },
  },

  EditProfileScreen: {
    screen: EditProfileScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
});

const SettingsNavigator = createStackNavigator({
  SettingScreen: {
    screen: SettingScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  TermsConditionScreen: {
    screen: TermsConditionScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  PrivacyPolicyScreen: {
    screen: PrivacyPolicyScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  DeviceInfoScreen: {
    screen: DeviceInfoScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  HelpFeedbackScreen: {
    screen: HelpFeedbackScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
});

// App Navigator or bottom tab navigator settings
const AppNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeNavigator,
      navigationOptions: {
        tabBarLabel: ({tintColor}) => (
          <Text style={[tabStyle.bottomTabLabel, {color: tintColor}]}>
            Home
          </Text>
        ),
        tabBarIcon: ({horizontal, tintColor}) => (
          <Icon name="home" size={horizontal ? 20 : 25} color={tintColor} />
        ),
      },
    },
    RetrieveData: {
      screen: RetrieveDataNavigator,
      navigationOptions: {
        tabBarLabel: ({tintColor}) => (
          <Text style={[tabStyle.bottomTabLabel, {color: tintColor}]}>
            Retrieve Data
          </Text>
        ),
        tabBarIcon: ({horizontal, tintColor}) => (
          <Icon name="weight" size={horizontal ? 20 : 25} color={tintColor} />
        ),
      },
    },
    ViewData: {
      screen: ViewDataNavigator,
      navigationOptions: {
        tabBarLabel: ({tintColor}) => (
          <Text style={[tabStyle.bottomTabLabel, {color: tintColor}]}>
            View Data
          </Text>
        ),
        tabBarIcon: ({horizontal, tintColor}) => (
          <Icon name="table" size={horizontal ? 20 : 25} color={tintColor} />
        ),
      },
    },
    Profile: {
      screen: ProfileNavigator,
      navigationOptions: {
        tabBarLabel: ({tintColor}) => (
          <Text style={[tabStyle.bottomTabLabel, {color: tintColor}]}>
            Profile
          </Text>
        ),
        tabBarIcon: ({horizontal, tintColor}) => (
          <Icon
            name="user"
            size={horizontal ? 20 : 25}
            color={tintColor}
            solid
          />
        ),
      },
    },
    Settings: {
      screen: SettingsNavigator,
      navigationOptions: {
        tabBarLabel: ({tintColor}) => (
          <Text style={[tabStyle.bottomTabLabel, {color: tintColor}]}>
            Settings
          </Text>
        ),
        tabBarIcon: ({horizontal, tintColor}) => (
          <Icon
            name="cog"
            size={horizontal ? 20 : 25}
            color={tintColor}
            solid
          />
        ),
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: '#129cd8',
      inactiveTintColor: 'gray',
      labelPosition: 'below-icon',
      style: {
        borderTopColor: 'transparent',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,

        elevation: 10,
      },
      tabStyle: {
        width: '100%',
        paddingBottom: '10%',
      },
      allowFontScaling: true,
    },
  },
);

// The Initial branch
const InitialNavigator = createSwitchNavigator(
  {
    Splash: SplashScreen,
    Auth: LoginScreen,
    App: AppNavigator,
  },
  {
    initialRouteName: 'Splash',
  },
);

const tabStyle = StyleSheet.create({
  bottomTabLabel: {
    textAlign: 'center',
    fontSize: 8,
  },
});

export default createAppContainer(InitialNavigator);
