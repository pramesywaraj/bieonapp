import React, {Component} from 'react';
import {StyleSheet, Image, Text, View, ScrollView} from 'react-native';

import Accordion from '@dooboo-ui/native-accordion';
export default class HelpFeedbackScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contents: [
        {
          title: '1. What is a Bieon Salt Smart Detector?' + '\n',
          body:
            '• Bieon Salt Smart Detector is a digital measuring tool to measure salt quality with realtime measurement results',
        },
        {
          title:
            '2. What parameters can be measured using the Bieon Salt Smart Detector?' +
            '\n',
          body:
            '• Bieon Salt Smart Detector can be used to measure NaCl levels, whiteness and water content of crystals that are still crystalline.' +
            '\n' +
            '\n' +
            '• Bieon Salt Smart Detector measurement ranges are :' +
            '\n' +
            'NaCl = 80% – 99.99%' +
            '\n' +
            'Whiteness = 45% – 95%' +
            '\n' +
            'Moisture content = 0.5% – 12%',
        },
        {
          title:
            '3. What are the benefits of Bieon Salt Smart Detector?' + '\n',
          body:
            '• Can measure 3 parameters of salt quality at the same time' +
            '\n' +
            '\n' +
            '• Accurate measurement results' +
            '\n' +
            '\n' +
            '• The measurement results can be directly printed (print)' +
            '\n' +
            '\n' +
            '• Small and portable size' +
            '\n' +
            '\n' +
            '• Has been certified by Syscal' +
            '\n' +
            '\n' +
            '• Use a rechargeable battery',
        },
        {
          title: '4. Is the Bieon Salt Smart Detector Ready Stock?' + '\n',
          body:
            '• Purchase a Bieon Salt Smart Detector indent within a maximum of 45 working days after PO is received.',
        },
        {
          title: '5. What is the price of a Bieon Salt Smart Detector?' + '\n',
          body: '• Please contact the contact centre: +6282320007800',
        },
        {
          title: '6. Is there a warranty for the items purchased?' + '\n',
          body:
            '• Spare Part Warranty: 1 month' +
            '\n' +
            '• Service warranty: 6 months',
        },
        {
          title:
            '7. If during use, obstacles are encountered. What should be done?' +
            '\n',
          body: '• Please contact the contact centre: +6282320007800',
        },
        {
          title: '8. Why doesnt the printed receipt / paper come out?' + '\n',
          body:
            '• The measurement results can be printed directly by pressing the "PRINT" button on the device. If after' +
            'pressing the "PRINT" button but no paper comes out, it could be because the printer paper has run out.' +
            'Please refill the printer paper. How to load printer paper can be seen in the following video.',
        },
        {
          title:
            '9. When does the Bieon Salt Smart Detector need to be charged / recharged?' +
            '\n',
          body:
            '• The status of the Bieon Salt Smart Detector battery can be viewed through an application in the "Device info" menu and can be charged via a wireless charger.',
        },
        {
          title:
            '10. When must the Bieon Salt Smart Detector be calibrated?' + '\n',
          body:
            '• Bieon Salt Smart Detector is recommended to be calibrated once every 1 year.',
        },
      ],
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topheader}>
          <Image
            style={styles.backgroundIcon}
            source={require('../assets/icons/setting/help-tr.png')}
          />
          <Text style={styles.titlesetting}>Help & Feedback</Text>
        </View>
        <ScrollView style={styles.faqContainer}>
          {this.state.contents
            ? this.state.contents.map((param, i) => {
                return (
                  <Accordion
                    key={i}
                    contentVisible={false}
                    invisibleImage={'x'}
                    visibleImage={'-'}
                    header={
                      <Text
                        style={{
                          fontSize: 18,
                          color: '#129cd8',
                          fontWeight: 'bold',
                        }}>
                        {param.title}
                      </Text>
                    }>
                    <Text
                      style={[
                        styles.dropDownText,
                        {
                          fontSize: 15,
                        },
                      ]}>
                      {param.body}
                    </Text>
                  </Accordion>
                );
              })
            : null}
          <View style={{height: 96}} />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  faqContainer: {
    padding: '5%',
    height: '100%',
  },
  dropDownItem: {
    padding: 0,
  },
  dropDownText: {
    paddingTop: 0,
  },
  topheader: {
    height: '20%',
    backgroundColor: '#129cd8',
    width: '100%',
  },
  backgroundIcon: {
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
