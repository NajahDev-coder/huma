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
  Platform,
  FlatList, Linking,
  useWindowDimensions,
  Dimensions
} from 'react-native';

import { Entypo } from '@expo/vector-icons';
import { useDispatch, useSelector } from "react-redux";

import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import moment from 'moment';
import RenderHtml from 'react-native-render-html';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Carousel from 'react-native-anchor-carousel';
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
  const [IdAnnonce, setIdAnnonce] = useState(null);
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
  const [imageAnnonce, setImageAnnonce] = useState([]);
  const [favorisAnnonce, setFavorisAnnonce] = useState(0);
  const [position, setPosition] = useState(1);

  const { width } = useWindowDimensions();
  const sliderWidth = Dimensions.get('window').width;
  const [refreshKey, setRefreshKey] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const img_annonce_cv = createRef();

  const carouselRef = React.useRef(null);
  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => {
          carouselRef.current.scrollToIndex(index);
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={styles.containerCarousel}>
          <Image
            source={{ uri: item.img }}
            style={styles.imageCarousel}

          />

        </View>
      </TouchableOpacity>
    );
  }
  const update_NbreVue = (id_annce) => {
    const fetchUrl = `updateNbreVueAnnc/${id_annce}`;
    RequestOptionsGet(fetchUrl);
  }
  const visitVedio = (val) => {
    Linking.openURL('http://' + val);
  }
  const UpdtFavorisAnnonce = useCallback(async () => {
    var fetchUrl;
    if (favorisAnnonce == 1) {
      fetchUrl = `delfavannonces/${UserId}/${IdAnnonce}`;
    }
    else {
      fetchUrl = `addfavannonces/${UserId}/${IdAnnonce}`;
    }
    response = await RequestOptionsGet(fetchUrl);
    if (response.affectedRows == 1) {
      // console.log('update favorisanno avec success!');
      setFavorisAnnonce(!favorisAnnonce);
      setRefreshKey((oldKey) => oldKey + 1)
    }

  }, [IdAnnonce, UserId, favorisAnnonce])
  const GetFavorisAnnonce = async (Id_Annonce, UserId) => {

    const fetchUrl = `getfavannonces/${UserId}/${Id_Annonce}`;

    response = await RequestOptionsGet(fetchUrl);

    if (response.length > 0) {
      setFavorisAnnonce(1);
    }

  }
  const fadeIn = () => {
    Animated.timing(fadeAnimation, {
      toValue: 1,
      duration: 200,
      nativeEvent: { contentOffset: { y: fadeAnimation } },
      useNativeDriver: true,
    }).start();
  };

  const getAuteur = async (id_user) => {
    const fetchUrl = `user/${id_user}`;
    response = await RequestOptionsGet(fetchUrl);

    if (response.data.length > 0) {
      var nomAuteur = response.data[0].nom;
      setNomAuteur(nomAuteur);
      var imgprof = response.data[0].img_prof;
      setImageProfile(imgprof)
    }
  };
  const isExiteFile = async (id_annonce) => {
    const fetchUrl = `file_existe/${id_annonce}`;

    const responseJson = await RequestOptionsGet(fetchUrl);
    // console.log('imgAnnonce', responseJson.data);

    if (responseJson.data.length > 0) {

      let dataImg = [];
      Object.entries(responseJson.data).map(([key, value]) => {
        dataImg.push({
          id: key,
          img: value.url
        });
      });
      //console.log(dataImg)
      setImageAnnonce(dataImg);
    }
    else {
      //setImageAnnonce([{ url: `${Base_url}images/img/no-picture.png` }]);
      setImageAnnonce([{ id: 0, img: `${Base_url}images/img/no-picture.png` }]);

      //console.log('imgAnnonce', imageAnnonce);
    }
  }

  const fetchData = async (Id_Annonce, UserId) => {
    const fetchUrl = `annonce/${Id_Annonce}`;

    const responseJson = await RequestOptionsGet(fetchUrl);

    if (responseJson.data.length > 0) {
      setAnnonceDetails(responseJson.data[0]);

      setAnnonceType(responseJson.data[0].type);
      setAnnonceCateg(responseJson.data[0].categorie);
      getAuteur(responseJson.data[0].user_id);
      setAuteurUserId(responseJson.data[0].user_id);

      setIdAnnonce(responseJson.data[0].id);
      setNbreVue(responseJson.data[0].nbre_vue + 1)


      if (responseJson.data[0].user_id != UserId && UserId != 0 && responseJson.data[0].user_id != 0 && responseJson.data[0].user_id != null) {
        update_NbreVue(Id_Annonce);
        GetFavorisAnnonce(Id_Annonce, UserId);
      }

      fadeIn();
    }
    setLoading(false);
  };
  useEffect(() => {
    let isSubscribed = true;

    let id_user;
    //(async () => {
    //id_user = await AsyncStorage.getItem('user_id');
    id_user = global.User_connecte;
    setUserId(id_user);
    //})();

    const Id_Annonce = route.params?.id_annce;
    if (isSubscribed) {
      fetchData(Id_Annonce, global.User_connecte);
      /*setInterval(() => {
         setPosition( position === imageAnnonce.length ? 0 : position + 1)
         
       }, 3000); */

      isExiteFile(Id_Annonce);
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
  const DefaultimageAnnonce = { uri: `${Base_url}images/img/no-picture.png` };
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



                  <SafeAreaView style={{ flex: 1, width: '100%' }}>
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%'
                      }}
                    >

                      <Carousel
                        ref={carouselRef}
                        data={imageAnnonce}
                        renderItem={renderItem}
                        style={styles.carousel}
                        itemWidth={sliderWidth}
                        containerWidth={sliderWidth}
                        separatorWidth={0}
                      />
                    </View>
                  </SafeAreaView>
                  <View style={styles.bcBlockpf}>
                    <View style={{ width: 50, justifyContent: 'center', marginLeft: 10 }}>
                      <GetProfile user_id={AnnonceDetails.user_id} navigation={navigation} img_prof={imageProfile} />
                    </View>
                    <View style={styles.auteurProfile}>
                      <Text style={styles.titAuteurProfile}>{NomAuteur.toUpperCase()}</Text>
                    </View>
                  </View>
                </View>

                <TouchableOpacity style={styles.post}>

                  <Animated.View style={{ width: '100%', opacity: fadeAnimation }}>
                    <View style={styles.bcBlock}>
                      <View style={styles.bcDetaille}>
                        <View style={styles.row}>
                          <Text style={styles.postLabel}>{AnnonceDetails.titre} </Text>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'flex-end',
                              position: 'absolute',
                              right: 20,
                              top: 0,
                            }}>
                            <AntDesign name="eyeo" size={24} color="black" />
                          </View>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'flex-end',
                              position: 'absolute',
                              right: 0,
                              top: 3,
                            }}>
                            <Text >{NbreVue}</Text>
                          </View>
                          {AuteurUserId != global.User_connecte && (
                            <View
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'flex-end',
                                position: 'absolute',
                                right: 50,
                                top: 0,
                              }}>

                              <MaterialIcons
                                name={favorisAnnonce == 1 ? "favorite" : "favorite-border"}
                                size={24}
                                color="#c4d63c"
                                onPress={() => { UpdtFavorisAnnonce(); }}
                              />
                            </View>
                          )}
                          {AuteurUserId == global.User_connecte && (
                            <View
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'flex-end',
                                position: 'absolute',
                                right: 50,
                                top: 0,
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
                                      id_annonce: IdAnnonce
                                    },
                                  })
                                }}
                              />
                            </View>
                          )}


                        </View>
                        <View >
                          <Text style={styles.postDateLabel}>
                            Publié le  {moment(AnnonceDetails.Date).format('MM-DD-YYYY')}
                          </Text>
                        </View>

                        <View style={styles.bcText}>
                          {AnnonceDetails.description != '' && AfficheDescrp(AnnonceDetails.description)}
                        </View>
                        <View style={styles.bcText}>
                          {AnnonceDetails.link_vedio != '' && (
                            <TouchableOpacity onPress={() => { visitVedio(AnnonceDetails.link_vedio) }}>


                              <Text> <Entypo name="video-camera" size={18} color="black" style={{ marginTop: 5, marginRight: 5 }} /> https://{AnnonceDetails.link_vedio}</Text>
                            </TouchableOpacity>
                          )}
                        </View>
                      </View>
                    </View>

                    <View style={styles.bcBlock2}>
                      <Text style={styles.bcText2}>
                        <Entypo name="location-pin" size={20} color="grey" />

                        {AnnonceDetails.adresse}
                      </Text>
                    </View>

                    <View style={styles.bcBlock}>
                      <View style={styles.btCateg}>
                        <GetCategorie id_annonce={AnnonceCateg} />
                      </View>
                      <View style={styles.btType}>
                        <GetType id_annonce={AnnonceType} />
                      </View>
                    </View>

                  </Animated.View>
                </TouchableOpacity>

                <View style={{ width: '100%' }}>

                  <View style={styles.hrbc}>
                    <Text style={styles.titreOff}>Offres </Text>
                  </View>
                  {AuteurUserId !== null && IdAnnonce !== null &&
                    <GetOffres
                      id_annonce={IdAnnonce}
                      id_auteur_annonce={AuteurUserId}
                      id_user={global.User_connecte}
                      navigation={navigation}
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
    color: '#000000',
  },
  hrbc: {
    borderBottomColor: 'black',
    borderBottomWidth: 5,
    width: '50%',
    //height: 10,
    marginLeft: 20,
    marginBottom: 20,
  },
  bcBlockpf: {
    width: '95%',
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
    flexDirection: 'column',
    //alignContent: 'flex-center',

    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255,0.5)',
    padding: 10,
  },
  titAuteurProfile: {
    paddingLeft: 3,
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
  btType: {
    alignSelf: 'flex-start',
    backgroundColor: '#7c4c32',
    color: '#ffffff',
    padding: 5,
    margin: 5,
    marginLeft: 10,
    borderRadius: 6,
    width: '40%',
    textAlign: 'center',
    justifyContent: 'center',
    maxWidth: 130,
    fontSize: 11,
  },
  btCateg: {
    alignSelf: 'flex-start',
    backgroundColor: '#c4d63c',
    color: '#ffffff',
    padding: 5,
    margin: 5,
    borderRadius: 6,
    width: '40%',
    textAlign: 'center',
    justifyContent: 'center',
    maxWidth: 130,
    fontSize: 11,
  },
  containerCarousel: {
    width: '100%',
    height: 200,
    alignItems: 'center',
  },
  imageCarousel: {
    flex: 1,
    width: '100%',
  },
  carousel: {
    flexGrow: 0,
    height: 180,
    width: '100%',
  }
});
export default DetailAnnonceScreen;
