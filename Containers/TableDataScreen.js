import React, { Component } from 'react';
import { StyleSheet, Image, ImageBackground, Text, View, Dimensions, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import DatePicker from 'react-native-datepicker'
import CheckBox from 'react-native-check-box'

const salt = [
    {no:1,date:"12-12-2020",NaCl:100,Whiteness:80,WaterContent:20},
    {no:2,date:"12-12-2020",NaCl:100,Whiteness:80,WaterContent:20},
    {no:3,date:"12-12-2020",NaCl:100,Whiteness:80,WaterContent:20},
    {no:4,date:"12-12-2020",NaCl:100,Whiteness:80,WaterContent:20},
    {no:5,date:"12-12-2020",NaCl:100,Whiteness:80,WaterContent:20},
]
export default class HomeScreen extends Component {    
    constructor(props){
        super(props)
        this.state = {
            date:"2019-01-01",
            isChecked:false,
            salt:salt
        }
    }
    checkStatus() {
        this.setState({
            isChecked:!this.state.isChecked
        })
        console.log("check?", this.state.isChecked)
    }
    render() {
        const { navigate } = this.props.navigation;
        const { salt } = this.state.salt
        return (
            <Grid>
                <Row size={13}>
                    <ScrollView>
                        <Row style={[styles.Col1]}>
                            <Text style={[styles.deviceTitle]}>Bieon-001</Text>

                            <DatePicker style={[styles.startDate]} date={this.state.date}
                                mode="date" placeholder="select date" format="ddd, DD-MMM-YYYY"
                                minDate="2016-05-01" maxDate="2030-06-01"  confirmBtnText="Confirm" cancelBtnText="Cancel"
                                customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0
                                },
                                dateInput: {
                                    marginLeft: 36
                                }
                                // ... You can check the source to find the other keys.
                                }}
                                onDateChange={(date) => {this.setState({date: date})}}
                            /><Text style={[styles.until]}>-</Text>
                            <DatePicker style={[styles.endDate]} date={this.state.date}
                                mode="date" placeholder="select date" format="ddd, DD-MMM-YYYY"
                                minDate="2016-05-01" maxDate="2030-06-01"  confirmBtnText="Confirm" cancelBtnText="Cancel"
                                customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0
                                },
                                dateInput: {
                                    marginLeft: 36
                                }
                                // ... You can check the source to find the other keys.
                                }}
                                onDateChange={(date) => {this.setState({date: date})}}
                            />
                           
                        </Row>
                        <Row style={[styles.ColTop]}>
                            <Row  onClick={()=>this.checkStatus()}>
                            <CheckBox style={[styles.checked]}
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
                        {this.state.salt.map(sal =>(
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
                        ))}
                    </ScrollView>
                </Row>
                <Row>
                    <Col style={[styles.col]}>
                        <TouchableOpacity style={[styles.col]} onPress={() => navigate('HomeScreen')}>
                            <Image style={styles.itemMenuImage} source={require('../assets/icons/menubar/homeblue.png')} />
                            <Text style={[styles.textmenu]}>Home</Text>
                        </TouchableOpacity>
                    </Col>
                    <Col style={[styles.col]}>
                        <TouchableOpacity style={[styles.col]} onPress={() => navigate('RetrieveDataScreen')}>
                            <Image style={styles.itemMenuImage} source={require('../assets/icons/menubar/retrieveblue.png')} />
                            <Text style={[styles.textmenu]}>Retrieve Data</Text>
                        </TouchableOpacity>
                    </Col>
                    <Col style={[styles.col]}>
                        <TouchableOpacity style={[styles.col]} onPress={() => navigate('')}>
                            <Image style={styles.itemMenuImage} source={require('../assets/icons/menubar/datablue.png')} />
                            <Text style={[styles.textmenu]}>View Data</Text>
                        </TouchableOpacity>
                    </Col>
                    <Col style={[styles.col]}>
                        <TouchableOpacity style={[styles.col]} onPress={() => navigate('EditProfileScreen')}>
                            <Image style={styles.itemMenuImage} source={require('../assets/icons/menubar/profileblue.png')} />
                            <Text style={[styles.textmenu]}>Profile</Text>
                        </TouchableOpacity>
                    </Col>
                    <Col style={[styles.col]}>
                        <TouchableOpacity style={[styles.col]} onPress={() => navigate('SettingScreen')}>
                            <Image style={styles.itemMenuImage} source={require('../assets/icons/menubar/settingblue.png')} />
                            <Text style={[styles.textmenu]}>Setting</Text>
                        </TouchableOpacity>
                    </Col>
                </Row>
            </Grid>

        );
    }
}

const win = Dimensions.get('window');

const styles = StyleSheet.create({
    Col: {
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f3f3f3'
    },
    ColTop: {
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f3f3f3'
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
        resizeMode: 'center'
    },
    BottomPic: {
        width: 160,
        height: 160,
        margin: 10,
        marginLeft: 20
    },
    textSource: {
        marginTop: 20,
        margin: 10,
        color: '#808080'
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
        fontWeight:'bold'
    },
    deviceTitle: {
        position:'absolute',
        color:'#fff',
        top:10,
        fontWeight:'bold',
        fontSize:35
    },
    textTime: {
        marginLeft: 5,
        margin: 10,
        color: '#129cd8',
        fontWeight:'bold'
    },
    Icon: {
        margin: 10,
        marginLeft: 10,
        color: '#129cd8',
        fontWeight:'bold',
    },
    Border: {
        width: '100%',
        color: '#808080',
        borderBottomColor: '#808080',
        borderBottomWidth: 0.8,
        marginTop:-30
    },
    itemMenuImage: {
        resizeMode: 'contain',
        width: 25,
        height: 25,
        marginTop: 3
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
        position:'absolute',
        left:-10,
        top:80
    },
    endDate: {
        width: 200,
        position:'absolute',
        right:25,
        top:80
    },
    until: {
        color:'#fff',
        fontSize:40,
        marginTop:40
    },
    checked : {
        padding: 10,
    }
});
