import React from 'react';
import {
  TouchableNativeFeedback,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

// import {vw} from 'react-native-viewport-units';

export default function AppsButton({
  action,
  label,
  textColor,
  buttonColor,
  loading,
}) {
  return (
    <TouchableNativeFeedback
      onPress={action}
      disabled={loading}
      background={TouchableNativeFeedback.SelectableBackground()}>
      <View style={[buttonStyle.button, {backgroundColor: buttonColor}]}>
        {!loading && (
          <Text style={[buttonStyle.textbutton, {color: textColor}]}>
            {label}
          </Text>
        )}
        <ActivityIndicator animating={loading} color={textColor} size="small" />
      </View>
    </TouchableNativeFeedback>
  );
}

const buttonStyle = StyleSheet.create({
  button: {
    flexDirection: 'row',
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
