import React from 'react';
import {
  StyleSheet,
  Image,
  Text,
  ScrollView,
  View,
  Dimensions,
} from 'react-native';
import Config from 'react-native-config';
import moment from 'moment';

export default function ArticleDetailScreen({navigation}) {
  const {article} = navigation.state.params;

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            style={[styles.headingImage]}
            resizeMode="cover"
            source={{
              uri: `${Config.API_URL}/${article.picture}`,
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
      </View>
    </ScrollView>
  );
}

const deviceWindow = Dimensions.get('window');

const styles = StyleSheet.create({
  scrollContainer: {
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    height: deviceWindow.height,
    marginBottom: '20%',
  },
  imageContainer: {
    width: '100%',
    height: deviceWindow.height / 3,
    resizeMode: 'cover',
  },
  headingImage: {
    backgroundColor: 'rgba(77,77,77,0.5)',
    width: '100%',
    height: '100%',
  },
  articleContainer: {
    flex: 1,
    width: '100%',
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
