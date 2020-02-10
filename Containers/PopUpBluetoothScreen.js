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
} from 'react-native';
import {Col, Row, Grid} from 'react-native-easy-grid';
import BluetoothSerial, {
  withSubscription,
} from 'react-native-bluetooth-serial-next';
import {Buffer} from 'buffer';

export default class PopUpBluetoothScreen extends Component {
  constructor(props) {
    super(props);
    this.events = null;
    this.state = {
      isEnabled: false,
      device: null,
      devices: [],
      scanning: false,
      processing: false,
      idPrint: this.props.navigation.state.params.idPrint,
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
        this.props.navigation.navigate('ScanningDeviceScreen', {
          idPrint: this.state.idPrint,
        });
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
      const list = await BluetoothSerial.list();

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

      if (connected) {
        alert(`Connected to device ${connected.name}<${connected.id}>`);

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

  write = async (id, message) => {
    try {
      await BluetoothSerial.device(id).write(message);
      alert('Successfuly wrote to device');
    } catch (e) {
      alert(e.message);
    }
  };

  writePackets = async (id, message, packetSize = 64) => {
    try {
      const device = BluetoothSerial.device(id);
      const toWrite = iconv.encode(message, 'cp852');
      const writePromises = [];
      const packetCount = Math.ceil(toWrite.length / packetSize);

      for (var i = 0; i < packetCount; i++) {
        const packet = new Buffer(packetSize);
        packet.fill(' ');
        toWrite.copy(packet, 0, i * packetSize, (i + 1) * packetSize);
        writePromises.push(device.write(packet));
      }

      await Promise.all(writePromises).then(() => alert('Writed packets'));
    } catch (e) {
      alert(e.message);
    }
  };
  render() {
    const {navigate} = this.props.navigation;
    return (
      <Grid>
        <Row size={13}>
          <View style={styles.container}>
            <View style={[styles.buttonGoogle]}>
              <Row
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={[styles.textbuttonGoogle]}>
                  BIEON is asking to turn on Bluetooth
                </Text>
                <Image
                  style={styles.itemGoogleImage}
                  source={require('../assets/icons/retrievedata/bluetoothgray.png')}
                />
              </Row>
              <Row
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <TouchableOpacity
                  style={[styles.allowleft]}
                  onPress={() => this.toggleBluetooth()}>
                  <Text style={[styles.textbuttonallow]}>Deny</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.allowright]}
                  onPress={() => this.toggleBluetooth('on')}>
                  <Text style={[styles.textbuttonallow]}>Allow</Text>
                </TouchableOpacity>
              </Row>
            </View>
          </View>
        </Row>
      </Grid>
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
    backgroundColor: '#b6b6b7',
  },
  logo: {
    width: 45,
    height: 45,
  },
  button: {
    marginTop: -140,
    marginBottom: 120,
    marginRight: -320,
  },
  text: {
    color: '#fff',
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
    backgroundColor: '#b6b6b7',
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
    height: 150,
    backgroundColor: '#d9d9d9',
    marginTop: 80,
  },
  textbuttonGoogle: {
    fontSize: 20,
    color: '#129cd8',
    fontWeight: '700',
    textAlign: 'center',
    marginLeft: 90,
    margin: 20,
    marginTop: 40,
  },
  itemGoogleImage: {
    resizeMode: 'contain',
    width: 50,
    height: 50,
    marginLeft: -8,
    marginRight: 50,
    marginTop: 30,
  },
});
