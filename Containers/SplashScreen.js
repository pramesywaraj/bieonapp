import React, {Component} from 'react';
import {
  StyleSheet,
  Image,
  ImageBackground,
  View,
  Dimensions,
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

export default class SplashScreen extends Component {
  performTimeConsumingTask = async () => {
    return new Promise(resolve =>
      setTimeout(() => {
        resolve('result');
      }, 3000),
    );
  };

  async componentDidMount() {
    const {navigate} = this.props.navigation;

    // Preload data from an external API
    // Preload data using AsyncStorage
    const data = await this.performTimeConsumingTask();
    const authToken = await AsyncStorage.getItem('@userAuth');

    if (authToken && data !== null) {
      navigate('HomeScreen');
    } else {
      navigate('Auth');
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          style={[styles.background]}
          source={require('../assets/background/3.png')}>
          <Image
            style={[styles.logo]}
            source={require('../assets/logo/settingwhite.png')}
          />
        </ImageBackground>
      </View>
    );
  }
}

const win = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 250,
    height: 140,
  },
  background: {
    width: '105%',
    height: win.height,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -3,
  },
});
