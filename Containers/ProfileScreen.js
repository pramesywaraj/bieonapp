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
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Image
            style={styles.avatarImage}
            source={{
              uri: this.state.picture,
            }}
          />
          <TouchableOpacity
            style={styles.userEditButton}
            onPress={() => this.changePicture()}>
            <Icon
              name="image"
              style={styles.userEditIcon}
              onPress={() => this.changePicture()}
            />
          </TouchableOpacity>
          <Text style={styles.textName}>{this.state.currentUser.fullname}</Text>
        </View>
        <ScrollView contentContainerStyle={styles.scrollviewContainer}>
          <View style={styles.itemContainer}>
            <View style={styles.textContainer}>
              <Image
                style={styles.itemIconImage}
                source={require('../assets/icons/editprofile/email.png')}
              />
              <View>
                <Text style={styles.text}>Email</Text>
                <TextInput
                  editable={false}
                  style={styles.TextInput}
                  placeholder="Email"
                  underlineColorAndroid={'transparent'}
                  value={this.state.currentUser.email}
                />
              </View>
            </View>
            <View style={styles.textContainer}>
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
            <View style={styles.textContainer}>
              <Image
                style={styles.itemIconImage}
                source={require('../assets/icons/editprofile/address.png')}
              />
              <View>
                <Text style={styles.text}>Address</Text>
                <TextInput
                  editable={false}
                  style={[styles.TextInput]}
                  underlineColorAndroid={'transparent'}
                  multiline={false}
                  numberOfLines={2}>
                  {this.state.currentUser.address}
                </TextInput>
              </View>
            </View>
            <View style={styles.textContainer}>
              <Image
                style={styles.itemIconImage}
                source={require('../assets/icons/editprofile/gender.png')}
              />
              <View>
                <Text style={styles.text}>Gender</Text>
                <TextInput
                  editable={false}
                  style={[styles.TextInput]}
                  underlineColorAndroid={'transparent'}>
                  {this.state.gender}
                </TextInput>
              </View>
            </View>
            <View style={styles.textContainer}>
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
            <View style={styles.textContainer}>
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
            {/* <TouchableOpacity
          style={[styles.button]}
          onPress={() => this.goToEditProfile()}>
          <Text style={[styles.textbutton]}>EDIT PROFILE</Text>
        </TouchableOpacity> */}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const dim = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    top: '-1%',
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  userEditButton: {
    zIndex: 15,
    padding: '2%',
    backgroundColor: 'white',
    left: 40,
    bottom: 20,
    borderRadius: 100,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  userEditIcon: {
    fontSize: 20,
    color: '#129cd8',
  },
  avatarImage: {
    borderRadius: 100,
    width: 110,
    height: 110,
    marginTop: '10%',
    borderWidth: 1,
  },
  textName: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 17,
    top: '-4%',
    paddingBottom: '5%',
  },
  scrollviewContainer: {
    width: 'auto',
  },
  itemContainer: {
    width: '100%',
    paddingLeft: '5%',
    paddingRight: '5%',
    marginBottom: 20,
    marginTop: 10,
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: '5%',
    borderColor: '#b5b5b5',
    borderBottomWidth: 1,
  },
  TextInput: {
    fontSize: 16,
    color: '#000',
    width: '100%',
    padding: 0,
  },
  itemIconImage: {
    resizeMode: 'contain',
    width: 30,
    height: 30,
    marginRight: '5%',
  },
  text: {
    fontSize: 12,
    color: '#757575',
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
});
