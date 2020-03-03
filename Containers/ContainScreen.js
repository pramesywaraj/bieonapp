/* eslint-disable no-alert */
/* eslint-disable react/no-did-mount-set-state */
import React, {Component} from 'react';
import {
  StyleSheet,
  Image,
  ImageBackground,
  Text,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ProgressBarAndroid,
} from 'react-native';
import BluetoothSerial from 'react-native-bluetooth-serial-next';
import LoadingModal from '../Components/Modal/LoadingModal';
import {Buffer} from 'buffer';
import AsyncStorage from '@react-native-community/async-storage';

export default class ContainScreen extends Component {
  constructor(props) {
    super(props);
    this.events = null;
    this.state = {
      isEnabled: false,
      device: null,
      devices: [],
      scanning: false,
      processing: false,
      progressbar: false,
      loading: false,
      newObject: {},
    };
  }

  async componentDidMount() {
    this.events = this.props.events;

    try {
      const [isEnabled, devices] = await Promise.all([
        BluetoothSerial.isEnabled(),
        BluetoothSerial.list(),
      ]);

      this.setState({
        isEnabled,
        devices: devices.map(device => ({
          ...device,
          paired: true,
          connected: false,
        })),
      });
    } catch (e) {
      alert(e.message);
    }

    this.events.on('bluetoothEnabled', () => {
      alert('Bluetooth enabled');
      this.setState({isEnabled: true});
    });

    this.events.on('bluetoothDisabled', () => {
      alert('Bluetooth disabled');
      this.setState({isEnabled: false});
    });

    this.events.on('connectionSuccess', ({device}) => {
      if (device) {
        alert(`Device ${device.name}<${device.id}> has been connected`);
      }
    });

    this.events.on('connectionFailed', ({device}) => {
      if (device) {
        alert(`Failed to connect with device ${device.name}<${device.id}>`);
      }
    });

    this.events.on('connectionLost', ({device}) => {
      if (device) {
        alert(`Device ${device.name}<${device.id}> connection has been lost`);
      }
    });

    this.events.on('data', result => {
      console.log('result', result);

      if (result) {
        const {id, data} = result;
        console.log(`Data from device ${id} : ${data}`);
      }
    });

    this.events.on('error', e => {
      if (e) {
        console.log(`Error: ${e.message}`);
        alert(e.message);
      }
    });
  }

  write = async (id, message) => {
    // try {
    // for data1
    console.log('mes', message);
    this.setState({loading: true});
    if (message === 'Data1') {
      await BluetoothSerial.device(id).write(message);
      await BluetoothSerial.readFromDevice().then(response => {
        setTimeout(() => {
          console.log('res', response);
          let objectBluetooth = JSON.parse(response);
          const newObject = {
            nacl: objectBluetooth.nacl,
            battery: objectBluetooth.battery,
            count: objectBluetooth.count,
            no_seri: objectBluetooth.no_seri,
            water_content: objectBluetooth.water_content,
            whiteness: objectBluetooth.whiteness,
          };
          this.props.navigation.navigate('ContainDetailNaclScreen', {
            contentBluetooth: JSON.stringify(newObject),
          });
          this.setState({loading: false});
        }, 30000);
      });
    } else if (message === 'Data2') {
      BluetoothSerial.device(id).write(message);
      BluetoothSerial.readFromDevice().then(response => {
        setTimeout(() => {
          console.log('res', response);
          let objectBluetooth = JSON.parse(response);
          const newObject = {
            iodium: objectBluetooth.iodium,
            battery: objectBluetooth.battery,
            count: objectBluetooth.count,
            no_seri: objectBluetooth.no_seri,
          };
          this.props.navigation.navigate('ContainDetailIodiumScreen', {
            contentBluetooth: JSON.stringify(newObject),
          });
          this.setState({loading: false});
        }, 30000);
      });
    } else {
      BluetoothSerial.device(id).write(message);
      BluetoothSerial.readFromDevice().then(response => {
        setTimeout(() => {
          console.log('res', response);
          let objectBluetooth = JSON.parse(response);
          const newObject = {
            lastcal: objectBluetooth.lastcal,
            battery: objectBluetooth.battery,
            count: objectBluetooth.count,
            no_seri: objectBluetooth.no_seri,
          };
          this.props.navigation.navigate('DeviceInfoScreen', {
            contentBluetooth: JSON.stringify(newObject),
          });
          this.setState({loading: false});
        }, 30000);
      });
    }
  };

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <View>
          <View style={styles.itemContainer}>
            <Image
              style={styles.itemIconImage}
              source={require('../assets/icons/retrievedata/device.png')}
            />
            <Text style={styles.itemText}>Save Data</Text>
          </View>
          {/* loading */}
          <View>
            <TouchableOpacity
              style={[styles.buttonGoogle]}
              onPress={() =>
                this.write(
                  this.props.navigation.state.params.idBluetooth,
                  'Data1',
                )
              }>
              <View>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={[styles.textbuttonGoogle]}>
                    NaCl, Whiteness and Water Content
                  </Text>
                </View>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image
                    style={styles.itemGoogleImage}
                    source={require('../assets/icons/retrievedata/searchblue.png')}
                  />
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.buttonGoogle]}
              onPress={() =>
                this.write(
                  this.props.navigation.state.params.idBluetooth,
                  'Data2',
                )
              }>
              <View>
                <View
                  size={4}
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={[styles.textbuttonGoogle]}>Iodium</Text>
                </View>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image
                    style={styles.itemGoogleImage}
                    source={require('../assets/icons/retrievedata/searchblue.png')}
                  />
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.buttonGoogle]}
              onPress={() =>
                this.write(
                  this.props.navigation.state.params.idBluetooth,
                  'Device',
                )
              }>
              <View>
                <View
                  size={4}
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={[styles.textbuttonGoogle]}>Device Info</Text>
                </View>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image
                    style={styles.itemGoogleImage}
                    source={require('../assets/icons/retrievedata/searchblue.png')}
                  />
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const win = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f3f3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressbar: {
    zIndex: 10,
    top: 100,
  },
  logo: {
    width: 45,
    height: 45,
  },
  button: {
    marginTop: -130,
    marginBottom: 60,
    marginRight: -320,
  },
  text: {
    fontSize: 16,
    marginTop: 15,
    margin: 15,
    textAlign: 'justify',
    color: '#000',
    fontWeight: '600',
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
    backgroundColor: '#fff',
  },
  allowleft: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -30,
    marginBottom: 10,
  },
  allowright: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 80,
    marginBottom: 10,
  },
  textbuttonallow: {
    fontSize: 17,
    color: '#000',
    textAlign: 'center',
    marginTop: 20,
  },
  textmenu: {
    fontSize: 10,
    marginTop: 5,
    color: '#808080',
  },
  textbluetooth: {
    fontSize: 16,
    margin: 29,
    textAlign: 'center',
    color: '#129cd8',
  },
  buttonGoogle: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    width: 330,
    height: 100,
    backgroundColor: '#ffffff',
    marginBottom: 30,
  },
  textbuttonGoogle: {
    fontSize: 20,
    color: '#000',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemGoogleImage: {
    resizeMode: 'contain',
    width: 35,
    height: 35,
    margin: 20,
    marginTop: 25,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -230,
    marginBottom: 80,
  },
  itemIconImage: {
    resizeMode: 'contain',
    width: 60,
    height: 60,
  },
  itemText: {
    color: '#129cd8',
    marginLeft: 3,
    fontSize: 25,
    fontWeight: '700',
  },
  textbuttontitle: {
    fontSize: 13,
    color: 'red',
    fontWeight: '600',
    textAlign: 'center',
    margin: 20,
    marginTop: -10,
  },
  Border: {
    alignSelf: 'stretch',
    width: 300,
    color: '#808080',
    borderBottomColor: '#808080',
    borderBottomWidth: 1,
  },
  BorderTop: {
    alignSelf: 'stretch',
    width: 300,
    color: '#808080',
    borderBottomColor: '#808080',
    borderBottomWidth: 4,
  },
  buttonsearch: {
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 40,
    width: 280,
    height: 50,
    padding: 10,
    backgroundColor: '#129cd8',
    marginTop: 30,
  },
  textbuttonsearch: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '700',
    textAlign: 'center',
  },
});
