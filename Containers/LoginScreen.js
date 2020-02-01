import React, { Component } from 'react';
import { StyleSheet, Image, ImageBackground, Text, View, Dimensions, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { loginAction } from '../Redux/Actions/login'


class LoginScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  }

  onPressLogin() {
    const { loginAction } = this.props;

    if(this.state.email !== '' && this.state.password !== '' ) {
      let newLogin = {
        email: this.state.email,
        password: this.state.password
      }
      console.log('haha')
      loginAction(newLogin);
    } else {
      console.warn('Haha')
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    console.log("this is the props", this.props);
    return (
      <ScrollView style={styles.container}>
        <ImageBackground 
          style={[styles.background]} 
          source={require('../assets/background/3.png')}
        >
          <KeyboardAvoidingView 
            behavior='padding' 
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Image 
              style={[styles.logo]} 
              source={require('../assets/logo/loginwhite.png')}
              >
            </Image>
            <View 
              style={styles.itemContainer}
            >
              <Image 
                style={styles.itemIconImage} 
                source={require('../assets/icons/signup/email.png')} 
              />
              <TextInput 
                style={[styles.TextInput]}
                value={this.state.email}
                underlineColorAndroid='transparent'
                placeholder={'Email'} 
                onChangeText={(email) => this.setState({ email: email })}
              ></TextInput>
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
                onChangeText={(password) => this.setState({ password: password })}
              >
              </TextInput>
            </View>
            <TouchableOpacity 
              style={[styles.button]} 
              onPress={this.onPressLogin}
            >
              <Text style={[styles.textbutton]}>LOGIN</Text>
            </TouchableOpacity>
            <Row style={[styles.Row]}>
              <Col style={[styles.Col]}>
                <TouchableOpacity 
                  onPress={() => navigate('ForgetPasswordScreen')}
                >
                  <Text style={[styles.text]}>FORGOT PASSWORD?</Text>
                </TouchableOpacity>
              </Col>
            </Row>
            <Text style={[styles.textsign]}>OR LOGIN WITH</Text>
            <TouchableOpacity 
              style={[styles.buttonGoogle]} 
              onPress={() => navigate('HomeScreen')}
            >
              <Row>
                <Image 
                  style={styles.itemGoogleImage} 
                  source={require('../assets/icons/login/g.png')} 
                />
                <Text style={[styles.textbuttonGoogle]}>GOOGLE</Text>
              </Row>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </ImageBackground>
      </ScrollView>
    );
  }
}

const win = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  logo: {
    resizeMode: 'contain',
    width: 200,
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
    resizeMode: 'contain',
    width: win.width,
    height: win.height,
    alignItems: 'center',
    justifyContent: 'center',
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
    // fontSize: 18,
    marginBottom: "10%",
    marginLeft: "2%",
    marginRight: "10%",
    alignSelf: 'stretch',
    width: "100%",
    height: "50%",
    color: '#000',
    borderBottomColor: '#000',
    borderBottomWidth: 0.7,
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

const mapStateToProps = state => {
  const { login } = state;
  return { login };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  loginAction: loginAction,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen);
