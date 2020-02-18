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

export default class TermsConditionScreen extends Component {
  render() {
    const {navigate} = this.props.navigation;
    return (
      <Grid>
        <Row size={13}>
          <View style={styles.container}>
            <View style={styles.topheader}>
              <Image
                style={styles.gear}
                source={require('../assets/icons/setting/term-tr.png')}
              />
              <Text style={styles.titlesetting}>Terms & Condition</Text>
              {/* <Image
            style={styles.icontop}
            source={require('../assets/logo/settingwhite.png')}
          /> */}
            </View>
            <ScrollView style={{marginTop: 180}}>
              <Text style={[styles.text]}>Terms and conditions </Text>
              <Text style={[styles.text]}>
                {' '}
                These terms and conditions ("Terms", "Agreement") are an
                agreement between Mobile Application Developer ("Mobile
                Application Developer", "us", "we" or "our") and you ("User",
                "you" or "your"). This Agreement sets forth the general terms
                and conditions of your use of the BIEON mobile application and
                any of its products or services (collectively, "Mobile
                Application" or "Services").
              </Text>
              <Text style={[styles.text]}>Accounts and membership</Text>
              <Text style={[styles.text]}>
                {' '}
                If you create an account in the Mobile Application, you are
                responsible for maintaining the security of your account and you
                are fully responsible for all activities that occur under the
                account and any other actions taken in connection with it. We
                may, but have no obligation to, monitor and review new accounts
                before you may sign in and use our Services. Providing false
                contact information of any kind may result in the termination of
                your account. You must immediately notify us of any unauthorized
                uses of your account or any other breaches of security. We will
                not be liable for any acts or omissions by you, including any
                damages of any kind incurred as a result of such acts or
                omissions. We may suspend, disable, or delete your account (or
                any part thereof) if we determine that you have violated any
                provision of this Agreement or that your conduct or content
                would tend to damage our reputation and goodwill. If we delete
                your account for the foregoing reasons, you may not re-register
                for our Services. We may block your email address and Internet
                protocol address to prevent further registration.
              </Text>
              <Text style={[styles.text]}>Backups</Text>
              <Text style={[styles.text]}>
                {' '}
                We are not responsible for Content residing in the Mobile
                Application. In no event shall we be held liable for any loss of
                any Content. It is your sole responsibility to maintain
                appropriate backup of your Content. Notwithstanding the
                foregoing, on some occasions and in certain circumstances, with
                absolutely no obligation, we may be able to restore some or all
                of your data that has been deleted as of a certain date and time
                when we may have backed up data for our own purposes. We make no
                guarantee that the data you need will be available.
              </Text>
              <Text style={[styles.text]}>
                Links to other mobile applications
              </Text>
              <Text style={[styles.text]}>
                {' '}
                Although this Mobile Application may link to other mobile
                applications, we are not, directly or indirectly, implying any
                approval, association, sponsorship, endorsement, or affiliation
                with any linked mobile application, unless specifically stated
                herein. We are not responsible for examining or evaluating, and
                we do not warrant the offerings of, any businesses or
                individuals or the content of their mobile applications. We do
                not assume any responsibility or liability for the actions,
                products, services, and content of any other third-parties. You
                should carefully review the legal statements and other
                conditions of use of any mobile application which you access
                through a link from this Mobile Application. Your linking to any
                other off-site mobile applications is at your own risk.
              </Text>
              <Text style={[styles.text]}>Changes and amendments</Text>
              <Text style={[styles.text]}>
                {' '}
                We reserve the right to modify this Agreement or its policies
                relating to the Mobile Application or Services at any time,
                effective upon posting of an updated version of this Agreement
                in the Mobile Application. When we do, we will revise the
                updated date at the bottom of this page. Continued use of the
                Mobile Application after any such changes shall constitute your
                consent to such changes. Policy was created with
                https://www.WebsitePolicies.com
              </Text>
              <Text style={[styles.text]}>Acceptance of these terms</Text>
              <Text style={[styles.text]}>
                {' '}
                You acknowledge that you have read this Agreement and agree to
                all its terms and conditions. By using the Mobile Application or
                its Services you agree to be bound by this Agreement. If you do
                not agree to abide by the terms of this Agreement, you are not
                authorized to use or access the Mobile Application and its
                Services.
              </Text>
              <Text style={[styles.text]}>Contacting us</Text>
              <Text style={[styles.text]}>
                {' '}
                If you have any questions about this Agreement, please contact
                us. This document was last updated on February 3, 2020.
              </Text>
            </ScrollView>
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
    backgroundColor: '#f8f8f8',
  },
  textmenu: {
    fontSize: 10,
    marginTop: 5,
    color: '#808080',
  },
  topheader: {
    height: 150,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    position: 'absolute',
    top: 0,
    backgroundColor: '#129cd8',
    width: 420,
  },
  gear: {
    width: 120,
    height: 120,
  },
  titlesetting: {
    fontSize: 25,
    color: '#ffffff',
    top: 20,
    left: 20,
    position: 'absolute',
    textAlign: 'justify',
    borderStyle: 'solid',
  },
});
