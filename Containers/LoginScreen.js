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

import AppsButton from './Components/Buttons/AppsButton';

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
      {text: 'Ok', onPress: () => console.log('Hahahha')},
    ]);
  };

  async onLoginProcess(payload) {
    const {navigate} = this.props.navigation;

    try {
      let response = await axios.post(`${Config.API_URL}/auth/login`, payload);

      console.log('Response', response.status);

      if (response.status === 202) {
        navigate('HomeScreen');
      }
    } catch (err) {
      const {response} = err;

      if (response.status === 422) {
        this.onAlert(
          'Email atau Password Salah',
          'Silahkan periksa email atau password Anda kembali.',
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
        'Kesalahan',
        'Silahkan masukkan email atau password Anda terlebih dahulu.',
      );
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          style={[styles.background]}
          source={require('../assets/background/3.png')}>
          <KeyboardAvoidingView
            behavior="padding"
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              style={[styles.logo]}
              source={require('../assets/logo/loginwhite.png')}
            />
            <View style={styles.itemContainer}>
              <Image
                style={styles.itemIconImage}
                source={require('../assets/icons/signup/email.png')}
              />
              <TextInput
                style={[styles.TextInput]}
                value={this.state.email}
                underlineColorAndroid="transparent"
                placeholder={'Email'}
                onChangeText={email =>
                  this.setState({email: email})
                }></TextInput>
            </View>
            <View style={styles.itemContainer}>
              <Image
                style={styles.itemIconImage}
                source={require('../assets/icons/signup/password.png')}
              />
              <TextInput
                style={[styles.TextInput]}
                secureTextEntry={true}
                value={this.state.password}
                underlineColorAndroid={'transparent'}
                placeholder={'Password'}
                onChangeText={password =>
                  this.setState({password: password})
                }></TextInput>
            </View>
            <AppsButton
              action={this.onPressLogin}
              label={'Login'}
              buttonColor={'#fff'}
              textColor={'#129cd8'}
            />
            {/* <TouchableOpacity onPress={() => navigate('ForgetPasswordScreen')}>
              <Text style={[styles.text]}>FORGOT PASSWORD?</Text>
            </TouchableOpacity> */}
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
  Col: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  background: {
    resizeMode: 'contain',
    width: win.width,
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
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: '100%',
    // marginBottom: 20,
    alignSelf: 'stretch',
  },
  itemIconImage: {
    resizeMode: 'contain',
    alignItems: 'center',
    width: 30,
    height: 30,
  },
  TextInput: {
    fontSize: 16,
    marginBottom: '10%',
    width: '80%',
    height: '50%',
    color: '#000',
    borderBottomColor: '#000',
    borderBottomWidth: 0.7,
  },

  buttonGoogle: {
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 40,
    width: 230,
    height: 50,
    padding: 10,
    backgroundColor: 'red',
    marginTop: 20,
  },
  textbuttonGoogle: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '700',
    textAlign: 'center',
    marginLeft: 20,
  },
});

export default LoginScreen;
