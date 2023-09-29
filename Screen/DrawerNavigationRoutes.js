
// Import React
import React from 'react';

// Import Navigators from React Navigation
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { MaterialCommunityIcons, Zocial } from '@expo/vector-icons';
// Import Screens
import AnnoncesScreen from './DrawerScreens/AnnoncesScreen';

import MesAnnonces from './DrawerScreens/MesAnnonces';
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
import FilterForm from './DrawerScreens/FilterForm';

import NavigationBackHeader from './Components/NavigationBackHeader';

const Stack = createStackNavigator();
const RightDrawer = createDrawerNavigator();
const config = {
    animation: 'spring',
    config: {
        stiffness: 1000,
        damping: 500,
        mass: 3,
        overshootClamping: true,
        restDisplacementThreshold: 0.01,
        restSpeedThreshold: 0.01,
    },
};
const AnnonceScreenStack = ({ navigation }) => {
    return (
        <Stack.Navigator initialRouteName="AnnoncesScreen"
        >
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
                    title: 'Compte',
                    headerTintColor: '#97ab00',
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
                name="MesAnnonces"
                component={MesAnnonces}
                options={{
                    title: 'Annonces',
                    headerTintColor: '#97ab00',
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
                        <NavigationLogoHeader navigation={navigation} initialPage="Annonces" />
                    ),
                }}
            />
            <Stack.Screen
                name="Filter"
                component={FilterForm}
                options={{
                    headerLeft: () => (
                        <NavigationBackHeader navigationProps={navigation} Screen='Annonces' />
                    ),
                    title: "",
                    headerTintColor: "#97ab00",
                    headerTitleStyle: { color: "#97ab00" },
                    cardStyleInterpolator: CardStyleInterpolators.forRevealFromBottomAndroid,
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
        <Stack.Navigator initialRouteName="AccueilScreen"
        >
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
                    title: "Compte",
                    headerTintColor: "#97ab00",
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
                name="MesAnnonces"
                component={MesAnnonces}
                options={{
                    title: 'Annonces',
                    headerTintColor: '#97ab00',
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
            <Stack.Screen
                name="Filter"
                component={FilterForm}
                options={{
                    headerLeft: () => (
                        <NavigationBackHeader navigationProps={navigation} Screen='Annonces' />
                    ),
                    title: "",
                    headerTintColor: "#97ab00",
                    headerTitleStyle: { color: "#97ab00" },
                    cardStyleInterpolator: CardStyleInterpolators.forRevealFromBottomAndroid,
                    headerRight: () => (
                        <NavigationLogoHeader navigationProps={navigation} />
                    ),
                }}
            />
        </Stack.Navigator>
    );
};

const MembresScreenStack = ({ navigation }) => {
    return (
        <Stack.Navigator initialRouteName="MembresScreen"
        >
            <Stack.Screen
                name="Membres"
                component={MembresScreen}
                options={{
                    headerLeft: () => (
                        <NavigationDrawerHeader navigationProps={navigation} />
                    ),
                    title: '',
                    headerRight: () => (
                        <NavigationLogoNotifHeader navigationProps={navigation} />
                    ),
                    headerStyle: {
                        backgroundColor: '#FFFFFF', //Set Header color
                        borderBottomWidth: 0,
                        height: 75
                    },
                    headerTintColor: '#97ab00', //Set Header text color
                    headerTitleStyle: { color: '#97ab00' }
                }}
            />
            <Stack.Screen
                name="Compte"
                component={CompteScreen}
                option={{
                    title: "Compte",
                    headerTintColor: "#97ab00",
                    headerTitleStyle: { color: '#97ab00' },
                    headerRight: () => (
                        <NavigationLogoHeader navigationProps={navigation} />
                    ),
                }}
            />

            <Stack.Screen
                name="MesAnnonces"
                component={MesAnnonces}
                options={{
                    title: 'Annonces',
                    headerTintColor: '#97ab00',
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
                component={MembresScreenStack}
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