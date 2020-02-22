import React from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  TouchableOpacity,
} from 'react-native';

import Modal from 'react-native-modal';

function DeviceRows({items, onConnect}) {
  const itemCollection = items.map((item, index) => (
    <View style={styles.deviceItem} key={item.address}>
      <TouchableOpacity onPress={() => onConnect(item)}>
        <Text style={styles.deviceText}>{item.name || 'UNKNOWN'}</Text>
      </TouchableOpacity>
    </View>
  ));

  return itemCollection;
}

export default function BluetoothListModal({
  visible,
  onClose,
  newDevices,
  alreadyPairedDevices,
  onConnect,
}) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      isVisible={visible}
      onRequestClose={onClose}
      onBackdropPress={onClose}>
      <View style={styles.modalLayout}>
        <Text style={styles.modalTitle}>Connect to A New Device</Text>

        <ScrollView contentContainerStyle={styles.deviceListContainer}>
          {newDevices.length > 0 ? (
            <DeviceRows items={newDevices} onConnect={onConnect} />
          ) : (
            <Text style={styles.noDeviceFound}>No new device found.</Text>
          )}
        </ScrollView>
        <Text style={styles.modalTitle}>Already Paired Device</Text>
        <Text style={styles.warning}>
          Make sure the bluetooth of the device enabled.
        </Text>
        <ScrollView contentContainerStyle={styles.deviceListContainer}>
          {alreadyPairedDevices.length > 0 ? (
            <DeviceRows items={alreadyPairedDevices} onConnect={onConnect} />
          ) : (
            <Text style={styles.noDeviceFound}>No device found.</Text>
          )}
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalLayout: {
    height: '80%',
    bottom: 0,
    borderRadius: 20,
    backgroundColor: 'white',
    paddingTop: '5%',
    paddingBottom: '5%',
    justifyContent: 'center',
  },
  modalTitle: {
    fontSize: 17,
    color: '#129cd8',
    fontWeight: '700',
    textAlign: 'center',
    margin: '3%',
  },
  noDeviceFound: {
    fontSize: 13,
    color: 'rgba(97,97,97,0.5)',
    fontWeight: '600',
    textAlign: 'center',
    margin: '3%',
  },
  warning: {
    fontSize: 13,
    color: 'red',
    fontWeight: '600',
    textAlign: 'center',
    margin: '3%',
  },
  deviceListContainer: {
    paddingLeft: '5%',
    paddingRight: '5%',
  },
  deviceItem: {
    paddingTop: '3%',
    paddingBottom: '3%',
    borderBottomWidth: 1,
    alignSelf: 'stretch',
    borderBottomColor: 'rgba(97, 97, 97, 0.5)',
  },
  deviceText: {
    textAlign: 'center',
  },
});
