import React, {Component} from 'react';
import axios from 'axios';
import Config from 'react-native-config';
import AsyncStorage from '@react-native-community/async-storage';
import Carousel from 'react-native-banner-carousel';

import {
  StyleSheet,
  Image,
  Text,
  FlatList,
  View,
  Dimensions,
  Alert,
} from 'react-native';

import Article from '../Components/Articles/Article';
const BannerWidth = Dimensions.get('window').width;
const BannerHeight = 260;

const images = [
  'https://bieonbe.defuture.tech/public/images/article/upload-article-1579857277-625625761.jpg',
  'https://bieonbe.defuture.tech/public/images/article/upload-article-1579857277-625625761.jpg',
  'https://bieonbe.defuture.tech/public/images/article/upload-article-1579857277-625625761.jpg',
];
export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      refreshing: true,
      token: '',
      banner: [],
    };

    this.fetchArticles = this.fetchArticles.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);
    this.renderSeparator = this.renderSeparator.bind(this);
  }

  async componentDidMount() {
    this.fetchArticles();
    this.fetchBanner();
  }

  onAlert = (title, message) => {
    return Alert.alert(title, message, [
      {text: 'Ok', onPress: () => console.log('Pressed')},
    ]);
  };
  async fetchBanner() {
    try {
      let response = await axios.get(`${Config.API_URL}/banner`, {
        headers: {
          token: await AsyncStorage.getItem('@userAuth'),
        },
      });
      const banner = response.data.data;
      console.log('banners', banner.banners);
      this.setState({banner: banner.banners, refreshing: false});
    } catch (err) {
      this.onAlert(
        'Terjadi Kesalahan',
        'Terjadi kesalahan pada server, silahkan refresh dan coba kembali.',
      );
      this.setState({
        ...this.state.banner,
        refreshing: false,
      });
      console.log('Terjadi kesalahan pada bagian HomeScreen', err);
    }
  }
  async fetchArticles() {
    try {
      const {data} = await axios.get(`${Config.API_URL}/article/list`);

      const {articles} = data.data;
      this.setState({articles: articles, refreshing: false});
    } catch (err) {
      this.onAlert(
        'Terjadi Kesalahan',
        'Terjadi kesalahan pada server, silahkan refresh dan coba kembali.',
      );
      this.setState({
        ...this.state.articles,
        refreshing: false,
      });
      console.log('Terjadi kesalahan pada bagian HomeScreen', err);
    }
  }

  handleRefresh() {
    this.setState(
      {
        ...this.state.articles,
        refreshing: true,
      },
      () => this.fetchArticles(),
    );
  }

  goToArticleDetail(item) {
    const {navigate} = this.props.navigation;
    navigate('ArticleDetailScreen', {article: item});
  }

  renderSeparator = () => {
    return (
      <View
        style={{
          flex: 1.5,
          height: 2,
          backgroundColor: '#CED0CE',
        }}
      />
    );
  };
  renderPage(image, index) {
    return (
      <View key={index}>
        <Image
          style={{width: BannerWidth, height: BannerHeight}}
          source={{uri: image}}
        />
      </View>
    );
  }
  render() {
    return (
      <View style={styles.container}>
        <Carousel
          autoplay
          autoplayTimeout={5000}
          loop
          index={0}
          pageSize={BannerWidth}>
          {this.state.banner.map((bann, index) =>
            this.renderPage(
              'https://bieonbe.defuture.tech/' + bann.picture,
              index,
            ),
          )}
        </Carousel>

        <View style={styles.articleContainer}>
          <Text style={styles.homeScreenTitle}>Headline</Text>
          <FlatList
            data={this.state.articles}
            renderItem={({item}) => (
              <Article
                onClick={this.goToArticleDetail.bind(this, item)}
                title={item.title}
                imageUri={item.picture}
                createdAt={item.create_at}
              />
            )}
            ItemSeparatorComponent={this.renderSeparator}
            keyExtractor={item => item.article_id.toString()}
            refreshing={this.state.refreshing}
            onRefresh={this.handleRefresh}
          />
        </View>
      </View>
    );
  }
}

const deviceWindow = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headingImage: {
    backgroundColor: 'rgba(77,77,77,0.5)',
    top: 0,
    width: '100%',
    height: '40%',
  },
  articleContainer: {
    marginTop: '50%',
    position: 'absolute',
    height: '100%',
    width: '100%',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: 'white',
  },
  homeScreenTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    margin: '5%',
  },
});
