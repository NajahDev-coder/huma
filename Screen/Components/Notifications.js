import React, { useState, createRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions, Platform, TouchableOpacity } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { SelectList, MultipleSelectList } from 'react-native-dropdown-select-list';

import moment from 'moment';

import GetProfile from '../Components/GetProfile';
import { NaVIG, Base_url, RequestOptionsGet, ShowDetailAnnonce, ViewProfile } from '../utils/utils'
import { dateDiff } from '../includes/functions';


const Notifications = ({ navigation, id_user, widthIcone }) => {

  const [refreshKey, setRefreshKey] = useState(0);
  const [NbreNotif, setNbreNotif] = useState(0);
  const [NotifList, setNotifList] = useState([]);
  const [Enable, setEnable] = useState(0);
  const [fadeAnimation, setFadeAnimation] = useState(new Animated.Value(0));
  const [selected, setSelected] = useState("");
  const WidthIcone = widthIcone ? widthIcone : '88%';
  const minDate = new Date(2022, 8, 30);




  const showListNotif = () => {
    // console.log('fadeAnimation', fadeAnimation);

    const stat = JSON.stringify(fadeAnimation) == '1' ? 0 : 1;
    const duration = JSON.stringify(fadeAnimation) == '1' ? 100 : 500
    // console.log('stat', stat);

    Animated.timing(fadeAnimation, {
      toValue: stat,
      duration: duration,
      nativeEvent: { contentOffset: { y: fadeAnimation } },
      useNativeDriver: true,
    }).start();
    setTimeout(() => {
      setEnable(stat);
    }, 20);
  };

  useEffect(() => {
    const today = new Date();

    let isSubscribed = true;
    const getNotification = async (id_user) => {
      //alert(id_user)
      const fetchUrl = `getNotif/${id_user}`;

      const responseJson = await RequestOptionsGet(fetchUrl)
      if (responseJson.data.length > 0) {
        //console.log('notif', responseJson.data.length)
        setNbreNotif(responseJson.data.length);
        const valnotif = () => {
          return (
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Notifications - </Text>
              <TouchableOpacity onPress={() => { navigation.navigate({ name: 'ListNotifications' }) }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Voir tout</Text>
              </TouchableOpacity>
            </View>
          )
        }
        let newArray = [{ key: '0', value: valnotif() }];
        responseJson.data.map((item) => {

          newArray.push({ key: item.id, activite: item.id_activite, value: displayNotif(item) })
        })
        setNotifList(newArray);
      }
      else {

        const valnotif = () => {
          return (
            <View style={{ width: '100%', justifyContent: 'center' }}>
              <Text style={{ fontSize: 16, textAlign: 'center', fontWeight: 'bold' }}>Pas de Notifications</Text>
            </View>
          )
        }
        let newArray = [{ key: '0', value: valnotif() }];

        setNotifList(newArray);
      }
      //setRefreshKey((oldKey) => oldKey + 1); 

    }
    const displayNotif = (value) => {
      const date = new Date(value.date);
      return (

        <TouchableOpacity key={value.key} onPress={() => {
          NaVIG(value.id_activite, value.type_activite, navigation)
        }} style={styles.bcBlock} >
          <GetProfile user_id={value.id_user1} navigation={navigation} img_prof={value.img_prof} />

          <View style={styles.bcDetaille}>
            <Text style={styles.postLabel}>{value.nom} </Text>
            <Text style={styles.bcText}>{value.notification}</Text>

            <View
              style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
              <Text style={styles.bcSmText}>{dateDiff(date, today)}  </Text>
            </View>
          </View>
        </TouchableOpacity>

      )

    };
    if (isSubscribed) {
      getNotification(id_user);
    }
    return () => (isSubscribed = false);
  }, []);

  return (
    <View style={styles.bc_notif}>

      <Animated.View style={styles.shownotif}>

        <SelectList
          setSelected={setSelected}
          data={NotifList}
          //onSelect={() => NaVIG(selected)}     
          search={false}
          arrowicon={<Ionicons name="md-notifications" size={20} color="black" />}
          boxStyles={{ borderRadius: 0, borderWidth: 0, width: WidthIcone }}
          inputStyles={{ opacity: 0 }}
          //defaultOption={{ key:'1', value:' ' }}   
          dropdownStyles={[styles.lisnotif, { maxHeight: Dimensions.get('window').height - 50 }]}
          dropdownItemStyles={{ borderRadius: 0 }}
        />
        {NbreNotif > 0 && (<Text style={styles.isnotif}></Text>)}

      </Animated.View>
    </View>

  );
};

const styles = StyleSheet.create({
  bc_notif: {
    flexDirection: 'row',
    padding: 0,
    position: 'relative'
  },
  isnotif: {
    backgroundColor: 'rgb(140, 153, 44)',
    width: 10,
    height: 10,
    borderRadius: 10,
    position: 'absolute',
    top: 15,
    right: 20,
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
  shownotif: {
    //flexDirection: 'column',
    //flexWrap: 'wrap',
    width: Platform.OS == 'web' ? '90%' : '100%',
    padding: 0,
    //position:'relative',
    top: 0,
    zIndex: 0,
    backgroundColor: 'transparent',
    right: 0
  },
  lisnotif: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
    backgroundColor: '#ffffff',
    padding: 5,
    paddingRight: 10,
    zIndex: 20,
    borderRadius: 10,
    borderWidth: 0,
    position: 'absolute',
    right: 20,
    top: 40,
    marginTop: 0,
    width: 250,
    minHeight: 300,
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
    paddingRight: 5,
  },
  bcSmText: {
    fontSize: 11,
    // width: '95%',
    paddingRight: 5,
  },
});
export default Notifications;
