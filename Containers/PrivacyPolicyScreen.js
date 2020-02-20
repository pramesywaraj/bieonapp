import React, {Component} from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  Dimensions,
  ScrollView,
} from 'react-native';

export default class PrivacyPolicyScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topheader}>
          <Image
            style={styles.gear}
            source={require('../assets/icons/setting/privacy-tr.png')}
          />
          <Text style={styles.titlesetting}>Privacy Policy</Text>
        </View>
        <ScrollView>
          <Text style={[styles.text]}> Privacy policy</Text>
          <Text style={[styles.text]}>
            {' '}
            This privacy policy ("Policy") describes how Mobile Application
            Developer ("Mobile Application Developer", "we", "us" or "our")
            collects, protects and uses the personally identifiable
            information ("Personal Information") you ("User", "you" or
            "your") may provide in the BIEON mobile application and any of
            its products or services (collectively, "Mobile Application" or
            "Services"). It also describes the choices available to you
            regarding our use of your Personal Information and how you can
            access and update this information. This Policy does not apply
            to the practices of companies that we do not own or control, or
            to individuals that we do not employ or manage.
          </Text>
          <Text style={[styles.text]}>
            Automatic collection of information
          </Text>
          <Text style={[styles.text]}>
            {' '}
            When you open the Mobile Application our servers automatically
            record information that your device sends. This data may include
            information such as your device's IP address and location,
            device name and version, operating system type and version,
            language preferences, information you search for in our Mobile
            Application, access times and dates, and other statistics.
            Information collected automatically is used only to identify
            potential cases of abuse and establish statistical information
            regarding Mobile Application traffic and usage. This statistical
            information is not otherwise aggregated in such a way that would
            identify any particular user of the system.
          </Text>
          <Text style={[styles.text]}>
            Collection ofpersonal information
          </Text>
          <Text style={[styles.text]}>
            You can visit the Mobile Application without telling us who you
            are or revealing any information by which someone could identify
            you as a specific, identifiable individual. If, however, you
            wish to use some of the Mobile Application's features, you will
            be asked to provide certain Personal Information (for example,
            your name and e-mail address). We receive and store any
            information you knowingly provide to us when you create an
            account, or fill any online forms in the Mobile Application.
            When required, this information may include the following:
          </Text>
          <Text style={[styles.text]}>
            {' '}
            - Personal details such as name, country of residence, etc.
          </Text>
          <Text style={[styles.text]}>
            {' '}
            - Contact information such as email address, address, etc.
          </Text>
          <Text style={[styles.text]}>
            {' '}
            - Account details such as user name, unique user ID, password,
            etc.
          </Text>

          <Text style={[styles.text]}>
            {' '}
            - Geolocation data of the mobile device such as latitude and
            longitude.
          </Text>

          <Text style={[styles.text]}>
            {' '}
            - Certain features on the mobile device such as contacts,
            calendar, gallery, etc.
          </Text>

          <Text style={[styles.text]}>
            {' '}
            - Information about other individuals such as your family
            members, friends, etc.
          </Text>

          <Text style={[styles.text]}>
            {' '}
            - Any other materials you willingly submit to us such as
            articles, images, feedback, etc.
          </Text>
          <Text style={[styles.text]}>
            {' '}
            You can choose not to provide us with your Personal Information,
            but then you may not be able to take advantage of some of the
            Mobile Application's features. Users who are uncertain about
            what information is mandatory are welcome to contact us.
          </Text>
          <Text style={[styles.text]}>Managing personal information</Text>
          <Text style={[styles.text]}>
            {' '}
            You are able to delete certain Personal Information we have
            about you. The Personal Information you can delete may change as
            the Mobile Application or Services change. When you delete
            Personal Information, however, we may maintain a copy of the
            unrevised Personal Information in our records for the duration
            necessary to comply with our obligations to our affiliates and
            partners, and for the purposes described below.
          </Text>
          <Text style={[styles.text]}>Storing personal information</Text>
          <Text style={[styles.text]}>
            {' '}
            We will retain and use your Personal Information for the period
            necessary to comply with our legal obligations, resolve
            disputes, and enforce our agreements unless a longer retention
            period is required or permitted by law. We may use any
            aggregated data derived from or incorporating your Personal
            Information after you update or delete it, but not in a manner
            that would identify you personally. Once the retention period
            expires, Personal Information shall be deleted. Therefore, the
            right to access, the right to erasure, the right to
            rectification and the right to data portability cannot be
            enforced after the expiration of the retention period.
          </Text>
          <Text style={[styles.text]}>
            Use and processing of collected information
          </Text>
          <Text style={[styles.text]}>
            {' '}
            In order to make our Mobile Application and Services available
            to you, or to meet a legal obligation, we need to collect and
            use certain Personal Information. If you do not provide the
            information that we request, we may not be able to provide you
            with the requested products or services. Some of the information
            we collect is directly from you via our Mobile Application.
            However, we may also collect Personal Information about you from
            other sources. Any of the information we collect from you may be
            used for the following purposes:
          </Text>
          <Text style={[styles.text]}>
            {' '}
            - Create and manage user accounts - Send administrative
            information
          </Text>
          <Text style={[styles.text]}>
            {' '}
            - Respond to inquiries and offer support - Request user feedback
          </Text>
          <Text style={[styles.text]}>
            {' '}
            - Improve user experience - Enforce terms and conditions and
            policies
          </Text>
          <Text style={[styles.text]}>
            {' '}
            - Protect from abuse and malicious users
          </Text>
          <Text style={[styles.text]}>
            {' '}
            - Respond to legal requests and prevent harm
          </Text>
          <Text style={[styles.text]}>
            {' '}
            - Run and operate our Mobile Application and Services{' '}
          </Text>
          <Text style={[styles.text]}>
            {' '}
            Processing your Personal Information depends on how you interact
            with our Mobile Application, where you are located in the world
            and if one of the following applies: (i) You have given your
            consent for one or more specific purposes. This, however, does
            not apply, whenever the processing of Personal Information is
            subject to European data protection law; (ii) Provision of
            information is necessary for the performance of an agreement
            with you and/or for any pre-contractual obligations thereof;
            (iii) Processing is necessary for compliance with a legal
            obligation to which you are subject; (iv) Processing is related
            to a task that is carried out in the public interest or in the
            exercise of official authority vested in us; (v) Processing is
            necessary for the purposes of the legitimate interests pursued
            by us or by a third party.
          </Text>
          <Text style={[styles.text]}>
            {' '}
            Note that under some legislations we may be allowed to process
            information until you object to such processing (by opting out),
            without having to rely on consent or any other of the following
            legal bases below. In any case, we will be happy to clarify the
            specific legal basis that applies to the processing, and in
            particular whether the provision of Personal Information is a
            statutory or contractual requirement, or a requirement necessary
            to enter into a contract.{' '}
          </Text>
          <Text style={[styles.text]}>The rights of users</Text>
          <Text style={[styles.text]}>
            {' '}
            You may exercise certain rights regarding your information
            processed by us. In particular, you have the right to do the
            following: (i) you have the right to withdraw consent where you
            have previously given your consent to the processing of your
            information; (ii) you have the right to object to the processing
            of your information if the processing is carried out on a legal
            basis other than consent; (iii) you have the right to learn if
            information is being processed by us, obtain disclosure
            regarding certain aspects of the processing and obtain a copy of
            the information undergoing processing; (iv) you have the right
            to verify the accuracy of your information and ask for it to be
            updated or corrected; (v) you have the right, under certain
            circumstances, to restrict the processing of your information,
            in which case, we will not process your information for any
            purpose other than storing it; (vi) you have the right, under
            certain circumstances, to obtain the erasure of your Personal
            Information from us; (vii) you have the right to receive your
            information in a structured, commonly used and machine readable
            format and, if technically feasible, to have it transmitted to
            another controller without any hindrance. This provision is
            applicable provided that your information is processed by
            automated means and that the processing is based on your
            consent, on a contract which you are part of or on
            pre-contractual obligations thereof.
          </Text>
          <Text style={[styles.text]}>Privacy of children</Text>
          <Text style={[styles.text]}>
            {' '}
            We do not knowingly collect any Personal Information from
            children under the age of 13. If you are under the age of 13,
            please do not submit any Personal Information through our Mobile
            Application or Service. We encourage parents and legal guardians
            to monitor their children's Internet usage and to help enforce
            this Policy by instructing their children never to provide
            Personal Information through our Mobile Application or Service
            without their permission.{' '}
          </Text>
          <Text style={[styles.text]}>
            {' '}
            If you have reason to believe that a child under the age of 13
            has provided Personal Information to us through our Mobile
            Application or Service, please contact us. You must also be old
            enough to consent to the processing of your Personal Information
            in your country (in some countries we may allow your parent or
            guardian to do so on your behalf).{' '}
          </Text>
          <Text style={[styles.text]}>
            Links to other mobile applications{' '}
          </Text>
          <Text style={[styles.text]}>
            {' '}
            Our Mobile Application contains links to other mobile
            applications that are not owned or controlled by us. Please be
            aware that we are not responsible for the privacy practices of
            such other mobile applications or third-parties. We encourage
            you to be aware when you leave our Mobile Application and to
            read the privacy statements of each and every mobile application
            that may collect Personal Information. Information security We
            secure information you provide on computer servers in a
            controlled, secure environment, protected from unauthorized
            access, use, or disclosure. We maintain reasonable
            administrative, technical, and physical safeguards in an effort
            to protect against unauthorized access, use, modification, and
            disclosure of Personal Information in its control and custody.
            However, no data transmission over the Internet or wireless
            network can be guaranteed. Therefore, while we strive to protect
            your Personal Information, you acknowledge that (i) there are
            security and privacy limitations of the Internet which are
            beyond our control; (ii) the security, integrity, and privacy of
            any and all information and data exchanged between you and our
            Mobile Application cannot be guaranteed; and (iii) any such
            information and data may be viewed or tampered with in transit
            by a third-party, despite best efforts.{' '}
          </Text>
          <Text style={[styles.text]}>Data breach</Text>
          <Text style={[styles.text]}>
            {' '}
            In the event we become aware that the security of the Mobile
            Application has been compromised or users Personal Information
            has been disclosed to unrelated third parties as a result of
            external activity, including, but not limited to, security
            attacks or fraud, we reserve the right to take reasonably
            appropriate measures, including, but not limited to,
            investigation and reporting, as well as notification to and
            cooperation with law enforcement authorities. In the event of a
            data breach, we will make reasonable efforts to notify affected
            individuals if we believe that there is a reasonable risk of
            harm to the user as a result of the breach or if notice is
            otherwise required by law. When we do, we will post a notice in
            the Mobile Application, send you an email, get in touch with you
            over the phone, mail you a letter.{' '}
          </Text>
          <Text style={[styles.text]}>Legal disclosure</Text>
          <Text style={[styles.text]}>
            {' '}
            We will disclose any information we collect, use or receive if
            required or permitted by law, such as to comply with a subpoena,
            or similar legal process, and when we believe in good faith that
            disclosure is necessary to protect our rights, protect your
            safety or the safety of others, investigate fraud, or respond to
            a government request.{' '}
          </Text>
          <Text style={[styles.text]}>Changes and amendments </Text>
          <Text style={[styles.text]}>
            {' '}
            We may update this Privacy Policy from time to time in our
            discretion and will notify you of any material changes to the
            way in which we treat Personal Information. When changes are
            made, we will revise the updated date at the bottom of this
            page. We may also provide notice to you in other ways in our
            discretion, such as through contact information you have
            provided. Any updated version of this Privacy Policy will be
            effective immediately upon the posting of the revised Privacy
            Policy unless otherwise specified. Your continued use of the
            Mobile Application or Services after the effective date of the
            revised Privacy Policy (or such other act specified at that
            time) will constitute your consent to those changes. However, we
            will not, without your consent, use your Personal Data in a
            manner materially different than what was stated at the time
            your Personal Data was collected. Policy was created with
            https://www.WebsitePolicies.com{' '}
          </Text>
          <Text style={[styles.text]}>Acceptance of this policy</Text>
          <Text style={[styles.text]}>
            {' '}
            You acknowledge that you have read this Policy and agree to all
            its terms and conditions. By using the Mobile Application or its
            Services you agree to be bound by this Policy. If you do not
            agree to abide by the terms of this Policy, you are not
            authorized to use or access the Mobile Application and its
            Services.{' '}
          </Text>
          <Text style={[styles.text]}>Contacting us </Text>
          <Text style={[styles.text]}>
            {' '}
            If you have any questions about this Policy, please contact us.
            This document was last updated on February 3, 2020
          </Text>
        </ScrollView>
      </View>
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
    fontSize: 16,
    marginTop: 15,
    margin: 15,
    textAlign: 'justify',
    color: '#474747',
    fontWeight: '600',
  },
  topheader: {
    height: '20%',
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
