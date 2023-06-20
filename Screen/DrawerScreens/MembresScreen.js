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
  RefreshControl
} from 'react-native';
import EstAmis from '../EstAmis';
import { Base_url, RequestOptionsGet, RequestOptionsPut, RequestOptionsPost, ViewProfile } from '../utils/utils';
import Loader from '../Components/Loader';

import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';

import GetProfile from '../Components/GetProfile';
import FilterMembreForm from './FilterMembreForm';

import RatingScreen from '../Components/RatingScreen';
import MapTransporteur from '../MapTransporteur';

const MembresScreen = ({ navigation }) => {
  const [MembresList, setMembresList] = useState([]);
  const [nom, setNom] = useState('');
  const [adresse, setAdresse] = useState('');
  const [type, setType] = useState('');
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState(JSON.stringify({ "adresse": "", "nom": "", "type": "" }));

  const [UserLocation, setUserLocation] = useState(null);
  const [zIndexF, setZindexF] = useState(1);
  const [fadeAnimation] = useState(new Animated.Value(0));
  const [refreshing, setRefreshing] = React.useState(false);


  const FindAnnoncePosition = async () => {
    //const  status  = await Location.requestForegroundPermissionsAsync();   
    //console.log('status:::',status);
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      /*setTxtError('Veuillez activer votre poisition!');*/

      const defaultLocation = await Location.geocodeAsync('France');
      // console.log('defaultLocation:::',defaultLocation);
      setUserLocation(defaultLocation[0]);
      return;
    }
    const position = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Highest, maximumAge: 10000 });
    //setUserLocation(position.coords);


    setUserLocation(position.coords);


  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      GetFilter();
      fetchData();
      fadeIn();
      setRefreshing(false);
    }, 2000);
  }, []);

  const GetFilter = useCallback(async () => {
    await AsyncStorage.getItem('add_filter').then((value) => {
      // //console.log('value:', value);

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

  const fetchData = async () => {
    //const fetchUrl =  `membres/${nom}/${adresse}/${type}`;
    // if (Object.keys(filter).length > 0) {
    const detFilter = encodeURIComponent(filter);

    //}
    //console.log('filter mmbre', filter)
    const fetchUrl = `membres/${detFilter}`;

    //console.log('param membres :', fetchUrl)
    const response = await RequestOptionsGet(fetchUrl);
    //const resp = json.data

    ////console.log('list membres :', response.data)
    if (response.length > 0) {
      setMembresList(response);

      await FindAnnoncePosition();
    }
    //else setMembresList({});
  };

  useEffect(() => {
    setLoading(true)
    let isSubscribed = true;

    if (isSubscribed) {
      GetFilter();
      fetchData();
      fadeIn();

    }
    return () => (isSubscribed = false);
  }, [filter]);



  var key = MembresList.length;
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

            <FilterMembreForm OnIndex={(value) => setZindexF(value)} OnFilter={GetFilter} />
          </View>
          <Animated.View
            style={{
              width: '100%',
              //position: 'relative',
              opacity: fadeAnimation,
              marginTop: 80,
            }}>
            <View style={{
              padding: 10,
              flex: 1,
              width: '100%',
              minHeight: 200,
            }}>
              <MapTransporteur navigation={navigation} refresh={refreshing} position={UserLocation} />
            </View>
          </Animated.View>
          <Animated.View
            style={{
              width: '100%',
              position: 'relative',
              opacity: fadeAnimation,
              marginTop: 20
            }}>
            {/* <TouchableOpacity onPress={AddFitler}>*/}


            <View style={styles.row}>



              <FlatList
                data={MembresList}
                renderItem={({ item }) => (
                  <>

                    {item.id != global.User_connecte && (
                      <TouchableOpacity
                        key={item.id}
                        style={[{ zIndex: key-- }, styles.post]}
                        onPress={() => { ViewProfile(item.id, navigation); }}>
                        <View style={[{ zIndex: key-- }, styles.bcBlock]}>


                          <GetProfile user_id={item.id} navigation={navigation} img_prof={item.img_prof} />


                          <View style={[{ zIndex: key-- }, styles.bcDetaille]}>
                            <Text style={styles.postLabel}>{item.nom}</Text>
                            <RatingScreen user_id1={item.id} user_id2={0} />
                            {item.cache == 1 &&
                              <Text style={styles.postLabel2}>
                                {item.email}
                              </Text>
                            }
                            {item.Transporteur == 1 &&
                              <Text style={styles.postLabel2}>
                                Transporteur
                              </Text>
                            }
                            {item.PointDolmen == 1 &&
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
                              right: 5,
                              zIndex: 50,
                              top: -5,
                            }}>

                            {global.User_connecte != undefined && global.User_connecte != null &&
                              <EstAmis id_user1={global.User_connecte} navigation={navigation} id_user2={item.id} />
                            }
                          </View>
                        </View>

                      </TouchableOpacity>
                    )}
                  </>
                )}

                keyExtractor={item => item.id}
              />

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
