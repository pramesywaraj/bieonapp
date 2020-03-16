import React, {Component} from 'react';
import {StyleSheet, View, Alert} from 'react-native';

import BluetoothListModal from '../Components/Modal/BluetoothListModal';
import LoadingModal from '../Components/Modal/LoadingModal';
import RetrieveDataToolbar from '../Components/Toolbar/RetrieveDataToolbar';
import NoDeviceConnected from '../Components/RetrieveData/NoDeviceConnected';
import ContainLayout from '../Components/RetrieveData/ContainLayout';

import BluetoothSerial from 'react-native-bluetooth-serial-next';

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
        this.onAlert('Success', 'Device has been connected.');
        console.log(response);
        this.setState({
          connected: true,
          device: response.device,
        });
      }),
    );

    this._eventListener.push(
      BluetoothSerial.addListener('connectionFailed', response => {
        this.onAlert(
          'Failed to connected',
          'Failed to connected, please to unpair bluetooth and try again.',
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
        'There is an error when activate bluetooth, please try again.',
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
        'There is an error when scanning, please try again.',
      );

      this.setState({
        loading: false,
      });
    }
  }

  async scan() {
    this.setState({
      loading: true,
    });

    const {isBluetoothEnabled} = this.state;

    if (isBluetoothEnabled) {
      this.scanAction();
    } else {
      this.activateBluetooth();
      this.scanAction();
    }
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
    let tempObj1 = {};
    let tempObj2 = {};
    let tempObj3 = {};

    try {
      await BluetoothSerial.device(device.address).write(message);
      await BluetoothSerial.readEvery(
        (data, intervalId) => {
          if (!data) {
            null;
          } else {
            let bluetoothObj = JSON.parse(data);
            console.log('data in', bluetoothObj);
            if (intervalId) {
              clearInterval(intervalId);
            }

            switch (message) {
              case 'Data1':
                tempObj1.nacl = bluetoothObj.nacl;
                tempObj1.battery = bluetoothObj.battery;
                tempObj1.count = bluetoothObj.count;
                tempObj1.no_seri = bluetoothObj.no_seri;
                tempObj1.water_content = bluetoothObj.water_content;
                tempObj1.whiteness = bluetoothObj.whiteness;
                this.setState({loading: false});
                navigation.navigate('ContainDetailNaclScreen', {
                  contentBluetooth1: JSON.stringify(tempObj1),
                });
                console.log('Data1:', tempObj1);
                break;
              case 'Data2':
                tempObj2.iodium = bluetoothObj.iodium;
                tempObj2.battery = bluetoothObj.battery;
                tempObj2.count = bluetoothObj.count;
                tempObj2.no_seri = bluetoothObj.no_seri;

                this.setState({loading: false});
                navigation.navigate('ContainDetailIodiumScreen', {
                  contentBluetooth2: JSON.stringify(tempObj2),
                });
                console.log('Data2:', tempObj2);
                break;
              case 'Device':
                tempObj3.lastcal = bluetoothObj.lastcal;
                tempObj3.battery = bluetoothObj.battery;
                tempObj3.count = bluetoothObj.count;
                tempObj3.no_seri = bluetoothObj.no_seri;

                this.setState({loading: false});
                navigation.navigate('DeviceInfoScreen', {
                  contentBluetooth3: JSON.stringify(tempObj3),
                });
                console.log('Device:', tempObj3);
                break;
            }
          }
        },
        3000,
        '\r\n',
      );
    } catch (err) {
      console.log('Error happened on write()', err);
      this.setState({loading: false});
    }
  }

  render() {
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
        <RetrieveDataToolbar
          isBluetoothEnabled={this.state.isBluetoothEnabled}
          onScan={this.scan}
        />
        {this.state.connected ? (
          <ContainLayout device={this.state.device} onSelect={this.write} />
        ) : (
          <NoDeviceConnected />
        )}
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
});
