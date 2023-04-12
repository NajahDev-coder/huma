
import 'react-native-gesture-handler'
import './polyfills';
import React, { useState, useCallback, useEffect } from 'react';
import { Font } from 'expo';
import {
  NativeViewGestureHandler, 
  ScrollView as GHScroll,
  State,
  TapGestureHandler,   
  TextInput,
  RectButton,   
  createNativeWrapper, 
} from 'react-native-gesture-handler';

import PropTypes from 'prop-types';
import Constants from 'expo-constants';
//import { Map, GoogleApiWrapper } from 'google-maps-react';
 
// Import Navigators from React Navigation 
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
 
// Import Screens
import SplashScreen from './Screen/SplashScreen';

import DrawerNavigationRoutes from './Screen/DrawerNavigationRoutes';
import DrawerNavigationAuthRoutes from './Screen/DrawerNavigationAuthRoutes';
import NavigationBottomTabsAuth from './Screen/Components/NavigationDrawerFooterAuth'
import { LogBox } from 'react-native';

// Ignore log notification by message:
LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);
 
// Ignore all log notifications:
LogBox.ignoreAllLogs();
const Stack = createStackNavigator();

import * as Notifications from 'expo-notifications';
/*async function registerForPushNotificationsAsync() {
    let token;

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
    }
    if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        console.log('Failed to get push token for push notification!');
        return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);

    return token;
}
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true
  }),
});*/
const Auth = () => {
  useEffect(() => {
    //registerForPushNotificationsAsync();
  })
  // Stack Navigator for Login and Sign up Screen
  return (
    <Stack.Navigator initialRouteName="DrawerNavigationAuthRoutes">
      {/* SplashScreen which will come once for 5 Seconds */}
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        // Hiding header for Splash Screen
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="DrawerNavigationAuthRoutes"
        component={DrawerNavigationAuthRoutes}
        // Hiding header for Navigation Drawer
        options={{ headerShown: false }}
      />
    
    </Stack.Navigator>
  );
};

const App = () => {
   /*const [fontsLoaded] = await Font.loadAsync({
    'Montserrat-Regular': require('./assets/fonts/Montserrat-Regular.ttf'),
  });*/
  /*useEffect(() => {
    makeAPICall();
  }, [])*/
  return (
    <>
    <NavigationContainer style={{  paddingTop: Constants.statusBarHeight}}>
      <Stack.Navigator initialRouteName="SplashScreen">
        {/* SplashScreen which will come once for 5 Seconds */}
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          // Hiding header for Splash Screen
          options={{ headerShown: false }}
        />
        {/* Auth Navigator: Include Login and Signup */}
        <Stack.Screen
          name="DrawerNavigationRoutes"
          component={DrawerNavigationRoutes}
          options={{ headerShown: false }}
        />

        {/* Navigation Drawer as a landing page */}
        <Stack.Screen
          name="Auth"
          component={Auth}
          // Hiding header for Navigation Drawer
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
      </NavigationContainer>
      
    </>
  );
};

export default App;
