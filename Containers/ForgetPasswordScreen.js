import React, {Component} from 'react';
import {
  StyleSheet,
  Image,
  ImageBackground,
  Text,
  View,
  TextInput,
  Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';

import AppsButton from '../Components/Buttons/AppsButton';

import Config from 'react-native-config';
import axios from 'axios';

export default class ForgetPasswordScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      loading: false,
    };

    this.onBackToLogin = this.onBackToLogin.bind(this);
    this.onSendForgotPassword = this.onSendForgotPassword.bind(this);
    this.onForgotPasswordProcess = this.onForgotPasswordProcess.bind(this);
  }

  onAlert = (title, message) => {
    return Alert.alert(title, message, [
      {text: 'Ok', onPress: () => console.log('Pressed')},
    ]);
  };

  onSendForgotPassword() {
    this.setState({loading: true});
    if (this.state.email !== '') {
      let forgotPassObj = {
        email: this.state.email,
      };

      this.onForgotPasswordProcess(forgotPassObj);
    } else {
      this.onAlert(
        'Email atau Password belum terisi',
        'Silahkan masukkan email atau password Anda terlebih dahulu.',
      );
      this.setState({loading: false});
    }
  }

  async onForgotPasswordProcess(payload) {
    const {goBack} = this.props.navigation;
    try {
      let response = await axios.post(
        `${Config.API_URL}/auth/forgot/password`,
        payload,
      );

      if (response.status === 202) {
        this.onAlert(
          'Sukses',
          'Silahkan cek email Anda dan ikuti prosedur penggantian password.',
        );
        goBack();
        this.setState({loading: false});
      }
    } catch (err) {
      const {response} = err;
      console.log(err);
      if (response.status === 422) {
        this.onAlert('Terjadi kesalahan', 'Silahkan ulangi kembali.');
        this.setState({loading: false});
        return;
      } else if (response.status === 400) {
        this.onAlert(
          'Email Salah',
          'Email yang Anda masukkan tidak terdaftar, silahkan cek kembali email Anda.',
        );
        this.setState({loading: false});
        return;
      }
      this.setState({loading: false});
    }
  }

  onBackToLogin() {
    const {goBack} = this.props.navigation;
    goBack();
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
            </View>

            <AppsButton
              loading={this.state.loading}
              action={this.onSendForgotPassword}
              label={'Send'}
              buttonColor={'#fff'}
              textColor={'#129cd8'}
            />
            <TouchableOpacity
              style={styles.backToLogin}
              onPress={this.onBackToLogin}>
              <Text style={styles.backToLoginText}>Back to Login</Text>
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
  backToLogin: {
    marginTop: '5%',
    padding: '2%',
  },
  backToLoginText: {
    color: 'white',
  },
});
