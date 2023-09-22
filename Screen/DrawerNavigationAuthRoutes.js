// Import React
import React from 'react';
import { Platform } from 'react-native'
// Import Navigators from React Navigation
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
// Import Screens
import AnnoncesScreen from './DrawerScreens/AnnoncesScreen';
import DetailAnnonceScreen from './DrawerScreens/DetailAnnonceScreen';
import AccueilScreen from './AccueilScreen';
import MesAnnonces from './DrawerScreens/MesAnnonces';
import MesFavAnnonces from './DrawerScreens/MesFavAnnonces';
import CompteScreen from './CompteScreen';
import EditProfile from './EditProfile'
import CreateAnnonceScreen from './CreateAnnonceScreen';
import EditAnnonceScreen from './EditAnnonceScreen';
import TypeScreen from './TypeScreen';
import CategScreen from './CategScreen';
import ListNotifications from './Components/ListNotifications';
import HistoriqueScreen from './Components/HistoriqueScreen';
import CustomSidebarAuthMenu from './Components/CustomSidebarAuthMenu';
import NavigationDrawerHeader from './Components/NavigationDrawerHeader';
import NavigationLogoNotifHeader from './Components/NavigationLogoNotifHeader';
import NavigationLogoHeader from './Components/NavigationLogoHeader';
import NavigationCompteHeader from './Components/NavigationCompteHeader';
import NavigationBottomTabsAuth from './Components/NavigationDrawerFooterAuth';
import CreatePubliciteScreen from './CreatePubliciteScreen'
import MembresScreen from './DrawerScreens/MembresScreen';
import GetMessages from './Components/GetMessages';
import MonAbonnementScreen from './DrawerScreens/MonAbonnementScreen';
import ListEvaluations from './Components/ListEvaluations';
import DonateScreen from './DrawerScreens/DonateScreen';
import FilterForm from './DrawerScreens/FilterForm';

var AbonnementScreen;

if (Platform.OS != 'web') {
  AbonnementScreen = require('./DrawerScreens/AbonnementScreen').default;
}
const Stack = createStackNavigator();
//const Drawer = createDrawerNavigator();
const LeftDrawer = createDrawerNavigator();
const styleTitleLabel = {
  headerTintColor: '#c4d63c', //Set Header text color
  headerTitleStyle: {
    color: '#97ab00'
  },
}
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
            <NavigationCompteHeader navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: '#FFFFFF', //Set Header color
            borderBottomWidth: 0,
          },
          headerTintColor: '#97ab00', //Set Header text color
          headerTitleStyle: {
            color: '#97ab00'
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
        name='MonAbonnement'
        component={MonAbonnementScreen}
        options={{
          title: 'Abonnement', headerTintColor: '#97ab00',
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
        name="Filter"
        component={FilterForm} options={{

          headerLeft: () => (
            <NavigationDrawerHeader navigationProps={navigation} />
          ),
          title: '',
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
    <Stack.Navigator initialRouteStack="DrawerNavigatorAuthRoutes">
      <Stack.Screen
        name="Accueil"
        component={NavigationBottomTabsAuth}
        //component={AccueilScreen}    
        options={{
          headerLeft: () => (
            <NavigationDrawerHeader navigationProps={navigation} />
          ),
          title: '',
          headerRight: () => (
            <NavigationLogoNotifHeader navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: '#FFFFFF', //Set Header
            borderBottomWidth: 0,
            height: 75
          },
          headerTintColor: '#97ab00', //Set Header text color
          headerTitleStyle: { color: '#97ab00' }
        }}
      />
      {Platform.OS != 'web' &&
        <Stack.Screen
          name="Abonnement"
          component={AbonnementScreen}
          options={{
            title: 'Devenir VIP', headerTintColor: '#97ab00',
            headerTitleStyle: { color: '#97ab00' },
            headerRight: () => (
              <NavigationLogoHeader navigationProps={navigation} />
            ),
          }}
        />}
      <Stack.Screen
        name="Compte"
        component={CompteScreen}
        options={{
          title: 'Profile', headerTintColor: '#97ab00',
          headerTitleStyle: { color: '#97ab00' },

          headerRight: () => (
            <NavigationLogoHeader navigationProps={navigation} />
          ),
        }}
      />
      <Stack.Screen
        name="ListNotifications"
        component={ListNotifications}
        options={{
          title: 'Notifications', headerTintColor: '#97ab00',
          headerTitleStyle: { color: '#97ab00' },
          headerRight: () => (
            <NavigationLogoHeader navigationProps={navigation} />
          ),
        }}
      />
      <Stack.Screen
        name="Historique"
        component={HistoriqueScreen}
        options={{
          title: 'Historique', headerTintColor: '#97ab00',
          headerTitleStyle: { color: '#97ab00' },
          headerRight: () => (
            <NavigationLogoHeader navigationProps={navigation} />
          ),
        }}
      />
      <Stack.Screen
        name="Membres"
        component={MembresScreen}
        option={{
          title: 'Membres', headerTintColor: '#97ab00',
          headerTitleStyle: { color: '#97ab00' },
          headerRight: () => (
            <NavigationLogoHeader navigationProps={navigation} />
          ),
        }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{
          title: 'Modifier Profil', headerTintColor: '#97ab00',
          headerTitleStyle: { color: '#97ab00' },
          headerRight: () => (
            <NavigationLogoHeader navigationProps={navigation} />
          ),
        }}
      />

      <Stack.Screen
        name="GetMessages"
        component={GetMessages}
        options={{
          title: 'Messages', headerTintColor: '#97ab00',
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
        name="CreateAnnonce"
        component={CreateAnnonceScreen}
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
        name="MesFavAnnonces"
        component={MesFavAnnonces}
        options={{
          title: 'Mes Favoris', headerTintColor: '#97ab00',
          headerTitleStyle: { color: '#97ab00' },
          headerRight: () => (
            <NavigationLogoHeader navigationProps={navigation} />
          ),
        }}
      />
      <Stack.Screen
        name="EditAnnonce"
        component={EditAnnonceScreen}
        options={{
          title: 'Modifier Annonce', headerTintColor: '#97ab00',
          headerTitleStyle: { color: '#97ab00' },
          headerRight: () => (
            <NavigationLogoHeader navigationProps={navigation} />
          ),
        }}
      />
      <Stack.Screen
        name='MonAbonnement'
        component={MonAbonnementScreen}
        options={{
          title: 'Abonnement', headerTintColor: '#97ab00',
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
        name="Don"
        component={DonateScreen}
        options={{
          title: 'Fait Don', headerTintColor: '#97ab00',
          headerTitleStyle: { color: '#97ab00' },
          headerRight: () => (
            <NavigationLogoHeader navigationProps={navigation} />
          ),
        }}
      />
      <Stack.Screen
        name="Filter"
        component={FilterForm} options={{

          headerLeft: () => (
            <NavigationDrawerHeader navigationProps={navigation} />
          ),
          title: '',
          headerRight: () => (
            <NavigationLogoHeader navigationProps={navigation} />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const CreateAnnonceScreenStack = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName="TypeScreen">
      <Stack.Screen
        name="Type"
        component={TypeScreen}
        options={{
          headerLeft: () => (
            <NavigationDrawerHeader navigationProps={navigation} />
          ),
          title: 'Nouvelle Annonce',
          headerRight: () => (
            <NavigationCompteHeader navigationProps={navigation} />
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
        name="CreateAnnonce"
        component={CreateAnnonceScreen}
        options={{
          title: 'Nouvelle Annonce', headerTintColor: '#97ab00',
          headerTitleStyle: { color: '#97ab00' },
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
    <Stack.Navigator initialRouteName="MembresScreen">
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
          title: 'Compte', headerTintColor: '#97ab00',
          headerTitleStyle: { color: '#97ab00' },
          headerRight: () => (
            <NavigationLogoHeader navigationProps={navigation} />
          ),
        }}
      />
      <Stack.Screen
        name="GetMessages"
        component={GetMessages}
        options={{
          title: 'Messages', headerTintColor: '#97ab00',
          headerTitleStyle: { color: '#97ab00' },
          headerRight: () => (
            <NavigationLogoHeader navigationProps={navigation} />
          ),
        }}
      />
      <Stack.Screen
        name="ListNotifications"
        component={ListNotifications}
        options={{
          title: 'Notifications', headerTintColor: '#97ab00',
          headerTitleStyle: { color: '#97ab00' },
          headerRight: () => (
            <NavigationLogoHeader navigationProps={navigation} />
          ),
        }}
      />
      <Stack.Screen
        name="Historique"
        component={HistoriqueScreen}
        options={{
          title: 'Historique', headerTintColor: '#97ab00',
          headerTitleStyle: { color: '#97ab00' },
          headerRight: () => (
            <NavigationLogoHeader navigationProps={navigation} />
          ),
        }}
      />
      <Stack.Screen
        name='MonAbonnement'
        component={MonAbonnementScreen} options={{
          title: 'Compte', headerTintColor: '#97ab00',
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
const MonCompteScreenStack = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName="CompteScreen">
      <Stack.Screen
        name="Compte"
        component={CompteScreen}
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
        name="EditProfile"
        component={EditProfile}
        options={{
          title: 'Modifier Profile', headerTintColor: '#97ab00',
          headerTitleStyle: { color: '#97ab00' },
          headerRight: () => (
            <NavigationLogoHeader navigationProps={navigation} />
          ),
        }}
      />
      <Stack.Screen
        name="GetMessages"
        component={GetMessages}
        options={{
          title: 'Messages', headerTintColor: '#97ab00',
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
          title: 'Mes Annonces',
          headerTintColor: '#97ab00',
          headerTitleStyle: { color: '#97ab00' },
          headerRight: () => (
            <NavigationLogoHeader navigationProps={navigation} />
          ),
        }}
      />
      <Stack.Screen
        name="MesFavAnnonces"
        component={MesFavAnnonces}
        options={{
          title: 'Mes Favoris', headerTintColor: '#97ab00',
          headerTitleStyle: { color: '#97ab00' },
          headerRight: () => (
            <NavigationLogoHeader navigationProps={navigation} />
          ),
        }}
      />
      <Stack.Screen
        name="EditAnnonce"
        component={EditAnnonceScreen}
        options={{
          title: 'Modifier Annonce', headerTintColor: '#97ab00',
          headerTitleStyle: { color: '#97ab00' },
          headerRight: () => (
            <NavigationLogoHeader navigationProps={navigation} />
          ),
        }}
      />
      <Stack.Screen
        name='MonAbonnement'
        component={MonAbonnementScreen} options={{
          title: 'Compte', headerTintColor: '#97ab00',
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
        name="Don"
        component={DonateScreen}
        options={{
          title: 'Fait Don', headerTintColor: '#97ab00',
          headerTitleStyle: { color: '#97ab00' },
          headerRight: () => (
            <NavigationLogoHeader navigationProps={navigation} />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const CreatePubliciteScreenStack = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName="CreatePubliciteScreen">
      <Stack.Screen
        name="Ajout Publicite"
        component={CreatePubliciteScreen}
        options={{
          headerLeft: () => (
            <NavigationDrawerHeader navigationProps={navigation} />
          ),
          title: '',
          headerRight: () => (
            <NavigationLogoHeader navigationProps={navigation} />
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
        name="Annonces"
        component={AnnoncesScreen}
        options={{
          title: 'Annonces', headerTintColor: '#97ab00',
          headerTitleStyle: { color: '#97ab00' },
          headerRight: () => (
            <NavigationLogoHeader navigationProps={navigation} />
          ),
        }}
      />



    </Stack.Navigator>
  );
};

const FaitDonScreenStack = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName="DonateScreen">
      <Stack.Screen
        name="Fait Don"
        component={DonateScreen}
        options={{
          headerLeft: () => (
            <NavigationDrawerHeader navigationProps={navigation} />
          ),
          title: '',
          headerRight: () => (
            <NavigationLogoHeader navigationProps={navigation} />
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
    </Stack.Navigator>
  );
};
const DrawerNavigatorAuthRoutes = (props) => {
  return (
    <LeftDrawer.Navigator
      screenOptions={{
        itemStyle: { marginVertical: 5, color: 'white' },
        headerShown: false,
        drawerActiveTintColor: "#c4d63c",
        drawerInactiveTintColor: '#49382f',
      }}
      drawerContent={(props) => <CustomSidebarAuthMenu {...props} />}>


      <LeftDrawer.Screen
        name="HomeScreenStack"
        options={{
          drawerLabel: 'Accueil',
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" size={30} color={color} />
          ),
        }}
        component={HomeScreenStack}
      />

      <LeftDrawer.Screen
        name="AnnonceScreenStack"
        options={{
          drawerLabel: 'Annonces',
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="post" size={30} color={color} />
          ),
        }}
        component={AnnonceScreenStack}
      />
      <LeftDrawer.Screen
        name="Type"
        options={{
          drawerLabel: 'Ajout Annonce',
          drawerIcon: ({ color, size }) => (
            <FontAwesome5 name="plus-circle" size={30} color={color} />
          ),
        }}
        component={CreateAnnonceScreenStack}
      />
      <LeftDrawer.Screen
        name="Don"
        options={{
          drawerLabel: 'Fait Don',
          drawerIcon: ({ color, size }) => (
            <FontAwesome5 name="donate" size={24} color="#97ab00" />),
        }}
        component={FaitDonScreenStack}
      />
      {(global.User_VIP > 0) && (
        <LeftDrawer.Screen
          name="CreatePubliciteScreenStack"
          options={{
            drawerLabel: 'Ajout Publicité',
            drawerIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="plus" size={30} color={color} />
            ),
          }}
          component={CreatePubliciteScreenStack}
        />
      )}

      <LeftDrawer.Screen
        name="Membres"

        options={{
          drawerLabel: 'Membres',
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-multiple" size={30} color={color} />
          ),
        }}
        component={MembresScreenStack}
      />

      <LeftDrawer.Screen
        name="MonCompteScreenStack"

        options={{
          drawerLabel: 'Compte',
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" size={30} color={color} />
          ),
        }}
        component={MonCompteScreenStack}
      />

    </LeftDrawer.Navigator>
  );
};

export default DrawerNavigatorAuthRoutes;
