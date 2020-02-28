import React from 'react';
import {
  View,
  Text,
  TouchableNativeFeedback,
  StyleSheet,
  Image,
} from 'react-native';

export default function TypeButon({action, label}) {
  return (
    <View style={styles.buttonContainer}>
      <TouchableNativeFeedback
        onPress={action}
        background={TouchableNativeFeedback.SelectableBackground()}>
        <View style={styles.buttonWrapper}>
          <View style={styles.buttonTextWrapper}>
            <Text style={styles.buttonText}>{label}</Text>
          </View>
          <View style={styles.iconWrapper}>
            <Image
              style={styles.icon}
              source={require('../../assets/icons/retrievedata/searchblue.png')}
            />
          </View>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: '5%',
    width: '100%',
  },
  buttonWrapper: {
    flexDirection: 'row',

    borderRadius: 15,
    paddingTop: 25,
    paddingBottom: 25,
    paddingRight: '10%',
    paddingLeft: '10%',

    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 3,

    elevation: 2,
  },
  buttonTextWrapper: {
    flex: 2,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  buttonText: {
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 16,
    color: '#424242',
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    resizeMode: 'contain',
    width: 30,
    height: 30,
    marginLeft: 'auto',
  },
});
