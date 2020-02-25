import React, {Component} from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';
import BluetoothListModal from '../Components/Modal/BluetoothListModal';
import LoadingModal from '../Components/Modal/LoadingModal';

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
      loading: false,
      boundAddress: '',
      modalVisible: false,
      connected: false,
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    // this.connectToDevice = this.connectToDevice.bind(this);
    this.scan = this.scan.bind(this);
  }

  async componentDidMount() {
    this._eventListener.push(
      BluetoothSerial.on('bluetoothEnabled', respond => {
        this.setState({
          isBluetoothEnabled: true,
        });
      }),
    );

    this._eventListener.push(
      BluetoothSerial.on('bluetoothDisabled', respond => {
        this.setState({
          isBluetoothEnabled: false,
        });
      }),
    );
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
      this.setState({
        loading: false,
      });
    } catch (err) {
      console.log('Error happen at activateBluetooth()', err);
    }
  }

  async scan() {
    this.setState({
      loading: true,
    });

    const {isBluetoothEnabled} = this.state;

    if (isBluetoothEnabled) {
    } else {
      this.activateBluetooth();
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
        <View style={styles.topSection}>
          <TouchableOpacity onPress={this.scan}>
            <Icon
              name="bluetooth"
              color={this.state.isBluetoothEnabled ? '#0082FC' : '#9c9c9c'}
              size={40}
            />
          </TouchableOpacity>
        </View>
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
  topSection: {
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
