import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import { Header } from 'react-native-elements';
import { Col, Row, Grid } from "react-native-easy-grid";

export default class SettingScreen extends Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <Grid style={{ marginTop: 80 }}>
        <Row size={13}>
          <View style={styles.container}>
            <View style={styles.menuContainer}>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate("DeviceInfoScreen");
                }}
              >
                <View style={styles.itemContainer}>
                  <Image style={styles.itemIconImage} source={require('../assets/icons/setting/device.png')} />
                  <Text style={styles.itemText}>Device Info</Text>
                </View>
              </TouchableOpacity>
              <View style={[styles.Border]}></View>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate("PrivacyPolicyScreen");
                }}
              >
                <View style={styles.itemContainer}>
                  <Image style={styles.itemIconImage} source={require('../assets/icons/setting/privacy.png')} />
                  <Text style={styles.itemText}>Privacy Policy</Text>
                </View>
              </TouchableOpacity>
              <View style={[styles.Border]}></View>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate("TermsConditionScreen");
                }}
              >
                <View style={styles.itemContainer}>
                  <Image style={styles.itemIconImage} source={require('../assets/icons/setting/terms.png')} />
                  <Text style={styles.itemText}>Terms & Condition</Text>
                </View>
              </TouchableOpacity>
              <View style={[styles.Border]}></View>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate("");
                }}
              >
                <View style={styles.itemContainer}>
                  <Image style={styles.itemIconImage} source={require('../assets/icons/setting/help.png')} />
                  <Text style={styles.itemText}>Help & Feedback</Text>
                </View>
              </TouchableOpacity>
              <View style={[styles.Border]}></View>
              <TouchableOpacity style={[styles.buttonGoogle]} onPress={() => navigate('LoginScreen')}>
                <Row>
                  <Image style={styles.itemIconImage} source={require('../assets/icons/setting/logout.png')} />
                  <Text style={[styles.textbuttonGoogle]}>LOGOUT</Text>
                </Row>
              </TouchableOpacity>
            </View>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 30
  },
  itemIconImage: {
    resizeMode: 'contain',
    width: 30,
    height: 30,
  },
  itemText: {
    color: 'gray',
    marginLeft: 13,
    fontSize: 18
  },
  Border: {
    alignSelf: 'stretch',
    width: 330,
    color: '#808080',
    borderBottomColor: '#808080',
    borderBottomWidth: 1,
  },
  buttonGoogle: {
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 40,
    width: 250,
    height: 50,
    padding: 10,
    backgroundColor: '#129cd8',
    marginTop: 70
  },
  textbuttonGoogle: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '700',
    textAlign: 'center',
    marginLeft: 20
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
