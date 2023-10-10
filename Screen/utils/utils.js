import React from 'react';
import axios from "axios";
import { Alert, TouchableOpacity, Text, View } from 'react-native';
import { GooglePlacesApiKey } from './env';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const Base_url = 'https://huma.bzh/';

import * as Notifications from 'expo-notifications';
import { durationInMonths } from '@progress/kendo-date-math';

export const deleteAction = async (id, type) => {
  if (type == 'annonce') {
    const fetchURL = `/delete_annonce/${id}`;
    const response = await RequestOptionsGet(fetchURL);
  }
  else if (type == 'user') {

    const fetchURL = `/delete_user/${id}`;
    const response = await RequestOptionsGet(fetchURL);
  }
  else if (type == 'offre') {

    const fetchURL = `/delete_offre/${id}`;
    const response = await RequestOptionsGet(fetchURL);
  }
  else if (type == 'publicite') {

    const fetchURL = `/delete_publicite/${id}`;
    const response = await RequestOptionsGet(fetchURL);
  }
  else {

  }
}
export const GetName = async (idActivite, type_activite) => {
  //console.log(idNotif);

  if (type_activite.includes('invitation') || type_activite.includes('amis') || type_activite.includes('profile') || type_activite.includes('abonn')) {

    const fetchURL = `/user/${idActivite}`;
    const response = await RequestOptionsGet(fetchURL);
    var nom = response.data[0].nom;
    //console.log(nom);
    //return nom;
  }
  else {
    const fetchURL = `/annonce/${idActivite}`;
    const response = await RequestOptionsGet(fetchURL);
    var annonce = response.data[0].titre;

    // console.log(annonce);
    // return annonce;         
  }

};
export const NavigNotif = async (choix, navigation) => {
  const fetchUrl = `getNotification/${choix}`;

  const responseJson = await RequestOptionsGet(fetchUrl)

  if (responseJson.data.length > 0) {
    responseJson.data.map((item) => {
      NaVIG(item.id_activite, item.type_activite, navigation)
    })
  }
}
export const NaVIG = (idNotif, type_activite, navigation) => {
  //console.log(idNotif);

  if (type_activite.includes('invitation') || type_activite.includes('amis') || type_activite.includes('profile') || type_activite.includes('abonn')) {
    ViewProfile(idNotif, navigation);
  }
  else if (type_activite.includes('annonce')) {
    ShowDetailAnnonce(idNotif, navigation);
  }
  else {
    return;
  }

}
//export const GOOGLE_DIRECTIONS_API_KEY ='';     
export const ViewProfile = (id_userp, navigation) => {

  navigation.navigate({
    name: 'Compte',
    params: { id_userp: id_userp },
  });
};
export const ViewAnnonces = (id_userp, navigation) => {
  navigation.navigate({
    name: 'MesAnnonces',
    params: { id_userp: id_userp },
  });
};

export const ShowDetailAnnonce = (id_annce, navigation) => {
  navigation.navigate({
    name: 'DetailAnnonce',
    params: { id_annce: id_annce },
  });
};
export const Add_historique = async (Userid, activite, id_activite) => {
  const fetchURL = 'Add_historique';
  const dataToSend = {
    user_id: Userid,
    activite: activite,
    id_activite
  }
  const response = await RequestOptionsPost(dataToSend, fetchURL)
  //console.log(response.status);
};
export const UpdatePremium = async (Userid, abnnmnt) => {
  const fetchURL = `UpdatePremium`;

  const dataToSend = {
    user_id: Userid,
    abnnmnt: abnnmnt
  }
  const response = await RequestOptionsPost(dataToSend, fetchURL)
  //console.log(response.status);
};
export const InsertDonation = async (Userid, amount, duree) => {
  //const fetchURL = `insertDonnation`;
  const fetchURL = `insertDonnation/${Userid}/${amount}/${duree}`;

  /*const dataToSend = {
    user_id: Userid,
    amount: amount,
    duree: duree
  }*/

  //const response = await RequestOptionsPost(dataToSend, fetchURL)
  const response = await RequestOptionsGet(fetchURL)

};
export const GetAnnonce = async ({ annonceID, navigation }) => {
  const fetchURL = `/annonce/${annonceID}`;
  const response = await RequestOptionsGet(fetchURL)
  const titre = response.data[0].titre
  // return titre  
  return (
    <View>
      <TouchableOpacity onPress={() => ShowDetailAnnonce = (annonceID, navigation)}>
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{titre}</Text>
      </TouchableOpacity>
    </View>
  )
}
export const RequestOptionsGet = (Api) => {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
  }

  const UrlFetch = `${Base_url}api/api/${Api}`;

  //console.log('url get test:', UrlFetch)
  const promise = new Promise(async (resolve, reject) => {
    try {
      fetch(UrlFetch, options).then((data) => data.json()).then((responseJson) => {
        //console.log('responseJson::', responseJson)
        resolve(responseJson)
      })
    } catch (msg) {
      console.log('There has been a problem with your fetch operation: ' + msg);

      reject(msg);
    }
  })
  return promise;
}

export const RequestOptionsPut = (dataToSend, Api) => {
  //console.log('RequestOptionsPut',Api)
  let formBody = [];
  for (let key in dataToSend) {
    let encodedKey = encodeURIComponent(key);
    let encodedValue = encodeURIComponent(dataToSend[key]);
    formBody.push(encodedKey + '=' + encodedValue);
  }
  formBody = formBody.join('&');
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
    body: formBody,
  }
  const UrlFetch = `${Base_url}api/api/${Api}`;
  const promise = new Promise(async (resolve, reject) => {
    try {
      fetch(UrlFetch, options).then((data) => data.json()).then((responseJson) => {
        resolve(responseJson)
      })
    } catch (msg) { reject(msg); }
  })
  return promise;

}

export const RequestOptionsPost = async (dataToSend, Api) => {
  var formBody = [];


  for (var key in dataToSend) {
    var encodedKey = encodeURIComponent(key);
    var encodedValue = encodeURIComponent(dataToSend[key]);
    formBody.push(encodedKey + '=' + encodedValue);
  }
  formBody = formBody.join('&');
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
    body: formBody,
  }
  const UrlFetch = `${Base_url}api/api/${Api}`;
  const promise = new Promise(async (resolve, reject) => {
    // console.log('UrlFetch post reqst:', UrlFetch)
    try {
      fetch(UrlFetch, options).then((data) => data.json()).then((responseJson) => {
        //console.log('resolve post reqst:', responseJson)
        resolve(responseJson);
      }).catch((error) => {
        // Handle any errors that occur
        console.error(error);
      });


    } catch (msg) {
      reject(msg);
      //throw msg; 
    }

  });

  return promise;
}
export const getTotalMsgNnLu = async () => {

  const fetchUrl = `getNotifMsg/${global.User_connecte}`;

  const responseJson = await RequestOptionsGet(fetchUrl);

  if (responseJson.data.length > 0) {

    global.TotalMsgNonLU = responseJson.data[0].TotalMsgNonLU
  }
  else global.TotalMsgNonLU = 0;

};
export const isVIP = async () => {

  const fetchUrl = `user/${global.User_connecte}`;
  const response = await RequestOptionsGet(fetchUrl)
  //console.log('isvip?', response)
  if (response.data.length > 0) {
    const MmebreisVIP = response.data[0].VIP;
    const Date_abonnement = new Date(response.data[0].date_abonnement)
    const ToDay = new Date();
    const duration = durationInMonths(Date_abonnement, ToDay);
    //console.log('MmebreisVIP:', MmebreisVIP)
    // alert('mm' + MmebreisVIP)
    //alert('dd' + global.User_connecte)
    if ((MmebreisVIP == 1 && duration > 1) || (MmebreisVIP == 2 && duration > 2) || (MmebreisVIP == 3 && duration > 3)) {
      UpdatePremium(global.User_connecte, 0);
      global.User_VIP = 0
    }
    else global.User_VIP = MmebreisVIP
  }
  else
    global.User_VIP = 0

}
export const clearAllData = () => {
  AsyncStorage.getAllKeys()
    .then(keys => AsyncStorage.multiRemove(keys));
}
export const getSession = async (id_user) => {
  const fetchURL = `session/${id_user}`;

  const response = await RequestOptionsGet(fetchURL);


};
export const Access = async (navigation) => {

  try {
    await AsyncStorage.getItem('user_id').then((value) => {
      if (value !== null) {
        // alert('g')
        global.User_connecte = value;
        // isVIP();
        //console.log('gggg')
        navigation.replace('Auth')
      }
      else {
        global.User_connecte = null
        clearAllData(); navigation.replace('DrawerNavigationRoutes');
      }
    });

  } catch (e) {

    clearAllData();
    navigation.replace('DrawerNavigationRoutes');
  }

};
//GET INREAD nOTIFICATION NUMBER
export const getNbreNotifications = async () => {

  const fetchUrl = `getNreENotifNonLu/${global.User_connecte}`;

  const responseJson = await RequestOptionsGet(fetchUrl)
  if (responseJson.data.length > 0) {
    let length = Number(responseJson.data.length) - 1;

    console.log('lenght notfi:::', length)
    while (length > global.NbreNotifNonLU) {
      const Auteur = (responseJson.data[length].nom != null) ? responseJson.data[length].nom : 'Un Inconnu';
      const message = Auteur + ' ' + responseJson.data[length].notification;
      CustomschedulePushNotification(message);
      length--;
    }
    global.NbreNotifNonLU = responseJson.data.length;
  }
}
export async function CustomschedulePushNotification(message) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'HüMA',
      body: message,
      data: { data: 'goes here' },
    },
    trigger: { seconds: 2 },
  });
}
export const UpdateReadNotification = async (type_activite, idNotif) => {
  var fetchUrl;

  if (type_activite.includes('invitation') || type_activite.includes('amis') || type_activite.includes('profile') || type_activite.includes('abonn')) {

    fetchUrl = `setReadNotifUser/${global.User_connecte}/${idNotif}`;
  }
  else {
    fetchUrl = `setReadNotifGeneral/${global.User_connecte}/${idNotif}`;
  }

  await RequestOptionsGet(fetchUrl);
};
export const SaveImage = async (dataToSend) => {

  const fetchUrl = 'upload';

  //console.log('SaveImage dataToSend :::', dataToSend);

  await RequestOptionsPost(dataToSend, fetchUrl);


};
export const DeleteSession = async (navigation) => {
  const baseUrl2 = Base_url + 'api/api/session';

  let dataToSend = { id_user: global.User_connecte };
  let formBody = [];
  for (let key in dataToSend) {
    let encodedKey = encodeURIComponent(key);
    let encodedValue = encodeURIComponent(dataToSend[key]);
    formBody.push(encodedKey + '=' + encodedValue);
  }
  formBody = formBody.join('&');
  await fetch(baseUrl2, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
    body: formBody,
  })
    .then((response) => response.json())
    .then((responseJson) => {

      AsyncStorage.clear();

      AsyncStorage.getAllKeys()
        .then(keys => AsyncStorage.multiRemove(keys))

      global.User_connecte = null
      global.User_VIP = null
      global.NbreNotifNonLU = null
      navigation.replace('DrawerNavigationRoutes');
    })
    .catch((error) => {
      console.error(error);
    });
};
/********ditance function */
export const fetchDistanceBetweenPoints = async (lat1, lng1, lat2, lng2) => { // Pass Latitude & Longitude of both points as a parameter
  //maison=(lat2,lng2) 36.8572011,10.275799
  //travail=(lat1,lng1) 36.8135979,10.1783812
  let urlToFetchDistance = 'https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=' + lat1 + ',' + lng1 + '&destinations=' + lat2 + '%2C' + lng2 + '&key=' + "GooglePlacesApiKey";

  fetch(urlToFetchDistance)
    .then(res => {
      return res.json()
    })
    .then(res => {
      var distanceString = res.rows[0].elements[0].distance.text;

      // Do your stuff here
    })
    .catch(error => {
      console.log("Problem occurred");
    });
};

export async function fetchPublishableKey(amount): Promise<string | null> {
  try {
    // console.log('amount:', Number(amount));

    const response = await fetch(
      `${Base_url}api/api/abonnement/${amount}`
    );
    const { publishableKey } = await response.json();


    return publishableKey;
  } catch (e) {
    console.warn('Unable to fetch publishable key. Is your server running?');
    Alert.alert(
      'Error',
      'Unable to fetch publishable key. Is your server running?'
    );
    return null;
  }
}
export async function fetchPublishableKeyDonate(amount,
  duree
): Promise<string | null> {
  try {

    const response = await fetch(
      `${Base_url}api/api/donate/${amount}/${duree}`
    );
    const { publishableKey } = await response.json();

    return publishableKey;
  } catch (e) {
    console.warn('Unable to fetch publishable key. Is your server running?');
    Alert.alert(
      'Error',
      'Unable to fetch publishable key. Is your server running?'
    );
    return null;
  }
}


