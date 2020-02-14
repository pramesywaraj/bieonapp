import React from 'react';
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import CheckBox from 'react-native-check-box';

import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Cell,
} from 'react-native-table-component';

export default function NaclTable({headers, data}) {
  return (
    <Table>
      <Row
        data={headers}
        flexArr={[1, 1, 1, 1, 2, 2]}
        style={styles.header}
        textStyle={styles.headerText}
      />
      <ScrollView>
        {data.map((item, index) => (
          <TableWrapper key={index} style={styles.tableRow}>
            <Cell data={''} style={styles.cell} />
            <Cell
              data={index + 1}
              textStyle={styles.text}
              style={styles.cell}
            />
            <Cell
              data={item.create_at}
              textStyle={styles.text}
              style={styles.cell}
            />
            <Cell
              data={item.nacl}
              textStyle={styles.text}
              style={styles.cell}
            />
            <Cell
              data={item.whiteness}
              textStyle={styles.text}
              style={styles.cell2}
            />
            <Cell
              data={item.water_content}
              textStyle={styles.text}
              style={styles.cell2}
            />
          </TableWrapper>
        ))}
      </ScrollView>
    </Table>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    backgroundColor: 'rgb(237, 237, 237)',
    borderBottomWidth: 0.5,
    borderColor: 'rgba(181, 181, 181, 0.5)',
  },
  header: {
    backgroundColor: '#f1f8ff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  headerText: {
    textAlign: 'center',
    color: '#129cd8',
  },
  text: {
    textAlign: 'center',
    color: 'rgb(97, 97, 97)',
  },
  cell: {
    flex: 1,
  },
  cell2: {
    flex: 2,
  },
});
