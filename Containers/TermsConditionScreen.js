import React, { Component } from 'react';
import { StyleSheet, Image, ImageBackground, Text, View, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";

export default class TermsConditionScreen extends Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <Grid style={{ marginTop: 80 }}>
        <Row size={13}>
      <View style={styles.container}>
        <Text style={[styles.text]}>We may employ third party companies and individuals to facilitate our Service ("Service Providers"), to provide the Service on our behalf, to perform Service-related services or to assist us in analyzing how our Service is used.</Text>
        <Text style={[styles.text]}>These third parties have access to your Personal Data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.</Text>
        <Text style={[styles.text]}>Links To Other Sites
Our Service may contain links to other sites that are not operated by us. If you click on a third party link, you will be directed to that third party's site.</Text>
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
  text: {
    color: '#fff',
    fontSize: 16,
    marginTop: 15,
    margin: 15,
    textAlign: 'justify',
    color: '#000',
    fontWeight: '600'
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
