// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, { useEffect, useState } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Dimensions, Platform } from 'react-native';

import Notifications from './Notifications';
import { Base_url } from '../utils/utils';

//import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as ScreenOrientation from 'expo-screen-orientation';

const Marge = parseInt(Dimensions.get('window').width / 2 + 80);

const NavigationLogoNotifHeader = ({ navigationProps }) => {
  const [position, setPosition] = useState(0);
  const [margeLogo, setMargeLogo] = useState(Marge);

  useEffect(() => {
    //setPosition(ScreenOrientation.getOrientationAsync())
    //const Marge = parseInt(Dimensions.get('window').width / 2 + 80);
    Dimensions.addEventListener('change', (e) => {
      // const { width, height } = e.window;

      const Marge = parseInt(Dimensions.get('window').width / 2 + 80);

      setMargeLogo(Marge)
    })
  }, [])
  return (
    <View style={{
      flexDirection: 'row', marginTop: -40, width: margeLogo,
    }}>

      <TouchableOpacity
        accessibilityLabel="logo_block"
        onPress={() => navigationProps.navigate('Accueil')}
        style={{
          position: 'absolute', height: 50,
          left: 0,
        }}>
        <Image

          source={{
            uri: Base_url + 'images/logo.png',
          }}
          style={styles.imglogo}
        />
      </TouchableOpacity>

      {global.User_connecte != null && (
        <View style={{ position: 'absolute', right: 0 }}>
          <Notifications navigation={navigationProps} widthIcone={Platform.OS == 'web' ? '100%' : '100%'} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    // width: Platform.OS == 'web' ? (global.User_connecte != null ? 120 : 140) : 160,
    position: 'absolute',
    //right: Platform.OS === 'web' ? (global.User_connecte != null ? 100 : 10) : (global.User_connecte != null ? Marge : 10),
    //top: -20,
    height: 50,
  },

  imglogo: {
    width: Platform.OS == 'web' ? 130 : 150,
    height: 40,

  }
})
export default NavigationLogoNotifHeader;
