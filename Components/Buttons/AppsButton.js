import React from 'react';
import {TouchableNativeFeedback, View, Text, StyleSheet} from 'react-native';

// import {vw} from 'react-native-viewport-units';

export default function AppsButton({action, label, textColor, buttonColor}) {
  return (
    <TouchableNativeFeedback
      onPress={action}
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
    paddingTop: 15,
    paddingBottom: 15,
    paddingRight: '25%',
    paddingLeft: '25%',
    width: '100%',
  },

  textbutton: {
    fontSize: 17,
    fontWeight: '700',
    textAlign: 'center',
  },
});
