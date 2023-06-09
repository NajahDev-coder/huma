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
const GetType = ({ id_annonce }) => {


  const [Type, setType] = useState('');


  const fetchData = async () => {

    const fetchUrl = `type/${id_annonce}`;
    const json = await RequestOptionsGet(fetchUrl)

    setType(json.data[0].type);

  };

  useEffect(() => {
    let isSubscribed = true;
    // //console.log('id_annonce:', id_annonce);

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
      {Type}
    </Text>
  );
};
export default GetType;
