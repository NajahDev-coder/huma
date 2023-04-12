import React from 'react';    
import axios from "axios";
import { Alert , TouchableOpacity, Text,  View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';  
export const Base_url = 'https://huma.bzh/';
export const API_URL = "https://expo-stripe-server-example.glitch.me"
export const GOOGLE_PLACES_API_KEY = 'AIzaSyAVWheD_CJmbOlCCKBTRKRRkeFJy_Mxzbg'; // never save your real api key in a snack!
//export const Google_Geocoding_API_KEY='AIzaSyB6XPphkYxCN7xgeTj2f6_jllc0T_MXt6o';     
export const PublishableKeyStripe = 'pk_test_51MUWURCarNgzrgxJ4kpO0UjVcuWnig3mqitwea2SOQBKUlF4fPh9COYOsxz0O64Cwmu6lqTlqmAzrAINkdFWdgMN00xWufC1KN';

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
export const Add_historique = async (Userid, activite) => {
  const fetchURL = 'Add_historique';
  const dataToSend = {
    user_id: Userid,
    activite: activite
  }
  const response = await RequestOptionsPost(dataToSend, fetchURL)
  console.log(response.status);
};
export const UpdatePremium = async (Userid) => {
  const fetchURL = 'UpdatePremium';
  const dataToSend = {
    user_id: Userid,
  }
  const response = await RequestOptionsPost(dataToSend, fetchURL)
  console.log(response.status);
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

  //console.log(UrlFetch)
  const promise = new Promise(async (resolve, reject) => {
    try {
      fetch(UrlFetch, options).then((data) => data.json()).then((responseJson) => {
        // console.log('responseJson',responseJson)
        resolve(responseJson)
      })
    } catch (msg) { reject(msg); }
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

export const SaveImage = async (dataToSend) => {
  //alert(UserID);
  console.log('SaveImage', dataToSend)
  const fetchUrl = 'upload';
  const response = await RequestOptionsPost(dataToSend, fetchUrl);
  console.log('SaveImage response', response)

};
export const DeleteSession = async (navigation) => {
  const baseUrl2 = Base_url + 'api/api/session';

  let dataToSend = { id_user: global.User_connecte };
  var formBody = [];
  for (var key in dataToSend) {
    var encodedKey = encodeURIComponent(key);
    var encodedValue = encodeURIComponent(dataToSend[key]);
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
      //setRefreshKey((oldKey) => oldKey + 1);

      AsyncStorage.clear();

      AsyncStorage.getAllKeys()
        .then(keys => AsyncStorage.multiRemove(keys))
      //.then(() => alert('success'));   
      global.User_connecte = null
      global.User_VIP = null
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
  //GOOGLE_PLACES_API_KEY = 'AIzaSyAVWheD_CJmbOlCCKBTRKRRkeFJy_Mxzbg'
  var urlToFetchDistance = 'https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=' + lat1 + ',' + lng1 + '&destinations=' + lat2 + '%2C' + lng2 + '&key=' + "GOOGLE_PLACES_API_KEY";

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

export async function fetchPublishableKey(
  paymentMethod?: string
): Promise<string | null> {
  try {
    const response = await fetch(
      `${API_URL}/stripe-key?paymentMethod=${paymentMethod}`
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



