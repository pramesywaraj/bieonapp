import React, {Component} from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import Config from 'react-native-config';
import {Col, Row} from 'react-native-easy-grid';
import LoadingModal from '../Components/Modal/LoadingModal';

export default class DeviceInfoScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: JSON.parse(this.props.navigation.state.params.contentBluetooth3),
      latitude: 0,
      longitude: 0,
      currentUser: {},
      loading: false,
    };
  }

  async componentDidMount() {
    await AsyncStorage.setItem(
      '@deviceInfo',
      JSON.stringify(this.state.content),
    );
    this.setState({
      currentUser: JSON.parse(await AsyncStorage.getItem('@userData')),
      latitude: JSON.parse(await AsyncStorage.getItem('@userCoordinate'))
        .latitude,
      longitude: JSON.parse(await AsyncStorage.getItem('@userCoordinate'))
        .longitude,
    });

    if (this.state.content.battery < 25) {
      this.onAlert(
        'Battery low',
        'Battery under 25%, please recharge the device.',
      );
    }
  }

  onAlert = (title, message) => {
    return Alert.alert(title, message, [
      {text: 'Ok', onPress: () => console.log('Pressed')},
    ]);
  };
  async saveData() {
    const {goBack} = this.props.navigation;
    this.setState({loading: true});
    let data = {
      device_id: this.state.content.no_seri,
      counter: parseInt(this.state.content.count),
      company_id: parseInt(this.state.currentUser.company_id),
      status_battery: parseInt(this.state.content.battery),
      last_calibration: this.state.content.lastcal + 'T23:00:00+07:00',
      longitude: this.state.longitude,
      latitude: this.state.latitude,
    };
    console.log('data', data);
    try {
      let response = await axios.patch(
        Config.API_URL + '/device/device-edit',
        data,
        {
          headers: {
            'Content-Type': 'application/json',
            token: await AsyncStorage.getItem('@userAuth'),
          },
        },
      );
      this.onAlert('Success', 'Data has been uploaded.');
      goBack();
      console.log('response save device', response.config.data);
    } catch (err) {
      this.onAlert(
        'There is an error',
        'There is an error when save data. Please try again',
      );
      this.setState({loading: false});
      console.log('There is an error in content', err);
    }
  }
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <LoadingModal visible={this.state.loading} />
        <View style={styles.itemContainer}>
          <Row>
            <Image
              style={styles.itemIconImage}
              source={require('../assets/icons/devicestatus/seri.png')}
            />
            <Col>
              <Text style={styles.text}>No. Seri Device</Text>
              <TextInput
                editable={false}
                style={[styles.TextInput]}
                underlineColorAndroid={'transparent'}>
                {this.state.content.no_seri}
              </TextInput>
            </Col>
          </Row>
        </View>
        <View style={styles.itemContainer}>
          <Row>
            <Image
              style={styles.itemIconImage}
              source={require('../assets/icons/devicestatus/battery.png')}
            />
            <Col>
              <Text style={styles.text}>Battery Status</Text>
              <TextInput
                editable={false}
                style={[styles.TextInput]}
                underlineColorAndroid={'transparent'}>
                {this.state.content.battery}%
              </TextInput>
            </Col>
          </Row>
        </View>
        <View style={styles.itemContainer}>
          <Row>
            <Image
              style={styles.itemIconImage}
              source={require('../assets/icons/devicestatus/location.png')}
            />
            <Col>
              <Text style={styles.text}>Location</Text>
              <TextInput
                editable={false}
                style={[styles.TextInput]}
                placeholder="Location"
                underlineColorAndroid={'transparent'}>
                {this.state.latitude},{this.state.longitude}
              </TextInput>
            </Col>
          </Row>
        </View>
        <View style={styles.itemContainer}>
          <Row>
            <Image
              style={styles.itemIconImage}
              source={require('../assets/icons/devicestatus/usage.png')}
            />
            <Col>
              <Text style={styles.text}>Ammount of Usage</Text>
              <TextInput
                editable={false}
                style={[styles.TextInput]}
                underlineColorAndroid={'transparent'}>
                {this.state.content.count}
              </TextInput>
            </Col>
          </Row>
        </View>
        <View style={styles.itemContainer}>
          <Row>
            <Image
              style={styles.itemIconImage}
              source={require('../assets/icons/devicestatus/calibration.png')}
            />
            <Col>
              <Text style={styles.text}>Last of Calibration</Text>
              <TextInput
                editable={false}
                style={[styles.TextInput]}
                underlineColorAndroid={'transparent'}>
                {this.state.content.lastcal}
              </TextInput>
            </Col>
          </Row>
        </View>
        <TouchableOpacity
          style={[styles.button]}
          onPress={() => this.saveData()}>
          <Text style={[styles.textbutton]}>SAVE</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const win = Dimensions.get('window');

const styles = StyleSheet.create({
  textbutton: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '700',
    textAlign: 'center',
  },
  button: {
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 40,
    width: 200,
    height: 50,
    padding: 10,
    backgroundColor: '#129cd8',
    marginTop: 25,
    color: '#ffffff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  TextInput: {
    fontSize: 14,
    alignSelf: 'stretch',
    width: 330,
    height: 40,
    marginBottom: 20,
    color: '#000',
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    marginLeft: 15,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    alignSelf: 'stretch',
  },
  itemIconImage: {
    resizeMode: 'contain',
    width: 35,
    height: 35,
    marginLeft: 20,
    marginTop: 5,
  },
  text: {
    marginLeft: 15,
    marginBottom: -8,
    fontSize: 12,
  },
  itemMenuImage: {
    resizeMode: 'contain',
    width: 25,
    height: 25,
    marginTop: 3,
  },
  col: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8f8f8',
  },
  textmenu: {
    fontSize: 10,
    marginTop: 5,
    color: '#808080',
  },
});
