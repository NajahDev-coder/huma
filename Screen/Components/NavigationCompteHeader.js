
import React, { useEffect, useState } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Notifications from './Notifications';
import { Base_url } from '../utils/utils';
//import Constants from 'expo-constants';


const NavigationCompteHeader = ({ navigationProps }) => {
  const [UserId, setUserId] = useState(null);

  const getUserIdConnecte = async () => {
    const Iduser = await AsyncStorage.getItem('user_id');
    setUserId(Iduser);
  };

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      getUserIdConnecte();
    }
    return () => (isMounted = false);
  }, [UserId]);

  const toggleDrawer = async () => {
    navigationProps.navigate({ name: 'Compte', params: { id_userp: global.User_connecte }, })
  };

  return (
    <View style={{ flexDirection: 'row', }}>

      {/*UserId != null && (
        
        <Notifications navigation={navigationProps} id_user={UserId} />
       
      )*/}
      <TouchableOpacity onPress={toggleDrawer} style={{ marginRight: 20, zIndex: 50 }}>
        <Image
          source={{
            uri: Base_url + 'images/compte.png',
          }}
          style={{ width: 25, height: 25, marginTop: 4 }}
        />
      </TouchableOpacity>
    </View>
  );
};
export default NavigationCompteHeader;

