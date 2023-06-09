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
import ActionDelete from '../Components/ActionDelete';

const MesAnnonces = ({ navigation, route }) => {
  const [AnnoncesList, setAnnoncesList] = useState([]);

  const [filter, setFilter] = useState(JSON.stringify({ "adresse": "", "titre": "", "type": "", "categorie": "", "dateStart": "", "dateEnd": "" }));
  const [loading, setLoading] = useState(false);
  const [zIndexF, setZindexF] = useState(1);
  const [Annonce_id_Sup, setAnnonce_id_Sup] = useState(null);
  const [isAlerte, setIsAlerte] = useState(false);

  const [selected, setSelected] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      GetFilter();
      fetchData(filter);
    }, 2000);
  }, []);
  const msgAlerte = 'Êtes-vous sûr de vouloir supprimer cette annonce!';
  const [result, setResultat] = useState('Loading ....');
  const id_user = route.params.id_user;

  const GetFilter = useCallback(async () => {
    await AsyncStorage.getItem('add_filter').then((value) => {

      if (value != null && !Object.is(filter, value)) {
        setFilter(value);
      }

    });
  }, [filter]);
  useEffect(() => {
    setLoading(true)
    let isSubscribed = true;


    if (isSubscribed) {

      GetFilter();
      setTimeout(() => {
        setLoading(false);
        if (Object.keys(filter).length > 0) {

          fetchData(filter);
        }
      }, 10)
    }
    return () => (isSubscribed = false);
  }, [filter, id_user, GetFilter, isAlerte]);

  const fetchData = async (filter) => {
    filter = encodeURIComponent(filter);

    const fetchUrl = `mesannonces/${id_user}/${filter}`;
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
            <FilterForm OnIndex={(value) => setZindexF(value)} OnFilter={GetFilter} />
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
                                <ActionDelete navigation={navigation} id={item.ID_ance} type='annonce' msgAlerte={msgAlerte} />

                              }
                            </View>
                            <Text style={styles.bcText}>
                              {item.court_description}
                            </Text>
                          </View>
                        </View>
                        <View style={styles.bcBlock}>
                          <View style={styles.btCateg}>
                            <GetCategorie id_annonce={item.categorie} />
                          </View>
                          <View style={styles.btType}>
                            <GetType id_annonce={item.type} />
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
            {/*isAlerte && (
              <ModalSuppression navigation={navigation} msgAlerte={msgAlerte} id={Annonce_id_Sup} type='annonce' />
            )*/}
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
    zIndex: 1
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
    zIndex: 1
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
