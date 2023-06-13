import React, { useState, createRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions, Platform, TouchableOpacity } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { SelectList } from 'react-native-dropdown-select-list';

import moment from 'moment';

import GetProfile from '../Components/GetProfile';
import { NaVIG, NavigNotif, Base_url, RequestOptionsGet, ShowDetailAnnonce, ViewProfile } from '../utils/utils'
import { dateDiff } from '../includes/functions';


const Notifications = ({ navigation, widthIcone }) => {

  const [refreshKey, setRefreshKey] = useState(0);
  const [NbreNotif, setNbreNotif] = useState(0);
  const [NotifList, setNotifList] = useState([]);
  const [Enable, setEnable] = useState(0);
  const [fadeAnimation, setFadeAnimation] = useState(new Animated.Value(0));
  //const [selected, setSelected] = useState(' ');
  const [choix, setChoix] = useState(null);
  const WidthIcone = widthIcone ? widthIcone : '88%';
  const minDate = new Date(2022, 8, 30);





  const clickNotif = () => {
    //const choix = selected;
    // alert(choix)
    if (choix == 0) {

      navigation.navigate({ name: 'ListNotifications' })
    }
    else {

      NavigNotif(choix, navigation)

      //NaVIG(selected, navigation)    
    }
  }


  const today = new Date();

  const displayNotif = (value) => {
    const date = new Date(value.date);
    return (


      <View style={styles.bcBlock} key={value.key} >
        <GetProfile user_id={value.id_user1} navigation={navigation} img_prof={value.img_prof} />

        <View style={styles.bcDetaille}>
          <Text style={styles.postLabel}>{value.nom} </Text>
          <Text style={styles.bcText}>{value.notification}</Text>

          <View
            style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
            <Text style={styles.bcSmText}>{dateDiff(date, today)}  </Text>
          </View>
        </View>
      </View>

    )

  };

  const getNotification = async () => {
    //alert(id_user)
    const fetchUrl = `getNotif/${global.User_connecte}`;

    const responseJson = await RequestOptionsGet(fetchUrl)
    if (responseJson.data.length > 0) {
      //console.log('notif', responseJson.data.length)
      setNbreNotif(responseJson.data.length);
      const valnotif = () => {
        return (
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Notifications - </Text>

            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Voir tout</Text>

          </View>
        )
      }
      let newArray = [{ key: 0, value: valnotif() }];
      responseJson.data.map((item) => {
        // console.log(item)
        newArray.push({ key: item.ID_notif, value: displayNotif(item) })
        //newArray.push({ key: item.id, activite: item.id_activite, value: (<displayNotif value={item}/> ffff</Text>) })
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
      let newArray = [{ key: 0, value: valnotif() }];

      setNotifList(newArray);
    }


  }
  useEffect(() => {

    let isSubscribed = true;


    if (isSubscribed) {
      getNotification();
    }
    return () => (isSubscribed = false);
  });

  return (
    <View style={styles.bc_notif}>

      <Animated.View style={styles.shownotif}>

        <SelectList

          setSelected={(val) => setChoix(val)}
          data={NotifList}
          //data={[{ key: 0, value: 'Livrer' }, { key: 3, value: 'Annuler' }, { key: 4, value: 'Retirer' }]}

          onSelect={() => clickNotif()}
          search={false}
          arrowicon={<Ionicons name="md-notifications" size={20} color="black" style={{ zIndex: 10 }} />}
          boxStyles={{ borderRadius: 0, borderWidth: 0, width: WidthIcone }}
          inputStyles={{ opacity: 0, padding: 0, height: 20, width: 0, zIndex: 0 }}
          dropdownStyles={[styles.lisnotif, { maxHeight: Dimensions.get('window').height - 50 }]}
          dropdownItemStyles={{ borderRadius: 0 }}
        // defaultOption={{ key: '1', value: ' ' }}
        // save={activite}
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
