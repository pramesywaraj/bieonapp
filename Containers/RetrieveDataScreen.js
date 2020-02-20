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
} from 'react-native';

export default class RetrieveDataScreen extends Component {
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={styles.topSection}>
          <TouchableOpacity
            style={[styles.button]}
            onPress={() =>
              navigate('PopUpBluetoothScreen', {idPrint: 'idFieldDevice'})
            }>
            <Image
              style={[styles.logo]}
              source={require('../assets/icons/retrievedata/bluetoothgray.png')}
            />
          </TouchableOpacity>
        </View>
        <View style={[styles.buttonGoogle]}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              style={styles.itemGoogleImage}
              source={require('../assets/icons/retrievedata/warning.png')}
            />
            <Text style={[styles.textbuttonGoogle]}>No Probe Connected</Text>
          </View>
        </View>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#e8e8e8',
          }}>
          <Text style={[styles.textbluetooth]}>
            Touch Bluetooth symbol on the top right to connect to a probe
          </Text>
        </View>
      </View>
    );
  }
}

const win = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f3f3f3',
  },
  topSection: {
    flexDirection: 'row',
  },
  logo: {
    width: 45,
    height: 45,
  },
  button: {
    marginTop: -140,
    marginBottom: 120,
    marginRight: -320,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    marginTop: 15,
    margin: 15,
    textAlign: 'justify',
    fontWeight: '600',
  },
  itemMenuImage: {
    resizeMode: 'contain',
    width: 25,
    height: 25,
    marginTop: 3,
  },
  col: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  textmenu: {
    fontSize: 10,
    marginTop: 5,
    color: '#808080',
  },
  textbluetooth: {
    fontSize: 16,
    margin: 29,
    textAlign: 'center',
    color: '#129cd8',
  },
  buttonGoogle: {
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 20,
    width: 330,
    height: 80,
    padding: 10,
    backgroundColor: '#d9d9d9',
    marginTop: 80,
  },
  textbuttonGoogle: {
    fontSize: 20,
    color: '#129cd8',
    fontWeight: '700',
    textAlign: 'center',
    marginLeft: 10,
  },
  itemGoogleImage: {
    resizeMode: 'contain',
    width: 50,
    height: 50,
  },
});
