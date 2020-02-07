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
import {Col, Row, Grid} from 'react-native-easy-grid';

export default class DeviceInfoScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: JSON.parse(this.props.navigation.state.params.contentBluetooth),
    };
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
                    underlineColorAndroid={'transparent'}></TextInput>
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
        <Row>
          <Col style={[styles.col]}>
            <TouchableOpacity
              style={[styles.col]}
              onPress={() => navigate('HomeScreen')}>
              <Image
                style={styles.itemMenuImage}
                source={require('../assets/icons/menubar/homeblue.png')}
              />
              <Text style={[styles.textmenu]}>Home</Text>
            </TouchableOpacity>
          </Col>

          <Col style={[styles.col]}>
            <TouchableOpacity
              style={[styles.col]}
              onPress={() => navigate('RetrieveDataScreen')}>
              <Image
                style={styles.itemMenuImage}
                source={require('../assets/icons/menubar/retrieveblue.png')}
              />
              <Text style={[styles.textmenu]}>Retrieve Data</Text>
            </TouchableOpacity>
          </Col>

          <Col style={[styles.col]}>
            <TouchableOpacity
              style={[styles.col]}
              onPress={() => navigate('TableDataScreen')}>
              <Image
                style={styles.itemMenuImage}
                source={require('../assets/icons/menubar/datablue.png')}
              />
              <Text style={[styles.textmenu]}>View Data</Text>
            </TouchableOpacity>
          </Col>

          <Col style={[styles.col]}>
            <TouchableOpacity
              style={[styles.col]}
              onPress={() => navigate('EditProfileScreen')}>
              <Image
                style={styles.itemMenuImage}
                source={require('../assets/icons/menubar/profileblue.png')}
              />
              <Text style={[styles.textmenu]}>Profile</Text>
            </TouchableOpacity>
          </Col>

          <Col style={[styles.col]}>
            <TouchableOpacity
              style={[styles.col]}
              onPress={() => navigate('SettingScreen')}>
              <Image
                style={styles.itemMenuImage}
                source={require('../assets/icons/menubar/settingblue.png')}
              />
              <Text style={[styles.textmenu]}>Setting</Text>
            </TouchableOpacity>
          </Col>
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
