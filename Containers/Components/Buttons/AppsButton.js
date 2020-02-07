import React from 'react';
import {TouchableNativeFeedback, View, Text, StyleSheet} from 'react-native';

// import {vw} from 'react-native-viewport-units';

export default function AppsButton({action, label, textColor, buttonColor}) {
  return (
    <TouchableNativeFeedback
      background={TouchableNativeFeedback.SelectableBackground()}>
      <View style={[buttonStyle.button, {backgroundColor: buttonColor}]}>
        <Text style={[buttonStyle.textbutton, {color: textColor}]}>
          {label}
        </Text>
      </View>
    </TouchableNativeFeedback>
  );
}

const buttonStyle = StyleSheet.create({
  button: {
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 15,
    height: 'auto',
    padding: 15,
    width: 200,
  },

  textbutton: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
  },
});
