import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView, ActivityIndicator} from 'react-native';
import CheckBox from 'react-native-check-box';
import moment from 'moment';
import {Table, TableWrapper, Row, Cell} from 'react-native-table-component';

const CheckingBox = ({onSelect, selected}) => (
  <CheckBox
    style={styles.checkBox}
    checkBoxColor={'#129cd8'}
    isChecked={selected}
    onClick={onSelect}
  />
);

export default function NaclTable({data, onSelectElement, onSelectAll}) {
  const [loading, setLoading] = useState(true);
  const [selectAll, setSelectAll] = useState(false);
  const salt_a_header = [
    <CheckingBox
      checkBoxColor={'#129cd8'}
      selected={selectAll}
      onSelect={() => {
        setSelectAll(!selectAll);
        onSelectAll();
      }}
    />,
    'No',
    'Date',
    'NaCl',
    'Whiteness',
    'Water Content',
  ];

  useEffect(() => {
    console.log('render');
    setTimeout(() => {
      setLoading(!loading);
    }, 2000);
  }, []);

  return (
    <Table>
      <TableWrapper style={styles.header}>
        <Row
          data={salt_a_header}
          flexArr={[1, 1, 1, 1, 2, 2]}
          textStyle={styles.headerText}
        />
      </TableWrapper>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#129cd8" />
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          {data.map((item, index) => (
            <TableWrapper key={index} style={styles.tableRow}>
              <Cell
                data={
                  <CheckingBox
                    selected={item.isChecked}
                    onSelect={() => onSelectElement(index)}
                  />
                }
                style={styles.cell}
              />
              <Cell
                data={index + 1}
                textStyle={styles.text}
                style={styles.cell}
              />
              <Cell
                data={moment(item.create_at)
                  .subtract(7, 'hours')
                  .format('DD-MM-YYYY')}
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
      )}
    </Table>
  );
}

const styles = StyleSheet.create({
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
  checkBox: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '50%',
  },
  scrollViewContainer: {
    height: 'auto',
  },
});
