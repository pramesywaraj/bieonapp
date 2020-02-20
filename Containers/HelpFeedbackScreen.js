import React, {Component} from 'react';
import {StyleSheet, Image, Text, View, ScrollView} from 'react-native';

import Accordion from '@dooboo-ui/native-accordion';
export default class HelpFeedbackScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contents: [
        {
          title: '1. Apa itu Bieon Salt Smart Detector?' + '\n',
          body:
            '• Bieon Salt Smart Detector adalah alat ukur digital untuk mengukur kualitas garam dengan hasil pengukuran realtime',
        },
        {
          title:
            '2. Parameter apa saja yang dapat diukur dengan menggunakan Bieon Salt Smart Detector?' +
            '\n',
          body:
            '• Bieon Salt Smart Detector dapat digunakan untuk mengukur Kadar NaCl, derajat putih (whiteness) dan Kadar Air (water content) garam yang masih berbentuk kristal.' +
            '\n' +
            '\n' +
            '• Range pengukuran Bieon Salt Smart Detector yaitu :' +
            '\n' +
            'NaCl = 80% – 99.99%' +
            '\n' +
            'Whiteness = 45% – 95%' +
            '\n' +
            'Kadar Air   = 0.5% – 12%',
        },
        {
          title: '3. Apa saja keunggulan Bieon Salt Smart Detector?' + '\n',
          body:
            '• Dapat mengukur 3 parameter kualitas garam dengan waktu yang bersamaan' +
            '\n' +
            '\n' +
            '• Hasil pengukuran yang akurat' +
            '\n' +
            '\n' +
            '• Hasil pengukuran dapat langsung dicetak (print)' +
            '\n' +
            '\n' +
            '• Ukuran yang kecil dan portable' +
            '\n' +
            '\n' +
            '• Sudah tersertifikasi oleh syscal' +
            '\n' +
            '\n' +
            '• Menggunakan baterai yang dapat diisi ulang',
        },
        {
          title: '4. Apakah Bieon Salt Smart Detector Ready Stock?' + '\n',
          body:
            '• Pembelian Bieon Salt Smart Detector indent dengan waktu maksimal 45 hari kerja setelah PO diterima',
        },
        {
          title: '5. Berapa harga Bieon Salt Smart Detector?' + '\n',
          body: '• Silahkan hubungi contact center : +6282320007800',
        },
        {
          title: '6. Apakah ada garansi untuk barang yang dibeli?' + '\n',
          body:
            '• Garansi Spare Part : 1 bulan' +
            '\n' +
            '• Garansi Service : 6 bulan',
        },
        {
          title:
            '7.Apabila pada saat penggunaan, ditemui kendala. Apakah yang harus dilakukan?' +
            '\n',
          body: '• Silahkan hubungi contact center : +6282320007800',
        },
        {
          title: '8. Mengapa struk/kertas hasil print tidak keluar?' + '\n',
          body:
            '• Hasil pengukuran dapat langsung dicetak (print) dengan menekan tombol “PRINT”' +
            'pada alat. Bila setelah ditekan tombol “PRINT” tapi tidak keluar kertas, dapat' +
            'dikarenakan kertas printer telah habis. Silahkan melakukan pengisian ulang (refill)' +
            'kertas printer. Cara mengisi kertas printer dapat dilihat pada video berikut.',
        },
        {
          title:
            '9. Kapan Bieon Salt Smart Detector harus dicharge / isi ulang baterai?' +
            '\n',
          body:
            '• Status baterai Bieon Salt Smart Detector bisa dilihat dilihat melalui aplikasi pada menu “Device info” dan bisa di charge melalui wireless charger.',
        },
        {
          title:
            '10. Kapan Bieon Salt Smart Detector harus dikalibrasi?' + '\n',
          body:
            '• Bieon Salt Smart Detector disarankan untuk dikalibrasi setiap 1 tahun sekali.',
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
