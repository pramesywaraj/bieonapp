import React, {Component} from 'react';
import FormData from 'form-data';
import {
  ScrollView,
  Platform,
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
import axios from 'axios';
import Config from 'react-native-config';
import AsyncStorage from '@react-native-community/async-storage';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome5';
export default class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      refreshing: true,
      token: '',
      banner: [],
      currentUser: [],
      gender: 0,
      picture: '',
    };
  }
  async componentDidMount() {
    this.setState({
      currentUser: JSON.parse(await AsyncStorage.getItem('@userData')),
      token: await AsyncStorage.getItem('@userAuth'),
      picture:
        'http://bieonbe.defuture.tech/' +
        JSON.parse(await AsyncStorage.getItem('@userData')).picture_user,
    });
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
            token: this.state.token,
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

  createFormData = (photo, body) => {
    const data = new FormData();

    data.append('image', {
      name: photo.fileName,
      type: photo.type,
      uri:
        Platform.OS === 'android'
          ? photo.uri
          : photo.uri.replace('file://', ''),
    });
    console.log('dataupload', JSON.stringify(data));
    return data;
  };
  async changePicture() {
    console.log('click');
    const options = {
      noData: true,
    };
    const data = new FormData();

    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        this.setState({picture: response.uri});
        data.append('image', {
          name: response.fileName,
          type: response.type,
          uri: response.uri,
        });
        // this.setState({photo: response});
        console.log('respo', response);
        axios
          .post('http://bieonbe.defuture.tech/upload-image/user', data, {
            headers: {
              'content-type': 'multipart/form-data',
            },
          })
          .then(respo => {
            this.savePicture(respo.data.data);
          })
          .catch(function(error) {
            console.log('er', error);
          });
      }
    });
  }
  savePicture(picture_user) {
    console.log('tok', this.state.token);

    axios
      .patch(
        'http://bieonbe.defuture.tech/auth/update',
        {
          picture_user: picture_user,
          email: this.state.currentUser.email,
          fullname: this.state.currentUser.fullname,
          phone_number: this.state.currentUser.phone_number,
          company_id: this.state.currentUser.company_id,
          position: this.state.currentUser.position,
          address: this.state.currentUser.address,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            token: this.state.token,
          },
        },
      )
      .then(resp => {
        console.log('change picture', resp.data);
      })
      .catch(function(error) {
        console.log('error change picture', error);
      });
  }
  goToEditProfile = () => {
    const {navigate} = this.props.navigation;
    navigate('EditProfileScreen');
  };
  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Image
            style={styles.avatarImage}
            source={{
              uri: this.state.picture,
            }}
          />
          <Icon
            name="image"
            style={styles.userEdit}
            onPress={() => this.changePicture()}
          />
          {/* <Button title="Choose Photo" onPress={this.handleChoosePhoto} /> */}
          <Text style={[styles.textTitle]}>
            {this.state.currentUser.fullname}
          </Text>
          <View style={styles.itemContainer}>
            <View>
              <Image
                style={styles.itemIconImage}
                source={require('../assets/icons/editprofile/email.png')}
              />
              <View>
                <Text style={styles.text}>Email</Text>
                <TextInput
                  editable={false}
                  style={[styles.TextInput]}
                  placeholder="Email"
                  underlineColorAndroid={'transparent'}>
                  {this.state.currentUser.email}
                </TextInput>
              </View>
            </View>
          </View>
          <View style={styles.itemContainer}>
            <View>
              <Image
                style={styles.itemIconImage}
                source={require('../assets/icons/editprofile/phone.png')}
              />
              <View>
                <Text style={styles.text}>Phone Number</Text>
                <TextInput
                  editable={false}
                  style={[styles.TextInput]}
                  placeholder="Phone Number"
                  underlineColorAndroid={'transparent'}>
                  {this.state.currentUser.phone_number}
                </TextInput>
              </View>
            </View>
          </View>
          <View style={styles.itemContainer}>
            <View>
              <Image
                style={styles.itemIconImage}
                source={require('../assets/icons/editprofile/address.png')}
              />
              <View>
                <Text style={styles.text}>Address</Text>
                <TextInput
                  editable={false}
                  style={[styles.TextArea]}
                  placeholder="Phone Number"
                  underlineColorAndroid={'transparent'}
                  multiline={true}
                  numberOfLines={10}>
                  {this.state.currentUser.address}
                </TextInput>
              </View>
            </View>
          </View>
          <View style={styles.itemContainer}>
            <View>
              <Image
                style={styles.itemIconImage}
                source={require('../assets/icons/editprofile/gender.png')}
              />
              <View>
                <Text style={styles.text}>Gender</Text>
                <TextInput
                  editable={false}
                  style={[styles.TextInput]}
                  placeholder="Phone Number"
                  underlineColorAndroid={'transparent'}>
                  {this.state.gender}
                </TextInput>
              </View>
            </View>
          </View>
          <View style={styles.itemContainer}>
            <View>
              <Image
                style={styles.itemIconImage}
                source={require('../assets/icons/editprofile/position.png')}
              />
              <View>
                <Text style={styles.text}>Position</Text>
                <TextInput
                  editable={false}
                  style={[styles.TextInput]}
                  placeholder="Position"
                  underlineColorAndroid={'transparent'}>
                  {this.state.currentUser.position}
                </TextInput>
              </View>
            </View>
          </View>
          <View style={styles.itemContainer}>
            <View>
              <Image
                style={styles.itemIconImage}
                source={require('../assets/icons/editprofile/agency.png')}
              />
              <View>
                <Text style={styles.text}>Company/Institution</Text>
                <TextInput
                  editable={false}
                  style={[styles.TextInput]}
                  placeholder="Company/Institution"
                  underlineColorAndroid={'transparent'}>
                  {this.state.companyName}
                </TextInput>
              </View>
            </View>
          </View>
          {/* <TouchableOpacity
          style={[styles.button]}
          onPress={() => this.goToEditProfile()}>
          <Text style={[styles.textbutton]}>EDIT PROFILE</Text>
        </TouchableOpacity> */}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  TextInput: {
    fontSize: 16,
    alignSelf: 'stretch',
    width: 320,
    height: 50,
    marginBottom: -10,
    color: '#000',
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    marginLeft: 15,
  },
  TextArea: {
    fontSize: 18,
    alignSelf: 'stretch',
    width: 320,
    height: 100,
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
    borderRadius: 100,
    width: 110,
    height: 110,
    marginTop: '5%',
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