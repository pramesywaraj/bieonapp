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
} from 'react-native';
import {Col, Row, Grid} from 'react-native-easy-grid';
import BluetoothSerial, {
  withSubscription,
} from 'react-native-bluetooth-serial-next';
import {Buffer} from 'buffer';
import LoadingModal from '../Components/Modal/LoadingModal';

export default class ScanningDeviceScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEnabled: false,
      device: null,
      devices: [],
      unpairedDevices: [],
      scanning: false,
      processing: false,
      loading: false,
    };
  }

  async componentDidMount() {
    this.setState({loading: true});
    try {
      const [isEnabled, unpairedDevices] = await Promise.all([
        BluetoothSerial.isEnabled(),
        BluetoothSerial.discoverUnpairedDevices(),
      ]);
      const newArray = [];
      unpairedDevices.map(dev => {
        if (!newArray.some(o => o.name === dev.name)) {
          newArray.push({...dev});
        }
      });
      this.setState({
        isEnabled,
        unpairedDevices: newArray.map(unpaired => ({
          ...unpaired,
          unpaired: true,
        })),
      });
      this.setState({loading: false});
    } catch (e) {
      alert(e.message);
    }
  }

  requestEnable = () => async () => {
    try {
      await BluetoothSerial.requestEnable();
      this.setState({isEnabled: true});
    } catch (e) {
      alert(e.message);
    }
  };

  toggleBluetooth = async value => {
    try {
      if (value === 'on') {
        await BluetoothSerial.enable();
        this.props.navigation.navigate('ScanningDeviceScreen');
      } else {
        await BluetoothSerial.disable();
        this.props.navigation.navigate('RetrieveDataScreen');
      }
    } catch (e) {
      alert(e.message);
    }
  };

  listDevices = async () => {
    try {
      const list = await BluetoothSerial.listUnpaired();
      console.log(list);

      this.setState(({devices}) => ({
        devices: devices.map(device => {
          const found = list.find(v => v.id === device.id);

          if (found) {
            return {
              ...found,
              paired: true,
              connected: false,
            };
          }

          return device;
        }),
      }));
    } catch (e) {
      alert(e.message);
    }
  };

  discoverUnpairedDevices = async () => {
    this.setState({scanning: true});

    console.log('unpaired');
    try {
      const unpairedDevices = await BluetoothSerial.listUnpaired();

      this.setState(({devices}) => ({
        scanning: false,
        devices: devices
          .map(device => {
            const found = unpairedDevices.find(d => d.id === device.id);

            if (found) {
              return {
                ...device,
                ...found,
                connected: false,
                paired: false,
              };
            }

            return device.paired || device.connected ? device : null;
          })
          .map(v => v),
      }));
    } catch (e) {
      alert(e.message);

      this.setState(({devices}) => ({
        scanning: false,
        devices: devices.filter(device => device.paired || device.connected),
      }));
    }
  };

  cancelDiscovery = () => async () => {
    try {
      await BluetoothSerial.cancelDiscovery();
      this.setState({scanning: false});
    } catch (e) {
      alert(e.message);
    }
  };

  toggleDevicePairing = async ({id, paired}) => {
    if (paired) {
      await this.unpairDevice(id);
    } else {
      await this.pairDevice(id);
    }
  };

  pairDevice = async id => {
    this.setState({processing: true});

    try {
      const paired = await BluetoothSerial.pairDevice(id);

      if (paired) {
        alert(`Device ${paired.name}<${paired.id}> paired successfully`);

        this.setState(({devices, device}) => ({
          processing: false,
          device: {
            ...device,
            ...paired,
            paired: true,
          },
          devices: devices.map(v => {
            if (v.id === paired.id) {
              return {
                ...v,
                ...paired,
                paired: true,
              };
            }

            return v;
          }),
        }));
      } else {
        alert(`Device <${id}> pairing failed`);
        this.setState({processing: false});
      }
    } catch (e) {
      alert(e.message);
      this.setState({processing: false});
    }
  };

  unpairDevice = async id => {
    this.setState({processing: true});

    try {
      const unpaired = await BluetoothSerial.unpairDevice(id);

      if (unpaired) {
        alert(`Device ${unpaired.name}<${unpaired.id}> unpaired successfully`);

        this.setState(({devices, device}) => ({
          processing: false,
          device: {
            ...device,
            ...unpaired,
            connected: false,
            paired: false,
          },
          devices: devices.map(v => {
            if (v.id === unpaired.id) {
              return {
                ...v,
                ...unpaired,
                connected: false,
                paired: false,
              };
            }

            return v;
          }),
        }));
      } else {
        alert(`Device <${id}> unpairing failed`);
        this.setState({processing: false});
      }
    } catch (e) {
      alert(e.message);
      this.setState({processing: false});
    }
  };

  toggleDeviceConnection = async ({id, connected}) => {
    if (connected) {
      await this.disconnect(id);
    } else {
      await this.connect(id);
    }
  };

  connect = async id => {
    this.setState({processing: true});

    try {
      const connected = await BluetoothSerial.device(id).connect();

      console.log('connect' + connected.address);

      if (connected.address !== '') {
        alert(`Connected to device ${connected.name}<${connected.id}>`);
        this.props.navigation.navigate('ContainScreen', {
          idBluetooth: connected.address,
        });
        this.setState(({devices, device}) => ({
          processing: false,
          device: {
            ...device,
            ...connected,
            connected: true,
          },
          devices: devices.map(v => {
            if (v.id === connected.id) {
              return {
                ...v,
                ...connected,
                connected: true,
              };
            }

            return v;
          }),
        }));
      } else {
        alert(`Failed to connect to device <${id}>`);
        this.setState({processing: false});
      }
    } catch (e) {
      alert(e.message);
      this.setState({processing: false});
    }
  };

  disconnect = async id => {
    this.setState({processing: true});

    try {
      await BluetoothSerial.device(id).disconnect();

      this.setState(({devices, device}) => ({
        processing: false,
        device: {
          ...device,
          connected: false,
        },
        devices: devices.map(v => {
          if (v.id === id) {
            return {
              ...v,
              connected: false,
            };
          }

          return v;
        }),
      }));
    } catch (e) {
      alert(e.message);
      this.setState({processing: false});
    }
  };

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <LoadingModal visible={this.state.loading} />
        <View style={[styles.buttonGoogle]}>
          <Text style={[styles.textbuttonGoogle]}>Scanning</Text>
          <Text style={[styles.textbuttontitle]}>
            Make sure your device is turned on and discoverable. Select a device
            below to connect
          </Text>
          <ScrollView>
            <View>
              {this.state.unpairedDevices.map(val => (
                <View>
                  <View style={[styles.BorderTop]} />
                  <TouchableOpacity onPress={() => this.connect(val.address)}>
                    <View style={styles.itemContainer}>
                      <Text style={styles.itemText}>{val.name}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const win = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f3f3f3',
    justifyContent: 'center',
  },
  logo: {
    width: 45,
    height: 45,
  },
  button: {
    marginTop: 30,
    marginBottom: 30,
    marginRight: -320,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    marginTop: 15,
    margin: 15,
    textAlign: 'justify',
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
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 30,
    width: 300,
    height: 480,
    backgroundColor: '#fff',
    marginTop: 60,
  },
  textbuttonGoogle: {
    fontSize: 17,
    color: '#129cd8',
    fontWeight: '700',
    textAlign: 'center',
    margin: 20,
  },
  textbuttontitle: {
    fontSize: 13,
    color: 'red',
    fontWeight: '600',
    textAlign: 'center',
    margin: 20,
    marginTop: -10,
  },
  itemGoogleImage: {
    resizeMode: 'contain',
    width: 50,
    height: 50,
    marginLeft: -8,
    marginRight: 50,
    marginTop: 30,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 30,
  },
  itemText: {
    color: '#000',
    marginLeft: 13,
    fontSize: 18,
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
