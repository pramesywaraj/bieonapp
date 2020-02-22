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
  KeyboardAvoidingView,
  Button,
} from 'react-native';
import {Col, Row, Grid} from 'react-native-easy-grid';
import axios from 'axios';
import Config from 'react-native-config';
import AsyncStorage from '@react-native-community/async-storage';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome5';
export default class EditProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      refreshing: true,
      token: '',
      banner: [],
      currentUser: [],
      gender: 0,
    };
  }
  async componentDidMount() {
    this.setState({
      currentUser: JSON.parse(await AsyncStorage.getItem('@userData')),
    });
    console.log('user', this.state.currentUser);
    if (this.state.currentUser.gender === 0) {
      this.setState({gender: 'Female'});
    } else {
      this.setState({gender: 'Male'});
    }
    this.getCompanyDetail();
  }
  async getCompanyDetail() {
    try {
      let response = await axios.get(
        `${Config.API_URL}/company/detail/` + this.state.currentUser.company_id,
        {
          headers: {
            token: await AsyncStorage.getItem('@userAuth'),
          },
        },
      );
      const companyName = response.data.data;
      console.log('company', response.data.data);
      this.setState({companyName: companyName.name});
    } catch (err) {
      console.log(err);
    }
  }
  // te
  changeLogo = () => {
    console.log('click');
    const options = {
      noData: true,
    };
    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        // this.setState({photo: response});
        console.log('respo', response);
        axios
          .post(
            'http://bieonbe.defuture.tech/upload-image/user',
            response.uri,
            {
              headers: {'content-type': 'multipart/form-data'},
            },
          )
          .then(response2 => {
            console.log('lol', response2.data.data);
            // this.setState({picture: response.data.data});
          })
          .catch(function(error) {
            console.log('er', error);
          });
      }
    });
  };
  saveProfile = () => {
    // navigate('EditProfileScreen')
  };
  render() {
    let data = [
      {
        value: 'Male',
      },
      {
        value: 'Female',
      },
    ];
    const {navigate} = this.props.navigation;
    return (
      <Grid style={{marginTop: 30}}>
        <Row size={13}>
          <View style={styles.container}>
            <Image
              style={styles.avatarImage}
              source={{
                uri:
                  'http://bieonbe.defuture.tech/' +
                  this.state.currentUser.picture_user,
              }}
            />
            {/* <Icon
              name="user-edit"
              style={styles.userEdit}
              onPress={() => this.changeLogo()}
            /> */}
            {/* <Button title="Choose Photo" onPress={this.handleChoosePhoto} /> */}
            <Text style={[styles.textTitle]}>
              {this.state.currentUser.fullname}
            </Text>
            {/* <View style={styles.itemContainer}>
              <Row>
                <Image
                  style={styles.itemIconImage}
                  source={require('../assets/icons/editprofile/profile.png')}
                />
                <Col>
                  <Text style={styles.text}>Identity Number</Text>
                  <TextInput
                    editable={false}
                    style={[styles.TextInput]}
                    placeholder="Identity Number"
                    underlineColorAndroid={'transparent'}>
                    {this.state.currentUser.nik}
                  </TextInput>
                </Col>
              </Row>
            </View>
            <View style={styles.itemContainer}>
              <Row>
                <Image
                  style={styles.itemIconImage}
                  source={require('../assets/icons/editprofile/address.png')}
                />
                <Col>
                  <Text style={styles.text}>Address</Text>
                  <TextInput
                    editable={false}
                    style={[styles.TextInput]}
                    placeholder="Address"
                    underlineColorAndroid={'transparent'}></TextInput>
                </Col>
              </Row>
            </View> */}
            <View style={styles.itemContainer}>
              <Row>
                <Image
                  style={styles.itemIconImage}
                  source={require('../assets/icons/editprofile/email.png')}
                />
                <Col>
                  <Text style={styles.text}>Email</Text>
                  <TextInput
                    editable={false}
                    style={[styles.TextInput]}
                    placeholder="Email"
                    underlineColorAndroid={'transparent'}>
                    {this.state.currentUser.email}
                  </TextInput>
                </Col>
              </Row>
            </View>
            <View style={styles.itemContainer}>
              <Row>
                <Image
                  style={styles.itemIconImage}
                  source={require('../assets/icons/editprofile/phone.png')}
                />
                <Col>
                  <Text style={styles.text}>Phone Number</Text>
                  <TextInput
                    style={[styles.TextInput]}
                    placeholder="Phone Number"
                    underlineColorAndroid={'transparent'}>
                    {this.state.currentUser.phone_number}
                  </TextInput>
                </Col>
              </Row>
            </View>
            <View style={styles.itemContainer}>
              <Row>
                <Image
                  style={styles.itemIconImage}
                  source={require('../assets/icons/editprofile/gender.png')}
                />
                <Col>
                  <Text style={styles.text}>Gender</Text>
                  <TextInput
                    editable={false}
                    style={[styles.TextInput]}
                    placeholder="Phone Number"
                    underlineColorAndroid={'transparent'}>
                    {this.state.gender}
                  </TextInput>
                </Col>
              </Row>
            </View>
            {/* <View style={styles.itemContainer}>
              <Row>
                <Image
                  style={styles.itemIconImage}
                  source={require('../assets/icons/editprofile/gender.png')}
                />
                <Col>
                  <Text style={styles.text}>Gender</Text>
                  <Dropdown
                    data={data}
                    style={[styles.Dropdown]}
                    pickerStyle={{
                      borderBottomColor: 'transparent',
                      borderWidth: 0,
                    }}
                    dropdownOffset={{top: 10}}
                    placeholder="Gender"></Dropdown>
                </Col>
              </Row>
            </View> */}
            <View style={styles.itemContainer}>
              <Row>
                <Image
                  style={styles.itemIconImage}
                  source={require('../assets/icons/editprofile/position.png')}
                />
                <Col>
                  <Text style={styles.text}>Position</Text>
                  <TextInput
                    editable={false}
                    style={[styles.TextInput]}
                    placeholder="Position"
                    underlineColorAndroid={'transparent'}>
                    {this.state.currentUser.position}
                  </TextInput>
                </Col>
              </Row>
            </View>
            <View style={styles.itemContainer}>
              <Row>
                <Image
                  style={styles.itemIconImage}
                  source={require('../assets/icons/editprofile/agency.png')}
                />
                <Col>
                  <Text style={styles.text}>Company/Institution</Text>
                  <TextInput
                    editable={false}
                    style={[styles.TextInput]}
                    placeholder="Company/Institution"
                    underlineColorAndroid={'transparent'}>
                    {this.state.companyName}
                  </TextInput>
                </Col>
              </Row>
            </View>
            <TouchableOpacity
              style={[styles.button]}
              onPress={() => this.saveProfile()}>
              <Text style={[styles.textbutton]}>SAVE</Text>
            </TouchableOpacity>
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
    fontSize: 18,
    alignSelf: 'stretch',
    width: 320,
    height: 50,
    marginBottom: -10,
    color: '#000',
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    marginLeft: 15,
  },
  Dropdown: {
    fontSize: 18,
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
    marginTop: 10,
  },
  text: {
    marginLeft: 15,
    marginBottom: -8,
    fontSize: 12,
  },
  button: {
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 40,
    width: 200,
    height: 50,
    padding: 10,
    backgroundColor: '#129cd8',
    marginTop: 25,
  },
  textbutton: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '700',
    textAlign: 'center',
  },
  avatarImage: {
    borderRadius: 600,
    resizeMode: 'contain',
    width: 110,
    height: 110,
    marginTop: -20,
  },
  textTitle: {
    margin: 10,
    color: '#000',
    fontWeight: 'bold',
    fontSize: 17,
    marginTop: 10,
    marginBottom: 30,
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
  userEdit: {
    fontSize: 20,
    top: -20,
    right: -60,
    color: '#129cd8',
    zIndex: 15,
  },
});
