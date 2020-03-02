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
      console.log('data:', data);
      console.log('token:', token);
      await AsyncStorage.setItem('@userData', JSON.stringify(data));
      await AsyncStorage.setItem('@userAuth', token);
      if (data.role_user === 2) {
        alert('Anda tidak dapat login dengan akun ini.');
      } else {
        navigate('HomeScreen');
      }
    } catch (err) {
      console.log(err);
      this.onAlert(
        'Terjadi Kesalahan',
        'Telah terjadi kesalahan ketika menyimpan data, silahkan restart aplikasi.',
      );
    }
  };

  async onLoginProcess(payload) {
    console.log(`${Config.API_URL}`);
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
          'Email atau Password Salah',
          'Silahkan periksa email atau password Anda kembali.',
        );

        return;
      }
      this.onAlert(
        'Terjadi Kesalahan',
        'Silahkan tunggu beberapa saat dan coba kembali.',
      );
    }
  }

  onPressLogin() {
    if (this.state.email !== '' && this.state.password !== '') {
      let newLogin = {
        email: this.state.email,
        password: this.state.password,
      };

      this.onLoginProcess(newLogin);
    } else {
      this.onAlert(
        'Email atau Password belum terisi',
        'Silahkan masukkan email atau password Anda terlebih dahulu.',
      );
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
