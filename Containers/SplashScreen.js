import React, {Component} from 'react';
import {
  StyleSheet,
  Image,
  ImageBackground,
  Text,
  View,
  Dimensions,
} from 'react-native';

export default class SplashScreen extends Component {
  performTimeConsumingTask = async () => {
    return new Promise(resolve =>
      setTimeout(() => {
        resolve('result');
      }, 3000),
    );
  };

  async componentDidMount() {
    // Preload data from an external API
    // Preload data using AsyncStorage
    const data = await this.performTimeConsumingTask();

    if (data !== null) {
      this.props.navigation.navigate('LoginScreen');
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
            source={require('../assets/logo/settingwhite.png')}></Image>
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
    width: 220,
    height: 135,
  },
  background: {
    width: win.width,
    height: win.height,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -3,
  },
});
