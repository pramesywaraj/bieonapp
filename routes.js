import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import SplashScreen from './Containers/SplashScreen';
import LoginScreen from './Containers/LoginScreen';
import RegisterScreen from './Containers/RegisterScreen';
import EditProfileScreen from './Containers/EditProfileScreen';
import HomeScreen from './Containers/HomeScreen';
import ForgetPasswordScreen from './Containers/ForgetPasswordScreen';
import SettingScreen from './Containers/SettingScreen';
import DeviceInfoScreen from './Containers/DeviceInfoScreen';
import PrivacyPolicyScreen from './Containers/PrivacyPolicyScreen';
import TermsConditionScreen from './Containers/TermsConditionScreen';
import HelpFeedbackScreen from './Containers/HelpFeedbackScreen';
import RetrieveDataScreen from './Containers/RetrieveDataScreen';
import PopUpBluetoothScreen from './Containers/PopUpBluetoothScreen';
import SelectedDeviceScreen from './Containers/SelectedDeviceScreen';
import ScanningDeviceScreen from './Containers/ScanningDeviceScreen';
import TableDataScreen from './Containers/TableDataScreen';
import ContainScreen from './Containers/ContainScreen';
import ContainDetailNaclScreen from './Containers/ContainDetailNaclScreen';
import ContainDetailIodiumScreen from './Containers/ContainDetailIodiumScreen';

const RootStack = createStackNavigator({
  //Defination of Navigaton from home screen
  SplashScreen: {
    screen: SplashScreen,
    navigationOptions: {
      headerLeft: null,
      headerRight: null,
      header: null,
    },
  },
  HomeScreen: {
    screen: HomeScreen,
    navigationOptions: {
      headerLeft: null,
      headerRight: null,
      header: null,
    },
  },
  ContainScreen: {
    screen: ContainScreen,
    navigationOptions: {
      headerLeft: null,
      headerRight: null,
      header: null,
    },
  },
  ContainDetailIodiumScreen: {
    screen: ContainDetailIodiumScreen,
    navigationOptions: {
      headerLeft: null,
      headerRight: null,
      header: null,
    },
  },
  ContainDetailNaclScreen: {
    screen: ContainDetailNaclScreen,
    navigationOptions: {
      headerLeft: null,
      headerRight: null,
      header: null,
    },
  },
  ScanningDeviceScreen: {
    screen: ScanningDeviceScreen,
    navigationOptions: {
      headerLeft: null,
      headerRight: null,
      header: null,
    },
  },
  TableDataScreen: {
    screen: TableDataScreen,
    navigationOptions: {
      headerLeft: null,
      headerRight: null,
      header: null,
    },
  },
  SelectedDeviceScreen: {
    screen: SelectedDeviceScreen,
    navigationOptions: {
      headerLeft: null,
      headerRight: null,
      header: null,
    },
  },
  RetrieveDataScreen: {
    screen: RetrieveDataScreen,
    navigationOptions: {
      headerLeft: null,
      headerRight: null,
      header: null,
    },
  },
  PopUpBluetoothScreen: {
    screen: PopUpBluetoothScreen,
    navigationOptions: {
      headerLeft: null,
      headerRight: null,
      header: null,
    },
  },
  EditProfileScreen: {
    screen: EditProfileScreen,
    navigationOptions: {
      headerLeft: null,
      headerRight: null,
      header: null,
    },
  },
  HelpFeedbackScreen: {
    screen: HelpFeedbackScreen,
    navigationOptions: {
      headerLeft: null,
      headerRight: null,
      header: null,
    },
  },
  SettingScreen: {
    screen: SettingScreen,
    navigationOptions: {
      headerLeft: null,
      headerRight: null,
      header: null,
    },
  },
  TermsConditionScreen: {
    screen: TermsConditionScreen,
    navigationOptions: {
      headerLeft: null,
      headerRight: null,
      header: null,
    },
  },
  PrivacyPolicyScreen: {
    screen: PrivacyPolicyScreen,
    navigationOptions: {
      headerLeft: null,
      headerRight: null,
      header: null,
    },
  },
  LoginScreen: {
    screen: LoginScreen,
    navigationOptions: {
      headerLeft: null,
      headerRight: null,
      header: null,
    },
  },
  DeviceInfoScreen: {
    screen: DeviceInfoScreen,
    navigationOptions: {
      headerLeft: null,
      headerRight: null,
      header: null,
    },
  },
  RegisterScreen: {
    screen: RegisterScreen,

    navigationOptions: {
      headerLeft: null,
      headerRight: null,
      header: null,
    },
  },
  ForgetPasswordScreen: {
    screen: ForgetPasswordScreen,
    navigationOptions: {
      headerLeft: null,
      headerRight: null,
      header: null,
    },
  },
});

export default createAppContainer(RootStack);
