import React, {Component} from 'react';
import {StyleSheet, Image, Text, View, TouchableOpacity} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';

export default class RetrieveDataScreen extends Component {
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={styles.topSection}>
          <TouchableOpacity
            onPress={() =>
              navigate('PopUpBluetoothScreen', {idPrint: 'idFieldDevice'})
            }>
            <Icon name="bluetooth" color="#9c9c9c" size={40} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            style={styles.warningIcon}
            source={require('../assets/icons/retrievedata/warning.png')}
          />
          <Text style={styles.noDeviceConnectedText}>No Probe Connected</Text>
        </View>
        <View style={styles.bottomSection}>
          <Text style={styles.instructionText}>
            Touch Bluetooth symbol on the top right to connect to a probe
          </Text>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f3f3f3',
    height: '100%',
  },
  topSection: {
    flexDirection: 'row',
    padding: '5%',
    marginLeft: 'auto',
    marginBottom: 'auto',
  },
  instructionText: {
    fontSize: 16,
    margin: 29,
    textAlign: 'center',
    color: '#129cd8',
  },
  noDeviceConnectedText: {
    fontSize: 20,
    color: '#129cd8',
    fontWeight: '700',
    textAlign: 'center',
    marginLeft: 10,
  },
  bottomSection: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e8e8e8',
    marginTop: 'auto',
    width: '100%',
  },
  warningIcon: {
    resizeMode: 'contain',
    width: 50,
    height: 50,
  },
});
