import React, { useEffect, useState } from 'react'

import { Base_url, RequestOptionsGet, RequestOptionsPut, RequestOptionsPost } from '../utils/utils';
import { Linking, View, Image, TouchableOpacity, Text, StyleSheet, ImageBackground } from 'react-native'
import Slideshow from 'react-native-slideshow-improved';

import { MaterialIcons, Entypo, AntDesign, MaterialCommunityIcons, Feather, Ionicons } from '@expo/vector-icons';

const PublicitesSlideshow = ({ navigation, rang }) => {
  const [listPublicite, setListpublicite] = useState([]);
  const [position, setPosition] = useState(1);

  const getPublicite = async () => {
    const fetchUrl = `publicites`;

    const responseJson = await RequestOptionsGet(fetchUrl);


    if (responseJson.data.length > 0) {
      let datas = [];

      const id_pub = rang / 9 - 1
      let url_img;
      Object.entries(responseJson.data).map(([key, value]) => {
        if (value.image == '')
          url_img = `${Base_url}images/publicite.jpg`
        else
          url_img = `${Base_url}images/${value.image}.jpeg`
        if (key == id_pub) {
          datas.push({ title: value.titre, caption: value.lien, url: url_img });
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
      /* setInterval(() => {
         setPosition(position === listPublicite.length ? 0 : position + 1);
 
       }, 5000);*/
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
              <Text style={{ fontWeight: 'bold', color: '#562b05' }}>#{value.title}</Text>
              <Text style={{ textDecorationLine: 'underline', color: '#039be5' }}><Entypo name="video-camera" size={16} color="#039be5" /> {value.caption}</Text>
            </View>
          </ImageBackground>
          <AntDesign name="infocirlceo" size={24} color="#a7bd00" style={{ position: 'absolute', top: 5, right: 5 }} />
        </TouchableOpacity>
      )
      )}

    </View>
  )
}
const styles = StyleSheet.create({


  post: {
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: '#ffffff',
    alignSelf: 'flex-start',
    marginHorizontal: '2%',
    marginBottom: 15,
    minWidth: '95%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 7,
    minHeight: 120,
    display: 'flex'
    // flexDirection: 'column',
  },
  bcImageBlock: {
    width: '100%',
    height: 170,
  },

  bcCaption: {
    position: 'absolute',
    left: 0,
    bottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: '100%',
    backgroundColor: 'rgba(140, 153, 44 , 0.60)'
  }
})
export default PublicitesSlideshow;