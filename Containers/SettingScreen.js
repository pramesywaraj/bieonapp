import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Alert,
  TouchableOpacity,
  TouchableNativeFeedback,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome5';

class SettingScreen extends Component {
  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);
  }

  onAlert = (title, message) => {
    return Alert.alert(title, message, [
      {text: 'Ok', onPress: () => console.log('Pressed')},
    ]);
  };

  async logout() {
    const {navigate} = this.props.navigation;

    try {
      await AsyncStorage.removeItem('@userCoordinate');
      await AsyncStorage.removeItem('@userData');
      await AsyncStorage.removeItem('@userAuth');
      this.onAlert('Logout', 'You are logout from application');
      navigate('Auth');
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topheader}>
          <Image
            style={styles.gear}
            source={require('../assets/icons/setting/settingtransparan.png')}
          />
          <Text style={styles.titlesetting}>Settings</Text>
        </View>
        <View style={styles.menuContainer}>
          <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => {
              this.props.navigation.navigate('PrivacyPolicyScreen');
            }}>
            <Image
              style={styles.itemIconImage}
              source={require('../assets/icons/setting/privacy.png')}
            />
            <Text style={styles.itemText}>Privacy Policy</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => {
              this.props.navigation.navigate('TermsConditionScreen');
            }}>
            <Image
              style={styles.itemIconImage}
              source={require('../assets/icons/setting/terms.png')}
            />
            <Text style={styles.itemText}>Terms & Condition</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => {
              this.props.navigation.navigate('HelpFeedbackScreen');
            }}>
            <Image
              style={styles.itemIconImage}
              source={require('../assets/icons/setting/help.png')}
            />
            <Text style={styles.itemText}>Help & Feedback</Text>
          </TouchableOpacity>
        </View>
        <TouchableNativeFeedback
          onPress={this.logout}
          background={TouchableNativeFeedback.SelectableBackground()}>
          <View style={styles.logoutButton}>
            <Icon size={20} color="#fff" name="sign-out-alt" />
            <Text style={styles.textButton}>LOGOUT</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    );
  }
}
export default SettingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    height: '100%',
  },
  itemContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    color: '#808080',
    width: '100%',
    padding: '3%',
    borderBottomColor: '#808080',
    borderBottomWidth: 1,
    marginBottom: 30,
  },
  menuContainer: {
    marginTop: '15%',
    width: '100%',
  },
  itemIconImage: {
    resizeMode: 'contain',
    width: 30,
    height: 30,
  },
  itemText: {
    color: 'gray',
    marginLeft: 13,
    fontSize: 18,
  },
  logoutButton: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 20,
    height: 'auto',
    width: '60%',
    padding: '3%',
    backgroundColor: '#129cd8',
    alignSelf: 'center',
    paddingTop: 15,
    paddingBottom: 15,
  },
  textButton: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '700',
    paddingLeft: '5%',
  },
  textmenu: {
    fontSize: 10,
    marginTop: 5,
    color: '#808080',
  },
  topheader: {
    height: '20%',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    backgroundColor: '#129cd8',
    width: '100%',
  },
  gear: {
    width: 120,
    height: 120,
    position: 'relative',
  },
  titlesetting: {
    fontSize: 25,
    color: '#ffffff',
    left: '10%',
    top: '18%',
    position: 'absolute',
  },
});
