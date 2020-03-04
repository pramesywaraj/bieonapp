import React, {Component} from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Alert,
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
      email: '',
      fullname: '',
      phone_number: '',
      address: '',
      company_id: '',
      position: '',
      picture_user: '',
      token: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount() {
    const getParam = () => {
      const {data} = this.props.navigation.state.params;
      const {
        email,
        fullname,
        phone_number,
        address,
        company_id,
        position,
        picture_user,
        token,
      } = data;
      this.setState({
        email,
        fullname,
        phone_number,
        address,
        company_id,
        position,
        picture_user,
        token,
      });
    };

    getParam();
  }

  handleChange(name, value) {
    this.setState({[name]: value});
  }

  onAlert = (title, message) => {
    return Alert.alert(title, message, [
      {text: 'Ok', onPress: () => console.log('Pressed')},
    ]);
  };

  async saveProfile() {
    const {state, goBack} = this.props.navigation;
    state.params.refresh();
    goBack();
    // try {
    //   const {navigate} = this.props.navigation;
    //   let response = await axios.patch(
    //     `${Config.API_URL}/auth/update`,
    //     {
    //       fullname: 'a',
    //       Address: 'Test',
    //     },
    //     {
    //       headers: {
    //         'Content-Type': 'application/json',
    //         token: await AsyncStorage.getItem('@userAuth'),
    //       },
    //     },
    //   );
    //   this.onAlert('Success', 'Data has been edited.');
    //   navigate('ProfileScreen');
    //   console.log('what?', response.config.data);
    // } catch (err) {
    //   this.onAlert(
    //     'There is an error',
    //     'There is an error when save data. Please try again',
    //   );
    //   console.log('There is an error pada bagian konten', err);
    // }
  }

  render() {
    const {phone_number, fullname, address} = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.titleText}>Edit User Profile</Text>
        <View style={styles.itemContainer}>
          <View style={styles.textContainer}>
            <Image
              style={styles.itemIconImage}
              source={require('../assets/icons/editprofile/profile.png')}
            />
            <View style={styles.textWrapper}>
              <Text style={styles.text}>Full Name</Text>
              <TextInput
                editable={true}
                style={[styles.TextInput]}
                placeholder="Full Name"
                underlineColorAndroid={'transparent'}
                value={fullname}
                onChange={value => this.handleChange('fullname', value)}
              />
            </View>
          </View>
          <View style={styles.textContainer}>
            <Image
              style={styles.itemIconImage}
              source={require('../assets/icons/editprofile/phone.png')}
            />
            <View style={styles.textWrapper}>
              <Text style={styles.text}>Phone Number</Text>
              <TextInput
                editable={true}
                style={[styles.TextInput]}
                placeholder="Phone Number"
                underlineColorAndroid={'transparent'}
                value={phone_number}
                onChange={value => this.handleChange('phone_number', value)}
              />
            </View>
          </View>
          <View style={styles.textContainer}>
            <Image
              style={styles.itemIconImage}
              source={require('../assets/icons/editprofile/address.png')}
            />
            <View style={styles.textWrapper}>
              <Text style={styles.text}>Address</Text>
              <TextInput
                editable={true}
                style={[styles.TextInput]}
                underlineColorAndroid={'transparent'}
                multiline={true}
                numberOfLines={3}
                value={address}
                onChange={value => this.handleChange('address', value)}
              />
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={[styles.button]}
          onPress={() => this.saveProfile()}>
          <Text style={[styles.textbutton]}>SAVE</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const win = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: '5%',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  itemContainer: {
    // width: '100%',
    paddingLeft: '5%',
    paddingRight: '5%',
    marginBottom: '5%',
    marginTop: '10%',
  },
  textContainer: {
    flexDirection: 'row',
    maxWidth: '100%',
    alignItems: 'center',
    marginBottom: '5%',
    borderColor: '#b5b5b5',
    borderBottomWidth: 1,
  },
  textWrapper: {width: '80%'},
  TextInput: {
    fontSize: 16,
    color: '#000',
    padding: 0,
    borderWidth: 1,
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
