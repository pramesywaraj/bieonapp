import React, {Component} from 'react';
import axios from 'axios';
import Config from 'react-native-config';

import {
  StyleSheet,
  Image,
  FlatList,
  View,
  Dimensions,
  ScrollView,
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
  }

  componentDidMount() {
    this.fetchArticles();
  }

  async fetchArticles() {
    axios
      .get(`${Config.API_URL}/article/list`)
      .then(response => {
        console.log(response);
        const {articles} = response.data.data;
        this.setState({articles: articles, refreshing: false});
      })
      .catch(function(error) {
        this.setState({refreshing: false});
        console.log('error in HomeScreen', error);
      });
  }

  handleRefresh() {
    this.setState({refreshing: true}, () => this.fetchArticles());
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={[styles.headingImage]}
          resizeMode="contain"
          resizeMethod="resize"
          source={{
            uri:
              'https://bieonbe.defuture.tech/public/images/article/upload-article-1579857277-625625761.jpg',
          }}
        />
        <FlatList
          data={this.state.articles}
          renderItem={({item}) => (
            <Article
              title={item.title}
              imageUri={item.picture}
              createdAt={item.create_at}
            />
          )}
          keyExtractor={item => item.article_id}
          refreshing={this.state.refreshing}
          onRefresh={this.handleRefresh}
        />
      </View>
    );
  }
}

const deviceWindow = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  headingImage: {
    backgroundColor: 'rgba(77,77,77,0.5)',
    top: 0,
    width: '100%',
    height: '40%',
  },
});
