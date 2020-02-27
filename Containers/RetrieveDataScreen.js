import React, {Component} from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  TouchableOpacity,
  Platform,
  DeviceEventEmitter,
  NativeEventEmitter,
  ToastAndroid,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';
import BluetoothListModal from '../Components/Modal/BluetoothListModal';
import {BluetoothManager} from 'react-native-bluetooth-escpos-printer';
import LoadingModal from '../Components/Modal/LoadingModal';
import BluetoothSerial, {
  withSubscription,
} from 'react-native-bluetooth-serial-next';

export default class RetrieveDataScreen extends Component {
  _listeners = [];

  constructor(props) {
    super(props);
    this.state = {
      devices: null,
      deviceName: '',
      pairedDs: [],
      foundDs: [],
      loading: false,
      boundAddress: '',
      modalVisible: false,
      connected: false,
      isEnabled: false,
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.connectToDevice = this.connectToDevice.bind(this);
    this.scan = this.scan.bind(this);
  }

  async componentDidMount() {
    // check bluetooth status
    this.setState({isEnabled: await BluetoothSerial.isEnabled()});

    if (Platform.OS === 'ios') {
      let bluetoothManagerEmitter = new NativeEventEmitter(BluetoothManager);
      this._listeners.push(
        bluetoothManagerEmitter.addListener(
          BluetoothManager.EVENT_DEVICE_ALREADY_PAIRED,
          rsp => {
            this.deviceAlreadyPaired(rsp);
          },
        ),
      );
      this._listeners.push(
        bluetoothManagerEmitter.addListener(
          BluetoothManager.EVENT_DEVICE_FOUND,
          rsp => {
            this.deviceFoundEvent(rsp);
          },
        ),
      );
      this._listeners.push(
        bluetoothManagerEmitter.addListener(
          BluetoothManager.EVENT_CONNECTION_LOST,
          () => {
            this.setState({
              deviceName: '',
              boundAddress: '',
            });
          },
        ),
      );
    } else if (Platform.OS === 'android') {
      this._listeners.push(
        DeviceEventEmitter.addListener(
          BluetoothManager.EVENT_DEVICE_ALREADY_PAIRED,
          rsp => {
            this.deviceAlreadyPaired(rsp);
          },
        ),
      );
      this._listeners.push(
        DeviceEventEmitter.addListener(
          BluetoothManager.EVENT_DEVICE_FOUND,
          rsp => {
            this.deviceFoundEvent(rsp);
          },
        ),
      );
      this._listeners.push(
        DeviceEventEmitter.addListener(
          BluetoothManager.EVENT_DEVICE_DISCOVER_DONE,
          rsp => {
            this.deviceFoundEvent(rsp);
          },
        ),
      );
      this._listeners.push(
        DeviceEventEmitter.addListener(
          BluetoothManager.EVENT_CONNECTION_LOST,
          () => {
            this.setState({
              deviceName: '',
              boundAddress: '',
            });
          },
        ),
      );
      this._listeners.push(
        DeviceEventEmitter.addListener(
          BluetoothManager.EVENT_BLUETOOTH_NOT_SUPPORT,
          () => {
            ToastAndroid.show(
              'Device Not Support Bluetooth !',
              ToastAndroid.LONG,
            );
          },
        ),
      );
    }
  }

  componentWillUnmount() {
    console.log('unmount');
    this._listeners.map(listener => {
      listener.remove();
    });
  }

  async scan() {
    const scanDevices = async () => {
      const bluetoothResponse = await BluetoothManager.scanDevices();
      await this.deviceFoundEvent(bluetoothResponse);

      this.setState({
        loading: false,
      });

      this.openModal();
    };

    try {
      const isBluetoothEnabled = await BluetoothManager.isBluetoothEnabled();

      this.setState({
        loading: true,
      });

      if (isBluetoothEnabled) {
        await scanDevices();
      } else {
        await BluetoothManager.enableBluetooth();
        await scanDevices();
      }
    } catch (err) {
      console.log(err);

      this.setState({
        loading: false,
      });
    }
  }

  deviceAlreadyPaired(response) {
    var temp = null;
    if (typeof response.devices === 'object') {
      temp = response.devices;
    } else {
      try {
        temp = JSON.parse(response.devices);
      } catch (e) {}
    }
    if (temp && temp.length) {
      // let paired = this.state.pairedDs;
      // paired = paired.concat(temp || []);
      this.setState({
        pairedDs: temp,
      });
    }
  }

  deviceFoundEvent(rsp) {
    //alert(JSON.stringify(rsp))
    var r = null;
    try {
      if (typeof rsp.device === 'object') {
        r = rsp.device;
      } else {
        r = JSON.parse(rsp.device);
      }
    } catch (e) {
      console.log('Error detected in TableDataScreen');
    }

    if (r) {
      let found = this.state.foundDs || [];
      if (found.findIndex) {
        let duplicated = found.findIndex(function(x) {
          return x.address === r.address;
        });

        if (duplicated === -1) {
          found.push(r);
          this.setState({
            foundDs: found,
          });
        }
      }
    }
  }

  openModal() {
    this.setState({modalVisible: true});
  }

  closeModal() {
    this.setState({modalVisible: false});
  }

  connectToDevice(item) {
    this.setState({
      loading: true,
    });
    BluetoothManager.connect(item.address).then(
      s => {
        this.setState({
          loading: false,
          modalVisible: false,
          connected: true,
          boundAddress: item.address,
          deviceName: item.name || 'UNKNOWN',
        });
      },
      e => {
        this.setState({
          modalVisible: false,
          loading: false,
        });
      },
    );
  }
  async checkBluetooth() {
    const {navigate} = this.props.navigation;

    if (this.state.isEnabled === false) {
      navigate('PopUpBluetoothScreen');
    } else if (this.state.isEnabled === true) {
      navigate('SelectedDeviceScreen');
    }
  }
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <BluetoothListModal
          visible={this.state.modalVisible}
          onClose={this.closeModal}
          newDevices={this.state.foundDs}
          alreadyPairedDevices={this.state.pairedDs}
          onConnect={this.connectToDevice}
        />
        <LoadingModal visible={this.state.loading} />
        <TouchableOpacity
          style={[styles.button]}
          onPress={() => this.checkBluetooth()}>
          <Image
            style={[styles.logo]}
            source={require('../assets/icons/retrievedata/bluetoothgray.png')}
          />
        </TouchableOpacity>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            style={styles.warningIcon}
            source={require('../assets/icons/retrievedata/warning.png')}
          />
          <Text style={styles.noDeviceConnectedText}>No Device Connected</Text>
        </View>
        <View style={styles.bottomSection}>
          <Text style={styles.instructionText}>
            Touch Bluetooth symbol on the top right to connect to a probe
          </Text>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f3f3f3',
    height: '100%',
  },
  logo: {
    width: 45,
    height: 45,
  },
  topSection: {
    zIndex: 10,
    flexDirection: 'row',
    padding: '5%',
    marginLeft: 'auto',
    marginBottom: 'auto',
  },
  instructionText: {
    fontSize: 16,
    margin: 29,
    textAlign: 'center',
    color: '#129cd8',
  },
  noDeviceConnectedText: {
    fontSize: 20,
    color: '#129cd8',
    fontWeight: '700',
    textAlign: 'center',
    marginLeft: 10,
  },
  bottomSection: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e8e8e8',
    marginTop: 'auto',
    width: '100%',
  },
  warningIcon: {
    resizeMode: 'contain',
    width: 50,
    height: 50,
  },
});
