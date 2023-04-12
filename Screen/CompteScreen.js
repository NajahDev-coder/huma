// Import React and Component
import React, { useState, createRef, useEffect, useRef } from 'react';
import {
  Animated,
  ImageBackground,
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GetMessages from './Components/GetMessages';
import Loader from './Components/Loader';
import NavigationBackHeader from './Components/NavigationBackHeader';
import {
  FontAwesome,
  FontAwesome5,
  AntDesign,
  MaterialIcons,
  Octicons,
  Fontisto,
  Ionicons,
} from '@expo/vector-icons';

import GetProfile from './Components/GetProfile';
import EstAmis from './EstAmis';
import RatingScreen from './Components/RatingScreen';
import { Base_url, DeleteSession } from './utils/utils';
const CompteScreen = ({ navigation, route }) => {
  const [fadeAnimation] = useState(new Animated.Value(0));
  const [imageProfile, setImageProfile] = useState('');
  const [ImageCouvProfile, setImageCouvProfile] = useState('');
  const [NomProfile, setNomProfile] = useState('');
  const [EmailProfile, setEmailProfile] = useState('');
  const [TelProfile, setTelProfile] = useState('');
  const [AdresseProfile, setAdresseProfile] = useState('');
  const [AgeProfile, setAgeProfile] = useState(0);
  const [TransporteurProfile, setTransporteurProfile] = useState(0);
  const [DolmenProfile, setDolmenProfile] = useState(0);
  const [CacheValue, setCacheValue] = useState(0);

  const [MyUserId, setMyUserId] = useState(null);
  const [NbreVisiteProfile, setNbreVisiteProfile] = useState(null);
  const [UserId, setUserId] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [Mes, setMes] = useState('Mes ');

  const url = 'https://huma.bzh/';
  const image = { uri: url + 'images/bg_screen.png' };
  const DefaultimageCouvProfile = { uri: url + 'images/no-couverture.png' };
  const DefaultimageProfile = { uri: url + 'images/compte.png' };

  useEffect(() => {
    let isSubscribed = true;
    const update_NbreVisiteProfile = (id_user) => {
      const requestOptions = {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      };
      const baseUrl = url + `api/api/updateNbreVisiteProfile/${id_user}`;
      fetch(baseUrl, requestOptions)
        .then((response) => response.json())
        .then((responseJson) => {
          setMes('');
          // setMon('');
          console.log('update nbre view avec success!');
        });
    };

    const fadeIn = () => {
      Animated.timing(fadeAnimation, {
        toValue: 1,
        duration: 300,
        nativeEvent: { contentOffset: { y: fadeAnimation } },
        useNativeDriver: true,
      }).start();
    };

    const getProfile = async (id_user) => {
      const baseUrl = url + `api/api/user/${id_user}`;

      fetch(baseUrl)
        .then((response) => response.json())
        .then((responseJson) => {
          setNomProfile(responseJson.data[0].nom);
          setEmailProfile(responseJson.data[0].email);
          setCacheValue(responseJson.data[0].cache);
          setTelProfile(responseJson.data[0].tel);
          setAgeProfile(responseJson.data[0].age);
          setTransporteurProfile(responseJson.data[0].transporteur);
          setDolmenProfile(responseJson.data[0].dolmen);
          setAdresseProfile(responseJson.data[0].adresse);
          const imgpf = responseJson.data[0].img_prof;
          //const imgProfile = {uri:  `${Base_url}images/${imgpf}` }
          setImageProfile(imgpf);
          const imgcv = responseJson.data[0].img_couverture;
          const imgCouv = { uri: `${Base_url}images/${imgcv}` };
          setImageCouvProfile(imgCouv);
          setNbreVisiteProfile(responseJson.data[0].nbre_visite);
        });
    };
    const notConnecte = () => {
      AsyncStorage.setItem(
        'nonConnecte',
        'Vous devrez se connecter :)'
      );
      navigation.navigate('LoginScreen');
    };


    (async () => {
      /* id de user connecté*/
      //const my_user_id = await AsyncStorage.getItem('user_id');
      const my_user_id = global.User_connecte;
      setMyUserId(my_user_id);
      const id_user = route.params?.id_userp
        ? route.params?.id_userp
        : my_user_id ? my_user_id : notConnecte();
      //console.log('profile', id_user);
      setUserId(id_user);
    })();

    if (isSubscribed) {
      if (UserId != MyUserId) {

        update_NbreVisiteProfile(UserId);
      }
      if (UserId) {
        getProfile(UserId);
        fadeIn();
      }
      //console.log('Mes:', Mes)
    }
    return () => (isSubscribed = false);
  }, [UserId, MyUserId, fadeAnimation, route]);
  //}, []);

  return (
    <View style={styles.mainBody}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            alignContent: 'center',
          }}>
          <View style={{ padding: 10, flex: 1, width: '100%', minHeight: 100 }}>
            <View style={styles.row}>
              <TouchableOpacity style={styles.post}>
                <ImageBackground
                  //ref={img_annonce_cv}  
                  source={ImageCouvProfile}
                  onError={(e) => setImageCouvProfile(DefaultimageCouvProfile)}
                  resizeMode="cover"
                  style={[styles.image, { minHeight: 185 }]}>

                  <View style={styles.bcBlockpf1}>

                    <GetProfile user_id={UserId} navigation={navigation} img_prof={imageProfile} StyleDimens='large' />

                  </View>
                  <View style={styles.bcBlockpf}>
                    <View style={styles.auteurProfile}>
                      <Text style={styles.titAuteurProfile}>{NomProfile.toUpperCase()}</Text>
                      <Text
                        style={[
                          styles.emailAuteurProfile,
                          CacheValue === 1 && styles.cache,
                        ]}>
                        {EmailProfile}
                      </Text>
                    </View>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.post, { marginTop: 90 }]}>
                <Animated.View
                  style={{
                    width: '100%',
                    opacity: fadeAnimation,
                    paddingBottom: 20,
                    position: 'relative',
                  }}>
                  <View>
                    <Text style={styles.titreOff}>Profile </Text>
                  </View>
                  <View style={{ marginLeft: '30%' }}>
                    <RatingScreen user_id1={UserId} user_id2={MyUserId} />
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                      position: 'absolute',
                      right: 10,
                      top: 28,
                    }}>
                    {MyUserId == UserId && (
                      <AntDesign
                        name="edit"
                        size={24}
                        color="black"
                        style={{ margin: 4 }}
                        onPress={() => {
                          navigation.navigate({
                            name: 'EditProfile',
                            params: {
                              id_user: MyUserId,
                            },
                          });
                        }}
                      />
                    )}
                    {global.User_connecte != null && MyUserId != UserId && (
                      <EstAmis id_user1={MyUserId} id_user2={UserId} navigation={navigation} />
                    )}
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                      position: 'absolute',
                      right: 10,
                      top: 5,
                    }}>
                    <AntDesign name="eyeo" size={24} color="black" />

                    <Text style={{ marginTop: 3 }}>{NbreVisiteProfile}</Text>
                  </View>
                  <View style={styles.hrbc}>
                    <Text>&nbsp;</Text>
                  </View>
                  <Text style={styles.txtdtl}><MaterialIcons name="alternate-email" size={24} color="#49382f" style={{ paddingRight: 5 }} /> Email : {EmailProfile}</Text>
                  <Text style={styles.txtdtl}><MaterialIcons name="phone" size={24} color="#49382f" style={{ paddingRight: 5 }} /> Tèl : {TelProfile}</Text>

                  <Text style={styles.txtdtl}><MaterialIcons name="perm-contact-calendar" size={24} color="#49382f" style={{ paddingRight: 5 }} /> Age : {AgeProfile}</Text>
                  <Text style={styles.txtdtl}> <FontAwesome name="map-marker" size={24} color="#49382f" style={{ paddingRight: 10 }} /> Adresse : {AdresseProfile}
                  </Text>
                  <Text style={styles.txtdtl}><MaterialIcons name="emoji-transportation" size={24} color="#49382f" style={{ paddingRight: 5 }} /> Transporteur : {TransporteurProfile === 0 ? 'Non' : 'Oui'}
                  </Text>
                  <Text style={styles.txtdtl}><FontAwesome5 name="map-marked-alt" size={24} color="#49382f" style={{ paddingRight: 5 }} /> Dolmen : {DolmenProfile === 0 ? 'Non' : 'Oui'}
                  </Text>
                </Animated.View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.post}>
                <Animated.View
                  style={{
                    width: '100%',
                    opacity: fadeAnimation,
                    paddingBottom: 20,
                  }}>
                  <View>
                    <Text style={styles.titreOff}> HüMA </Text>
                  </View>
                  <View style={styles.hrbc}>
                    <Text>&nbsp;</Text>
                  </View>
                  <Text
                    style={styles.linkdtl}
                    onPress={() => navigation.navigate('MesAnnonces', { id_user: UserId })}>
                    <MaterialIcons name="article" size={24} color="#49382f" style={{ paddingRight: 5 }} /> {Mes}Annonces
                  </Text>
                  {MyUserId === UserId && (
                    <Text
                      style={styles.linkdtl}
                      onPress={() => navigation.navigate('MesFavAnnonces', { id_user: UserId })}>
                      <MaterialIcons name="favorite" size={24} color="#49382f" style={{ paddingRight: 5 }} /> {Mes}Favoris
                    </Text>
                  )}
                  {MyUserId === UserId && (
                    <Text
                      style={styles.linkdtl}
                      onPress={() => navigation.replace('OffresMemebreScreen')}>
                      <MaterialIcons name="format-list-bulleted" size={24} color="#49382f" style={{ paddingRight: 5 }} /> {Mes}Offres
                    </Text>
                  )}
                  <Text
                    style={styles.linkdtl}
                    onPress={() => navigation.replace('AvisMembreScreen')}>
                    <MaterialIcons name="star-rate" size={24} color="#49382f" style={{ paddingRight: 5 }} /> {Mes}Évaluations
                  </Text>
                </Animated.View>
              </TouchableOpacity>
              {MyUserId === UserId && (
                <TouchableOpacity style={styles.post}>
                  <Animated.View
                    style={{
                      width: '100%',
                      opacity: fadeAnimation,
                      paddingBottom: 20,
                    }}>
                    <View>
                      <Text style={styles.titreOff}> Paramètres </Text>
                    </View>
                    <View style={styles.hrbc}>
                      <Text>&nbsp;</Text>
                    </View>
                    <Text
                      style={styles.linkdtl}
                      onPress={() => navigation.navigate('Historique')}>
                      <MaterialIcons name="history-edu" size={24} color="black" /> Mon Historique
                    </Text>
                    <Text
                      style={styles.linkdtl}
                      onPress={() => navigation.navigate('Compte', { id_user: MyUserId })}>
                      <MaterialIcons name="payments" size={24} color="black" /> Mon Abonnement
                    </Text>

                    <Text
                      style={[styles.linkdtl, { color: '#a6420e' }]}
                      onPress={() => DeleteSession(navigation)}>
                      <AntDesign name="login" size={20} color="#a6420e" /> Se Déconnecter
                    </Text>
                  </Animated.View>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};
export default CompteScreen;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    color: '#49382f'
  },
  post: {
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: '#ffffff',
    alignSelf: 'flex-start',

    marginBottom: 15,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 7,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'column',
    /*flexWrap: 'wrap',*/
  },
  bcBlockpf1: {
    flexDirection: 'row',
    justifyContent: 'center',
    top: 110,
  },
  bcBlockpf: {
    flexDirection: 'row',
    justifyContent: 'center',
    top: 80,
  },


  auteurProfile: {
    //alignContent: 'flex-center',
    width: '100%',
    justifyContent: 'center',
    color: '49382f',
    fontWeight: 'bold',
    padding: 10,
    paddingTop: 35,
    fontSize: 16,
  },
  titAuteurProfile: {
    paddingLeft: 13,
    fontSize: 16,
    width: '100%',
    justifyContent: 'center',
    textAlign: 'center',
    color: '#49382f'
  },
  emailAuteurProfile: {
    paddingLeft: 13,
    fontSize: 13,
    width: '100%',
    justifyContent: 'center',
    textAlign: 'center',
    color: '#9eb10f',
    fontWeight: 'bold',
  },
  cache: {
    display: 'none',
  },
  titreOff: {
    fontSize: 18,
    padding: 10,
    color: '#49382f',
  },
  hrbc: {
    borderBottomColor: '#C4D63C',
    borderBottomWidth: 3,
    width: '50%',
    height: 10,
    marginLeft: 20,
    marginBottom: 20,
  },
  txtdtl: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderBottomColor: '#49382f',
    borderBottomWidth: 1,
    color: '#49382f',
  },
  linkdtl: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderBottomColor: '#49382f',
    borderBottomWidth: 1,
    color: '#49382f',
    fontSize: 16,
    fontWeight: '500',
  },

 
});
