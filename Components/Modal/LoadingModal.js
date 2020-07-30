import React from 'react';
import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';

import Modal from 'react-native-modal';

export default function LoadingModal({visible, label}) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      isVisible={visible}
      onRequestClose={() => {
        // console.log('close modal');
      }}>
      <View style={styles.loadingLayout}>
        <ActivityIndicator size="large" color="#129cd8" />
        <Text style={styles.loadingText}>{label || 'Please wait...'}</Text>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  loadingLayout: {
    height: 150,
    padding: '10%',
    borderRadius: 20,
    backgroundColor: 'white',
    alignSelf: 'center',
    alignContent: 'center',
  },
  loadingText: {
    fontSize: 17,
    color: '#129cd8',
    fontWeight: '700',
    textAlign: 'center',
    marginTop: '10%',
  },
});
