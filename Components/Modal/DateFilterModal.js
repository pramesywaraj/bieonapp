import React, {useState} from 'react';
import {StyleSheet, Text, View, Platform} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import Modal from 'react-native-modal';
import SmallButton from '../Buttons/SmallButton';
import DatePickerButton from '../Buttons/DatePickerButton';

export default function DateFilterModal({
  visible,
  onClose,
  startDate,
  endDate,
}) {
  const [start, setStartDate] = useState(new Date());
  const [end, setEndDate] = useState(new Date());
  const [showStart, setShowStart] = useState(false);
  const [showEnd, setShowEnd] = useState(false);

  const onChangeStartDate = (event, selectedDate) => {
    const currentDate = selectedDate || start;
    setShowStart(!showStart);
    setStartDate(currentDate);
  };

  const onChangeEndDate = (event, selectedDate) => {
    const currentDate = selectedDate || start;
    setShowEnd(!setShowEnd);
    setEndDate(currentDate);
  };

  const showStartDatePicker = async () => {
    console.log(showStart);
    setShowStart(true);
  };

  const showEndDatePicker = () => {
    setShowEnd(true);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      isVisible={visible}
      onRequestClose={onClose}>
      <View style={styles.modalLayout}>
        <Text style={styles.modalTitle}>
          Please select the date you wish to filter
        </Text>
        <View style={styles.datepickerContainer}>
          <View style={styles.datepicker}>
            <Text>Start date:</Text>
            <DatePickerButton
              label={start.toLocaleDateString()}
              action={showStartDatePicker}
            />
          </View>
          <View style={styles.datepicker}>
            <Text>End date:</Text>
            <DatePickerButton
              label={end.toLocaleDateString()}
              action={showEndDatePicker}
            />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <SmallButton
            action={() => console.log('Enter')}
            textColor={'white'}
            buttonColor={'#129cd8'}
            label={'Apply Filter'}
          />
          <SmallButton
            action={() => console.log('Enter')}
            textColor={'rgb(99, 99, 99)'}
            buttonColor={'rgb(209, 209, 209)'}
            label={'Remove Filter'}
          />
        </View>
      </View>
      {showStart && (
        <DateTimePicker
          testID="dateTimePicker"
          timeZoneOffsetInMinutes={0}
          value={start}
          mode={'date'}
          display="spinner"
          onChange={onChangeStartDate}
        />
      )}
      {showEnd && (
        <DateTimePicker
          testID="dateTimePicker"
          timeZoneOffsetInMinutes={0}
          value={end}
          mode={'date'}
          is24Hour={true}
          display="default"
          onChange={onChangeEndDate}
        />
      )}
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalLayout: {
    height: '60%',
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
    margin: '5%',
  },
  buttonContainer: {
    width: '100%',
    height: 'auto',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  datepickerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: '8%',
    paddingBottom: '20%',
  },
  datepicker: {
    alignItems: 'center',
    paddingLeft: '5%',
    paddingRight: '5%',
  },
});
