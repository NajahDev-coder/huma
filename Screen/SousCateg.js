import React, { useState, createRef, useEffect } from 'react';
//import Category from 'react-native-category';
//import { MapScreen } from './MapScreen';
//import MapGeoScreen from './MapGeoScreen';
//import { FastImage } from 'react-native-fast-image';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  SafeAreaView,
  ImageBackground,
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  FlatList,
} from 'react-native';
import { Base_url, RequestOptionsGet } from './utils/utils'

const SousCateg = ({ navigation, OnFilter, CategId, refresh }) => {
  const [SsCateg, SetSsCateg] = useState({});
  const [CategorieId, setCategorieId] = useState(CategId)



  const Updtfilter = async (categ) => {
    await AsyncStorage.removeItem('add_filter');

    let Upfilter = {
      adresse: '',
      titre: '',
      type: '',
      categorie: categ != 0 ? categ : '',
      dateStart: '',
      dateEnd: '',
    };


    //console.log('filt idcateg', Upfilter)

    await AsyncStorage.setItem('add_filter', JSON.stringify(Upfilter));



    OnFilter()
    //navigation.navigate({ name: 'Annonces', Upfilter });
    // OnFilter();
  };
  const getSScateg = async (CategId) => {
    const fetchUrl = `categories/${CategId}`;
    const responseJson = await RequestOptionsGet(fetchUrl)

    if (responseJson.data.length === 0) {
      Updtfilter(CategId);

      //navigation.navigate( {name:'AnnoncesScreen',categ:categ}); 
      // OnFilter()
    }
    SetSsCateg(responseJson.data);
    // });
  };
  useEffect(() => {
    let isMounted = true;

    if (isMounted) {

      getSScateg(CategId);
      //Updtfilter(0);
    }
    return () => (isMounted = false);
  }, [CategId, refresh]);

  const defaultImage = { uri: Base_url + 'images/img/no-picture1.png' };

  const getBeerImage = (idcateg, slugimg) => {
    let path = { uri: Base_url + 'images/img/' + idcateg + '/' + slugimg + '.jpg' };
    return path;
  };
  return (

    <FlatList
      data={SsCateg}
      renderItem={({ item }) => (
        <View style={styles.viewThumbnail} key={item.id}>
          <TouchableOpacity onPress={() => getSScateg(item.id)} key={item.id}>
            <ImageBackground
              style={styles.imageThumbnail}
              imageStyle={{ borderRadius: 3 }}
              defaultSource={defaultImage}
              source={getBeerImage(CategId, item.slug)}>
              <Text style={styles.txtThumb}>{item.titre}</Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>
      )}
      //Setting the number of column
      numColumns={3}
      scrollEnabled={false}
      keyExtractor={(item, index) => index}
    />

  );
};
const styles = StyleSheet.create({
  imageThumbnail: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
  },
  viewThumbnail: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    flex: 1,
    flexDirection: 'column',
    margin: 1,
    height: 100,
  },
  txtThumb: {
    padding: 5,
    marginTop: 50,
    backgroundColor: 'rgba(140, 153, 44, 0.45)',
    width: '100%',
    fontSize: 14,
    color: '#ffffff',
    textAlign: 'center',
    // bottom: 30
  },
});
export default SousCateg;
