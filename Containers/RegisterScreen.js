import React, {Component} from 'react';
import {
  StyleSheet,
  Image,
  ImageBackground,
  Text,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import {CheckBox} from 'react-native-elements';

export default class RegisterScreen extends Component {
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <ImageBackground
          style={[styles.background]}
          source={require('../assets/background/3.png')}>
          <Image
            style={[styles.logo]}
            source={require('../assets/logo/settingwhite.png')}></Image>
          <KeyboardAvoidingView
            behavior="padding"
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View style={styles.itemContainer}>
              <Image
                style={styles.itemIconImage}
                source={require('../assets/icons/signup/profile.png')}
              />
              <TextInput
                style={[styles.TextInput]}
                placeholder="Full Name"
                underlineColorAndroid={'transparent'}></TextInput>
            </View>
            <View style={styles.itemContainer}>
              <Image
                style={styles.itemIconImage}
                source={require('../assets/icons/signup/email.png')}
              />
              <TextInput
                style={[styles.TextInput]}
                placeholder="Email"
                underlineColorAndroid={'transparent'}></TextInput>
            </View>
            <View style={styles.itemContainer}>
              <Image
                style={styles.itemIconImage}
                source={require('../assets/icons/signup/phone.png')}
              />
              <TextInput
                style={[styles.TextInput]}
                placeholder="Phone Number"
                underlineColorAndroid={'transparent'}></TextInput>
            </View>
            <View style={styles.itemContainer}>
              <Image
                style={styles.itemIconImage}
                source={require('../assets/icons/signup/password.png')}
              />
              <TextInput
                style={[styles.TextInput]}
                secureTextEntry={true}
                placeholder="Password"
                underlineColorAndroid={'transparent'}></TextInput>
            </View>
            {/* <CheckBox title='I aggree with term & condition'
          >
          </CheckBox> */}
            <TouchableOpacity
              style={[styles.button]}
              onPress={() => navigate('LoginScreen')}>
              <Text style={[styles.textbutton]}>SIGN UP</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigate('LoginScreen')}>
              <Text style={[styles.textsign]}>
                Already have an account? Login
              </Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    );
  }
}

const win = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 190,
    height: 120,
    marginTop: -70,
    marginBottom: 50,
    marginRight: -180,
  },
  background: {
    width: win.width,
    height: win.height,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -5,
  },
  CheckBox: {
    fontSize: 20,
  },
  textsign: {
    color: '#fff',
    fontSize: 11,
    marginTop: 20,
  },
  TextInput: {
    fontSize: 18,
    alignSelf: 'stretch',
    width: 380,
    height: 40,
    marginBottom: 8,
    color: '#000',
    borderBottomColor: '#000',
    borderBottomWidth: 0.7,
    fontStyle: 'italic',
    marginLeft: 15,
  },
  button: {
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 40,
    width: 250,
    height: 50,
    padding: 10,
    backgroundColor: '#fff',
    marginTop: 30,
  },
  textbutton: {
    fontSize: 20,
    color: '#129cd8',
    fontWeight: '700',
    textAlign: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    alignSelf: 'stretch',
  },
  itemIconImage: {
    resizeMode: 'contain',
    width: 30,
    height: 30,
    marginLeft: 30,
    marginTop: -15,
  },
});
