import React, {Component} from 'react';
import {
  StyleSheet,
  Image,
  ImageBackground,
  Text,
  View,
  Dimensions,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Col, Row, Grid} from 'react-native-easy-grid';
import DropDownItem from 'react-native-drop-down-item';
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
    const {navigate} = this.props.navigation;
    return (
      <Grid>
        <Row size={13}>
          <View style={styles.container}>
            <View style={styles.topheader}>
              <Image
                style={styles.gear}
                source={require('../assets/icons/setting/help-tr.png')}
              />
              <Text style={styles.titlesetting}>Help & Feedback</Text>
              {/* <Image
            style={styles.icontop}
            source={require('../assets/logo/settingwhite.png')}
          /> */}
            </View>
            <ScrollView
              style={{alignSelf: 'stretch', marginTop: 180, marginLeft: 10}}>
              {this.state.contents
                ? this.state.contents.map((param, i) => {
                    return (
                      <DropDownItem
                        key={i}
                        style={styles.dropDownItem}
                        contentVisible={false}
                        invisibleImage={'x'}
                        visibleImage={'-'}
                        header={
                          <View>
                            <Text
                              style={{
                                fontSize: 18,
                                color: 'black',
                                fontWeight: 'bold',
                              }}>
                              {param.title}
                            </Text>
                          </View>
                        }>
                        <Text
                          style={[
                            styles.txt,
                            {
                              fontSize: 18,
                            },
                          ]}>
                          {param.body}
                        </Text>
                      </DropDownItem>
                    );
                  })
                : null}
              <View style={{height: 96}} />
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
  logo: {
    width: 360,
    marginTop: 0,
    marginBottom: 70,
  },
  Row: {
    height: 40,
    marginTop: -25,
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
