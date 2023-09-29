// Import React and Component
import React, { useState, createRef, useEffect } from 'react';
import {
  Animated,
  SafeAreaView,
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
  FlatList,
} from 'react-native';
import {
  FontAwesome,
  FontAwesome5,
  AntDesign,
  MaterialIcons,
  Octicons,
  Fontisto,
  Ionicons,
} from '@expo/vector-icons';

import Loader from '../Components/Loader';

import AsyncStorage from '@react-native-async-storage/async-storage';

import GetCategorie from '../Components/GetCategorie';
import GetType from '../Components/GetType';
import GetProfile from '../Components/GetProfile';
import { ViewProfile, ViewAnnonces, ShowDetailAnnonce, Base_url, RequestOptionsGet } from '../utils/utils'


const MesFavAnnonces = ({ navigation, route }) => {
  const [AnnoncesList, setAnnoncesList] = useState([]);


  const [loading, setLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  const [result, setResultat] = useState(<Loader loading={true} />);
  const id_user = route.params.id_user;
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    //  setTimeout(() => {
    setRefreshing(false);

    fetchData();
    // }, 1000);
  }, []);


  const DeFavorisAnnonce = (id_annce) => {

    const baseUrl = `${Base_url}api/api/delfavannonces/${id_user}/${id_annce}`;
    fetch(baseUrl).then((response) => response.json())
      .then((responseJson) => {
        console.log('delete favoris avec success!');

        // setRefreshKey((oldKey) => oldKey + 1);
        onRefresh();
      }
      );
  }


  const fetchData = async () => {

    const fetchUrl = `mesfavannonces/${id_user}/`;

    //console.log('favoris', fetchUrl)
    const json = await RequestOptionsGet(fetchUrl);
    //console.log('favoris', json)
    if (json.length > 0) {
      setAnnoncesList(json)
    }
    else {
      setAnnoncesList([]);
      setResultat(<Text style={{ color: '#93a600' }}>Pas de Coups de Cœur ! <MaterialIcons name="favorite" size={24} color="#93a600" /></Text>)
    }
  }

  useEffect(() => {
    //setLoading(true)
    let isSubscribed = true;
    if (isSubscribed) {


      fetchData();

    }
    return () => (isSubscribed = false);
  }, [refreshKey]);



  return (
    <View style={styles.mainBody}>
      <ImageBackground
        source={{ uri: `${Base_url}images/bg_screen.png` }}
        resizeMode="cover"
        style={styles.image}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            alignContent: 'center',
          }}>
          <View style={{ padding: 10, flex: 1, width: '100%' }}>


            <View style={styles.row}>
              {loading ? <Loader loading={loading} /> :
                (AnnoncesList.length > 0 ? (

                  <FlatList
                    data={AnnoncesList}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        //  key={item.ID_ance}
                        onPress={() => {
                          ShowDetailAnnonce(
                            item.ID_ance, navigation
                          );
                        }}
                        style={styles.post}>
                        <View style={styles.bcBlock}>



                          <GetProfile user_id={item.user_id} navigation={navigation} img_prof={item.img_prof} />


                          <View style={styles.bcDetaille}>

                            <Text style={styles.postLabel}>{item.nom}</Text>
                            <Text style={styles.postLabel}>{item.titre}</Text>
                            <View
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'flex-end',
                                position: 'absolute',
                                right: 5,
                                top: 0,
                              }}>


                              <MaterialIcons
                                name="favorite"
                                size={24}

                                color="#c4d63c"
                                onPress={() => {
                                  DeFavorisAnnonce(item.ID_ance);
                                }}
                              />
                            </View>
                            <Text style={styles.bcText}>
                              {item.court_description}
                            </Text>
                          </View>
                        </View>
                        <View style={styles.bcBlock}>
                          <View style={styles.btCateg}>
                            <View style={styles.blocDeco}></View>
                            <GetCategorie id_annonce={item.categorie} />
                            <View style={styles.blocDeco2}></View>
                          </View>
                          <View style={styles.btType}>
                            <View style={styles.blocDeco}></View>
                            <GetType id_annonce={item.type} />
                            <View style={styles.blocDeco2}></View>
                          </View>
                        </View>
                      </TouchableOpacity>
                    )}

                    keyExtractor={item => item.ID_ance}
                  />

                ) : (
                  <View style={{ width: '100%' }}>
                    <View style={{ alignItems: 'center', justifyContent: 'center', paddingVertical: '50%', padding: '25%' }}>

                      <Text style={{ color: '#777777', textAlign: 'center', }}>{result}</Text>
                    </View>

                  </View>
                ))}
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};
let category = '';

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

  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
  },

  post: {
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: '#ffffff',
    alignSelf: 'flex-start',
    marginHorizontal: '2%',
    marginBottom: 15,
    minWidth: '95%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 7,
    flexDirection: 'column',
  },

  postLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#c4d63c',
  },
  bcBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    //justifyContent: 'end',
  },
  bcProfile: {
    borderRadius: 60,
    width: 60,
    height: 60,
    backgroundColor: '#efefef',
    color: '#ffffff',
    shadowColor: '#000',
    position: 'relative',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    alignSelf: 'flex-start',
    elevation: 7,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    textAlign: 'center',
    zIndex: 5,
  },
  imgbcProfile: {
    borderRadius: 60,
    width: 60,
    height: 60,

    zIndex: 5,
  },
  bcDetaille: {
    alignSelf: 'flex-start',
    margin: 7,
    width: '75%',
  },
  bcText: {
    //maxWidth: 90,
    color: '#6d6d6d',
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
  bcnoreslt: {
    textAlign: 'center',
    justifyContent: 'center',
    padding: 50,
    width: '100%',
  },

  txtnoreslt: { fontSize: 16, fontWeight: 'bold', color: '#acacac' },
});
export default MesFavAnnonces;
