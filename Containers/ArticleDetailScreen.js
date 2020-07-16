import React from 'react';
import {StyleSheet, Image, Text, ScrollView, View} from 'react-native';
import Config from 'react-native-config';
import moment from 'moment';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';

export default function ArticleDetailScreen({navigation}) {
  const {article} = navigation.state.params;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.imageContainer}>
          <Image
            style={[styles.headingImage]}
            resizeMode="cover"
            source={{
              uri: Config.API_URL + '/' + `${article.picture}`,
            }}
          />
        </View>

        <View style={styles.articleContainer}>
          <Text style={styles.articleTitle}>{article.title}</Text>
          <Text style={styles.articleDate}>
            {moment(article.create_at).format('DD/MMM/YYYY')}
          </Text>
          <Text style={styles.articleText}>{article.description}</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const newHeight = heightPercentageToDP(100);
const newWidth = widthPercentageToDP(100);

const styles = StyleSheet.create({
  scrollContainer: {
    backgroundColor: 'white',
    minHeight: newHeight,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  imageContainer: {
    width: newWidth,
    height: newHeight / 2.5,
    resizeMode: 'center',
  },
  headingImage: {
    backgroundColor: 'rgba(77,77,77,0.5)',
    width: newWidth,
    height: newHeight / 2.5,
  },
  articleContainer: {
    flex: 1,
    width: newWidth,
    backgroundColor: 'white',
    padding: '5%',
  },
  articleTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    height: 'auto',
  },
  articleDate: {
    fontWeight: '200',
    fontSize: 13,
    color: 'rgb(156, 156, 156)',
  },
  articleText: {
    marginTop: '5%',
    marginBottom: '5%',
  },
});
