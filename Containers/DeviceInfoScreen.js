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
import {CheckBox} from 'react-native-elements';
import Geolocation from 'react-native-geolocation-service';

import {Col, Row, Grid} from 'react-native-easy-grid';

export default class DeviceInfoScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: JSON.parse(this.props.navigation.state.params.contentBluetooth),
      latitude: 0,
      longitude: 0,
    };
  }
  componentDidMount() {
    Geolocation.getCurrentPosition(
      position => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      error => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }
  render() {
    const {navigate} = this.props.navigation;
    return (
      <Grid style={{marginTop: 80}}>
        <Row size={13}>
          <View style={styles.container}>
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
