import React, {Component} from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  Alert,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import Config from 'react-native-config';
import BluetoothSerial from 'react-native-bluetooth-serial-next';
import LoadingModal from '../Components/Modal/LoadingModal';

import SmallButton from '../Components/Buttons/SmallButton';

export default class ContainDetailNaclScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: JSON.parse(this.props.navigation.state.params.contentBluetooth1),
      sample_name: '',
      token: '',
      loading: false,
      currentUser: {},
    };

    this.saveData = this.saveData.bind(this);
    this.reMeasure = this.reMeasure.bind(this);
  }
  async componentDidMount() {
    this.setState({
      currentUser: JSON.parse(await AsyncStorage.getItem('@userData')),
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

    if (this.state.sample_name === '') {
      this.onAlert('Sample name is blank', 'Please fill the sample name');
      return;
    }

    try {
      let response = await axios.post(
        Config.API_URL + '/salt/a/input',
        {
          device_id: this.state.content.no_seri,
          nacl: this.state.content.nacl,
          whiteness: this.state.content.whiteness,
          water_content: this.state.content.water_content,
          company_id: parseInt(this.state.currentUser.company_id),
          latitude: 0.0,
          longitude: 0.0,
          status_battery: parseInt(this.state.content.battery),
          sample_name: this.state.sample_name,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            token: await AsyncStorage.getItem('@userAuth'),
          },
        },
      );
      this.onAlert('Success', 'Data has been uploaded.');
      goBack();
      // console.log('respon iod', response);
    } catch (err) {
      // console.log('Error happened at saveData()', err);
      this.onAlert(
        'There is an error',
        'Ther is an error when save data. Please try again',
      );
      this.setState({loading: false});
    }
  }

  reMeasure() {
    this.write(this.props.navigation.state.params.idBluetooth, 'Data1');
  }

  write = async (id, message) => {
    // try {
    // for data1
    this.setState({loading: true});
    // console.log('mes', message);
    await BluetoothSerial.device(id).write(message);
    await BluetoothSerial.readEvery(
      (data, intervalId) => {
        if (!data) {
          null;
        } else {
          let bluetoothObj = JSON.parse(data);
          const newObject = {
            nacl: bluetoothObj.nacl,
            battery: bluetoothObj.battery,
            count: bluetoothObj.count,
            no_seri: bluetoothObj.no_seri,
            water_content: bluetoothObj.water_content,
            whiteness: bluetoothObj.whiteness,
          };
          this.setState({content: newObject});
          this.props.navigation.navigate('ContainDetailNaclScreen');
          this.setState({loading: false});
          // stop interval read
          if (intervalId) {
            clearInterval(intervalId);
          }
        }
        // console.log('data in', data);
      },
      15000,
      '\r\n',
    );
  };

  render() {
    const {nacl, whiteness, water_content} = this.state.content;
    return (
      <View style={styles.container}>
        <LoadingModal visible={this.state.loading} />

        <View style={styles.wrapper}>
          <Image
            style={[styles.logosearch]}
            source={require('../assets/icons/retrievedata/searchgray.png')}
          />
          <View style={styles.contentContainer}>
            <View style={styles.itemContainer}>
              <Text style={styles.containText}>NaCl</Text>
              <Text style={styles.valueText}>: {nacl}%</Text>
            </View>
            <View style={styles.itemContainer}>
              <Text style={styles.containText}>Whiteness</Text>
              <Text style={styles.valueText}>: {whiteness}%</Text>
            </View>
            <View style={styles.itemContainer}>
              <Text style={styles.containText}>Water Content</Text>
              <Text style={styles.valueText}>: {water_content}%</Text>
            </View>
            <View style={styles.borderBottom} />
            <View style={styles.inputSampleNameContainer}>
              <Image
                style={styles.logo}
                source={require('../assets/icons/retrievedata/sample.png')}
              />
              <View style={styles.sampleNameInputContainer}>
                <Text style={styles.placeholder}>Sample Name*</Text>
                <TextInput
                  required
                  style={styles.inputText}
                  placeholder="Sample Name"
                  underlineColorAndroid={'transparent'}
                  onChangeText={sample_name => this.setState({sample_name})}
                />
              </View>
            </View>
          </View>
          <View style={styles.actionButtonContainer}>
            <SmallButton action={this.saveData} label="Save" />
            <SmallButton action={this.reMeasure} label="Re-Measure" />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: '5%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f3f3f3',
  },
  wrapper: {
    borderRadius: 30,
    width: '100%',
    backgroundColor: '#fff',
  },
  containText: {
    fontSize: 18,
    color: '#000',
    fontWeight: '700',
  },
  valueText: {
    fontSize: 18,
    color: '#000',
    fontWeight: '700',
    marginLeft: 'auto',
  },
  contentContainer: {
    padding: '10%',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  borderBottom: {
    alignSelf: 'center',
    width: '100%',
    color: '#808080',
    borderBottomColor: '#808080',
    borderBottomWidth: 2,
    marginTop: 30,
  },

  inputSampleNameContainer: {
    flexDirection: 'row',
    marginTop: '5%',
    alignItems: 'center',
    width: '100%',
  },
  sampleNameInputContainer: {
    marginLeft: '5%',
    width: 'auto',
  },
  placeholder: {
    fontSize: 12,
    color: '#129cd8',
    width: '100%',
  },
  inputText: {
    fontSize: 16,
    padding: 0,
    width: '100%',
    height: 'auto',
    color: '#000',
  },

  logo: {
    width: 45,
    height: 45,
  },
  logosearch: {
    width: 45,
    height: 45,
    marginLeft: 'auto',
  },
  actionButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '5%',
  },
});
