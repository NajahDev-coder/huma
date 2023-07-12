
// Import React
import React from 'react';

// Import Navigators from React Navigation
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { MaterialCommunityIcons, Zocial } from '@expo/vector-icons';
// Import Screens
import AnnoncesScreen from './DrawerScreens/AnnoncesScreen';

import DetailAnnonceScreen from './DrawerScreens/DetailAnnonceScreen';
import AccueilScreen from './AccueilScreen';
import LoginScreen from './LoginScreen';
import CompteScreen from './CompteScreen';
import RegisterScreen from './RegisterScreen';

import CategScreen from './CategScreen';
import CustomSidebarMenu from './Components/CustomSidebarMenu';
import NavigationDrawerHeader from './Components/NavigationDrawerHeader';
import NavigationLogoHeader from './Components/NavigationLogoHeader';
import NavigationLogoNotifHeader from './Components/NavigationLogoNotifHeader';
import NavigationBottomTabs from './Components/NavigationDrawerFooter';
import MembresScreen from './DrawerScreens/MembresScreen';
import ListEvaluations from './Components/ListEvaluations';
const Stack = createStackNavigator();
const RightDrawer = createDrawerNavigator();

const AnnonceScreenStack = ({ navigation }) => {
    return (
        <Stack.Navigator initialRouteName="AnnoncesScreen">
            <Stack.Screen
                name="Annonces"
                component={AnnoncesScreen}
                options={{
                    headerLeft: () => (
                        <NavigationDrawerHeader navigationProps={navigation} />
                    ),
                    title: "",
                    headerRight: () => (
                        <NavigationLogoHeader navigationProps={navigation} />
                    ),
                    headerStyle: {
                        backgroundColor: '#FFFFFF', //Set Header color
                        borderBottomWidth: 0,
                    },
                    headerTintColor: '#c4d63c', //Set Header text color
                    headerTitleStyle: {
                        fontWeight: 'bold', //Set Header text style
                    },
                }}
            />
            <Stack.Screen
                name="DetailAnnonce"
                component={DetailAnnonceScreen}
                options={{
                    title: 'Détails Annonce', headerTintColor: '#97ab00',
                    headerTitleStyle: { color: '#97ab00' },
                    headerRight: () => (
                        <NavigationLogoHeader navigationProps={navigation} />
                    ),
                }}
            />


            <Stack.Screen
                name="Compte"
                component={CompteScreen}
                options={{
                    title: 'Compte', headerTintColor: '#97ab00',
                    headerTitleStyle: { color: '#97ab00' },
                    headerRight: () => (
                        <NavigationLogoHeader navigationProps={navigation} />
                    ),
                }}
            />
            <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{
                    title: 'Login', headerTintColor: '#97ab00',
                    headerTitleStyle: { color: '#97ab00' },
                    headerRight: () => (
                        <NavigationLogoHeader navigationProps={navigation} />
                    ),
                }}
            />
            <Stack.Screen
                name="Register"
                component={RegisterScreen}
                options={{
                    title: 'Inscription', headerTintColor: '#97ab00',
                    headerTitleStyle: { color: '#97ab00' },
                    headerRight: () => (
                        <NavigationLogoHeader navigationProps={navigation} />
                    ),
                }}
            />
            <Stack.Screen
                name="Evaluations"
                component={ListEvaluations}
                options={{
                    title: 'Avis & Commentaires', headerTintColor: '#97ab00',
                    headerTitleStyle: { color: '#97ab00' },
                    headerRight: () => (
                        <NavigationLogoHeader navigationProps={navigation} />
                    ),
                }}
            />
        </Stack.Navigator>
    );
};

const HomeScreenStack = ({ navigation }) => {
    return (
        <Stack.Navigator initialRouteName="AccueilScreen">
            <Stack.Screen
                name="Accueil"
                component={NavigationBottomTabs}
                options={{
                    headerLeft: () => (
                        <NavigationDrawerHeader navigationProps={navigation} />
                    ),
                    title: "",
                    headerRight: () => (
                        <NavigationLogoHeader navigationProps={navigation} />
                    ),
                    headerStyle: {
                        backgroundColor: '#FFFFFF', //Set Header 
                        borderBottomWidth: 0,
                    },
                    headerTintColor: '#c4d63c', //Set Header text color
                    headerTitleStyle: {
                        fontWeight: 'bold', //Set Header text style
                    },
                }}
            />

            <Stack.Screen
                name="DetailAnnonce"
                component={DetailAnnonceScreen}
                options={{
                    title: 'Détails Annonce', headerTintColor: '#97ab00',
                    headerTitleStyle: { color: '#97ab00' },
                    headerRight: () => (
                        <NavigationLogoHeader navigationProps={navigation} />
                    ),
                }}
            />
            <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{
                    title: 'Login', headerTintColor: '#97ab00',
                    headerTitleStyle: { color: '#97ab00' },
                    headerRight: () => (
                        <NavigationLogoHeader navigationProps={navigation} />
                    ),
                }}
            />
            <Stack.Screen
                name="Register"
                component={RegisterScreen}
                options={{
                    title: 'Inscription', headerTintColor: '#97ab00',
                    headerTitleStyle: { color: '#97ab00' },
                    headerRight: () => (
                        <NavigationLogoHeader navigationProps={navigation} />
                    ),
                }}
            />
            <Stack.Screen
                name="Compte"
                component={CompteScreen}
                options={{
                    title: 'Compte', headerTintColor: '#97ab00',
                    headerTitleStyle: { color: '#97ab00' },
                    headerRight: () => (
                        <NavigationLogoHeader navigationProps={navigation} />
                    ),
                }}
            />
            <Stack.Screen
                name="Annonces"
                component={AnnoncesScreen}
                options={{
                    title: 'Annonces', headerTintColor: '#97ab00',
                    headerTitleStyle: { color: '#97ab00' },
                    headerRight: () => (
                        <NavigationLogoHeader navigationProps={navigation} />
                    ),
                }} />



            <Stack.Screen
                name="Categ"
                component={CategScreen}
                options={{
                    title: 'Nouvelle Annonce', headerTintColor: '#97ab00',
                    headerTitleStyle: { color: '#97ab00' },
                    headerRight: () => (
                        <NavigationLogoHeader navigationProps={navigation} />
                    ),
                }}
            />

            <Stack.Screen
                name="Evaluations"
                component={ListEvaluations}
                options={{
                    title: 'Avis & Commentaires', headerTintColor: '#97ab00',
                    headerTitleStyle: { color: '#97ab00' },
                    headerRight: () => (
                        <NavigationLogoHeader navigationProps={navigation} />
                    ),
                }}
            />
            <Stack.Screen
                name="Evaluations2"
                component={ListEvaluations}
                options={{
                    title: 'Avis & Commentaires', headerTintColor: '#97ab00',
                    headerTitleStyle: { color: '#97ab00' },
                    headerRight: () => (
                        <NavigationLogoHeader navigationProps={navigation} />
                    ),
                }}
            />
        </Stack.Navigator>
    );
};

const DrawerNavigatorRoutes = (props) => {
    return (
        <RightDrawer.Navigator
            screenOptions={{

                itemStyle: { marginVertical: 5, color: 'white' },
                labelStyle: {
                    color: '#d8d8d8',
                },
                headerShown: false,

                drawerActiveTintColor: "#c4d63c",
                drawerInactiveTintColor: '#49382f',

            }}

            drawerContent={(props) => <CustomSidebarMenu {...props} />}>

            <RightDrawer.Screen
                name="HomeScreenStack"
                options={{
                    drawerLabel: 'Accueil',
                    drawerIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="home" size={30} color={color} />
                    ),
                }}
                component={HomeScreenStack}
            />


            <RightDrawer.Screen
                name="AnnonceScreenStack"
                options={{
                    drawerLabel: 'Annonces',
                    drawerIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="post" size={30} color={color} />
                    ),
                }}
                component={AnnonceScreenStack}

            />
            <RightDrawer.Screen
                name='Membres'
                options={{
                    drawerlabel: 'Membres',
                    drawerIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="account-multiple" size={30} color={color} />
                    ),
                }}
                component={MembresScreen}
            />
            <RightDrawer.Screen
                name="Login"
                options={{
                    drawerLabel: 'Login',
                    drawerIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="login-variant" size={30} color={color} />
                    ),
                }}
                component={LoginScreen}
            />
            <RightDrawer.Screen
                name="Register"
                options={{
                    drawerLabel: 'Inscription',
                    drawerIcon: ({ color, size }) => (
                        <Zocial name="persona" size={24} color={color} />
                    ),
                }}
                component={RegisterScreen}
            />

        </RightDrawer.Navigator>

    );
};

export default DrawerNavigatorRoutes;