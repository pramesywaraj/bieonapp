import React, {Component} from 'react';
import {
  Platform,
  DeviceEventEmitter,
  NativeEventEmitter,
  ToastAndroid,
  StyleSheet,
  ScrollView,
  View,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import Config from 'react-native-config';
import {
  BluetoothEscposPrinter,
  BluetoothManager,
} from 'react-native-bluetooth-escpos-printer';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import Share from 'react-native-share';
import moment from 'moment';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import BluetoothListModal from '../Components/Modal/BluetoothListModal';
import DateFilterModal from '../Components/Modal/DateFilterModal';
import LoadingModal from '../Components/Modal/LoadingModal';
import NaclTable from '../Components/Table/NaclTable';
import IodiumTable from '../Components/Table/IodiumTable';
import TableDataToolbar from '../Components/Toolbar/TableDataToolbar';
import TableDataHeader from '../Components/Toolbar/TableDataHeader';

import RNHTMLtoPDF from 'react-native-html-to-pdf';

const printSaltA = (saltDatas, userOperator, calibration) => {
  try {
    saltDatas.map(data => {
      BluetoothEscposPrinter.printerInit();
      BluetoothEscposPrinter.printerLeftSpace(0);

      BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.CENTER);
      BluetoothEscposPrinter.setBlob(0);
      BluetoothEscposPrinter.printText('Measurement Result\r\n', {
        encoding: 'GBK',
        codepage: 0,
        widthtimes: 1,
        heigthtimes: 1,
        fonttype: 1,
      });
      BluetoothEscposPrinter.printText('\r\n\r\n', {});

      let columnWidths = [14, 1, 17];
      BluetoothEscposPrinter.printColumn(
        columnWidths,
        [
          BluetoothEscposPrinter.ALIGN.LEFT,
          BluetoothEscposPrinter.ALIGN.CENTER,
          BluetoothEscposPrinter.ALIGN.RIGHT,
        ],
        ['No.Seri', ':', data.device_id],
        {},
      );
      BluetoothEscposPrinter.printColumn(
        columnWidths,
        [
          BluetoothEscposPrinter.ALIGN.LEFT,
          BluetoothEscposPrinter.ALIGN.CENTER,
          BluetoothEscposPrinter.ALIGN.RIGHT,
        ],
        ['Operator', ':', userOperator.toString()],
        {},
      );
      BluetoothEscposPrinter.printColumn(
        columnWidths,
        [
          BluetoothEscposPrinter.ALIGN.LEFT,
          BluetoothEscposPrinter.ALIGN.CENTER,
          BluetoothEscposPrinter.ALIGN.RIGHT,
        ],
        [
          'Tanggal/Jam',
          ':',
          moment(data.create_at)
            .format('DD/MM/YYYY HH:mm')
            .toString(),
        ],
        {},
      );
      BluetoothEscposPrinter.printColumn(
        columnWidths,
        [
          BluetoothEscposPrinter.ALIGN.LEFT,
          BluetoothEscposPrinter.ALIGN.CENTER,
          BluetoothEscposPrinter.ALIGN.RIGHT,
        ],
        ['Sample', ':', data.sample_name.toString()],
        {},
      );
      BluetoothEscposPrinter.printText('\r\n', {});

      BluetoothEscposPrinter.printColumn(
        columnWidths,
        [
          BluetoothEscposPrinter.ALIGN.LEFT,
          BluetoothEscposPrinter.ALIGN.CENTER,
          BluetoothEscposPrinter.ALIGN.RIGHT,
        ],
        ['NaCl', ':', data.nacl.toString()],
        {},
      );
      BluetoothEscposPrinter.printColumn(
        columnWidths,
        [
          BluetoothEscposPrinter.ALIGN.LEFT,
          BluetoothEscposPrinter.ALIGN.CENTER,
          BluetoothEscposPrinter.ALIGN.RIGHT,
        ],
        ['Whiteness', ':', data.whiteness.toString()],
        {},
      );
      BluetoothEscposPrinter.printColumn(
        columnWidths,
        [
          BluetoothEscposPrinter.ALIGN.LEFT,
          BluetoothEscposPrinter.ALIGN.CENTER,
          BluetoothEscposPrinter.ALIGN.RIGHT,
        ],
        ['Water Content', ':', data.water_content.toString()],
        {},
      );
      BluetoothEscposPrinter.printText('\r\n', {});
      BluetoothEscposPrinter.printText('================================', {});
      if (calibration === true) {
        BluetoothEscposPrinter.printText(
          'The device should be calibration\r\n',
          {},
        );
      } else {
        null;
      }

      BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.CENTER);
      BluetoothEscposPrinter.printPic(base64PngLogo, {
        width: 220,
        left: 60,
      });
      BluetoothEscposPrinter.printText('\r\n\r\n\r\n', {});
    });
  } catch (e) {
    alert(e.message || 'ERROR');
  }
};

const printSaltB = (saltDatas, userOperator, calibration) => {
  try {
    saltDatas.map(data => {
      BluetoothEscposPrinter.printerInit();
      BluetoothEscposPrinter.printerLeftSpace(0);

      BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.CENTER);
      BluetoothEscposPrinter.setBlob(0);
      BluetoothEscposPrinter.printText('Measurement Result\r\n', {
        encoding: 'GBK',
        codepage: 0,
        widthtimes: 1,
        heigthtimes: 1,
        fonttype: 1,
      });
      BluetoothEscposPrinter.printText('\r\n\r\n', {});

      let columnWidths = [14, 1, 17];
      BluetoothEscposPrinter.printColumn(
        columnWidths,
        [
          BluetoothEscposPrinter.ALIGN.LEFT,
          BluetoothEscposPrinter.ALIGN.CENTER,
          BluetoothEscposPrinter.ALIGN.RIGHT,
        ],
        ['No.Seri', ':', data.device_id],
        {},
      );
      BluetoothEscposPrinter.printColumn(
        columnWidths,
        [
          BluetoothEscposPrinter.ALIGN.LEFT,
          BluetoothEscposPrinter.ALIGN.CENTER,
          BluetoothEscposPrinter.ALIGN.RIGHT,
        ],
        ['Operator', ':', userOperator.toString()],
        {},
      );
      BluetoothEscposPrinter.printColumn(
        columnWidths,
        [
          BluetoothEscposPrinter.ALIGN.LEFT,
          BluetoothEscposPrinter.ALIGN.CENTER,
          BluetoothEscposPrinter.ALIGN.RIGHT,
        ],
        [
          'Tanggal/Jam',
          ':',
          moment(data.create_at)
            .format('DD/MM/YYYY HH:mm')
            .toString(),
        ],
        {},
      );
      BluetoothEscposPrinter.printColumn(
        columnWidths,
        [
          BluetoothEscposPrinter.ALIGN.LEFT,
          BluetoothEscposPrinter.ALIGN.CENTER,
          BluetoothEscposPrinter.ALIGN.RIGHT,
        ],
        ['Sample', ':', data.sample_name.toString()],
        {},
      );
      BluetoothEscposPrinter.printText('\r\n', {});

      BluetoothEscposPrinter.printColumn(
        columnWidths,
        [
          BluetoothEscposPrinter.ALIGN.LEFT,
          BluetoothEscposPrinter.ALIGN.CENTER,
          BluetoothEscposPrinter.ALIGN.RIGHT,
        ],
        ['Iodium', ':', data.iodium.toString()],
        {},
      );
      BluetoothEscposPrinter.printText('\r\n', {});
      BluetoothEscposPrinter.printText('================================', {});
      if (calibration === true) {
        BluetoothEscposPrinter.printText(
          'The device should be calibration\r\n',
          {},
        );
      } else {
        null;
      }
      BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.CENTER);
      BluetoothEscposPrinter.printPic(base64PngLogo, {
        width: 220,
        left: 60,
      });
      BluetoothEscposPrinter.printText('\r\n\r\n\r\n', {});
    });
  } catch (e) {
    alert(e.message || 'ERROR');
  }
};

const base64PngLogo =
  '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';
export default class HomeScreen extends Component {
  _listeners = [];

  constructor(props) {
    super(props);
    this.state = {
      devices: null,
      deviceName: '',
      pairedDs: [],
      foundDs: [],
      loading: false,
      boundAddress: '',
      debugMsg: '',
      modalVisible: false,
      connected: false,
      selectedSaltType: 0,
      salts_a: [],
      salts_b: [],
      printedSalt: [],
      filteredData: [],
      filter: false,
      modalVisibleFilter: false,
      filePath: '',
      device_info: {},
      coordinate: {},
      currentUser: {},
      reminderCalibration: false,
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this._connect = this._connect.bind(this);
    this._scan = this._scan.bind(this);
    this.onChangeCheckElement = this.onChangeCheckElement.bind(this);
    this.onChangeCheckElementFilteredData = this.onChangeCheckElementFilteredData.bind(
      this,
    );
    this.onCheckAll = this.onCheckAll.bind(this);
    this.onCheckAllFilteredData = this.onCheckAllFilteredData.bind(this);
    this.onShare = this.onShare.bind(this);
    this.onPrint = this.onPrint.bind(this);
    this.onRefreshData = this.onRefreshData.bind(this);
    this.handleSegmentChange = this.handleSegmentChange.bind(this);
    this.handleFilterModal = this.handleFilterModal.bind(this);
    this.onApplyFilter = this.onApplyFilter.bind(this);
    this.onRemoveFilter = this.onRemoveFilter.bind(this);
    this.makePdf = this.makePdf.bind(this);
    this.pdfTemplate = this.pdfTemplate.bind(this);
  }

  // HTML template for making the pdf file....
  pdfTemplate(obj, device_info) {
    const {selectedSaltType} = this.state;

    if (selectedSaltType === 0) {
      return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
          <style type="text/css">
            .document-wrapper {
              display: flex;
              flex-direction: column;
              max-width: 100vw;
              margin: 3%;
            }
    
            .document-header {
              left: 0px;
              top: 0px;
              height: auto;
              display: flex;
              flex-direction: row;
              justify-content: space-between;
            }
    
            .border-line {
              border-bottom: 3px solid;
              padding: 10px;
            }
    
            .document-content-container {
              height: 80vh;
              padding: 1vh 3vw;
            }
    
            .document-footer {
              bottom: 0;
    
              border-top: 1px solid;
            }
    
            .document-detail {
                display: flex;
                width: 100%;
            }
    
            .document-detail > h4 {
                font-weight: 300;
                margin: 5px;
            }
    
            .document-table {
                margin-top: 5vh;
                width: 100%;
                border: 1px solid black;
                border-collapse: collapse;
            }
    
            th {
              border: 1px solid black;
            }
    
            td {
                border-right: 1px solid black;
            }
    
            .document-table > th,td {
                text-align: center;
            }
          </style>
        </head>
    
        <body>
          <div class="document-wrapper">
            <div class="document-header">
              <div>
                <img
                  src="http://dashboard.matraindonesia.com/static/media/black.a8106b47.svg"
                  style="width: 150px;height: auto;"
                />
              </div>
    
              <div style="align-self: center;">
                <p>
                  <a href="http://www.bieon.matraindonesia.co.id/"
                    >www.bieon.matraindonesia.co.id</a
                  >
                </p>
              </div>
            </div>
    
            <div class="border-line"></div>
    
            <div class="document-content-container">
              <h1>Probe Information</h1>
              <div class="document-detail">
                  <h4 style="flex: 1;">No Seri</h4>
                  <h4>:</h4>
                  <h4 style="flex: 2; padding-left: 5px;">${
                    this.state.device_info.no_seri
                  }</h4>
              </div>
              <div class="document-detail">
                  <h4 style="flex: 1;">Battery Condition</h4>
                  <h4>:</h4>
                  <h4 style="flex: 2; padding-left: 5px;">${
                    this.state.device_info.battery
                  }</h4>
              </div>
              <div class="document-detail">
                  <h4 style="flex: 1;">Last Calibration</h4>
                  <h4>:</h4>
                  <h4 style="flex: 2; padding-left: 5px;">${
                    this.state.device_info.lastcal
                  }</h4>
              </div>
              <div class="document-detail">
                  <h4 style="flex: 1;">User</h4>
                  <h4>:</h4>
                  <h4 style="flex: 2; padding-left: 5px;">${
                    this.state.currentUser.fullname
                  }</h4>
              </div>
              <div class="document-detail">
                  <h4 style="flex: 1;">Recorded At</h4>
                  <h4>:</h4>
                  <h4 style="flex: 2; padding-left: 5px;">${
                    this.state.today
                  }</h4>
              </div>
              <table class="document-table">
                  <tr>
                      <th>No</th>
                      <th>Date / Time</th>
                      <th>Sample Name</th>
                      <th>NaCl</th>
                      <th>Whiteness</th>
                      <th>Water Content</th>
                  </tr>
                  ${obj
                    .map(
                      (item, i) =>
                        `<tr>
                          <td>${i + 1}</td>
                          <td>${moment(item.create_at).format(
                            'DD-MM-YYYY HH:mm',
                          )}</td>
                          <td>${item.sample_name}</td>
                          <td>${item.nacl}</td>
                          <td>${item.whiteness}</td>
                          <td>${item.water_content}</td>
                        </tr>`,
                    )
                    .join('')}
              </table>
            </div>
            <footer class="document-footer">
              <small
                >This data was obtained from measurements using BIEON Smart Salt
                Detector</span
              >
            </footer>
          </div>
        </body>
      </html>
    `;
    } else {
      return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
          <style type="text/css">
            .document-wrapper {
              display: flex;
              flex-direction: column;
              max-width: 100vw;
              margin: 3%;
            }
    
            .document-header {
              left: 0px;
              top: 0px;
              height: auto;
              display: flex;
              flex-direction: row;
              justify-content: space-between;
            }
    
            .border-line {
              border-bottom: 3px solid;
              padding: 10px;
            }
    
            .document-content-container {
              height: 80vh;
              padding: 1vh 3vw;
            }
    
            .document-footer {
              bottom: 0;
    
              border-top: 1px solid;
            }
    
            .document-detail {
                display: flex;
                width: 100%;
            }
    
            .document-detail > h4 {
                font-weight: 300;
                margin: 5px;
            }
    
            .document-table {
                margin-top: 5vh;
                width: 100%;
                border: 1px solid black;
                border-collapse: collapse;
            }
    
            th {
              border: 1px solid black;
            }
    
            td {
                border-right: 1px solid black;
            }
    
            .document-table > th,td {
                text-align: center;
            }
          </style>
        </head>
    
        <body>
          <div class="document-wrapper">
            <div class="document-header">
              <div>
                <img
                  src="http://dashboard.matraindonesia.com/static/media/black.a8106b47.svg"
                  style="width: 150px;height: auto;"
                />
              </div>
    
              <div style="align-self: center;">
                <p>
                  <a href="http://www.bieon.matraindonesia.co.id/"
                    >www.bieon.matraindonesia.co.id</a
                  >
                </p>
              </div>
            </div>
    
            <div class="border-line"></div>
    
            <div class="document-content-container">
              <h1>Probe Information</h1>
              <div class="document-detail">
                  <h4 style="flex: 1;">No Seri</h4>
                  <h4>:</h4>
                  <h4 style="flex: 2; padding-left: 5px;">${
                    this.state.device_info.no_seri
                  }</h4>
              </div>
              <div class="document-detail">
                  <h4 style="flex: 1;">Battery Condition</h4>
                  <h4>:</h4>
                  <h4 style="flex: 2; padding-left: 5px;">${
                    this.state.device_info.battery
                  }</h4>
              </div>
              <div class="document-detail">
                  <h4 style="flex: 1;">Last Calibration</h4>
                  <h4>:</h4>
                  <h4 style="flex: 2; padding-left: 5px;">${
                    this.state.device_info.lastcal
                  }</h4>
              </div>
              <div class="document-detail">
                  <h4 style="flex: 1;">User</h4>
                  <h4>:</h4>
                  <h4 style="flex: 2; padding-left: 5px;">${
                    this.state.currentUser.fullname
                  }</h4>
              </div>
              <div class="document-detail">
                  <h4 style="flex: 1;">Recorded At</h4>
                  <h4>:</h4>
                  <h4 style="flex: 2; padding-left: 5px;">${
                    this.state.today
                  }</h4>
              </div>
              <table class="document-table">
                  <tr>
                      <th>No</th>
                      <th>Date / Time</th>
                      <th>Sample Name</th>
                      <th>Iodine Level (ppm)</th>
                  </tr>
                  ${obj
                    .map(
                      (item, i) =>
                        `<tr>
                          <td>${i + 1}</td>
                          <td>${moment(item.create_at).format(
                            'DD-MM-YYYY HH:mm',
                          )}</td>
                          <td>${item.sample_name}</td>
                          <td>${item.iodium}</td>
                        </tr>`,
                    )
                    .join('')}
              </table>
            </div>
            <footer class="document-footer">
              <small
                >This data was obtained from measurements using BIEON Smart Salt
                Detector</span
              >
            </footer>
          </div>
        </body>
      </html>
    `;
    }
  }

  onAlert = (title, message) => {
    return Alert.alert(title, message, [
      {text: 'Ok', onPress: () => console.log('Pressed')},
    ]);
  };
  async getDateforPDF() {
    this.setState({
      device_info: JSON.parse(await AsyncStorage.getItem('@deviceInfo')),
      currentUser: JSON.parse(await AsyncStorage.getItem('@userData')),
      today: moment(new Date()).format('DD-MM-YYYY HH:ss'),
    });
    console.log('dev', this.state.currentUser);
  }
  async checkStatusLastcalibration() {
    const today = moment(new Date()).format('YYYY-MM-DD');
    this.setState({
      lastcal: JSON.parse(await AsyncStorage.getItem('@deviceInfo')).lastcal,
    });
    this.setState({
      reminderCalibration: moment(this.state.lastcal).isSameOrBefore(today),
    });
    console.log(this.state.reminderCalibration);
  }
  async componentDidMount() {
    this.getDateforPDF();
    this.checkStatusLastcalibration();
    await this.fetchSaltData();

    if (Platform.OS === 'ios') {
      let bluetoothManagerEmitter = new NativeEventEmitter(BluetoothManager);
      this._listeners.push(
        bluetoothManagerEmitter.addListener(
          BluetoothManager.EVENT_DEVICE_ALREADY_PAIRED,
          rsp => {
            this._deviceAlreadyPaired(rsp);
          },
        ),
      );
      this._listeners.push(
        bluetoothManagerEmitter.addListener(
          BluetoothManager.EVENT_DEVICE_FOUND,
          rsp => {
            this._deviceFoundEvent(rsp);
          },
        ),
      );
      this._listeners.push(
        bluetoothManagerEmitter.addListener(
          BluetoothManager.EVENT_CONNECTION_LOST,
          () => {
            this.setState({
              deviceName: '',
              boundAddress: '',
            });
          },
        ),
      );
    } else if (Platform.OS === 'android') {
      this._listeners.push(
        DeviceEventEmitter.addListener(
          BluetoothManager.EVENT_DEVICE_ALREADY_PAIRED,
          rsp => {
            this._deviceAlreadyPaired(rsp);
          },
        ),
      );
      this._listeners.push(
        DeviceEventEmitter.addListener(
          BluetoothManager.EVENT_DEVICE_FOUND,
          rsp => {
            this._deviceFoundEvent(rsp);
          },
        ),
      );
      this._listeners.push(
        DeviceEventEmitter.addListener(
          BluetoothManager.EVENT_DEVICE_DISCOVER_DONE,
          rsp => {
            this._deviceFoundEvent(rsp);
          },
        ),
      );
      this._listeners.push(
        DeviceEventEmitter.addListener(
          BluetoothManager.EVENT_CONNECTION_LOST,
          () => {
            this.setState({
              deviceName: '',
              boundAddress: '',
            });
          },
        ),
      );
      this._listeners.push(
        DeviceEventEmitter.addListener(
          BluetoothManager.EVENT_BLUETOOTH_NOT_SUPPORT,
          () => {
            ToastAndroid.show(
              'Device Not Support Bluetooth !',
              ToastAndroid.LONG,
            );
          },
        ),
      );
    }
  }

  componentWillUnmount() {
    console.log('unmount');
    this._listeners.map(listener => {
      listener.remove();
    });
  }

  onShare = async (base64, filename) => {
    let options = {
      url: `data:application/pdf;base64,${base64}`,
      filename: filename,
      title: 'Share on other apps',
      showAppsToView: true,
      mimeType: 'application/pdf',
    };
    try {
      await Share.open(options)
        .then(r =>
          this.onAlert('Success', 'You has been success to share data.'),
        )
        .catch(err => console.log(err));
      // console.log(response);
    } catch (error) {
      console.log('onShare error', error);
      return error;
    }
  };

  // Trying html to pdf
  async makePdf() {
    this.setState({loading: true});

    try {
      const {selectedSaltType, salts_a, salts_b} = this.state;
      let temp = selectedSaltType === 0 ? salts_a : salts_b;
      let selectedDataArray = temp.filter(data => data.isChecked === true);
      let date = new Date().toISOString();
      let fileName = `Bieon-${
        selectedSaltType === 0 ? 'NaCl' : 'Iodine'
      }-${moment(date)
        .format('DD-MM-YYYY')
        .toString()}`;

      // Check if data === 0
      if (selectedDataArray.length === 0) {
        this.onAlert(
          'There is an error.',
          'Please choose data to convert as PDF.',
        );

        this.setState({loading: false});
        return;
      } else if (selectedDataArray.length > 20) {
        this.onAlert(
          'Notice.',
          'Failed to share data, please select under 20 data and try again.',
        );

        this.setState({loading: false});
        return;
      }

      let options = {
        html: this.pdfTemplate(selectedDataArray, this.state.device_info),
        fileName: fileName,
        directory: 'Documents',
        width: 595,
        height: 842,
        base64: true,
      };

      // Request permission if have not
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Please give the permission',
          message: 'Give the application to access your storage',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );

      // The data maker
      let file = await RNHTMLtoPDF.convert(options);
      await this.onShare(file.base64, fileName);

      this.setState({loading: false});
      // this.onAlert('', 'File berhasil dibuat.');
    } catch (err) {
      console.log('Error', err);
      this.onAlert(
        'There is an error',
        'Failed to convert data as PDF, please check the data and try again',
      );
    }
  }

  async fetchSaltData() {
    let userData = await AsyncStorage.getItem('@userData');
    let userToken = await AsyncStorage.getItem('@userAuth');
    userData = JSON.parse(userData);
    userToken = userToken;

    try {
      const response = await axios.get(
        `${Config.API_URL}/salt/${
          this.state.selectedSaltType === 0 ? 'a' : 'b'
        }/list?max_per_page=100&user_id=${userData.user_id}`,
        {headers: {token: userToken}},
      );

      if (this.state.selectedSaltType === 0) {
        const {salts_a} = response.data.data;
        // sort ascending
        salts_a.sort(function(a, b) {
          return new Date(b.create_at) - new Date(a.create_at);
        });
        salts_a.forEach(item => {
          item.isChecked = false;
        });

        this.setState({
          salts_a: salts_a,
        });
      } else if (this.state.selectedSaltType === 1) {
        const {salts_b} = response.data.data;
        // sort ascending
        salts_b.sort(function(a, b) {
          return new Date(b.create_at) - new Date(a.create_at);
        });
        salts_b.forEach(item => {
          item.isChecked = false;
        });
        this.setState({
          salts_b: salts_b,
        });
      }
    } catch (err) {
      console.log('error happened at FetchingSaltData', err);
    }
  }

  async onRefreshData() {
    if (this.state.selectedSaltType === 0) {
      await this.setState({
        salts_a: [],
      });
    } else if (this.state.selectedSaltType === 1) {
      await this.setState({
        salts_b: [],
      });
    }

    this.fetchSaltData();
  }

  openModal() {
    this.setState({modalVisible: true});
  }

  closeModal() {
    this.setState({modalVisible: false});
  }

  _deviceAlreadyPaired(response) {
    var temp = null;
    if (typeof response.devices === 'object') {
      temp = response.devices;
    } else {
      try {
        temp = JSON.parse(response.devices);
      } catch (e) {}
    }
    if (temp && temp.length) {
      // let paired = this.state.pairedDs;
      // paired = paired.concat(temp || []);
      this.setState({
        pairedDs: temp,
      });
    }
  }

  _deviceFoundEvent(rsp) {
    //alert(JSON.stringify(rsp))
    var r = null;
    try {
      if (typeof rsp.device === 'object') {
        r = rsp.device;
      } else {
        r = JSON.parse(rsp.device);
      }
    } catch (e) {
      console.log('Error detected in TableDataScreen');
    }

    if (r) {
      let found = this.state.foundDs || [];
      if (found.findIndex) {
        let duplicated = found.findIndex(function(x) {
          return x.address === r.address;
        });

        if (duplicated === -1) {
          found.push(r);
          this.setState({
            foundDs: found,
          });
        }
      }
    }
  }

  // For the normal data //////////////////////////////
  onCheckAll() {
    let tempSalts =
      this.state.selectedSaltType === 0
        ? this.state.salts_a
        : this.state.salts_b;

    tempSalts.forEach(item => (item.isChecked = !item.isChecked));

    if (this.state.selectedSaltType === 0) {
      this.setState({
        salts_a: tempSalts,
      });
    } else if (this.state.selectedSaltType === 1) {
      this.setState({
        salts_b: tempSalts,
      });
    }
  }

  onChangeCheckElement(elementIndex) {
    let tempSalts =
      this.state.selectedSaltType === 0
        ? this.state.salts_a
        : this.state.salts_b;

    let foundIndex = tempSalts.findIndex(
      (salt, index) => index === elementIndex,
    );

    tempSalts[foundIndex].isChecked = !tempSalts[foundIndex].isChecked;

    if (this.state.selectedSaltType === 0) {
      this.setState({
        salts_a: tempSalts,
      });
    } else if (this.state.selectedSaltType === 1) {
      this.setState({
        salts_b: tempSalts,
      });
    }
  }

  // For the filtered Data //////////////////////////////
  onCheckAllFilteredData() {
    let tempSalts = this.state.filteredData;
    tempSalts.forEach(item => (item.isChecked = !item.isChecked));
    this.setState({
      filteredData: tempSalts,
    });
  }

  onChangeCheckElementFilteredData(elementIndex) {
    let tempSalts = this.state.filteredData;
    let foundIndex = tempSalts.findIndex(
      (salt, index) => index === elementIndex,
    );
    tempSalts[foundIndex].isChecked = !tempSalts[foundIndex].isChecked;
    this.setState({
      filteredData: tempSalts,
    });
  }

  async _scan() {
    const scanDevices = async () => {
      const bluetoothResponse = await BluetoothManager.scanDevices();
      await this._deviceFoundEvent(bluetoothResponse);

      this.setState({
        loading: false,
      });

      this.openModal();
    };

    try {
      const isBluetoothEnabled = await BluetoothManager.isBluetoothEnabled();

      this.setState({
        loading: true,
      });

      if (isBluetoothEnabled) {
        await scanDevices();
      } else {
        await BluetoothManager.enableBluetooth();
        await scanDevices();
      }
    } catch (err) {
      console.log(err);

      this.setState({
        loading: false,
      });
    }
  }

  _connect(item) {
    this.setState({
      loading: true,
    });
    this.setState({modalVisible: false, connected: true});
    BluetoothManager.connect(item.address).then(
      s => {
        this.setState({
          loading: false,
          boundAddress: item.address,
          deviceName: item.name || 'UNKNOWN',
        });
      },
      e => {
        this.setState({
          loading: false,
        });
      },
    );
  }

  async onPrint() {
    let operator = JSON.parse(await AsyncStorage.getItem('@userData')).fullname;
    let printedData = this.state.filter
      ? this.state.filteredData
      : this.state.selectedSaltType === 0
      ? this.state.salts_a
      : this.state.salts_b;

    let selectedData = printedData.filter(data => data.isChecked === true);

    // Check the selected type
    this.state.selectedSaltType === 0
      ? printSaltA(selectedData, operator, this.state.reminderCalibration)
      : printSaltB(selectedData, operator, this.state.reminderCalibration);
  }

  handleSegmentChange(index) {
    this.onRefreshData();
    this.setState({
      selectedSaltType: index,
      filter: false,
      filteredData: [],
    });
  }

  handleFilterModal() {
    this.setState({
      modalVisibleFilter: !this.state.modalVisibleFilter,
    });
  }

  handleRemoveFilter() {
    this.setState({
      filter: false,
      filteredData: [],
      modalVisibleFilter: false,
    });
  }

  async onApplyFilter(startDate, endDate) {
    let arrayOfData =
      this.state.selectedSaltType === 0
        ? this.state.salts_a
        : this.state.salts_b;
    arrayOfData = await arrayOfData.filter(
      item =>
        Date.parse(item.create_at) <= Date.parse(endDate) &&
        Date.parse(item.create_at) >= Date.parse(startDate),
    );

    this.setState({
      filter: true,
      filteredData: arrayOfData,
      modalVisibleFilter: false,
    });
  }

  onRemoveFilter() {
    this.setState({
      filter: false,
      filteredData: [],
      modalVisibleFilter: false,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <BluetoothListModal
            visible={this.state.modalVisible}
            onClose={this.closeModal}
            newDevices={this.state.foundDs}
            alreadyPairedDevices={this.state.pairedDs}
            onConnect={this._connect}
          />
          <DateFilterModal
            onApplyFilter={this.onApplyFilter}
            onRemoveFilter={this.onRemoveFilter}
            visible={this.state.modalVisibleFilter}
            onClose={this.handleFilterModal}
          />
          <LoadingModal visible={this.state.loading} />
          <TableDataHeader
            deviceName={this.state.deviceName}
            onScan={this._scan}
            onFilterModal={this.handleFilterModal}
            isConnected={this.state.connected}
          />
          <View>
            <SegmentedControlTab
              values={['NaCl,White,Water Content', 'Iodium']}
              selectedIndex={this.state.selectedSaltType}
              onTabPress={this.handleSegmentChange}
              borderRadius={0}
              tabsContainerStyle={styles.segmentContainer}
              tabStyle={{
                backgroundColor: 'white',
                borderWidth: 0,
                borderColor: 'transparent',
              }}
              activeTabStyle={{backgroundColor: '#129cd8', marginTop: 2}}
              tabTextStyle={{color: '#129cd8', fontWeight: 'bold'}}
              activeTabTextStyle={{color: 'white'}}
            />
          </View>
          <View style={styles.tableContainer}>
            {this.state.selectedSaltType === 0 && (
              <NaclTable
                data={
                  this.state.filter
                    ? this.state.filteredData
                    : this.state.salts_a
                }
                onSelectAll={
                  this.state.filter
                    ? this.onCheckAllFilteredData
                    : this.onCheckAll
                }
                onSelectElement={
                  this.state.filter
                    ? this.onChangeCheckElementFilteredData
                    : this.onChangeCheckElement
                }
              />
            )}
            {this.state.selectedSaltType === 1 && (
              <IodiumTable
                data={
                  this.state.filter
                    ? this.state.filteredData
                    : this.state.salts_b
                }
                onSelectAll={this.onCheckAll}
                onSelectElement={this.onChangeCheckElement}
              />
            )}
          </View>
          <View>
            <TableDataToolbar
              onShare={this.makePdf}
              onRefresh={this.onRefreshData}
              onPrint={this.onPrint}
              onFilter={() => console.log('Filtered')}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    height: 'auto',
    maxHeight: '100%',
    paddingBottom: '10%',
  },
  header: {
    backgroundColor: '#129cd8',
    width: '100%',
    height: '10%',
    alignItems: 'center',
    paddingRight: '5%',
    paddingLeft: '5%',
    flexDirection: 'row',
  },
  deviceStatus: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 20,
  },
  bluetoothButton: {
    marginLeft: 'auto',
    backgroundColor: 'transparent',
    padding: '2%',
    borderRadius: 20,
  },
  tableContainer: {
    height: '70%',
    margin: '5%',
  },
  segmentContainer: {
    height: 'auto',
    padding: '2%',
    borderRadius: 20,
  },
});
