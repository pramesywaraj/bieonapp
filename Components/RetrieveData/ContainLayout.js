import React from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';

import TypeButton from '../Buttons/TypeButton';

export default function ContainLayout({device, onSelect}) {
  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Image
          style={styles.topImage}
          source={require('../../assets/icons/retrievedata/device.png')}
        />
        <Text style={styles.deviceNameText}>{device.name}</Text>
      </View>
      <View style={styles.itemSection}>
        <TypeButton
          label="NaCl, Whiteness and Water Content"
          action={() => onSelect('Data1')}
        />
        <TypeButton label="Iodium" action={() => onSelect('Data2')} />
        <TypeButton label="Device Info" action={() => onSelect('Device')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    padding: '5%',
  },
  topSection: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topImage: {
    resizeMode: 'contain',
    width: 30,
    height: 30,
  },
  deviceNameText: {
    color: '#129cd8',
    paddingLeft: '2%',
    fontSize: 25,
    fontWeight: '700',
  },
  itemSection: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 'auto',
    width: '100%',
  },
});
