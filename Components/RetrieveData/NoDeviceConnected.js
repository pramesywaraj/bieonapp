import React from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';

export default function NoDeviceConnected() {
  return (
    <>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          style={styles.warningIcon}
          source={require('../../assets/icons/retrievedata/warning.png')}
        />
        <Text style={styles.noDeviceConnectedText}>No Device Connected</Text>
      </View>
      <View style={styles.bottomSection}>
        <Text style={styles.instructionText}>
          Touch Bluetooth symbol on the top right to connect to a device
        </Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
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
