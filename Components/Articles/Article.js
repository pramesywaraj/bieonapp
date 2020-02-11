import React from 'react';
import {StyleSheet, View, ActivityIndicator, Text} from 'react-native';
import {Image} from 'react-native-elements';

import Config from 'react-native-config';

export default function Article({title, imageUri, createdAt}) {
  return (
    <View style={[styles.articleContainer]}>
      <Image
        style={[styles.articleImage]}
        resizeMode="contain"
        source={{uri: `${Config.API_URL}/${imageUri}`}}
        PlaceholderContent={<ActivityIndicator />}
      />
      <View>
        <Text style={[styles.textTitle]}>{title}</Text>
        <View>
          <Text>Terbit tanggal</Text>
          <Text>{createdAt}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  articleContainer: {},
  articleImage: {
    width: 200,
    height: 200,
  },
  textTitle: {
    margin: 10,
    color: '#000',
    fontWeight: 'bold',
    fontSize: 17,
  },
});
