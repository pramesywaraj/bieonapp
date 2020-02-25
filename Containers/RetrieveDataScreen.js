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
      devices: null,
      deviceName: '',
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
    console.log('unmount');
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
        'Terjadi Kesalahan',
        'Telah terjadi kesalahan ketika mengaktifkan bluetooth, silahkan ulangi dalam beberapa saat.',
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

      console.log('Kesini');

      this.setState({
        pairedDs: pairedDevices,
        foundDs: unPairedDevices,
        loading: false,
        modalVisible: true,
      });
    } catch (err) {
      console.log('Error happened at scanAction Function', err);
      this.onAlert(
        'Terjadi Kesalahan',
        'Telah terjadi kesalahan ketika melakukan pemindaian alat, silahkan ulangi dalam beberapa saat.',
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
      console.log('Got here');
      this.scanAction();
    } else {
      this.activateBluetooth();
      this.scanAction();
    }
  }

  async connectToDevice() {
    const {navigate} = this.props.navigation;

    navigate('ContainScreen');
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
        {/* <NoDeviceConnected /> */}
        <ContainLayout />
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
