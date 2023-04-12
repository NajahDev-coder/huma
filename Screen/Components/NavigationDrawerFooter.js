import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// Import Navigators from React Navigation
// npm i @react-navigation/bottom-tabs react-native-elements
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';

import AnnoncesScreen from '../DrawerScreens/AnnoncesScreen';
import AccueilScreen from '../AccueilScreen';
import LoginScreen from '../LoginScreen';
import CompteScreen from '../CompteScreen';
import MembresScreen from '../DrawerScreens/MembresScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TypeScreen from '../TypeScreen';

const Tab = createBottomTabNavigator();

export default function NavigationBottomTabs(props) {


  //export default function NavigationBottomTabs() {
  return (
    <Tab.Navigator initialRouteName="AccueilScreen" tabBarOptions={{

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
          tabBarStyle: [
            {
              display: 'flex',
            },
            null,
          ],
        }}
      />

      <Tab.Screen
        name="LoginSreen"
        component={() => (<LoginScreen navigation={props.navigation} connecte={'false'} />)}
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
        name="Membres"
        component={MembresScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Membres',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-multiple" color={color} size={28} style={{ marginTop: 3 }} />
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
        name="Login"
        component={LoginScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Login',
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
