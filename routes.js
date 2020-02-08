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
      headerShown: false,
    },
  },
  HomeScreen: {
    screen: HomeScreen,
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
  ContainDetailIodiumScreen: {
    screen: ContainDetailIodiumScreen,
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
  ScanningDeviceScreen: {
    screen: ScanningDeviceScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  TableDataScreen: {
    screen: TableDataScreen,
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
  RetrieveDataScreen: {
    screen: RetrieveDataScreen,
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
  EditProfileScreen: {
    screen: EditProfileScreen,
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
  LoginScreen: {
    screen: LoginScreen,
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
  RegisterScreen: {
    screen: RegisterScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  ForgetPasswordScreen: {
    screen: ForgetPasswordScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
});

export default createAppContainer(RootStack);
