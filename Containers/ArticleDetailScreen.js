import React, {Component} from 'react';
import {StyleSheet, Image, Text, ScrollView, View} from 'react-native';
import Config from 'react-native-config';
import moment from 'moment';

export default function ArticleDetailScreen({navigation}) {
  const {article} = navigation.state.params;

  return (
    <ScrollView style={styles.container}>
      <Image
        style={[styles.headingImage]}
        resizeMode="stretch"
        source={{
          uri: `${Config.API_URL}/${article.picture}`,
        }}
      />
      <View style={styles.articleContainer}>
        <Text style={styles.articleTitle}>{article.title}</Text>
        <Text style={styles.articleDate}>
          {moment(article.create_at).format('Do MMMM YYYY')}
        </Text>
        <Text style={styles.articleText}>{article.description}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headingImage: {
    backgroundColor: 'rgba(77,77,77,0.5)',
    top: 0,
    width: '100%',
    height: '30%',
  },
  articleContainer: {
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
    padding: '2%',
  },
  articleTitle: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  articleDate: {
    fontWeight: '200',
    fontSize: 13,
    color: 'rgb(156, 156, 156)',
  },
  articleText: {
    paddingTop: '5%',
    paddingBottom: '5%',
  },
});
