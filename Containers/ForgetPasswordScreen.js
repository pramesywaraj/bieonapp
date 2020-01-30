import React, { Component } from 'react';
import { StyleSheet, Image, ImageBackground, Text, View, Dimensions, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";


export default class ForgetPasswordScreen extends Component {
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
          <TextInput style={[styles.TextInput]} underlineColorAndroid={'transparent'}
              placeholder={'Email'}></TextInput>
          </View>   
           <TouchableOpacity style={[styles.button]} onPress={() => navigate('LoginScreen')}>
            <Text style={[styles.textbutton]}>FORGET PASSWORD</Text>
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
    width: 360,
    marginTop: -150,
    marginBottom: 120
  },
  Row: {
    height: 40,
    marginTop: -25,
  },
  ColLeft: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -50,
  },
  ColRight: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: -50
  },
  background: {
    width: win.width,
    height: win.height,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -5
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
    marginTop: 80,
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
    marginTop: -15
  },
  TextInput: {
    fontSize: 18,
    alignSelf: 'stretch',
    width:380,
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
    width: 260,
    height: 60,
    padding: 17,
    backgroundColor: '#fff',
    marginTop: 40
  },
  textbutton: {
    fontSize: 17,
    color: '#129cd8',
    fontWeight: '700',
    textAlign: 'center'
  }
});
