import React, { useState, createRef, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions, Platform, TouchableOpacity, ScrollView } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { SelectList, MultipleSelectList } from 'react-native-dropdown-select-list';

import moment from 'moment';

import GetProfile from '../Components/GetProfile';
import { NaVIG, Base_url, RequestOptionsGet, ShowDetailAnnonce, ViewProfile } from '../utils/utils'
import { dateDiff } from '../includes/functions';


const Notifications = ({ navigation, widthIcone }) => {

  const [refreshKey, setRefreshKey] = useState(0);
  const [NbreNotif, setNbreNotif] = useState(0);
  const [NotifList, setNotifList] = useState([]);
  const [Enable, setEnable] = useState(0);
  const [fadeAnimation] = useState(new Animated.Value(0));
  const [hideAnimation] = useState(new Animated.Value(1));
  const [selected, setSelected] = useState("");
  const WidthIcone = widthIcone ? widthIcone : '88%';
  const minDate = new Date(2022, 8, 30);





  const getDate = (date) => {
    const dateA = new Date(date);
    return (
      <Text style={styles.bcSmText}>{dateDiff(dateA, today)}  </Text>
    )
  }


  const MaxHeight = Dimensions.get('window').height - 100
  const today = new Date();
  useEffect(() => {

    let isSubscribed = true;


    /*const intervalId = setInterval(() => {
      getNotification()
    }, 1000 * 5) // in milliseconds
    return () => clearInterval(intervalId)*/

    if (isSubscribed) {

      console.log('NbreNotifNonLU::', global.NbreNotifNonLU)
    }

    return () => (isSubscribed = false);
  }, [global.NbreNotifNonLU]);


  return (
    <View style={styles.bc_notif}>

      <View style={{ position: 'absolute', top: 10, right: 20, zIndex: 2 }}>
        {/* <TouchableOpacity onPress={() => { showListNotif() }}>*/}
        <TouchableOpacity onPress={() => { navigation.push('ListNotifications') }}>
          {global.NbreNotifNonLU > 0 ? (
            <>
              <Text style={styles.isnotif}></Text>

              <Text><Ionicons name="md-notifications" size={20} color="black" /></Text>
              {global.NbreNotifNonLU > 100 ? (<Text style={styles.nbreNOTIF}>+99</Text>) : (<Text style={styles.nbreNOTIF}>{global.NbreNotifNonLU}</Text>)}
            </>
          ) : (
            <Text><Ionicons name="md-notifications" size={20} color="black" /></Text>)}

        </TouchableOpacity>
      </View>



    </View>

  );
};

const styles = StyleSheet.create({
  bc_notif: {
    flexDirection: 'row',
    padding: 0,
    //position: 'relative'
  },
  isnotif: {
    backgroundColor: 'rgb(140, 153, 44)',
    width: 10,
    height: 10,
    borderRadius: 10,
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
  },
  nbreNOTIF:
    { position: 'absolute', top: -5, right: 5, width: 35, color: 'rgb(140, 153, 44)', fontWeight: 'bold' }

});
export default Notifications;
