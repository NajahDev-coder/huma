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

const GetType = ({ id_annonce }) => {
  const [url] = useState('https://huma.bzh/');

  const [Type, setType] = useState('');
  useEffect(() => {
    let isSubscribed = true;
    // console.log('id_annonce:', id_annonce);

    const fetchData = async () => {
      const baseUrl = url + `api/api/type/${id_annonce}`;
      //const baseUrl = "https://jsonplaceholder.typicode.com/posts";
      const data = await fetch(baseUrl, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      // convert data to json
      const json = await data.json();
      //console.log('response gettype', json.data[0].type);
      setType(json.data[0].type);
    };
    if (isSubscribed) {
      fetchData();
    }
    return () => (isSubscribed = false);
  }, [url, id_annonce]);
  return (
    <Text
      style={{
        color: '#FFFFFF',
        fontSize: 11,
        textAlign: 'center',
        justifyContent: 'center',
      }}>
     {Type}
    </Text>
  );
};
export default GetType;
