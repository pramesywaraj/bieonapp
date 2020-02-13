import React from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  TouchableOpacity,
} from 'react-native';
import {BluetoothManager} from 'react-native-bluetooth-escpos-printer';

import Modal from 'react-native-modal';

function DeviceRows({items, onConnect}) {
  const itemCollection = items.map((item, index) => (
    <View style={styles.deviceItem}>
      <TouchableOpacity
        key={new Date().getTime() + index}
        onPress={() => onConnect(item)}>
        <Text style={styles.deviceText}>{item.name || 'UNKNOWN'}</Text>
      </TouchableOpacity>
    </View>
  ));

  return itemCollection;
}

export default function BluetoothListModal({
  visible,
  onClose,
  deviceItems,
  onConnect,
}) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      isVisible={visible}
      onRequestClose={onClose}>
      <View style={styles.modalLayout}>
        <Text style={styles.modalTitle}>Select a Device</Text>
        <Text style={styles.warning}>
          You must be paired with your device to see it in the list.
        </Text>
        <ScrollView contentContainerStyle={styles.deviceListContainer}>
          <DeviceRows items={deviceItems} onConnect={onConnect} />
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
