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
  Feather
} from '@expo/vector-icons';

import Loader from '../Components/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';

import GetCategorie from '../Components/GetCategorie';
import GetType from '../Components/GetType';
import GetProfile from '../Components/GetProfile';
import FilterForm from './FilterForm';
import ModalSuppression from '../ModalSuppression'
import { ViewProfile, ViewAnnonces, ShowDetailAnnonce, Base_url, RequestOptionsGet } from '../utils/utils'

import { SelectList } from 'react-native-dropdown-select-list'
import ActionGestion from '../Components/ActionGestion';
import BarFilter from './BarFilter';

const MesAnnonces = ({ navigation, route }) => {
  const [AnnoncesList, setAnnoncesList] = useState([]);

  const [filter, setFilter] = useState(JSON.stringify({ "adresse": "", "titre": "", "type": "", "categorie": "", "dateStart": "", "dateEnd": "" }));
  const [loading, setLoading] = useState(false);
  const [zIndexF, setZindexF] = useState(1);
  const [Annonce_id_Sup, setAnnonce_id_Sup] = useState(null);


  const [selected, setSelected] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const msgAlerte = 'Êtes-vous sûr de vouloir supprimer cette annonce!';
  const [result, setResultat] = useState('');
  const id_user = route.params.id_user;

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    //setTimeout(() => {  
    setRefreshing(false);
    GetFilter();
    fetchData();
    // }, 1000);
  }, []);

  const GetFilter = async () => {
    await AsyncStorage.getItem('add_filter').then((value) => {

      if (value != null && !Object.is(filter, value)) {
        setFilter(value);
      }

    });
  };

  const fetchData = async () => {
    const detailFilter = encodeURIComponent(filter);
    //console.log(detailFilter)
    const fetchUrl = `mesannonces/${id_user}/${detailFilter}`;
    const json = await RequestOptionsGet(fetchUrl);
    ////console.log('json mesannonces', json)
    if (json.length > 0) {
      setAnnoncesList(json)
      setResultat('')
    }
    else {

      setAnnoncesList([])
      setResultat('Pas des annonces trouvées! ')
    }
  };
  useEffect(() => {
    setLoading(true)
    let isSubscribed = true;


    if (isSubscribed) {
      GetFilter();
      // alert(filter)
      //if (Object.keys(filter).length > 0) {
      setAnnoncesList([])
      setResultat(<Loader loading={true} />);
      setLoading(false);
      fetchData();

      //  }, 100)
    }
    return () => { isSubscribed = false }
    // }, [filter, refreshing])
  }, []);



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

          <View style={{ position: 'absolute', top: 0, right: 0, height: 70, width: '100%', zIndex: 100 }}>
            <BarFilter navigation={navigation} />
          </View>
          <View style={{ padding: 10, zIndex: 2, flex: 1, width: '100%', marginTop: 70 }}>


            <View style={styles.row}>
              {loading ? <Loader loading={loading} /> :

                (AnnoncesList.length > 0 ? (

                  <FlatList
                    data={AnnoncesList}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        key={item.ID_ance}
                        onPress={() => {
                          ShowDetailAnnonce(
                            item.ID_ance,
                            navigation
                          );
                        }}
                        style={styles.post}>
                        <View style={styles.bcBlock}>


                          <GetProfile user_id={id_user} navigation={navigation} img_prof={item.img_prof} />
                          <View style={styles.bcDetaille}>
                            {global.User_connecte != id_user && <Text style={styles.postLabel}>{item.nom}</Text>}
                            <Text style={styles.postLabel}>{item.titre}</Text>
                            <View
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'flex-end',
                                position: 'absolute',
                                right: 10,
                                top: 0,
                                zIndex: 100
                              }}>
                              {global.User_connecte == id_user &&
                                <View style={{ position: 'absolute', right: -8, top: -6, width: 100, zIndex: 100 }}>
                                  <ActionGestion navigation={navigation} id={item.ID_ance} type='annonce' msgAlerte={msgAlerte} onAction={fetchData} />
                                </View>
                              }
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
                    style={{ minHeight: 600 }}
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
    zIndex: 1,
    marginTop: 5
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
    height: 65,
    zIndex: 1
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
    zIndex: 1
    // maxWidth: 130,
  },
  bcnoreslt: {
    textAlign: 'center',
    justifyContent: 'center',
    padding: 50,
    width: '100%',
  },
  boxdropstyle:
  {
    borderRadius: 0,
    borderWidth: 0,
    padding: 0,
    zIndex: 100

  },
  dropstyle:
  {
    position: 'absolute',
    top: 0,
    right: 18,
    zIndex: 20,

    marginTop: -5,
    padding: 0,
    paddingVertical: 0,

    borderRadius: 6,

    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#909475'
  },
  itemdropstyle:
  {
    zIndex: 20,
    paddingVertical: 5,
    fontWeight: 'bold'
  },
  txtnoreslt: { fontSize: 16, fontWeight: 'bold', color: '#acacac' },
});
export default MesAnnonces;
