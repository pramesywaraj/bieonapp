import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function TableDataHeader({
  deviceName,
  onScan,
  onFilterModal,
  isConnected,
}) {
  return (
    <View style={styles.header}>
      <Text style={styles.deviceStatus}>
        {!deviceName ? 'Disconnect' : deviceName}
      </Text>
      <TouchableOpacity style={styles.filterButton} onPress={onFilterModal}>
        <Icon name="filter" color="white" size={20} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.bluetoothButton} onPress={onScan}>
        {isConnected ? (
          <Image
            style={[styles.logo]}
            source={require('../../assets/icons/retrievedata/bluetoothblue.png')}
          />
        ) : (
          <Image
            style={[styles.logo]}
            source={require('../../assets/icons/retrievedata/bluetoothgray.png')}
          />
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#129cd8',
    width: '100%',
    height: 50,
    alignItems: 'center',
    paddingRight: '5%',
    paddingLeft: '5%',
    flexDirection: 'row',
  },
  deviceStatus: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 20,
  },
  bluetoothButton: {
    backgroundColor: 'transparent',
    padding: '2%',
    borderRadius: 20,
  },
  filterButton: {
    marginLeft: 'auto',
    padding: '2%',
    marginRight: '5%',
  },
  logo: {
    width: 35,
    height: 35,
  },
});
