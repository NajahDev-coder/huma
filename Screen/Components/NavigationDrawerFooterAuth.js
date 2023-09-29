import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

// Import Navigators from React Navigation
// npm i @react-navigation/bottom-tabs react-native-elements
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons, FontAwesome5, AntDesign } from '@expo/vector-icons';

import AnnoncesScreen from '../DrawerScreens/AnnoncesScreen';
import AccueilScreen from '../AccueilScreen';
import CompteScreen from '../CompteScreen';
import { getTotalMsgNnLu } from '../utils/utils';
import MesMessages from '../DrawerScreens/MesMessages';

import TypeScreen from '../TypeScreen';
import FilterForm from '../DrawerScreens/FilterForm';
const Tab = createBottomTabNavigator();

export default function NavigationBottomTabsAuth(props) {
  const IconeMsg = ({ color }) => {
    return (
      <View style={styles.bc_notifmsg}>
        {(global.TotalMsgNonLU > 0) &&
          <Text style={styles.isnotif}>{global.TotalMsgNonLU}</Text>
        }
        <AntDesign name="message1" size={24} color={color} style={{ marginTop: 3 }} />
      </View>
    )
  }
  useEffect(() => {

    // alert('rr');
    //getTotalMsgNnLu();


  }, [global.TotalMsgNonLU])

  return (
    <Tab.Navigator initialRouteName="AccueilScreen"
      tabBarOptions={{
        activeTintColor: '#a7b730',
        inactiveTintColor: '#49382f'
      }}>
      <Tab.Screen
        name="Accueil"
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
        name="Annonces"
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
        name="Ajout_Annonce"
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
        name="Messages"
        component={MesMessages}
        options={{
          headerShown: false,
          tabBarLabel: 'Chat',
          tabBarIcon: ({ color, size }) => (
            <View style={styles.bc_notifmsg}>
              {(global.TotalMsgNonLU > 0) &&
                <Text style={styles.isnotif}>{global.TotalMsgNonLU}</Text>
              }
              <AntDesign name="message1" size={24} color={color} style={{ marginTop: 3 }} />
            </View>
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
          tabBarLabel: 'Profil',
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
const styles = StyleSheet.create({
  bc_notifmsg: {
    flexDirection: 'row',
    //padding: 10, 
    position: 'relative'
  },
  isnotif: {
    backgroundColor: 'rgb(140, 153, 44)',
    width: 22,
    height: 22,
    borderRadius: 22,
    position: 'absolute',
    top: 5,
    right: -15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
    color: '#fff',
    textAlign: 'center',
    zIndex: 20
  },
});