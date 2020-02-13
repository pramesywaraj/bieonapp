import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import CheckBox from 'react-native-check-box';

export default function Table({headers, type, data}) {
  return (
    <View style={styles.container}>
      <View style={styles.rowWrapper}>
        <CheckBox style={styles.headerCheckbox} />
        {headers.map(header => (
          <View style={styles.row}>
            <Text>{header}</Text>
          </View>
        ))}
      </View>
      <View style={styles.rowWrapper}>
        <CheckBox style={styles.headerCheckbox} />
        {type === 'salt_a' ? data.map({})
          <View style={styles.row}>
            {/* <Text>{data.}</Text> */}
          </View>
        )
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowWrapper: {
    flex: 1,
    alignSelf: 'stretch',
    flexDirection: 'row',
    borderWidth: 2,
  },
  row: {
    flex: 1,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCheckbox: {
    justifyContent: 'center',
  },
});
