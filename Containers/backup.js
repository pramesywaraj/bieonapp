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
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import Config from 'react-native-config';

export default class ContainDetailNaclScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: JSON.parse(this.props.navigation.state.params.contentBluetooth),
      sample_name: '',
    };
  }
  async componentDidMount() {
    console.log('token:', await AsyncStorage.getItem('@userAuth'));
  }
  saveData() {
    const sample_name = this.state.sample_name;
    if (sample_name.length > 0) {
      console.log('no_seri', this.state.content.no_seri);
      console.log('sample_name', sample_name);
      console.log('nacl', this.state.content.nacl);
      console.log('whiteness', this.state.content.whiteness);
      console.log('water_content', this.state.content.water_content);
      console.log('battery', this.state.content.battery);
      let data = {
        device_id: this.state.content.no_seri,
        nacl: this.state.content.nacl,
        whiteness: this.state.content.whiteness,
        water_content: this.state.content.water_content,
        company_id: 1,
        latitude: 0.0,
        longitude: 0.0,
        status_battery: this.state.content.battery,
        sample_name: this.state.sample_name,
      };
      this.inputSaltA(data);
    } else {
      alert('You must be fill sample name.');
    }
  }
  async inputSaltA(payload) {
    try {
      const {data} = await axios.post(
        await AsyncStorage.getItem('@userAuth'),
        `${Config.API_URL}/salt/a/input`,
        payload,
      );

      console.log('what?');
    } catch (err) {
      this.onAlert(
        'Terjadi Kesalahan',
        'Terjadi kesalahan pada server, silahkan refresh dan coba kembali.',
      );
      this.setState({
        ...this.state.articles,
        refreshing: false,
      });
      console.log('Terjadi kesalahan pada bagian HomeScreen', err);
    }
  }
  render() {
    const {navigate} = this.props.navigation;
    return (
      <Grid>
        <Row size={13}>
          <View style={styles.container}>
            <View style={styles.itemContainerTop}>
              <Image
                style={styles.itemIconImage}
                source={require('../assets/icons/retrievedata/device.png')}
              />
              <Text style={styles.itemTextTop}>
                {this.state.content.no_seri}
              </Text>
            </View>
            <View style={[styles.button]}>
              <Image
                style={[styles.logo]}
                source={require('../assets/icons/retrievedata/bluetoothblue.png')}></Image>
            </View>

            <View style={[styles.buttonGoogle]}>
              <Image
                style={[styles.logosearch]}
                source={require('../assets/icons/retrievedata/searchgray.png')}></Image>
              <Col
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <ScrollView>
                  <View>
                    <Row
                      style={{
                        marginTop: 10,
                        marginBottom: -10,
                      }}>
                      <Col
                        size={3}
                        style={{
                          alignItems: 'flex-start',
                          justifyContent: 'center',
                        }}>
                        <Text style={[styles.textbuttonGoogle]}>NaCl</Text>
                      </Col>
                      <Col
                        size={3}
                        style={{
                          alignItems: 'flex-end',
                          justifyContent: 'center',
                        }}>
                        <Text style={[styles.textbuttonGoogle]}>
                          : {this.state.content.nacl}%
                        </Text>
                      </Col>
                    </Row>
                    <View style={[styles.Border]}></View>
                    <Row
                      style={{
                        marginTop: -10,
                        marginBottom: -10,
                      }}>
                      <Col
                        size={3}
                        style={{
                          alignItems: 'flex-start',
                          justifyContent: 'center',
                        }}>
                        <Text style={[styles.textbuttonGoogle]}>Whiteness</Text>
                      </Col>
                      <Col
                        size={3}
                        style={{
                          alignItems: 'flex-end',
                          justifyContent: 'center',
                        }}>
                        <Text style={[styles.textbuttonGoogle]}>
                          : {this.state.content.whiteness}%
                        </Text>
                      </Col>
                    </Row>
                    <View style={[styles.Border]}></View>
                    <Row
                      style={{
                        marginTop: -10,
                        marginBottom: -10,
                      }}>
                      <Col
                        size={3}
                        style={{
                          alignItems: 'flex-start',
                          justifyContent: 'center',
                        }}>
                        <Text style={[styles.textbuttonGoogle]}>
                          Water Content
                        </Text>
                      </Col>
                      <Col size={2} style={{}}>
                        <Text style={[styles.textbuttonGoogle]}>
                          : {this.state.content.water_content}%
                        </Text>
                      </Col>
                    </Row>
                    <View style={[styles.BorderBottom]}></View>
                    <Row>
                      <Image
                        style={styles.itemIconContain}
                        source={require('../assets/icons/retrievedata/sample.png')}
                      />
                      <Col>
                        <Text style={styles.text}>Sample Name</Text>
                        <TextInput
                          required
                          style={[styles.TextInput]}
                          placeholder="Sample Name"
                          underlineColorAndroid={'transparent'}
                          onChangeText={sample_name =>
                            this.setState({sample_name})
                          }></TextInput>
                      </Col>
                    </Row>
                  </View>
                </ScrollView>
              </Col>
            </View>
            <Row>
              <Col>
                <TouchableOpacity
                  style={[styles.buttonsearchLeft]}
                  onPress={() => this.saveData()}>
                  <Text style={[styles.textbuttonsearch]}>Save</Text>
                </TouchableOpacity>
              </Col>
              <Col>
                <TouchableOpacity
                  style={[styles.buttonsearchRight]}
                  onPress={() => navigate('ContainScreen')}>
                  <Text style={[styles.textbuttonsearch]}>Re-Measure</Text>
                </TouchableOpacity>
              </Col>
            </Row>
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
    backgroundColor: '#f3f3f3',
  },
  logo: {
    width: 45,
    height: 45,
  },
  logosearch: {
    width: 45,
    height: 45,
    marginTop: -20,
    marginLeft: 280,
  },
  button: {
    marginTop: -60,
    marginBottom: 0,
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
    height: 350,
    backgroundColor: '#fff',
    marginTop: 100,
  },
  textbuttonGoogle: {
    fontSize: 19,
    color: '#000',
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
  itemContainerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 130,
    marginBottom: 10,
  },
  itemIconImage: {
    resizeMode: 'contain',
    width: 60,
    height: 60,
  },
  itemTextTop: {
    color: '#129cd8',
    marginLeft: 13,
    fontSize: 25,
    fontWeight: '700',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    alignSelf: 'stretch',
  },
  itemIconContain: {
    resizeMode: 'contain',
    width: 35,
    height: 35,
    marginLeft: 20,
    marginTop: 20,
  },
  text: {
    marginLeft: 15,
    marginBottom: -8,
    fontSize: 12,
    marginTop: 20,
    color: '#129cd8',
  },
  TextInput: {
    fontSize: 16,
    alignSelf: 'stretch',
    width: 330,
    height: 40,
    marginBottom: 20,
    color: '#000',
    marginLeft: 15,
  },
  Border: {
    alignSelf: 'stretch',
    width: 300,
    color: '#808080',
    borderBottomColor: '#808080',
    borderBottomWidth: 1,
  },
  BorderBottom: {
    alignSelf: 'center',
    width: 230,
    color: '#808080',
    borderBottomColor: '#808080',
    borderBottomWidth: 1,
    marginTop: 30,
  },
  BorderTop: {
    alignSelf: 'stretch',
    width: 300,
    color: '#808080',
    borderBottomColor: '#808080',
    borderBottomWidth: 4,
  },
  buttonsearchLeft: {
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 40,
    width: 110,
    height: 50,
    padding: 15,
    backgroundColor: '#129cd8',
    marginTop: -30,
    marginLeft: 80,
  },
  buttonsearchRight: {
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 40,
    width: 110,
    height: 50,
    padding: 15,
    backgroundColor: '#129cd8',
    marginTop: -30,
    marginRight: 80,
  },
  textbuttonsearch: {
    fontSize: 13,
    color: '#fff',
    fontWeight: '700',
    textAlign: 'center',
  },
});
