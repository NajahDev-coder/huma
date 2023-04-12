// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, { useEffect, useState } from 'react';
import { View, Image, TouchableOpacity, Platform, StyleSheet } from 'react-native';
import Notifications from './Notifications';
import { Base_url } from '../utils/utils';

//import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';


const NavigationLogoHeader = ({ navigationProps }) => {
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
    return (isMounted) => (isMounted = false);
  }, [UserId]);
  const toggleDrawer = () => {
    navigationProps.navigate('MenuScreen');
  };
  return (
    <View style={{ flexDirection: 'row' }}>
      <TouchableOpacity onPress={toggleDrawer} style={styles.logo}>
        <Image
          source={{
            uri: Base_url + 'images/logo.png',
          }}
          style={styles.imglogo}
        />
      </TouchableOpacity>
      {UserId != null && (
        <View style={{ width: 120, flexDirection: 'row' }}>
          <Notifications navigation={navigationProps} id_user={UserId} widthIcone={Platform.OS == 'web' ? '100%' : '100%'} />
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  logo: {
    width: Platform.OS == 'web' ? (global.User_connecte != null ? 120 : 140) : 160,
    height: 50,
  },
  imglogo: {
    width: Platform.OS == 'web' ? 130 : 150,
    height: 40,
  }
})
export default NavigationLogoHeader;
