import React, { useState, createRef, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions, TouchableOpacity, ScrollView, Platform } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { SelectList, MultipleSelectList } from 'react-native-dropdown-select-list';

import moment from 'moment';

import GetProfile from './GetProfile';
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



  const showListNotif = () => {

    setEnable(!Enable);

    // alert(Enable);
    /*Animated.timing(fadeAnimation, {
      toValue: 1,
      duration: 500,
      nativeEvent: { contentOffset: { y: fadeAnimation } },
      useNativeDriver: true,
    }).start();*/

  };
  const hideListNotif = () => {

    setEnable(!Enable);

    //setEnable(false);
    /*Animated.timing(hideAnimation, {
      toValue: 0,
      duration: 500,
      nativeEvent: { contentOffset: { y: hideAnimation } },
      useNativeDriver: true,
    }).start();*/

  };



  const getDate = (date) => {
    const dateA = new Date(date);
    return (
      <Text style={styles.bcSmText}>{dateDiff(dateA, today)}  </Text>
    )
  }
  const getNotification = async () => {
    //alert(id_user)
    const fetchUrl = `getNotif/${global.User_connecte}`;

    const responseJson = await RequestOptionsGet(fetchUrl)
    if (responseJson.data.length > 0) {
      // console.log('notif', responseJson.data)
      setNbreNotif(responseJson.data.length);

      setNotifList(responseJson.data)
    }
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

      getNotification();
    }

    return () => (isSubscribed = false);
  }, [Enable]);


  return (
    <View style={styles.bc_notif}>
      {Enable ? (

        <View style={{ position: 'absolute', top: 10, right: 20, zIndex: 2 }}>
          <TouchableOpacity onPress={() => hideListNotif()}>
            {NbreNotif > 0 && (<Text style={styles.isnotif}></Text>)}
            <Text><Ionicons name="md-notifications" size={20} color="black" /></Text>

          </TouchableOpacity>
        </View>
      ) : (
        <View style={{ position: 'absolute', top: 10, right: 20, zIndex: 2 }}>
          {/* <TouchableOpacity onPress={() => { showListNotif() }}>*/}
          <TouchableOpacity onPress={() => { navigation.push('ListNotifications') }}>
            {NbreNotif > 0 && (<Text style={styles.isnotif}></Text>)}
            <Text><Ionicons name="md-notifications" size={20} color="black" /></Text>

          </TouchableOpacity>
        </View>

      )
      }

      <Animated.View style={[styles.shownotif, { opacity: !Enable ? fadeAnimation : hideAnimation, maxHeight: !Enable ? 20 : MaxHeight }]}>
        {NbreNotif > 0 ? (
          <ScrollView
            keyboardShouldPersistTaps="handled">
            <View style={[styles.lisnotif, { justifyContent: 'center', alignItems: 'center' }]}>
              <Text style={{ fontSize: 16, fontWeight: 'bold', padding: 5 }}>Notifications - </Text>
              <TouchableOpacity onPress={() => { hideListNotif(); navigation.navigate({ name: 'ListNotifications' }) }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', padding: 5 }}>Voir Tout</Text>
              </TouchableOpacity>
            </View>

            <View>
              {NotifList.map((value, key) => (
                <View key={key} style={styles.lisnotif}>
                  <TouchableOpacity key={key} onPress={() => { hideListNotif(0); NaVIG(value.id_activite, value.type_activite, navigation) }} >

                    <View style={styles.bcBlock} key={value.key} >
                      <GetProfile user_id={value.id_user1} navigation={navigation} img_prof={value.img_prof} />

                      <View style={styles.bcDetaille}>
                        <Text style={styles.postLabel}>{value.nom} </Text>
                        <Text style={styles.bcText}>{value.notification}</Text>

                        <View
                          style={{ flexDirection: 'row', justifyContent: 'flex-end', paddingRight: 40 }}>
                          {getDate(value.date)}
                          {/*<Text style={styles.bcSmText}>{dateDiff(getDate(value.date), today)}  </Text>*/}
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </ScrollView>
        ) : (
          <View style={[styles.lisnotif, { maxHeight: !Enable ? 20 : 200, justifyContent: 'center' }]}>
            <Text style={{ fontSize: 16, textAlign: 'center', fontWeight: 'bold' }}>Pas de Notifications</Text>
          </View>
        )
        }


      </Animated.View>
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
  hideNotif: {
    right: -200,
  },
  shownotif: {
    //flexDirection: 'row',
    //flexWrap: 'wrap',
    //width: Platform.OS == 'web' ? 250 : 200,
    width: 250,
    padding: 5,
    position: 'relative',
    top: 35,
    zIndex: 0,
    backgroundColor: 'white',
    right: 20,
    borderRadius: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,

  },
  lisnotif: {
    flexDirection: 'row',

    backgroundColor: '#ffffff',
    paddingHorizontal: 7,
    paddingVertical: 4,
    // paddingRight: 10,
    zIndex: 20,
    borderRadius: 10,
    borderWidth: 0,
    /*position: 'absolute',
    right: 20,
    top: 40,*/
    marginTop: 0,
    width: '100%',
    // minHeight: 300,
  },
  bcBlock: {
    flexDirection: 'row',
    width: '100%'
  },
  postLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#c4d63c',
  },
  bcDetaille: {
    alignSelf: 'flex-start',
    margin: 7,
    width: '80%',
  },
  bcText: {
    width: '95%',
    display: 'flex',
    flexWrap: 'wrap'
  },
  bcSmText: {
    fontSize: 11,
    color: '#6cc5d5'
  },
});
export default Notifications;
