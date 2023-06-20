import React, { useState, createRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image
} from 'react-native';
import GetSession from './GetSession';
import { Base_url, ViewProfile, RequestOptionsGet } from '../utils/utils';
import { Avatar, Badge, Icon, withBadge } from 'react-native-elements'

const GetProfile = ({ navigation, user_id, user_name, img_prof, StyleDimens }) => {

  const [isEnligne, setIsEnligne] = useState(false);
  const strUser = '_U' + user_id + '.jpeg'
  const imgProfile = img_prof && (img_prof.includes(strUser) || img_prof.includes('logo')) ? { uri: `${Base_url}images/${img_prof}` } : { uri: `${Base_url}images/compte.png` }
  //  //console.log("imgProfile",imgProfile)
  //const DefaultimageProfile = { uri:   `${Base_url}images/compte.png` }; 
  //const [imageProfile, setImageProfile]=useState(imgProfile  || DefaultimageProfile ) 

  const isConnected = async (id_user) => {
    const fetchURL = `session/${id_user}`
    const responseJson = await RequestOptionsGet(fetchURL);
    if (responseJson.data[0]) {
      setIsEnligne(true)
    }
  }
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      isConnected(user_id)
    }
    return () => (isMounted = false)
  })
  return (
    <>
      <TouchableOpacity

        onPress={() => {
          ViewProfile(user_id, navigation);
        }}>

        <View style={{ zIndex: 10 }}>
          <GetSession id_user={user_id} />
        </View>
        <View style={[StyleDimens == 'large' ? styles.LargeRound : styles.MediumRound, isEnligne && styles.IsEnligne]} >

          <Avatar
            rounded
            source={imgProfile}

            size={StyleDimens ? StyleDimens : 'medium'}

          />


        </View>

        <Text style={styles.postLabel}>{user_name}</Text>
      </TouchableOpacity>
    </>
  )
};
const styles = StyleSheet.create({
  LargeRound: {
    width: 90,
    height: 90,
    borderRadius: 90,
    borderWidth: 2,
    borderColor: '#bdbdbd',
    padding: 6
  },
  MediumRound: {
    width: 60, height: 60, borderRadius: 60,
    borderWidth: 2,
    borderColor: '#bdbdbd',
    padding: 3
  },
  IsEnligne: {
    borderColor: '#adc01a',
  }

});
export default GetProfile;