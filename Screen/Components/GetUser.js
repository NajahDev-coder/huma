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

  FlatList,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  FontAwesome,
  FontAwesome5,
  AntDesign,
  MaterialIcons,
  Octicons,
  Fontisto,
} from '@expo/vector-icons';

const GetUser = ({ navigation, route, id_user }) => {
  const [url] = useState('https://huma.bzh/');
  const [UserName, setUserName] = useState('');

  useEffect(() => {
    let isSubscribed = true;

    if (isSubscribed) {
      getuser(id_user, url);
    }
    return () => (isSubscribed = false);
  }, [url, id_user]);

  const getuser = async (id_user, url) => {
    const baseUrl = url + `api/api/user/${id_user}`;

    fetch(baseUrl)
      .then((response) => response.json())
      .then((responseJson) => {


        setUserName(responseJson.data[0].nom);
      });
  };
  return <Text style={styles.postLabel}>{UserName}</Text>;
};
const styles = StyleSheet.create({
  postLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#c4d63c',
  },
});
export default GetUser;
