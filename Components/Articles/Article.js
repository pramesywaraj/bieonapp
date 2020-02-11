import React from 'react';
import {StyleSheet, View, ActivityIndicator, Text} from 'react-native';
import {Image} from 'react-native-elements';
import moment from 'moment';

import Config from 'react-native-config';

export default function Article({title, imageUri, createdAt}) {
  return (
    <View style={[styles.articleContainer]}>
      <View style={styles.articleImageContainer}>
        <Image
          style={[styles.articleImage]}
          resizeMode="cover"
          source={{uri: `${Config.API_URL}/${imageUri}`}}
          PlaceholderContent={<ActivityIndicator />}
        />
      </View>
      <View style={styles.articleTextContainer}>
        <Text style={[styles.title]}>{title}</Text>
        <View style={styles.date}>
          <Text style={styles.dateText}>Terbit tanggal</Text>
          <Text style={styles.dateText}>
            {moment(createdAt).format('Do MMMM YYYY')}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  articleContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
  },
  articleImageContainer: {
    backgroundColor: 'black',
    borderRadius: 20,
    width: '30%',
  },
  articleImage: {
    width: 100,
    height: 100,
  },
  articleTextContainer: {
    width: '70%',
    paddingLeft: 20,
  },
  title: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  date: {
    position: 'absolute',
    bottom: 0,
    paddingLeft: 20,
  },
  dateText: {
    fontWeight: '200',
    fontSize: 13,
    color: 'rgb(156, 156, 156)',
  },
});
