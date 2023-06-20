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

import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  FontAwesome,
  FontAwesome5,
  AntDesign,
  MaterialIcons,
  Octicons,
  Fontisto,
} from '@expo/vector-icons';
import { getSession, Base_url, RequestOptionsGet } from '../utils/utils'
import { Avatar, Badge, Icon, withBadge } from 'react-native-elements'

const GetSession = ({ navigation, route, id_user, style }) => {

  const [MyUserId, setMyUserId] = useState(null);

  const [status, setStatus] = useState('warning');
  const isConnected = async (id_user) => {
    const fetchURL = `session/${id_user}`
    const responseJson = await RequestOptionsGet(fetchURL);
    if (responseJson.data[0]) {
      setStatus('success')
    }
  }
  useEffect(() => {
    let isSubscribed = true;

    if (isSubscribed) {
      if (id_user !== null && id_user !== 0) {
        //console.log('getsession id_user:', id_user)
        isConnected(id_user);
      }

    }
    return () => (isSubscribed = false);
    //}, [ refreshKey]);
  });


  return (

    <View style={styles.boule}>
      <Badge
        status={status}
        containerStyle={style || styles.boules}
        badgeStyle={{ width: 15, height: 15, borderRadius: 50 }}
      />

    </View>
  );
};
const styles = StyleSheet.create({
  boule: {
    position: 'absolute',
    top: 6,
    right: -3,
    zIndex: 10
  },

});
export default GetSession;
