import React, {Component} from 'react';
import {
  StyleSheet,
  Image,
  ImageBackground,
  Alert,
  View,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Text,
} from 'react-native';

import AppsButton from '../Components/Buttons/AppsButton';

import AsyncStorage from '@react-native-community/async-storage';
import Config from 'react-native-config';
import axios from 'axios';

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loading: false,
    };

    this.onPressLogin = this.onPressLogin.bind(this);
    this.onForgotPassword = this.onForgotPassword.bind(this);
  }

  onAlert = (title, message) => {
    return Alert.alert(title, message, [
      {text: 'Ok', onPress: () => console.log('Pressed')},
    ]);
  };

  storeUserCredentials = async (data, token) => {
    const {navigate} = this.props.navigation;

    try {
      await AsyncStorage.setItem('@userData', JSON.stringify(data));
      await AsyncStorage.setItem('@userAuth', token);
      if (data.role_user === 2) {
        this.onAlert(
          "You can't login.",
          "You can't login with this account, please contact our provider",
        );
      } else {
        navigate('HomeScreen');
        this.setState({loading: false});
      }
    } catch (err) {
      console.log(err);
      this.onAlert(
        'There is an error',
        'There is an error when load data. Please try again',
      );
      this.setState({loading: false});
    }
  };

  async onLoginProcess(payload) {
    try {
      let response = await axios.post(`${Config.API_URL}/auth/login`, payload);

      if (response.status === 202) {
        const {data, token} = response.data.data;

        await this.storeUserCredentials(data, token);
      }
    } catch (err) {
      const {response} = err;

      if (response.status === 422) {
        this.onAlert(
          'Email or password is wrong',
          'please check your email and password and try again.',
        );
        this.setState({loading: false});
        return;
      }
      this.onAlert('There is an error', 'Please try again.');
      this.setState({loading: false});
    }
    this.setState({loading: false});
  }

  onPressLogin() {
    this.setState({loading: true});
    if (this.state.email !== '' && this.state.password !== '') {
      let newLogin = {
        email: this.state.email,
        password: this.state.password,
      };

      this.onLoginProcess(newLogin);
    } else {
      this.onAlert(
        'Email or password is empty',
        'Please enter your email or password before submit.',
      );
      this.setState({loading: false});
    }
  }

  onForgotPassword() {
    const {navigate} = this.props.navigation;
    navigate('ForgetPasswordScreen');
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          style={styles.background}
          source={require('../assets/background/background.png')}>
          <KeyboardAvoidingView
            behavior="padding"
            style={{alignItems: 'center', justifyContent: 'center'}}>
            <Image
              style={[styles.logo]}
              source={require('../assets/logo/loginwhite.png')}
            />
            <View style={styles.inputContainer}>
              <View style={styles.inputTextContainer}>
                <Image
                  style={styles.itemIconImage}
                  source={require('../assets/icons/signup/email.png')}
                />
                <TextInput
                  style={[styles.textInput]}
                  value={this.state.email}
                  underlineColorAndroid="transparent"
                  placeholder={'Email'}
                  onChangeText={email => this.setState({email: email})}
                />
              </View>
              <View style={styles.blankMargin} />
              <View style={styles.inputTextContainer}>
                <Image
                  style={styles.itemIconImage}
                  source={require('../assets/icons/signup/password.png')}
                />
                <TextInput
                  style={[styles.textInput]}
                  secureTextEntry={true}
                  value={this.state.password}
                  underlineColorAndroid={'transparent'}
                  placeholder={'Password'}
                  onChangeText={password => this.setState({password: password})}
                />
              </View>
            </View>

            <AppsButton
              loading={this.state.loading}
              action={this.onPressLogin}
              label={'Login'}
              buttonColor={'#fff'}
              textColor={'#129cd8'}
            />
            <TouchableOpacity
              style={styles.forgetPassword}
              onPress={this.onForgotPassword}>
              <Text style={styles.forgetPasswordText}>Forget Password</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    );
  }
}

const win = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 0,
    padding: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    resizeMode: 'contain',
    width: 200,
  },
  background: {
    resizeMode: 'contain',
    width: '100%',
    height: win.height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 10,
    marginTop: 50,
    color: '#f8f8f8',
  },
  textsign: {
    color: '#fff',
    fontSize: 13,
    marginTop: 60,
    textAlign: 'center',
  },
  inputContainer: {
    maxWidth: '100%',
    marginRight: '8%',
    marginLeft: '8%',
    marginBottom: '10%',
  },
  inputTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingRight: '5%',
    paddingLeft: '5%',
    backgroundColor: 'rgba(74, 74, 74, 0.1)',
    borderRadius: 10,
  },
  itemIconImage: {
    resizeMode: 'contain',
    alignItems: 'center',
    width: 30,
    height: 30,
  },
  textInput: {
    flex: 2,
    fontSize: 16,
    paddingLeft: 10,
    color: '#424242',
  },
  blankMargin: {
    margin: '2%',
  },
  forgetPassword: {
    marginTop: '5%',
    padding: '2%',
  },
  forgetPasswordText: {
    color: 'white',
  },
});

export default LoginScreen;
