import React, { useState, createRef, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons';
import { Base_url, RequestOptionsGet } from '../utils/utils'
const NotifMessages = ({ id_user, color }) => {

  const [refreshKey, setRefreshKey] = useState(0);
  const [NbreNotifMsg, setNbreNotifMsg] = useState(0);

  useEffect(() => {
    let isSubscribed = true;

    const getNotificationMsg = async (id_user) => {
      //alert(id_user)

      const fetchUrl = `getNotifMsg/${id_user}`;

      const responseJson = await RequestOptionsGet(fetchUrl);
      ////console.log('notifmsg',responseJson)
      if (responseJson.data) {

        setNbreNotifMsg(responseJson.data.length);
      }
      //setRefreshKey((oldKey) => oldKey + 1);

    };

    if (isSubscribed) {
      getNotificationMsg(id_user);
    }
    return () => (isSubscribed = false);
  }, [id_user]);

  if (NbreNotifMsg > 0) {
    return (
      <View style={styles.bc_notifmsg}>
        <AntDesign name="message1" size={24} color={color} style={{ marginTop: 3, marginRight: -8 }} />
        <Text style={styles.isnotif}>{NbreNotifMsg}</Text>
      </View>
    );
  }
  return (
    <View style={styles.bc_notifmsg}>
      <AntDesign name="message1" size={24} color={color} style={{ marginTop: 3 }} />

    </View>
  );
};

const styles = StyleSheet.create({
  bc_notifmsg: {
    flexDirection: 'row',
    //padding: 10, 
    position: 'relative'
  },
  isnotif: {
    backgroundColor: 'rgb(140, 153, 44)',
    width: 22,
    height: 22,
    borderRadius: 22,

    top: 8,
    right: 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
    color: '#fff',
    textAlign: 'center',
    zIndex: 20
  },
});
export default NotifMessages;
