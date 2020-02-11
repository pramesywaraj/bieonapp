import React, {Component} from 'react';
import axios from 'axios';
import Config from 'react-native-config';

import {
  StyleSheet,
  Image,
  Text,
  FlatList,
  View,
  Dimensions,
} from 'react-native';

import Article from '../Components/Articles/Article';

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      refreshing: true,
    };

    this.fetchArticles = this.fetchArticles.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);
    this.renderSeparator = this.renderSeparator.bind(this);
  }

  componentDidMount() {
    this.fetchArticles();
  }

  async fetchArticles() {
    axios
      .get(`${Config.API_URL}/article/list`)
      .then(response => {
        const {articles} = response.data.data;
        this.setState({articles: articles, refreshing: false});
      })
      .catch(function(error) {
        this.setState({
          refreshing: false,
        });
        console.log('error in HomeScreen', error);
      });
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

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={[styles.headingImage]}
          resizeMode="stretch"
          source={{
            uri:
              'https://bieonbe.defuture.tech/public/images/article/upload-article-1579857277-625625761.jpg',
          }}
        />
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
