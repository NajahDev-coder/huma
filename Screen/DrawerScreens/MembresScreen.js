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
  FlatList
} from 'react-native';
import EstAmis from '../EstAmis';
import { Base_url, RequestOptionsGet, RequestOptionsPut, RequestOptionsPost, ViewProfile } from '../utils/utils';
import Loader from '../Components/Loader';

import AsyncStorage from '@react-native-async-storage/async-storage';

import GetCategorie from '../Components/GetCategorie';
import GetType from '../Components/GetType';
import GetProfile from '../Components/GetProfile';
import FilterMembreForm from './FilterMembreForm';

import RatingScreen from '../Components/RatingScreen';

const MembresScreen = ({ navigation }) => {
  const [MembresList, setMembresList] = useState([]);
  const [nom, setNom] = useState('');
  const [adresse, setAdresse] = useState('');
  const [type, setType] = useState('');
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState(JSON.stringify({ "adresse": "", "nom": "", "type": "" }));

  const [zIndexF, setZindexF] = useState(1);
  const [fadeAnimation] = useState(new Animated.Value(0));
  const GetFilter = useCallback(async () => {
    await AsyncStorage.getItem('add_filter').then((value) => {
      // console.log('value:', value);

      if (value != null && !Object.is(filter, value)) {
        setFilter(value);
      }

    });
  }, [filter])
  const fadeIn = useCallback(() => {
    Animated.timing(fadeAnimation, {
      toValue: 1,
      duration: 500,
      nativeEvent: { contentOffset: { y: fadeAnimation } },
      useNativeDriver: true,
    }).start();
  }, [fadeAnimation]);

  const fetchData = async (filter) => {
    //const fetchUrl =  `membres/${nom}/${adresse}/${type}`;
    if (Object.keys(filter).length > 0) {
      filter = encodeURIComponent(filter);

    }
    console.log('filter mmbre', filter)
    const fetchUrl = `membres/${filter}`;

    console.log('param membres :', fetchUrl)
    const response = await RequestOptionsGet(fetchUrl);
    //const resp = json.data

    //console.log('list membres :', response.data)
    if (response.length > 0)
      setMembresList(response);
    //else setMembresList({});
  };

  useEffect(() => {
    setLoading(true)
    let isSubscribed = true;

    if (isSubscribed) {
      GetFilter();
      fetchData(filter);
      fadeIn();

    }
    return () => (isSubscribed = false);
  }, [filter, fadeIn, GetFilter]);




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
            <FilterMembreForm OnIndex={(value) => setZindexF(value)} OnFilter={GetFilter} />
          </View>
          <Animated.View
            style={{
              width: '100%',
              position: 'relative',
              opacity: fadeAnimation,
              marginTop: 20
            }}>
            {/* <TouchableOpacity onPress={AddFitler}>*/}


            <View style={styles.row}>


              {MembresList.map((value) => (
                <>

                  {value.id != global.User_connecte && (
                    <TouchableOpacity
                      key={value.id}
                      style={styles.post}
                      onPress={() => { ViewProfile(value.id, navigation); }}>
                      <View style={styles.bcBlock}>



                        <GetProfile user_id={value.id} navigation={navigation} img_prof={value.img_prof} />


                        <View style={styles.bcDetaille}>
                          <Text style={styles.postLabel}>{value.nom}</Text>
                          <RatingScreen user_id1={value.user_id} user_id2={0} />
                          {value.cache == 1 &&
                            <Text style={styles.postLabel2}>
                              {value.email}
                            </Text>
                          }
                          {value.Transporteur == 1 &&
                            <Text style={styles.postLabel2}>
                              Transporteur
                            </Text>
                          }
                          {value.PointDolmen == 1 &&
                            <Text style={styles.postLabel2}>
                              Dolmen
                            </Text>
                          }
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                            position: 'absolute',
                            right: 10,
                            zIndex: 50,
                            top: 28,
                          }}>

                          {global.User_connecte != undefined && global.User_connecte != null &&
                            <EstAmis id_user1={global.User_connecte} navigation={navigation} id_user2={value.id} />
                          }
                        </View>
                      </View>

                    </TouchableOpacity>
                  )}
                </>
              ))
              }
            </View>
          </Animated.View>
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
  postLabel2: {
    fontSize: 12,
    fontWeight: '500',
    color: '#000',
  },
  bcBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 20,
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

  txtnoreslt: { fontSize: 16, color: '#222222' },
});
export default MembresScreen;
