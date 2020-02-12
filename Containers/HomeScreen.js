import React, {Component} from 'react';
import axios from 'axios';

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
import loginAction from '../Redux/Actions/login';
import ApiAxios from '../Services/ApiAxios';

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listArticle: [],
    };
  }
  componentDidMount() {
    console.log('homey');
    this.getArticle();
  }
  async getArticle() {
    axios
      .get('https://bieonbe.defuture.tech/article/list')
      .then(response => {
        // handle success
        console.log('all article', response.data);
      })
      .catch(function(error) {
        // handle error
        console.log('er', error);
      });
  }
  render() {
    const {navigate} = this.props.navigation;
    return (
      <Grid>
        <Row size={13}>
          <ScrollView>
            <Row style={[styles.Col1]}>
              <Image
                style={[styles.TopPic]}
                source={require('../assets/car.png')}></Image>
            </Row>
            <Text style={[styles.text]}>HEADLINE</Text>
            <Row style={[styles.Col]}>
              <Image
                style={[styles.BottomPic]}
                source={require('../assets/photo.jpg')}></Image>
              <Col>
                <Text style={[styles.textSource]}>Source</Text>
                <Text style={[styles.textTitle]}>
                  Lorem Ipsum Dolor Sir Amet
                </Text>
                <Row>
                  <Text style={[styles.textCategory]}>Category</Text>
                  <Text style={[styles.textTime]}>Time</Text>
                  <Text style={[styles.Icon]}>Icon</Text>
                </Row>
              </Col>
            </Row>
            <View style={[styles.Border]}></View>
            <Row style={[styles.Col]}>
              <Image
                style={[styles.BottomPic]}
                source={require('../assets/photo.jpg')}></Image>
              <Col>
                <Text style={[styles.textSource]}>Source</Text>
                <Text style={[styles.textTitle]}>
                  Lorem Ipsum Dolor Sir Amet
                </Text>
                <Row>
                  <Text style={[styles.textCategory]}>Category</Text>
                  <Text style={[styles.textTime]}>Time</Text>
                  <Text style={[styles.Icon]}>Icon</Text>
                </Row>
              </Col>
            </Row>
            <View style={[styles.Border]}></View>
            <Row style={[styles.Col]}>
              <Image
                style={[styles.BottomPic]}
                source={require('../assets/photo.jpg')}></Image>
              <Col>
                <Text style={[styles.textSource]}>Source</Text>
                <Text style={[styles.textTitle]}>
                  Lorem Ipsum Dolor Sir Amet
                </Text>
                <Row>
                  <Text style={[styles.textCategory]}>Category</Text>
                  <Text style={[styles.textTime]}>Time</Text>
                  <Text style={[styles.Icon]}>Icon</Text>
                </Row>
              </Col>
            </Row>
            <View style={[styles.Border]}></View>
          </ScrollView>
        </Row>
      </Grid>
    );
  }
}

const win = Dimensions.get('window');

const styles = StyleSheet.create({
  Col: {
    height: 210,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f3f3f3',
  },
  Col1: {
    height: 280,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#808080',
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
    marginTop: 47,
    margin: 10,
    color: '#0000FF',
  },
  textTime: {
    marginLeft: 5,
    marginTop: 47,
    margin: 10,
    color: '#808080',
  },
  Icon: {
    marginTop: 47,
    margin: 10,
    marginLeft: 25,
    color: '#808080',
  },
  Border: {
    alignSelf: 'stretch',
    width: 500,
    color: '#808080',
    borderBottomColor: '#808080',
    borderBottomWidth: 0.8,
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
});
