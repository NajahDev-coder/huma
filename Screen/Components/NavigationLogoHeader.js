// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, { useEffect, useState } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Dimensions, Platform } from 'react-native';

import Notifications from './Notifications';
import { Base_url } from '../utils/utils';

//import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Marge = parseInt(Dimensions.get('screen').width / 4) + 28;

const NavigationLogoHeader = ({ navigationProps }) => {



  return (
    <View style={{ flexDirection: 'row', marginTop: -40 }}>

      <TouchableOpacity onPress={() => navigationProps.navigate('Accueil')} style={{
        position: 'absolute', height: 50,
        right: 10,
      }}>
        <Image

          source={{
            uri: Base_url + 'images/logo.png',
          }}
          style={styles.imglogo}
        />
      </TouchableOpacity>



    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: Platform.OS === 'web' ? (global.User_connecte != null ? 120 : 140) : 160,
    position: 'absolute',
    right: Platform.OS === 'web' ? (global.User_connecte != null ? 80 : 10) : (global.User_connecte != null ? Marge : 10),
    //top: -20,
    height: 50,
  },

  imglogo: {
    width: Platform.OS === 'web' ? 130 : 150,
    height: 40,

  }
})
export default NavigationLogoHeader;
