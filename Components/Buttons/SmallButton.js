import React from 'react';
import {TouchableNativeFeedback, View, Text, StyleSheet} from 'react-native';

// import {vw} from 'react-native-viewport-units';

export default function SmallButton({action, label, textColor, buttonColor}) {
  return (
    <TouchableNativeFeedback
      onPress={action}
      background={TouchableNativeFeedback.SelectableBackground()}>
      <View
        style={[
          buttonStyle.button,
          {backgroundColor: buttonColor || '#129cd8'},
        ]}>
        <Text style={[buttonStyle.textbutton, {color: textColor || 'white'}]}>
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
    paddingRight: '8%',
    paddingLeft: '8%',
    marginLeft: '2%',
    marginRight: '2%',
  },

  textbutton: {
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
  },
});
