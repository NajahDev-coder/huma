
import 'react-native-gesture-handler';
import './polyfills';
import React, { useState, useCallback, useEffect, useRef } from 'react';

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
import * as ScreenOrientation from 'expo-screen-orientation';
import PropTypes from 'prop-types';
import Constants from 'expo-constants';
//import { Map, GoogleApiWrapper } from 'google-maps-react';

// Import Navigators from React Navigation 
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Platform } from 'react-native';
// Import Screens   
import SplashScreen from './Screen/SplashScreen';

import DrawerNavigationRoutes from './Screen/DrawerNavigationRoutes';
import DrawerNavigationAuthRoutes from './Screen/DrawerNavigationAuthRoutes';
import NavigationBottomTabsAuth from './Screen/Components/NavigationDrawerFooterAuth';
import { getTotalMsgNnLu, isVIP, getNbreNotifications } from './Screen/utils/utils';
import { LogBox } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});
// Ignore log notification by message:
LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

// Ignore all log notifications:
LogBox.ignoreAllLogs();
const Stack = createStackNavigator();


const Auth = () => {


  // Stack Navigator for Login and Sign up Screen
  return (
    <Stack.Navigator initialRouteName="DrawerNavigationAuthRoutes" >
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
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  useEffect(() => {

    isVIP();
    const intervalId1 = setInterval(() => {

      isVIP();


    }, 4000)
    getNbreNotifications();
    getTotalMsgNnLu();

    const intervalId = setInterval(() => {
      getTotalMsgNnLu();
    }, 1000 * 30)
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });
    async () => {
      await schedulePushNotification();
    }
    return () => {
      clearInterval(intervalId1);
      clearInterval(intervalId);
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, [])
  return (
    <>
      <NavigationContainer style={{ paddingTop: Constants.statusBarHeight }}>
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
async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "You've got mail! 📬",
      body: 'Here is the notification body',
      data: { data: 'goes here' },
    },
    trigger: { seconds: 2 },
  });
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    // Learn more about projectId:
    // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
    token = (await Notifications.getExpoPushTokenAsync({ projectId: 'your-project-id' })).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token;
}

export default App;
