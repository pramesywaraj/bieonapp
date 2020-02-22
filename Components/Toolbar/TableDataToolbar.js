import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function TableDataToolbar({onShare, onRefresh, onPrint}) {
  return (
    <View style={styles.toolbar}>
      <TouchableOpacity onPress={onShare}>
        <Icon style={styles.icon} name="share-alt" />
      </TouchableOpacity>
      <TouchableOpacity onPress={onRefresh}>
        <Icon style={styles.icon} name="sync-alt" />
      </TouchableOpacity>
      <TouchableOpacity onPress={onPrint}>
        <Icon style={styles.icon} name="print" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#129cd8',
    padding: '5%',
    paddingLeft: '15%',
    paddingRight: '15%',
    marginRight: '5%',
    marginLeft: '5%',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  icon: {
    color: '#fff',
    fontSize: 25,
  },
});
