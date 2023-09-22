// Import React and Component
import React, { useState, createRef, useEffect, useCallback } from 'react';

import { Base_url, RequestOptionsGet, ShowDetailAnnonce, RequestOptionsPut, RequestOptionsPost } from '../utils/utils';
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
  Dimensions,
} from 'react-native';

import Loader from '../Components/Loader';
import { Entypo } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PublicitesSlideshow from './PublicitesSlideshow';
import GetCategorie from '../Components/GetCategorie';
import GetType from '../Components/GetType';
import GetProfile from '../Components/GetProfile';
import FilterForm from './FilterForm';
import RatingScreen from '../Components/RatingScreen';
import BarFilter from './BarFilter';
const AnnoncesScreen = ({ navigation, route }) => {
  const filterN = route.params?.filter;
  //alert('filter accuiel:' + filterN)
  const [AnnoncesList, setAnnoncesList] = useState([]);

  const [filter, setFilter] = useState(JSON.stringify({ "adresse": "", "titre": "", "type": "", "categorie": "", "dateStart": "", "dateEnd": "" }));
  //const [filter, setFilter] = useState(JSON.stringify(filterN));
  const [loading, setLoading] = useState(false);
  const [zIndexF, setZindexF] = useState(1);
  const [result, setResultat] = useState(<Loader loading={true} />);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // setTimeout(() => {
    setRefreshing(false);
    GetFilter();
    fetchData();
    // }, 1000);
  }, []);
  const GetFilterForm = async () => {
    setLoading(true);
    setResultat(<Loader loading={true} />)
    setAnnoncesList([]);
    await AsyncStorage.getItem('add_filter').then((value) => {
      //  console.log('value  filter:', value);

      if (value != null && !Object.is(filter, value)) {
        setFilter(value);
      }
      else {
        setFilter(filterN);
      }
    });
    setLoading(false);
  }
  const GetFilter = async () => {
    setLoading(true);
    setResultat(<Loader loading={true} />)
    setAnnoncesList([])
    setFilter(filterN);
    setLoading(false)
  }


  const fetchData = async () => {
    // if (Object.keys(filter).length > 0) {

    const Detfilter = encodeURIComponent(filter);
    // }
    const fetchUrl = `annonces/${Detfilter}`;
    const json = await RequestOptionsGet(fetchUrl);
    if (json.length > 0) {
      setAnnoncesList(json)
      setResultat('')
    }
    else {

      setAnnoncesList([])
      setResultat('Pas des annonces trouvées! ')
    }
    //if (json == null) setAnnoncesList({});
  };

  useEffect(() => {

    let isSubscribed = true;


    if (isSubscribed) {
      GetFilter();
      fetchData();
    }

    return () => { isSubscribed = false }
  }, [filter, route.params?.filter])
  //}, [])


  const isdivisibleNine = (num) => {

    var myArr = 0;
    String(num).split("").map((num) => {
      myArr += Number(num)
    })
    if (myArr == 9 || myArr == 18) {
      return true;
    }
    return false;
  }

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
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >

          <View style={{ zIndex: zIndexF, position: 'absolute', top: 0, right: 0, height: 70, width: '100%', zIndex: 100 }}>
            <BarFilter navigation={navigation} />
          </View>


          <View style={{ padding: 10, flex: 1, zIndex: 2, width: '100%', marginTop: 70, minHeight: Dimensions.get('window').height - 100 }}>
            <View style={styles.row}>
              {loading ? <Loader loading={loading} /> : (
                <>
                  {AnnoncesList.length > 0 ? AnnoncesList.map((item, key) => (
                    <>
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



                          <GetProfile user_id={item.user_id} navigation={navigation} img_prof={item.img_prof} />

                          <View style={styles.bcDetaille}>
                            <Text style={styles.postLabel}>{item.nom}</Text>
                            <RatingScreen user_id1={item.user_id} user_id2={0} />
                            <Text style={styles.postLabel}>
                              {item.titre}
                            </Text>
                            <Text style={styles.postLabel2}>
                              Description:
                            </Text>
                            <Text style={styles.bcText}>
                              {item.court_description}
                            </Text>
                          </View>
                        </View>


                        {item.Adresse_ance.length != 0 && (
                          <View style={styles.bcBlock2}>
                            <Text style={styles.bcText2}>
                              <Entypo name="location-pin" size={20} color="grey" />

                              {item.Adresse_ance}
                            </Text>
                          </View>
                        )}
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
                      <View>
                        {isdivisibleNine(key) && (

                          <PublicitesSlideshow navigation={navigation} rang={key} />

                        )}
                      </View>
                    </>

                  )) : (

                    <View style={{ width: '100%' }}>
                      <View style={{ alignItems: 'center', justifyContent: 'center', paddingVertical: '50%', padding: '25%' }}>

                        <Text style={{ color: '#777777', textAlign: 'center', }}>{result}</Text>
                      </View>

                    </View>
                  )}
                </>

              )}
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
    zIndex: 3,
    justifyContent: 'center',
    alignContent: 'center',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },

  row: {
    flexDirection: 'column',
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
    // flexDirection: 'column',
  },

  postLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#c4d63c',
  },
  postLabel2: {
    fontSize: 12,
    fontWeight: '500',
    color: '#000',
  },
  bcBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    //justifyContent: 'end',

  },
  bcBlock2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '85%',
    marginLeft: '13%',
    padding: 10,
  },
  bcDetaille: {
    // alignSelf: 'flex-start',
    margin: 7,
    width: '80%',
  },
  bcText: {
    //maxWidth: 200,
    color: '#6d6d6d',
    borderBottomColor: 'black',
    borderBottomWidth: 1
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

  bcPublicite: {

    padding: 0,
    width: '95%',
    height: 120

  },
});
export default AnnoncesScreen;
