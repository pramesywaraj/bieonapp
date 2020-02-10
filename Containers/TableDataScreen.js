import React, {Component} from 'react';
import moment from 'moment';
import {
  ActivityIndicator,
  Platform,
  DeviceEventEmitter,
  NativeEventEmitter,
  ToastAndroid,
  StyleSheet,
  Switch,
  Button,
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
import DatePicker from 'react-native-datepicker';
import CheckBox from 'react-native-check-box';
import {
  BluetoothEscposPrinter,
  BluetoothManager,
  BluetoothTscPrinter,
} from 'react-native-bluetooth-escpos-printer';

const salt = [
  {no: 1, date: '12-12-2020', NaCl: 100, Whiteness: 80, WaterContent: 20},
  {no: 2, date: '12-12-2020', NaCl: 100, Whiteness: 80, WaterContent: 20},
  {no: 3, date: '12-12-2020', NaCl: 100, Whiteness: 80, WaterContent: 20},
  {no: 4, date: '12-12-2020', NaCl: 100, Whiteness: 80, WaterContent: 20},
  {no: 5, date: '12-12-2020', NaCl: 100, Whiteness: 80, WaterContent: 20},
];
const base64PngLogo =
  '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';
export default class HomeScreen extends Component {
  _listeners = [];

  constructor(props) {
    super(props);
    this.state = {
      date: '2019-01-01',
      isChecked: false,
      // salt:salt,
      devices: null,
      pairedDs: [],
      foundDs: [],
      bleOpend: false,
      loading: true,
      boundAddress: '',
      debugMsg: '',
    };
  }
  componentDidMount() {
    //alert(BluetoothManager)
    BluetoothManager.isBluetoothEnabled().then(
      enabled => {
        this.setState({
          bleOpend: Boolean(enabled),
          loading: false,
        });
      },
      err => {
        err;
      },
    );

    if (Platform.OS === 'ios') {
      let bluetoothManagerEmitter = new NativeEventEmitter(BluetoothManager);
      this._listeners.push(
        bluetoothManagerEmitter.addListener(
          BluetoothManager.EVENT_DEVICE_ALREADY_PAIRED,
          rsp => {
            this._deviceAlreadPaired(rsp);
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
              name: '',
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
            this._deviceAlreadPaired(rsp);
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
          BluetoothManager.EVENT_CONNECTION_LOST,
          () => {
            this.setState({
              name: '',
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

  _deviceAlreadPaired(rsp) {
    var ds = null;
    if (typeof rsp.devices == 'object') {
      ds = rsp.devices;
    } else {
      try {
        ds = JSON.parse(rsp.devices);
      } catch (e) {}
    }
    if (ds && ds.length) {
      let pared = this.state.pairedDs;
      pared = pared.concat(ds || []);
      this.setState({
        pairedDs: pared,
      });
    }
  }

  _deviceFoundEvent(rsp) {
    //alert(JSON.stringify(rsp))
    var r = null;
    try {
      if (typeof rsp.device == 'object') {
        r = rsp.device;
      } else {
        r = JSON.parse(rsp.device);
      }
    } catch (e) {
      //alert(e.message);
      //ignore
    }
    //alert('f')
    if (r) {
      let found = this.state.foundDs || [];
      if (found.findIndex) {
        let duplicated = found.findIndex(function(x) {
          return x.address == r.address;
        });
        //CHECK DEPLICATED HERE...
        if (duplicated == -1) {
          found.push(r);
          this.setState({
            foundDs: found,
          });
        }
      }
    }
  }

  _renderRow(rows) {
    let items = [];
    for (let i in rows) {
      let row = rows[i];
      if (row.address) {
        items.push(
          <TouchableOpacity
            key={new Date().getTime() + i}
            stlye={styles.wtf}
            onPress={() => {
              this.setState({
                loading: true,
              });
              BluetoothManager.connect(row.address).then(
                s => {
                  this.setState({
                    loading: false,
                    boundAddress: row.address,
                    name: row.name || 'UNKNOWN',
                  });
                },
                e => {
                  this.setState({
                    loading: false,
                  });
                  alert(e);
                },
              );
            }}>
            <Text style={styles.name}>{row.name || 'UNKNOWN'}</Text>
            <Text style={styles.address}>{row.address}</Text>
          </TouchableOpacity>,
        );
      }
    }
    return items;
  }
  checkStatus() {
    this.setState({
      isChecked: !this.state.isChecked,
    });
    console.log('check?', this.state.isChecked);
  }
  render() {
    const {navigate} = this.props.navigation;
    // const { salt } = this.state.salt
    return (
      <Grid>
        {/* <ScrollView style={styles.container}>
                <Text style={styles.title}>Blutooth Opended:{this.state.bleOpend?"true":"false"} <Text>Open BLE Before Scanning</Text> </Text>
                <View>
                <Switch value={this.state.bleOpend} onValueChange={(v)=>{
                this.setState({
                    loading:true
                })
                if(!v){
                    BluetoothManager.disableBluetooth().then(()=>{
                        this.setState({
                            bleOpend:false,
                            loading:false,
                            foundDs:[],
                            pairedDs:[]
                        });
                    },(err)=>{alert(err)});

                }else{
                    BluetoothManager.enableBluetooth().then((r)=>{
                        var paired = [];
                        if(r && r.length>0){
                            for(var i=0;i<r.length;i++){
                                try{
                                    paired.push(JSON.parse(r[i]));
                                }catch(e){
                                    //ignore
                                }
                            }
                        }
                        this.setState({
                            bleOpend:true,
                            loading:false,
                            pairedDs:paired
                        })
                    },(err)=>{
                        this.setState({
                            loading:false
                        })
                        alert(err)
                    });
                }
            }}/>
                    <Button disabled={this.state.loading || !this.state.bleOpend} onPress={()=>{
                        this._scan();
                    }} title="Scan"/>
                </View>
                <Text  style={styles.title}>Connected:<Text style={{color:"blue"}}>{!this.state.name ? 'No Devices' : this.state.name}</Text></Text>
                <Text  style={styles.title}>Found(tap to connect):</Text>
                {this.state.loading ? (<ActivityIndicator animating={true}/>) : null}
                <View style={{flex:1,flexDirection:"column"}}>
                {
                    this._renderRow(this.state.foundDs)
                }
                </View>
                <Text  style={styles.title}>Paired:</Text>
                {this.state.loading ? (<ActivityIndicator animating={true}/>) : null}
                <View style={{flex:1,flexDirection:"column"}}>
                {
                    this._renderRow(this.state.pairedDs)
                }
                <Text>{''}</Text>
                <Button disabled={this.state.loading || this.state.boundAddress.length <= 0}
                        title="Print Receipt" onPress={async () => {
                    try {
                        await BluetoothEscposPrinter.printerInit();
                        await BluetoothEscposPrinter.printerLeftSpace(0);

                        await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.CENTER);
                        await BluetoothEscposPrinter.setBlob(0);
                        await  BluetoothEscposPrinter.printText("Measurement Result\r\n", {
                            encoding: 'GBK',
                            codepage: 0,
                            widthtimes: 1,
                            heigthtimes: 1,
                            fonttype: 1
                        });
                        await BluetoothEscposPrinter.printText("\r\n\r\n", {});

                        let columnWidths = [14, 1, 17];
                        await BluetoothEscposPrinter.printColumn(columnWidths,
                            [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.CENTER, BluetoothEscposPrinter.ALIGN.RIGHT],
                            ["No.Seri", ':', 'BIEON-010001'], {});
                        await BluetoothEscposPrinter.printColumn(columnWidths,
                            [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.CENTER, BluetoothEscposPrinter.ALIGN.RIGHT],
                            ["Operator", ':', 'Ichsan'], {});
                        await BluetoothEscposPrinter.printColumn(columnWidths,
                            [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.CENTER, BluetoothEscposPrinter.ALIGN.RIGHT],
                            ["Hari/Tanggal", ':', 'Selasa,13/04/19'], {});
                        await BluetoothEscposPrinter.printColumn(columnWidths,
                            [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.CENTER, BluetoothEscposPrinter.ALIGN.RIGHT],
                            ["Sample", ':', 'Refina'], {});
                        await BluetoothEscposPrinter.printText("\r\n", {});

                        await BluetoothEscposPrinter.printColumn(columnWidths,
                            [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.CENTER, BluetoothEscposPrinter.ALIGN.RIGHT],
                            ["NaCl", ':', '98.5%'], {});
                        await BluetoothEscposPrinter.printColumn(columnWidths,
                            [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.CENTER, BluetoothEscposPrinter.ALIGN.RIGHT],
                            ["Whiteness", ':', '97.6%'], {});
                        await BluetoothEscposPrinter.printColumn(columnWidths,
                            [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.CENTER, BluetoothEscposPrinter.ALIGN.RIGHT],
                            ["Water Content", ':', '2.8%'], {});
                        await BluetoothEscposPrinter.printText("\r\n", {});
                        await  BluetoothEscposPrinter.printText("================================\r\n", {});

                        await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.CENTER);
                        await BluetoothEscposPrinter.printPic(base64PngLogo, {width: 220, left: 60});
                        await BluetoothEscposPrinter.printText("\r\n\r\n\r\n", {});

                    } catch (e) {
                        alert(e.message || "ERROR");
                    }
                }}/>
                </View>

               
            </ScrollView> */}

        <Row size={13}>
          <ScrollView>
            <Row style={[styles.Col1]}>
              <Text style={[styles.deviceTitle]}>Bieon-001</Text>
              <TouchableOpacity
                style={[styles.button]}
                onPress={() =>
                  navigate('PopUpBluetoothScreen', {idPrint: 'idPrint'})
                }>
                <Image
                  style={[styles.logo]}
                  source={require('../assets/icons/retrievedata/bluetoothgray.png')}></Image>
              </TouchableOpacity>

              <DatePicker
                style={[styles.startDate]}
                date={this.state.date}
                mode="date"
                placeholder="select date"
                format="ddd, DD-MMM-YYYY"
                minDate="2016-05-01"
                maxDate="2030-06-01"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0,
                  },
                  dateInput: {
                    marginLeft: 36,
                  },
                  // ... You can check the source to find the other keys.
                }}
                onDateChange={date => {
                  this.setState({date: date});
                }}
              />
              <Text style={[styles.until]}>-</Text>
              <DatePicker
                style={[styles.endDate]}
                date={this.state.date}
                mode="date"
                placeholder="select date"
                format="ddd, DD-MMM-YYYY"
                minDate="2016-05-01"
                maxDate="2030-06-01"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0,
                  },
                  dateInput: {
                    marginLeft: 36,
                  },
                  // ... You can check the source to find the other keys.
                }}
                onDateChange={date => {
                  this.setState({date: date});
                }}
              />
            </Row>
            <Row style={[styles.ColTop]}>
              <Row onClick={() => this.checkStatus()}>
                <CheckBox
                  style={[styles.checked]}
                  isChecked={this.state.isChecked}
                />
                <Text style={[styles.textCategory]}>No</Text>
                <Text style={[styles.textTime]}>Date</Text>
                <Text style={[styles.Icon]}>NaCl</Text>
                <Text style={[styles.Icon]}>Whiteness</Text>
                <Text style={[styles.Icon]}>Water Content</Text>
              </Row>
            </Row>
            <View style={[styles.Border]}></View>
            {/* {this.state.salt.map(sal =>(
                            <Row>
                            <CheckBox style={[styles.checked]} onClick={()=>this.checkStatus()}
                                isChecked={this.state.isChecked}
                            />

                                <Text style={[styles.textCategory]}>{sal.no}</Text>
                                <Text style={[styles.textTime]}>{sal.date}</Text>
                                <Text style={[styles.Icon]}>{sal.NaCl}</Text>
                                <Text style={[styles.Icon]}>{sal.Whiteness}</Text>
                                <Text style={[styles.Icon]}>{sal.WaterContent}</Text>
                            </Row>
                        ))} */}
          </ScrollView>
        </Row>
      </Grid>
    );
  }

  _scan() {
    this.setState({
      loading: true,
    });
    BluetoothManager.scanDevices().then(
      s => {
        var ss = s;
        var found = ss.found;
        try {
          found = JSON.parse(found); //@FIX_it: the parse action too weired..
        } catch (e) {
          //ignore
        }
        var fds = this.state.foundDs;
        if (found && found.length) {
          fds = found;
        }
        this.setState({
          foundDs: fds,
          loading: false,
        });
      },
      er => {
        this.setState({
          loading: false,
        });
        alert('error' + JSON.stringify(er));
      },
    );
  }
}

const win = Dimensions.get('window');

const styles = StyleSheet.create({
  Col: {
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f3f3f3',
  },
  ColTop: {
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f3f3f3',
  },
  Col1: {
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#129cd8',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginTop: 20,
  },
  text: {
    fontWeight: 'bold',
    margin: 20,
  },
  TopPic: {
    height: 300,
    resizeMode: 'center',
  },
  BottomPic: {
    width: 160,
    height: 160,
    margin: 10,
    marginLeft: 20,
  },
  textSource: {
    marginTop: 20,
    margin: 10,
    color: '#808080',
  },
  textTitle: {
    margin: 10,
    color: '#000',
    fontWeight: 'bold',
    fontSize: 17,
  },
  textCategory: {
    margin: 10,
    color: '#129cd8',
    fontWeight: 'bold',
  },
  deviceTitle: {
    position: 'absolute',
    color: '#fff',
    top: 10,
    fontWeight: 'bold',
    fontSize: 35,
  },
  textTime: {
    marginLeft: 5,
    margin: 10,
    color: '#129cd8',
    fontWeight: 'bold',
  },
  Icon: {
    margin: 10,
    marginLeft: 10,
    color: '#129cd8',
    fontWeight: 'bold',
  },
  Border: {
    width: '100%',
    color: '#808080',
    borderBottomColor: '#808080',
    borderBottomWidth: 0.8,
    marginTop: -30,
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
  startDate: {
    width: 200,
    position: 'absolute',
    left: -10,
    top: 80,
  },
  endDate: {
    width: 200,
    position: 'absolute',
    right: 25,
    top: 80,
  },
  until: {
    color: '#fff',
    fontSize: 40,
    marginTop: 40,
  },
  checked: {
    padding: 10,
  },
  logo: {
    width: 45,
    height: 45,
  },
  button: {
    marginTop: 40,
    marginBottom: 120,
    marginRight: -320,
  },
});
