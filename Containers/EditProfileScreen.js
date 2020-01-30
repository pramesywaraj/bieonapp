import React, { Component } from 'react';
import { StyleSheet, Image, ImageBackground, Text, View, Dimensions, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { CheckBox } from 'react-native-elements'
import { Col, Row, Grid } from "react-native-easy-grid";
import { Dropdown } from 'react-native-material-dropdown';



export default class EditProfileScreen extends Component {
  render() {
    let data = [{
      value: 'Male',
    }, {
      value: 'Female',
    }];
    const { navigate } = this.props.navigation;
    return (
      <Grid style={{ marginTop: 30 }}>
        <Row size={13}>
          <View style={styles.container}>
            <Image
              style={styles.avatarImage}
              source={require('../assets/icons/editprofile/UserIcon.png')}
            />
            <Text style={[styles.textTitle]}>Guntur Putra</Text>
            <View style={styles.itemContainer}>
              <Row>
                <Image style={styles.itemIconImage} source={require('../assets/icons/editprofile/profile.png')} />
                <Col>
                  <Text style={styles.text}>Identity Number</Text>
                  <TextInput style={[styles.TextInput]} placeholder="Identity Number" underlineColorAndroid={'transparent'}></TextInput>
                </Col>
              </Row>
            </View>
            <View style={styles.itemContainer}>
              <Row>
                <Image style={styles.itemIconImage} source={require('../assets/icons/editprofile/address.png')} />
                <Col>
                  <Text style={styles.text}>Address</Text>
                  <TextInput style={[styles.TextInput]} placeholder="Address" underlineColorAndroid={'transparent'}></TextInput>
                </Col>
              </Row>
            </View>
            <View style={styles.itemContainer}>
              <Row>
                <Image style={styles.itemIconImage} source={require('../assets/icons/editprofile/email.png')} />
                <Col>
                  <Text style={styles.text}>Email</Text>
                  <TextInput style={[styles.TextInput]} placeholder="Email" underlineColorAndroid={'transparent'}></TextInput>
                </Col>
              </Row>
            </View>
            <View style={styles.itemContainer}>
              <Row>
                <Image style={styles.itemIconImage} source={require('../assets/icons/editprofile/phone.png')} />
                <Col>
                  <Text style={styles.text}>Phone Number</Text>
                  <TextInput style={[styles.TextInput]} placeholder="Phone Number" underlineColorAndroid={'transparent'}></TextInput>
                </Col>
              </Row>
            </View>
            <View style={styles.itemContainer}>
              <Row>
                <Image style={styles.itemIconImage} source={require('../assets/icons/editprofile/gender.png')} />
                <Col>
                  <Text style={styles.text}>Gender</Text>
                  <Dropdown
                    data={data} style={[styles.Dropdown]} pickerStyle={{borderBottomColor:'transparent',borderWidth: 0}}
                    dropdownOffset={{ 'top': 10 }} placeholder="Gender"></Dropdown>
                </Col>
              </Row>
            </View>
            <View style={styles.itemContainer}>
              <Row>
                <Image style={styles.itemIconImage} source={require('../assets/icons/editprofile/position.png')} />
                <Col>
                  <Text style={styles.text}>Position / Job</Text>
                  <TextInput style={[styles.TextInput]} placeholder="Position / Job" underlineColorAndroid={'transparent'}></TextInput>
                </Col>
              </Row>
            </View>
            <View style={styles.itemContainer}>
              <Row>
                <Image style={styles.itemIconImage} source={require('../assets/icons/editprofile/agency.png')} />
                <Col>
                  <Text style={styles.text}>Agency</Text>
                  <TextInput style={[styles.TextInput]} placeholder="Agency" underlineColorAndroid={'transparent'}></TextInput>
                </Col>
              </Row>
            </View>
            <TouchableOpacity style={[styles.button]} onPress={() => navigate('EditProfileScreen')}>
              <Text style={[styles.textbutton]}>SAVE</Text>
            </TouchableOpacity>
          </View>
        </Row>
        <Row>

          <Col style={[styles.col]}>
            <TouchableOpacity style={[styles.col]} onPress={() => navigate('HomeScreen')}>
              <Image style={styles.itemMenuImage} source={require('../assets/icons/menubar/homeblue.png')} />
              <Text style={[styles.textmenu]}>Home</Text>
            </TouchableOpacity>
          </Col>

          <Col style={[styles.col]}>
            <TouchableOpacity style={[styles.col]} onPress={() => navigate('RetrieveDataScreen')}>
              <Image style={styles.itemMenuImage} source={require('../assets/icons/menubar/retrieveblue.png')} />
              <Text style={[styles.textmenu]}>Retrieve Data</Text>
            </TouchableOpacity>
          </Col>

          <Col style={[styles.col]}>
            <TouchableOpacity style={[styles.col]} onPress={() => navigate('TableDataScreen')}>
              <Image style={styles.itemMenuImage} source={require('../assets/icons/menubar/datablue.png')} />
              <Text style={[styles.textmenu]}>View Data</Text>
            </TouchableOpacity>
          </Col>

          <Col style={[styles.col]}>
            <TouchableOpacity style={[styles.col]} onPress={() => navigate('EditProfileScreen')}>
              <Image style={styles.itemMenuImage} source={require('../assets/icons/menubar/profileblue.png')} />
              <Text style={[styles.textmenu]}>Profile</Text>
            </TouchableOpacity>
          </Col>

          <Col style={[styles.col]}>
            <TouchableOpacity style={[styles.col]} onPress={() => navigate('SettingScreen')}>
              <Image style={styles.itemMenuImage} source={require('../assets/icons/menubar/settingblue.png')} />
              <Text style={[styles.textmenu]}>Setting</Text>
            </TouchableOpacity>
          </Col>
        </Row>
      </Grid>
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
  TextInput: {
    fontSize: 18,
    alignSelf: 'stretch',
    width: 320,
    height: 40,
    marginBottom: -10,
    color: '#000',
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    marginLeft: 15
  },
  Dropdown: {
    fontSize: 18,
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    marginLeft: 15,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    alignSelf: 'stretch',
  },
  itemIconImage: {
    resizeMode: 'contain',
    width: 35,
    height: 35,
    marginLeft: 20,
    marginTop: 10
  },
  text: {
    marginLeft: 15,
    marginBottom: -8,
    fontSize: 12
  },
  button: {
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 40,
    width: 200,
    height: 50,
    padding: 10,
    backgroundColor: '#129cd8',
    marginTop: 25
  },
  textbutton: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '700',
    textAlign: 'center'
  },
  avatarImage: {
    borderRadius: 400,
    resizeMode: 'contain',
    width: 110,
    height: 180,
  },
  textTitle: {
    margin: 10,
    color: '#000',
    fontWeight: 'bold',
    fontSize: 17,
    marginTop: 15,
    marginBottom: 20
  },
  avatarImage: {
    borderRadius: 400,
    resizeMode: 'contain',
    width: 110,
    height: 120,
    marginTop: -20

  },
  textTitle: {
    margin: 10,
    color: '#000',
    fontWeight: 'bold',
    fontSize: 17,
    marginTop: 10,
    marginBottom: 30
  },
  itemMenuImage: {
    resizeMode: 'contain',
    width: 25,
    height: 25,
    marginTop: 3
  },
  col: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8f8f8',
  },
  textmenu: {
    fontSize: 10,
    marginTop: 5,
    color: '#808080',

  }
});

