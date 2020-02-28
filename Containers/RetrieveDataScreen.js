import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  AlertTouchableOpacity,
  Alert,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';

import BluetoothListModal from '../Components/Modal/BluetoothListModal';
import LoadingModal from '../Components/Modal/LoadingModal';
import BluetoothSerial, {
  withSubscription,
} from 'react-native-bluetooth-serial-next';

export default class RetrieveDataScreen extends Component {
  _eventListener = [];

  constructor(props) {
    super(props);
    this.state = {
      isBluetoothEnabled: false,
      device: {},
      pairedDs: [],
      foundDs: [],
      loading: true,
      boundAddress: '',
      modalVisible: false,
      connected: false,
      isEnabled: false,
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.connectToDevice = this.connectToDevice.bind(this);
    this.scan = this.scan.bind(this);
    this.write = this.write.bind(this);
  }

  async componentDidMount() {
    this._eventListener.push(
      BluetoothSerial.addListener('bluetoothEnabled', respond => {
        this.setState({
          isBluetoothEnabled: true,
        });
      }),
    );

    this._eventListener.push(
      BluetoothSerial.addListener('bluetoothDisabled', respond => {
        this.setState({
          isBluetoothEnabled: false,
        });
      }),
    );

    this._eventListener.push(
      BluetoothSerial.addListener('connectionSuccess', response => {
        this.onAlert('Connected', 'Success to connect bluetooth.');
        console.log(response.device);
        this.setState({
          connected: true,
          device: response.device,
        });
      }),
    );

    this._eventListener.push(
      BluetoothSerial.addListener('connectionFailed', response => {
        this.onAlert(
          'Failed to connect',
          'Device failed to connected, please unpair device and try again.',
        );
        this.setState({
          connected: false,
          device: null,
        });
      }),
    );
    this._eventListener.push(
      BluetoothSerial.addListener('connectionLost', response => {
        this.onAlert('Device disconnected', 'Device has been disconnected.');
        this.setState({
          connected: false,
          device: null,
        });
      }),
    );

    (await BluetoothSerial.isEnabled())
      ? this.setState({isBluetoothEnabled: true, loading: false})
      : this.setState({loading: false});
  }

  onAlert = (title, message) => {
    return Alert.alert(title, message, [
      {text: 'Ok', onPress: () => console.log('Pressed')},
    ]);
  };

  componentWillUnmount() {
    this._eventListener.map(listener => {
      listener.remove();
    });
  }

  openModal() {
    this.setState({modalVisible: true});
  }

  closeModal() {
    this.setState({modalVisible: false});
  }

  async activateBluetooth() {
    try {
      await BluetoothSerial.enable();
    } catch (err) {
      console.log('Error happen at activateBluetooth()', err);
      this.onAlert(
        'There is an error',
        'There is an error when load data Please try again.',
      );

      this.setState({
        loading: false,
      });
    }
  }

  async scanAction() {
    try {
      const scanResponse = await Promise.all([
        BluetoothSerial.list(),
        BluetoothSerial.discoverUnpairedDevices(),
      ]);

      let pairedDevices = scanResponse[0];
      let unPairedDevices = scanResponse[1];

      console.log(unPairedDevices);

      this.setState({
        pairedDs: pairedDevices,
        foundDs: unPairedDevices,
        loading: false,
        modalVisible: true,
      });
    } catch (err) {
      console.log('Error happened at scanAction Function', err);
      this.onAlert(
        'There is an error',
        'There is an error when load data Please try again.',
      );

      this.setState({
        loading: false,
      });
    }
  }

  async scan() {
    const {navigation} = this.props;
    this.setState({loading: false});
    navigation.navigate('ContainDetailIodiumScreen', {
      contentBluetooth: JSON.stringify({}),
    });
    // this.setState({
    //   loading: true,
    // });

    // const {isBluetoothEnabled} = this.state;

    // if (isBluetoothEnabled) {
    //   this.scanAction();
    // } else {
    //   this.activateBluetooth();
    //   this.scanAction();
    // }
  }

  async connectToDevice(item) {
    await BluetoothSerial.disconnectAll();

    this.setState({
      loading: true,
    });

    try {
      const connectingResponse = await BluetoothSerial.device(
        item.id,
      ).connect();

      this.setState({
        loading: false,
        modalVisible: false,
      });
    } catch (err) {
      console.log('Error connecting', err);
      this.setState({
        loading: false,
      });
    }
  }

  async write(message) {
    const {device} = this.state;
    const {navigation} = this.props;

    this.setState({loading: true});

    let tempObj = {};

    try {
      await BluetoothSerial.device(device.address).write(message);
      await BluetoothSerial.readFromDevice().then(response => {
        console.log(response);
        setTimeout(() => {
          let bluetoothObj = response;

          switch (message) {
            case 'Data1':
              tempObj.nacl = bluetoothObj.nacl;
              tempObj.battery = bluetoothObj.battery;
              tempObj.count = bluetoothObj.count;
              tempObj.no_seri = bluetoothObj.no_seri;
              tempObj.water_content = bluetoothObj.water_content;
              tempObj.whiteness = bluetoothObj.whiteness;

              this.setState({loading: false});
              navigation.navigate('ContainDetailNaclScreen', {
                contentBluetooth: JSON.stringify(tempObj),
              });
              break;
            case 'Data2':
              tempObj.iodium = bluetoothObj.iodium;
              tempObj.battery = bluetoothObj.battery;
              tempObj.count = bluetoothObj.count;
              tempObj.no_seri = bluetoothObj.no_seri;

              this.setState({loading: false});
              navigation.navigate('ContainDetailIodiumScreen', {
                contentBluetooth: JSON.stringify(tempObj),
              });
              break;
            case 'Device':
              tempObj.lastcal = bluetoothObj.lastcal;
              tempObj.battery = bluetoothObj.battery;
              tempObj.count = bluetoothObj.count;
              tempObj.no_seri = bluetoothObj.no_seri;

              this.setState({loading: false});
              navigation.navigate('DeviceInfoScreen', {
                contentBluetooth: JSON.stringify(tempObj),
              });
          }
        }, 13000);
      });
    } catch (err) {
      console.log('Error happened on write()', err);
      this.setState({loading: false});
    }
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
          style={[styles.topSection]}
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
    zIndex: 20,
    borderStyle: 'solid',
    marginLeft: 'auto',
    marginRight: '15%',
    marginTop: '15%',
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
