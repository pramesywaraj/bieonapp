/* eslint-disable react-native/no-inline-styles */
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

      navigate('HomeScreen');
    } catch (err) {
      console.log(err);
      this.onAlert(
        'Terjadi Kesalahan',
        'Telah terjadi kesalahan ketika menyimpan data, silahkan restart aplikasi.',
      );
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
          'Email atau Password Salah',
          'Silahkan periksa email atau password Anda kembali.',
        );
      } else {
        this.onAlert(
          'Terjadi Kesalahan',
          'Silahkan tunggu beberapa saat dan coba kembali.',
        );
      }
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
            <AppsButton
              action={this.onPressLogin}
              label={'Login'}
              buttonColor={'#fff'}
              textColor={'#129cd8'}
            />
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
  inputTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: '100%',
    paddingRight: '5%',
    paddingLeft: '5%',
    marginRight: '8%',
    marginLeft: '8%',
    marginBottom: '10%',
    backgroundColor: 'rgba(74, 74, 74, 0.1)',
    borderRadius: 10,
  },
  itemIconImage: {
    resizeMode: 'contain',
    alignItems: 'center',
    width: 30,
    height: 30,
    padding: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    color: '#424242',
    width: '80%',
  },
});

export default LoginScreen;
