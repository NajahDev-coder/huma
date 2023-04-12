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

import { Avatar, Badge, Icon, withBadge } from 'react-native-elements'

const GetSession = ({ navigation, route, id_user, style }) => {
  const [url] = useState('https://huma.bzh/');
  const [MyUserId, setMyUserId] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
 const [status, setStatus]=useState('warning')
  useEffect(() => {
    let isSubscribed = true;

    if (isSubscribed) {
      if(id_user!== null && id_user!== 0)
      {
        //console.log('getsession id_user:',id_user)
      getSession(id_user);

      }
      
          
    }
    return () => (isSubscribed = false);
  //}, [ refreshKey]);
   });

  const getSession = async (id_user) => {
    const baseUrl = url + `api/api/session/${id_user}`;


    fetch(baseUrl)
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.data[0]) {
          setMyUserId(1);
          setStatus('success')
        } else {
          setMyUserId(0);
        }
        //setRefreshKey((oldKey) => oldKey + 1);
      });
  };
  return (
    
    <View style={styles.boule}>   
       <Badge    
       status = {status}    
       containerStyle={style || styles.boules }                  
       badgeStyle= {{width:15, height:15, borderRadius:50}}     
      />          
             
    </View>  
  ); 
};
const styles = StyleSheet.create({
  boule: {
    position: 'absolute',  
    top: 6,    
    right: -3,  
    zIndex:10      
  },
 
});
export default GetSession;
