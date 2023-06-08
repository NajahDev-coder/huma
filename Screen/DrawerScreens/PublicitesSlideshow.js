import React, { useEffect, useState } from 'react'

import { Base_url, RequestOptionsGet, RequestOptionsPut, RequestOptionsPost } from '../utils/utils';
import { Linking, View, Image, TouchableOpacity, Text, StyleSheet, ImageBackground } from 'react-native'
import Slideshow from 'react-native-slideshow-improved';

import { MaterialIcons, AntDesign, MaterialCommunityIcons, Feather, Ionicons } from '@expo/vector-icons';
const PublicitesSlideshow = ({ navigation, rang }) => {
  const [listPublicite, setListpublicite] = useState([]);
  const [position, setPosition] = useState(1);

  const getPublicite = async () => {
    const fetchUrl = `publicites`;

    const responseJson = await RequestOptionsGet(fetchUrl);


    if (responseJson.data.length > 0) {
      let datas = [];
      const id_pub = rang / 9 - 1
      Object.entries(responseJson.data).map(([key, value]) => {
        if (key == id_pub) {
          datas.push({ title: value.titre, caption: value.lien, url: `${Base_url}images/${value.image}.jpg` });
        }
      });
      //console.log(datas)
      setListpublicite(datas);
    }
  }
  const Navig = (val) => {
    //console.log('slideshow', val)   
    // navigation.navigate(val.image.caption)
    //window.open('http://'+val.image.caption, '_blank', 'noreferrer'); 
    Linking.openURL('http://' + val);
  }
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      getPublicite();
      setInterval(() => {
        setPosition(position === listPublicite.length ? 0 : position + 1);

      }, 5000);
    }
    return (() => { isMounted = false });
  }, []);
  return (
    <View style={{ width: '100%' }}>
      {listPublicite.length > 0 && listPublicite.map((value, key) => (
        <TouchableOpacity
          key={key}
          onPress={() => {
            Navig(value.caption)
          }}
          style={styles.post}>
          <ImageBackground
            source={{ uri: value.url }}
            resizeMode="cover"
            style={styles.bcImageBlock}>

            <View style={styles.bcCaption}>
              <Text style={{ fontWeight: 'bold', color: '#ffffff' }}>{value.title}</Text>
              <Text style={{ textDecorationLine: 'underline' }}>{value.caption}</Text>
            </View>
          </ImageBackground>
          <AntDesign name="infocirlceo" size={24} color="#a7bd00" style={{ position: 'absolute', top: 0, right: 0 }} />
        </TouchableOpacity>
      )
      )}

    </View>
  )
}
const styles = StyleSheet.create({
  post: {
    width: '100%',

    minHeight: 120,
    display: 'flex'
  },
  bcImageBlock: {
    width: '100%',
    height: 120,
  },

  bcCaption: {
    position: 'absolute',
    left: 0,
    bottom: 10,
    padding: 10,
    width: '100%',
    background: 'rgba(140, 153, 44 , 0.60)'
  }
})
export default PublicitesSlideshow;