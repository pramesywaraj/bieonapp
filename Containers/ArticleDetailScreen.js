import React, {Component} from 'react';
import {
  StyleSheet,
  Image,
  Text,
  FlatList,
  View,
  Dimensions,
} from 'react-native';
import Config from 'react-native-config';

export default function ArticleDetailScreen({navigation}) {
  const {article} = navigation.state.params;

  return (
    <View style={styles.container}>
      <Image
        style={[styles.headingImage]}
        resizeMode="stretch"
        source={{
          uri: `${Config.API_URL}/${article.picture}`,
        }}
      />
      <View style={styles.articleContainer}>
        <Text>{article.description}</Text>
      </View>
    </View>
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
    height: '40%',
  },
  articleContainer: {
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
  },
  homeScreenTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    margin: '5%',
  },
});
