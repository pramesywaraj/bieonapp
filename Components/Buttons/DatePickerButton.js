import React from 'react';
import {TouchableNativeFeedback, View, Text, StyleSheet} from 'react-native';

// import {vw} from 'react-native-viewport-units';

export default function DatePickerButton({action, label}) {
  return (
    <TouchableNativeFeedback
      onPress={action}
      background={TouchableNativeFeedback.SelectableBackground()}>
      <View style={buttonStyle.button}>
        <Text style={buttonStyle.textbutton}>{label}</Text>
      </View>
    </TouchableNativeFeedback>
  );
}

const buttonStyle = StyleSheet.create({
  button: {
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 5,
    height: 'auto',
    paddingTop: 15,
    paddingBottom: 15,
    paddingRight: '10%',
    paddingLeft: '10%',
    width: '100%',
    backgroundColor: 'rgb(237, 237, 237)',
    color: 'rgb(128, 128, 128)',
  },

  textbutton: {
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'center',
  },
});
