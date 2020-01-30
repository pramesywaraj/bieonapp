import React, { Component } from 'react';
import { StyleSheet, Image, ImageBackground, Text, View, Dimensions, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import { connect } from "react-redux";
import loginAction from '../Redux/Actions/login'


class LoginScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: "admin@bieon.com",
      password: "password",
    }
  }

  onPressLogin() {
    const { email, password, auth } = this.state
    console.log("email", email)
    console.log("password", password)
    if (__DEV__) console.log("login nih");
    if (email.length > 0 && password.length > 0) {
      if (__DEV__) console.log("do login");
      this.setState({ auth: true })
      this.props.loginAction({
        email,
        password
      })
      this.props.navigation.navigate('HomeScreen')
    }
    // else if (email.length == 0 && password.length == 0) {
    //   console.log("do register");
    //   this.props.loginAction({
    //     email,
    //     password,
    //   })
    //   alert("Please Fill The Form!")
    // }
  }


  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <ImageBackground style={[styles.background]} source={require('../assets/background/3.png')}>
          <KeyboardAvoidingView behavior='padding' style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Image style={[styles.logo]} source={require('../assets/logo/loginwhite.png')}></Image>
            <View style={styles.itemContainer}>
              <Image style={styles.itemIconImage} source={require('../assets/icons/signup/email.png')} />
              <TextInput style={[styles.TextInput]} underlineColorAndroid={'transparent'} placeholder={'Email'} onChangeText={(email) => this.setState({ email })}></TextInput>
            </View>
            <View style={styles.itemContainer}>
              <Image style={styles.itemIconImage} source={require('../assets/icons/signup/password.png')} />
              <TextInput style={[styles.TextInput]} secureTextEntry={true} underlineColorAndroid={'transparent'}
                placeholder={'Password'} onChangeText={(password) => this.setState({ password })}></TextInput>
            </View>
            <TouchableOpacity style={[styles.button]} onPress={() => this.onPressLogin()}>
              <Text style={[styles.textbutton]}>LOGIN</Text>
            </TouchableOpacity>
            <Row style={[styles.Row]}>
              <Col style={[styles.Col]}>
                <TouchableOpacity onPress={() => navigate('ForgetPasswordScreen')}>
                  <Text style={[styles.text]}>FORGOT PASSWORD?</Text>
                </TouchableOpacity>
              </Col>
            </Row>
            <Text style={[styles.textsign]}>OR LOGIN WITH</Text>
            <TouchableOpacity style={[styles.buttonGoogle]} onPress={() => navigate('HomeScreen')}>
              <Row>
                <Image style={styles.itemGoogleImage} source={require('../assets/icons/login/g.png')} />
                <Text style={[styles.textbuttonGoogle]}>GOOGLE</Text>
              </Row>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </ImageBackground>

      </View>
    );
  }
}

const mapStateToProps = state => {
  const { login } = state;
  return { login };
};

const mapDispatchToProps = dispatch => ({
  loginAction: data => dispatch(loginAction(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen);



const win = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 360,
    marginTop: 0,
    marginBottom: 90
  },
  Row: {
    height: 40,
    marginTop: -25,
  },
  Col: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  },
  background: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -3,

  },
  text: {
    color: '#fff',
    fontSize: 10,
    marginTop: 50,
    color: '#f8f8f8'
  },
  textsign: {
    color: '#fff',
    fontSize: 13,
    marginTop: 60,
    textAlign: 'center'
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
    marginTop: -20
  },
  itemGoogleImage: {
    resizeMode: 'contain',
    width: 30,
    height: 30,
  },
  IconImage: {
    resizeMode: 'contain',
    width: 30,
    height: 30,
  },
  TextInput: {
    fontSize: 18,
    alignSelf: 'stretch',
    width: 380,
    height: 40,
    marginBottom: 20,
    color: '#000',
    borderBottomColor: '#000',
    borderBottomWidth: 0.7,
    fontStyle: 'italic',
    marginLeft: 15
  },
  button: {
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 40,
    width: 230,
    height: 50,
    padding: 10,
    backgroundColor: '#fff',
    marginTop: 40
  },
  buttonGoogle: {
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 40,
    width: 230,
    height: 50,
    padding: 10,
    backgroundColor: 'red',
    marginTop: 20
  },
  textbutton: {
    fontSize: 20,
    color: '#129cd8',
    fontWeight: '700',
    textAlign: 'center'
  },
  textbuttonGoogle: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '700',
    textAlign: 'center',
    marginLeft: 20
  }
});
