import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';

export default function RetrieveDataToolbar({isBluetoothEnabled, onScan}) {
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.scanButton} onPress={onScan}>
        <Text style={styles.scanText}>Scan</Text>
        <Icon
          name="bluetooth"
          color={isBluetoothEnabled ? '#3cfa02' : 'white'}
          size={20}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    padding: '5%',
    marginLeft: 'auto',
    marginBottom: 'auto',
  },
  scanButton: {
    backgroundColor: '#129cd8',
    flexDirection: 'row',
    paddingRight: '3%',
    paddingLeft: '3%',
    paddingTop: '2%',
    paddingBottom: '2%',
    height: 'auto',
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  scanText: {
    color: 'white',
    fontSize: 16,
    paddingRight: '2%',
  },
});
