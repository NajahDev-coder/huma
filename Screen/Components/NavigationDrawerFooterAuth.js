import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

// Import Navigators from React Navigation
// npm i @react-navigation/bottom-tabs react-native-elements
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';

import AnnoncesScreen from '../DrawerScreens/AnnoncesScreen';
import AccueilScreen from '../AccueilScreen';
import CompteScreen from '../CompteScreen';

import MesMessages from '../DrawerScreens/MesMessages';

import NotifMessages from './NotifMessages';
import TypeScreen from '../TypeScreen';
import DrawerNavigatorAuthRoutes from '../DrawerNavigationAuthRoutes'
const Tab = createBottomTabNavigator();

export default function NavigationBottomTabsAuth(props) {
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

  return (
    <Tab.Navigator initialRouteName="AccueilScreen"
      tabBarOptions={{

        activeTintColor: '#a7b730',
        inactiveTintColor: '#49382f'
      }}>
      <Tab.Screen
        name="AccueilB"
        component={AccueilScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Accueil',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
          tabBarActiveTintColor: '#a7b730',
          tabBarStyle: [
            {
              display: 'flex',
            },
            null,
          ],
        }}
      />
      <Tab.Screen
        name="AnnoncesB"
        component={AnnoncesScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Annonces',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="post" color={color} size={size} />
          ),
          tabBarActiveTintColor: '#a7b730',
          tabBarColor: '#9cb100',
          tabBarStyle: [
            {
              display: 'flex',
            },
            null,

          ],
        }}
      />
      <Tab.Screen
        name="Ajout AnnonceB"
        component={TypeScreen}
        options={{
          headerShown: false,
          tabBarLabel: '',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="plus-circle" size={35} color='#9cb100' style={{ position: 'absolute', top: -10 }} />
          ),
          tabBarActiveTintColor: '#a7b730',
          tabBarColor: '#9cb100',
          tabBarStyle: [
            {
              display: 'flex',
            },
            null,
          ],
        }}
      />

      <Tab.Screen
        //name={UserId}
        name="MessagesB"
        component={MesMessages}
        options={{
          headerShown: false,
          tabBarLabel: 'Chat',
          tabBarIcon: ({ color, size }) => (
            <NotifMessages id_user={UserId} color={color} />
          ),
          tabBarActiveTintColor: '#a7b730',
          tabBarStyle: [
            {
              display: 'flex',
            },
            null,
          ],
        }}
      />
      <Tab.Screen
        name="CompteB"
        id_user={global.User_connecte}
        component={CompteScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={30} />
          ),
          tabBarActiveTintColor: '#a7b730',
          tabBarStyle: [
            {
              display: 'flex',
            },
            null,
          ],
        }}
      />
    </Tab.Navigator>
  );
}
