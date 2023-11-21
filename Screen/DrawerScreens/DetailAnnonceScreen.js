// Import React and Component
import React, { useState, createRef, useEffect, useCallback } from 'react';

import {
  Animated,
  SafeAreaView,
  ImageBackground,
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  RefreshControl,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,

  FlatList, Linking,
  useWindowDimensions,
  Dimensions,
  Platform
} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { useDispatch, useSelector } from "react-redux";
import ScrollImage from './ScrollImage';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import moment from 'moment';
import RenderHtml from 'react-native-render-html';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

import GetCategorie from '../Components/GetCategorie';
import Loader from '../Components/Loader';
import GetType from '../Components/GetType';
import GetOffres from '../Components/GetOffres';

import GetSession from '../Components/GetSession';
import GetProfile from '../Components/GetProfile';
import { Base_url, RequestOptionsGet, RequestOptionsPut, RequestOptionsPost } from '../utils/utils';
const DetailAnnonceScreen = ({ navigation, route }) => {

  const [AnnonceDetails, setAnnonceDetails] = useState([]);
  const [AnnonceType, setAnnonceType] = useState('');
  const [AnnonceCateg, setAnnonceCateg] = useState('');
  //const [IdAnnonce, setIdAnnonce] = useState(null);
  const [UserId, setUserId] = useState(null);
  const [AuteurUserId, setAuteurUserId] = useState(null);
  const [NbreVue, setNbreVue] = useState(0);
  const [UserOffre, setUserOffre] = useState('');
  const [errortext, setErrortext] = useState('');
  const [loading, setLoading] = useState(true);
  const [OffFocus, setOffFocus] = useState(false);
  const [NomAuteur, setNomAuteur] = useState('');
  const [imageProfile, setImageProfile] = useState(null);
  const [fadeAnimation] = useState(new Animated.Value(0));
  const [imageAnnonce, setImageAnnonce] = useState([{ id: 0, url: `${Base_url}images/img/no-picture1.png` }]);
  const [favorisAnnonce, setFavorisAnnonce] = useState(0);
  const [position, setPosition] = useState(1);

  const { width } = useWindowDimensions();
  const sliderWidth = Dimensions.get('window').width;
  const [refreshKey, setRefreshKey] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  const Id_Annonce = route.params?.id_annce;

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // setTimeout(() => {
    setRefreshing(false);
    fetchData();
    isExiteFile();
    // }, 2000);
  }, []);

  const img_annonce_cv = createRef();


  const update_NbreVue = () => {
    const fetchUrl = `updateNbreVueAnnc/${Id_Annonce}`;
    RequestOptionsGet(fetchUrl);
  }
  const visitVedio = (val) => {
    Linking.openURL('http://' + val);
  }

  const UpdtFavorisAnnonce = () => {

    var fetchUrl;
    if (favorisAnnonce == 1) {
      fetchUrl = `${Base_url}api/api/delfavannonces/${global.User_connecte}/${Id_Annonce}`;
    }
    else {
      fetchUrl = `${Base_url}api/api/addfavannonces/${global.User_connecte}/${Id_Annonce}`;
    }
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
    }
    //const baseUrl = "https://jsonplaceholder.typicode.com/posts";
    const data = fetch(fetchUrl, options)
      .then((response) => response.json())
      .then((responseJson) => {

        setFavorisAnnonce(!favorisAnnonce);
        //setRefreshKey((oldKey) => oldKey + 1);
      })
      .catch((error) => {
        console.error(error);
      });
  };


  const GetFavorisAnnonce = async () => {

    const fetchUrl = `getfavannonces/${global.User_connecte}/${Id_Annonce}`;

    response = await RequestOptionsGet(fetchUrl);

    if (response.length > 0) {
      setFavorisAnnonce(1);
    }

  }

  const useNativeDriver = Platform.OS === 'ios' || Platform.OS === 'android';
  const fadeIn = () => {
    Animated.timing(fadeAnimation, {
      toValue: 1,
      duration: 200,
      nativeEvent: { contentOffset: { y: fadeAnimation } },
      useNativeDriver,
    }).start();
  };


  const isExiteFile = async () => {
    const fetchUrl = `file_existe/${Id_Annonce}`;

    const responseJson = await RequestOptionsGet(fetchUrl);
    // console.log('imgAnnonce', responseJson.data);

    if (responseJson.data.length > 0) {

      let dataImg = [];
      Object.entries(responseJson.data).map(([key, value]) => {
        //const url = value.url
        dataImg.push({
          id: key,
          url: value.url
        });
      });
      //console.log(dataImg)
      setImageAnnonce(dataImg);
    }

  }

  const fetchData = async () => {
    const fetchUrl = `annonce/${Id_Annonce}`;

    const responseJson = await RequestOptionsGet(fetchUrl);
    //console.log(responseJson)
    if (responseJson.data.length > 0) {
      setAnnonceDetails(responseJson.data[0]);

      setAnnonceType(responseJson.data[0].type);
      setAnnonceCateg(responseJson.data[0].categorie);
      //getAuteur(responseJson.data[0].user_id);
      setAuteurUserId(responseJson.data[0].user_id);
      setNomAuteur(responseJson.data[0].nom);
      setImageProfile(responseJson.data[0].img_prof)
      //setIdAnnonce(responseJson.data[0].id);
      setNbreVue(responseJson.data[0].nbre_vue + 1)


      //if (responseJson.data[0].user_id != global.User_connecte && global.User_connecte != 0 && responseJson.data[0].user_id != 0 && responseJson.data[0].user_id != null) {
      if (global.User_connecte != null && responseJson.data[0].user_id != global.User_connecte) {
        update_NbreVue();
        GetFavorisAnnonce();
      }

      fadeIn();
    }
    setLoading(false);
  };
  useEffect(() => {
    let isSubscribed = true;

    if (isSubscribed) {
      fetchData();

      isExiteFile();
    }
    return () => (isSubscribed = false);
  }, []);

  const AfficheDescrp = (description) => {

    const source = { html: description }
    return (
      <RenderHtml
        contentWidth={width}
        source={source}
      />
    )

  }
  const DefaultimageAnnonce = { uri: `${Base_url}images/img/no-picture1.png` };
  return (
    <View style={styles.mainBody}>
      <ImageBackground
        source={{ uri: Base_url + 'images/bg_screen.png' }}
        resizeMode="cover"
        style={styles.image}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            alignContent: 'center',
          }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <View style={{ padding: 10, flex: 1, width: '100%' }}>

            <KeyboardAvoidingView enabled>
              <View style={styles.column}>

                <View style={styles.post}>

                  <ScrollImage images={imageAnnonce} />


                  <View style={styles.bcBlockpf}>
                    <View style={{ width: 50, justifyContent: 'center', marginLeft: 10, zIndex: 2 }}>
                      <GetProfile user_id={AnnonceDetails.user_id} navigation={navigation} img_prof={imageProfile} />
                    </View>
                    <View style={styles.auteurProfile}>
                      <Text style={styles.titAuteurProfile}>{NomAuteur.toUpperCase()}</Text>
                    </View>
                  </View>
                </View>



                <View style={styles.post}>
                  <Animated.View style={[styles.bcBlock, { opacity: fadeAnimation }]}>
                    <View style={styles.bcDetaille}>
                      <View style={{ zIndex: 20 }}>

                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                            position: 'absolute',
                            right: 0,
                            top: -5,
                            width: 120,
                          }}>
                          <AntDesign name="eyeo" size={24} color="#6cc5d5" style={{ marginRight: 3, marginTop: 2 }} />

                          <Text style={{ marginTop: 3, color: '#6cc5d5' }}>{NbreVue}</Text>

                        </View>

                        {AuteurUserId != global.User_connecte && (
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'flex-end',
                              position: 'absolute',
                              right: 0,
                              top: 25,
                            }}>

                            <MaterialIcons
                              name={favorisAnnonce == 1 ? "favorite" : "favorite-border"}
                              size={24}
                              color="#c4d63c"
                              //onPress={(favorisAnnonce) => {
                              onPress={() => {
                                UpdtFavorisAnnonce();
                              }}
                            />
                          </View>
                        )}
                        {AuteurUserId == global.User_connecte && (
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'flex-end',
                              position: 'absolute',
                              right: 0,
                              top: 25,
                              zIndex: 20,
                            }}>

                            <AntDesign
                              name="edit"
                              size={24}
                              color="#c4d63c"
                              onPress={() => {
                                navigation.navigate({
                                  name: 'EditAnnonce',
                                  params: {
                                    //id_user: AuteurUserId,
                                    id_annonce: Id_Annonce
                                  },
                                })
                              }}
                            />
                          </View>
                        )}


                      </View>
                      <View style={{ zIndex: 1, width: '80%' }}>
                        <Text style={styles.postLabel}>{AnnonceDetails.titre}</Text>

                        <Text style={styles.postDateLabel}>
                          Publié le  {moment(AnnonceDetails.Date).format('MM-DD-YYYY')}
                        </Text>
                      </View>

                      <View style={styles.bcText}>
                        {AnnonceDetails.description && AnnonceDetails.description != '' ? AfficheDescrp(AnnonceDetails.description) : (<Text>{AnnonceDetails.court_description}</Text>)}
                      </View>
                      <View style={styles.bcText}>
                        {AnnonceDetails.link_vedio && AnnonceDetails.link_vedio != '' && (
                          <TouchableOpacity onPress={() => { visitVedio(AnnonceDetails.link_vedio) }}>


                            <Text style={{ color: '#6cc5d5' }}> <Entypo name="video-camera" size={16} color="#6cc5d5" /> https://{AnnonceDetails.link_vedio}</Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    </View>
                  </Animated.View>

                  <View style={styles.bcBlock2}>
                    <Text style={styles.bcText2}>
                      <Entypo name="location-pin" size={20} color="grey" />

                      {AnnonceDetails.adresse}
                    </Text>
                  </View>


                  <View style={styles.bcBlock}>
                    <View style={styles.btCateg}>
                      <View style={styles.blocDeco}></View>
                      <GetCategorie id_annonce={AnnonceCateg} />
                      <View style={styles.blocDeco2}></View>
                    </View>
                    <View style={styles.btType}>
                      <View style={styles.blocDeco}></View>
                      <GetType id_annonce={AnnonceType} />
                      <View style={styles.blocDeco2}></View>
                    </View>
                  </View>

                </View>


                <View style={{ width: '100%' }}>

                  <View style={styles.hrbc}>
                    <Text style={styles.titreOff}>Offres </Text>
                  </View>
                  {AuteurUserId !== null && Id_Annonce !== null &&
                    <GetOffres
                      id_annonce={Id_Annonce}
                      id_auteur_annonce={AuteurUserId}
                      id_user={global.User_connecte}
                      navigation={navigation}
                      typeAnnce={AnnonceType}
                    />
                  }
                </View>


              </View>
            </KeyboardAvoidingView>
          </View>

        </ScrollView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  column: {
    flexDirection: 'column',

  },
  row: {
    flexDirection: 'row',

  },
  post: {
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: '#ffffff',
    //alignSelf: 'flex-start',
    marginHorizontal: '2%',
    marginBottom: 15,
    width: '95%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 7,
  },
  postLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#c4d63c',
    paddingBottom: 5,
    width: "90%"
  },

  postDateLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: '#cdcdcd',
    paddingBottom: 20,
  },
  titreOff: {
    fontSize: 18,
    padding: 10,
    color: '#6cc5d5',
  },
  hrbc: {
    borderBottomColor: '#6cc5d5',
    borderBottomWidth: 5,
    width: '50%',
    //height: 10,
    marginLeft: 20,
    marginBottom: 20,
  },
  bcBlockpf: {
    width: '100%',
    marginLeft: 8,
    position: 'absolute',
    bottom: 30
  },
  bcBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bcBlock2: {
    flexDirection: 'row',
    //justifyContent: 'space-between',
    //width: '85%',
    //marginLeft: '13%',
    padding: 10,
  },
  auteurProfile: {
    backgroundColor: 'rgba(255, 255, 255,0.8)',
    padding: 10,
    paddingLeft: 75,
    marginTop: -63,
    zIndx: 1
  },
  titAuteurProfile: {

    color: '#49382f',
    fontWeight: 'bold'
  },
  bcDetaille: {
    //alignSelf: 'flex-start',
    margin: 7,
    width: '95%',
  },
  bcText: {
    maxWidth: '100%',

  },
  bcText2: {
    color: '#6d6d6d',
    //maxWidth: '100%',
    fontSize: 9,
  },
  blocDeco: {
    width: '20%',
    marginLeft: '10%',
    borderRadius: 6,
    backgroundColor: 'white',
    padding: 4,
    marginBottom: 3,
  },
  blocDeco2: {
    width: '80%',
    marginLeft: '10%',
    borderRadius: 6,

    backgroundColor: 'white',
    padding: 1,
    marginTop: 6,
  },
  btType: {
    alignSelf: 'flex-start',
    backgroundColor: '#7c4c32',
    color: '#ffffff',

    paddingVertical: 5,
    paddingHorizontal: 2,
    margin: 5,
    marginLeft: 10,
    borderRadius: 6,
    width: '40%',
    textAlign: 'center',
    justifyContent: 'center',
    height: 65
  },
  btCateg: {
    alignSelf: 'flex-start',
    backgroundColor: '#c4d63c',
    color: '#ffffff',
    paddingVertical: 5,
    paddingHorizontal: 2,
    margin: 5,
    borderRadius: 6,
    width: '50%',
    textAlign: 'center',
    justifyContent: 'center',
    height: 65,
    // maxWidth: 130,
  },

});
export default DetailAnnonceScreen;
