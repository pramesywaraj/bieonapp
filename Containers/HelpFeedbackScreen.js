import React, { Component } from 'react';
import { StyleSheet, Image, ImageBackground, Text, View, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import { Dropdown } from 'react-native-material-dropdown';

export default class HelpFeedbackScreen extends Component {
  render() {
    let data = [{
      value: 'Banana',
    }, {
      value: 'Mango',
    }, {
      value: 'Pear',
    }];

    return (
      <Dropdown
        label='Favorite Fruit'
        data={data}
      />
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
    marginTop: 0,
    marginBottom: 70
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
    marginTop: 60,
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
  },
  IconImage: {
    resizeMode: 'contain',
    width: 30,
    height: 30,
  },
  TextInput: {
    fontSize: 18,
    alignSelf: 'stretch',
    width: 330,
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
