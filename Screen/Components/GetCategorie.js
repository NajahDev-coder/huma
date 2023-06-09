//import { CenterFocusStrong } from '@material-ui/icons';
import React, { useState, createRef, useEffect } from 'react';
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
  Platform,
  FlatList,
} from 'react-native';
import { Base_url, RequestOptionsGet } from '../utils/utils';
const GetCategorie = ({ id_annonce }) => {
  const [Categorie, setCategorie] = useState('');
  const [ParentCateg, setParentCateg] = useState('');

  //const [url] = useState('https://huma.bzh/');

  const fetchData = async () => {
    const baseUrl = `categorie/${id_annonce}`;
    //const baseUrl = "https://jsonplaceholder.typicode.com/posts";
    const responseJson = await RequestOptionsGet(baseUrl);

    if (responseJson.data.length > 0) {
      setCategorie(responseJson.data[0].titre);
      if (responseJson.data[0].parent != 0) {
        let parent = responseJson.data[0].parent;
        //console.log('getcateg:::', parent)  
        const baseUrl2 = `categorie/${parent}`;
        const responseJson2 = await RequestOptionsGet(baseUrl2);
        setParentCateg(responseJson2.data[0].titre + ' > ');
      }
    }
  };
  useEffect(() => {
    let isSubscribed = true;
    if (isSubscribed) {
      fetchData();
    }
    return () => (isSubscribed = false);
  }, [id_annonce]);
  return (
    <Text
      style={{
        color: '#FFFFFF',
        fontSize: 11,
        textAlign: 'center',
        justifyContent: 'center',
      }}>
      {ParentCateg}  {Categorie}
    </Text>
  );
};
export default GetCategorie;
