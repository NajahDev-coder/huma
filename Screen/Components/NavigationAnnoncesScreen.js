import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import AnnoncesScreen from '../DrawerScreens/AnnoncesScreen';
import DetailAnnonceScreen from '../DrawerScreens/DetailAnnonceScreen';
import CompteScreen from '../CompteScreen';
import RegisterScreen from '../RegisterScreen';
import LoginScreen from '../LoginScreen';
import MesAnnonces from '../DrawerScreens/MesAnnonces';
import FilterForm from '../DrawerScreens/FilterForm';
import ListEvaluations from './ListEvaluations';
import AbonnementScreen from '../DrawerScreens/AbonnementScreen';
import MonAbonnementScreen from '../DrawerScreens/MonAbonnementScreen';
import NavigationBackHeader from './NavigationBackHeader';
import NavigationCompteHeader from './NavigationCompteHeader';
import NavigationDrawerHeader from './NavigationDrawerHeader';
import NavigationLogoHeader from './NavigationLogoHeader';
const Stack = createStackNavigator();

const AnnonceScreenStack = ({ navigation }) => {
    return (
        <Stack.Navigator initialRouteName="AnnoncesScreen" >
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
                component={FilterForm}
                options={{
                    headerLeft: () => (
                        <NavigationBackHeader navigation={navigation} Screen='Annonces' />
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
        </Stack.Navigator>
    );
};
export default AnnonceScreenStack;