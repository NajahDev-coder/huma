import React, { useState, createRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image
} from 'react-native';
import GetSession from './GetSession';
import { Base_url, ViewProfile } from '../utils/utils';
import { Avatar, Badge, Icon, withBadge } from 'react-native-elements'
const GetProfile = ({ navigation, user_id, user_name, img_prof, StyleDimens }) => {
  const strUser = '_U' + user_id + '.jpeg'
  const imgProfile = img_prof && img_prof.includes(strUser) ? { uri: `${Base_url}images/${img_prof}` } : { uri: `${Base_url}images/compte.png` }
  //  //console.log("imgProfile",imgProfile)
  //const DefaultimageProfile = { uri:   `${Base_url}images/compte.png` }; 
  //const [imageProfile, setImageProfile]=useState(imgProfile  || DefaultimageProfile )  

  return (
    <>
      <TouchableOpacity

        onPress={() => {
          ViewProfile(user_id, navigation);
        }}>

        <View style={{ zIndex: 10 }}>
          <GetSession id_user={user_id} />
        </View>
        <View>
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


});
export default GetProfile;