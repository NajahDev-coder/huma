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
import FilterForm from './FilterForm';

import { ViewProfile, ViewAnnonces, ShowDetailAnnonce, Base_url, RequestOptionsGet } from '../utils/utils'

const MesAnnonces = ({ navigation, route }) => {
  const [AnnoncesList, setAnnoncesList] = useState([]);

  const [filter, setFilter] = useState(JSON.stringify({ "adresse": "", "titre": "", "type": "", "categorie": "", "dateStart": "", "dateEnd": "" }));
  const [loading, setLoading] = useState(false);
  const [zIndexF, setZindexF] = useState(1);

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
      }, 100)
    }
    return () => (isSubscribed = false);
  }, [filter, id_user, GetFilter]);

  const fetchData = async (filter) => {
    filter = encodeURIComponent(filter);

    const fetchUrl = `mesannonces/${id_user}/${filter}`;
    const json = await RequestOptionsGet(fetchUrl);
    //console.log('json mesannonces', json)
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
          }}>
          <View style={{ zIndex: zIndexF }}>
            <FilterForm OnIndex={(value) => setZindexF(value)} OnFilter={GetFilter} />
          </View>
          <View style={{ padding: 10, zIndex: 2, flex: 1, width: '100%' }}>


            <View style={styles.row}>
              {loading ? <Loader loading={loading} /> :
                (AnnoncesList.length > 0 ? (
                  AnnoncesList.map((value) => (
                    <TouchableOpacity
                      key={value.ID_ance}
                      onPress={() => {
                        ShowDetailAnnonce(
                          value.ID_ance,
                          navigation
                        );
                      }}
                      style={styles.post}>
                      <View style={styles.bcBlock}>


                        <GetProfile user_id={id_user} navigation={navigation} img_prof={value.img_prof} />
                        <View style={styles.bcDetaille}>
                          {global.User_connecte != id_user && <Text style={styles.postLabel}>{value.nom}</Text>}
                          <Text style={styles.postLabel}>{value.titre}</Text>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'flex-end',
                              position: 'absolute',
                              right: 10,
                              top: 0,
                            }}>
                            {global.User_connecte == id_user &&
                              <AntDesign
                                name="edit"
                                size={24}
                                color="black"
                                style={{ margin: 4 }}
                                onPress={() => {
                                  navigation.navigate({
                                    name: 'EditAnnonceScreen',
                                    params: {

                                      id_user: id_user,
                                      id_annonce: value.ID_ance
                                    },
                                  });
                                }}
                              />
                            }
                          </View>
                          <Text style={styles.bcText}>
                            Description: {value.court_description}
                          </Text>
                        </View>
                      </View>
                      <View style={styles.bcBlock}>
                        <View style={styles.btCateg}>
                          <GetCategorie id_annonce={value.categorie} />
                        </View>
                        <View style={styles.btType}>
                          <GetType id_annonce={value.type} />
                        </View>
                      </View>
                    </TouchableOpacity>
                  ))
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
    maxWidth: 90,
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
  },
  bcnoreslt: {
    textAlign: 'center',
    justifyContent: 'center',
    padding: 50,
    width: '100%',
  },

  txtnoreslt: { fontSize: 16, fontWeight: 'bold', color: '#acacac' },
});
export default MesAnnonces;
