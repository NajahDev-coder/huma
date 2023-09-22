import React, { useState, useRef, createRef, useEffect } from 'react';
//import Category from 'react-native-category';
//import MapScreen from './MapScreen';
//import MapGeoScreen from './MapGeoScreen'
import SousCateg, { getSScateg } from './SousCateg';
//import { FastImage } from 'react-native-fast-image';  
//import Slideshow from './DrawerScreens/SlideshowScreen' ;
//import PublicitesSlideshow from './DrawerScreens/PublicitesSlideshow';
import * as Location from 'expo-location';

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
  Button,
  Modal,
  Alert,
  useWindowDimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Carousel from 'react-native-anchor-carousel';
import { Base_url, RequestOptionsGet, isVIP } from './utils/utils';
import ModalScreenVIP from './Modal'
//import Loader from './Components/Loader';
//import MapView, { Polyline, Marker } from 'react-native-maps';
import { decode } from '@mapbox/polyline';
import FilterForm from './DrawerScreens/FilterForm';
import CategCarousel from './CategCarousel';
import MapGeoScreen from './MapGeoScreen';
import BarFilter from './DrawerScreens/BarFilter';
//import Constants from 'expo-constants';
//const { manifest } = Constants;

//let PCategID ;

var sizeButtonIcone = 95
if (Platform.OS != 'web') {
  sizeButtonIcone = 95
}



const AccueilScreen = ({ navigation }) => {

  var sizeIcone = 50
  if (Platform.OS != 'web') {
    sizeIcone = 50
  }
  const image = {
    uri: `${Base_url}images/bg_screen.png`,
  };

  const scrollX = useRef(new Animated.Value(0)).current;

  const { width: windowWidth } = useWindowDimensions();
  const [CategroiesList, setCategroiesList] = useState([]);
  const [CategSelected, setCategSelected] = useState(1);
  const [zIndexF, setZindexF] = useState(1);
  const [isError, setError] = useState(false);
  //const [PcategID, setPcategID] = useState(1)

  const [loading, setLoading] = useState(false);
  const [fadeAnimation] = useState(new Animated.Value(0));
  const [selectedValue, setSelectedValue] = useState(1);
  const [Oldkey, setOldkey] = useState(0);
  const [NonVIP, setNonVIP] = useState(1);
  const [UserLocation, setUserLocation] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [timeShow, setTimeShow] = useState(false)

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    //setTimeout(() => {
    setRefreshing(false);
    fetchData();
    // }, 2000);
  }, []);

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


  const fadeIn = () => {
    Animated.timing(fadeAnimation, {
      toValue: 1,
      duration: 500,
      nativeEvent: { contentOffset: { y: fadeAnimation } },
      useNativeDriver: true,
    }).start();
  };

  const fetchData = async () => {

    const fetchUrl = `categories`;
    const response = await RequestOptionsGet(fetchUrl);

    setCategroiesList(response);
    setCategSelected(1);
    await FindAnnoncePosition();

  };

  useEffect(() => {
    let isSubscribed = true;

    if (isSubscribed) {
      isVIP();
      fetchData();
      fadeIn();
      setTimeout(() => {
        setTimeShow(true);
      }, 5000)
    }
    return () => (isSubscribed = false);
  }, [selectedValue, refreshing, global.User_VIP]);
  //}, [selectedValue]);

  const GetFilter = async () => {

    setZindexF(1);
    setSelectedValue(0);
    setSelectedValue(1);
    const filter = await AsyncStorage.getItem('add_filter').then((value) => {
      if (value) {
        //alert('filter:::' + value);
        //setTimeout(() => {*/
        navigation.navigate({
          name: 'Annonces', params: {
            filter: value
          },
        });
        // }, 500);
      }
    });

  };

  const defaultImage = { uri: Base_url + 'images/logo.png' };
  const getBeerImage = (idImgCateg) => {
    //let path = { uri: Base_url + 'images/icones_categories/' + slugimg + '.png' };
    let path;
    if (idImgCateg == 1 || idImgCateg == 3 || idImgCateg == 5)
      path = { uri: Base_url + 'images/icones_categories/icone_activeCateg.png' };
    else
      path = { uri: Base_url + 'images/icones_categories/icone_IN_activeCateg.png' };
    return path;
  };
  //console.log('userLocation',UserLocation)  ;
  return (
    <View style={styles.mainBody}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            alignContent: 'center',
          }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>

          <View style={{ position: 'absolute', top: 0, right: 0, left: 0, width: '100%', height: 70, zIndex: 100 }}>
            {/* <FilterForm navigation={navigation} OnIndex={(value) => setZindexF(value)} OnFilter={GetFilter} />*/}
            <BarFilter navigation={navigation} />
          </View>


          <View
            style={{
              padding: 10,
              flex: 1,
              width: '100%',
              //minHeight: 200,

              position: 'relative',
              top: 70,
              zIndex: 1,
            }}>
            <View style={styles.row}>


              <ScrollView
                horizontal={true}

                showsHorizontalScrollIndicator={false}
                onScroll={Animated.event([
                  {
                    nativeEvent: {
                      contentOffset: {
                        x: scrollX,
                      },
                    },
                  },
                ],
                  { useNativeDriver: false }
                )}>
                <FlatList
                  data={CategroiesList}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      key={item.id}
                      onPress={() => {
                        setSelectedValue(item.id);
                      }}
                      style={[
                        styles.button,
                        //selectedValue == item.id && styles.selected,
                        (item.id == 1 || item.id == 3 || item.id == 5) && styles.selected,
                      ]}>

                      <ImageBackground source={getBeerImage(item.id)} resizeMode="cover" style={{ height: 200, width: 160 }} >

                        <Text
                          style={[
                            styles.buttonLabel,
                            selectedValue == item.id && styles.selectedLabel,
                          ]}>
                          {item.titre}
                        </Text>

                      </ImageBackground>

                    </TouchableOpacity>
                  )}

                  horizontal={true}
                  keyExtractor={(item, index) => index}
                />
              </ScrollView>
            </View>

            {Platform.OS != 'web' && UserLocation !== null && (

              <Animated.View
                style={{
                  width: '100%',
                  position: 'relative',
                  opacity: fadeAnimation,
                }}>
                <View style={{
                  padding: 10,
                  flex: 1,
                  width: '100%',
                  minHeight: 200,
                }}>
                  <MapGeoScreen navigation={navigation} refresh={refreshing} position={UserLocation} />
                </View>
              </Animated.View>

            )}



            <SafeAreaView>
              <Animated.View
                style={{
                  width: '100%',
                  position: 'relative',
                  opacity: fadeAnimation,
                  paddingBottom: 100
                }}>
                <SousCateg CategId={selectedValue} refresh={onRefresh} OnFilter={GetFilter} navigation={navigation} />
              </Animated.View>
            </SafeAreaView>


            {/** pop up*/}
            {(global.User_connecte != null && global.User_VIP == 0 && timeShow) && (
              <ModalScreenVIP navigation={navigation} />
            )}
          </View>


        </ScrollView>
      </ImageBackground>
    </View >
  );
};

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
  viewMap: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: 120,
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',

  },
  button: {
    backgroundColor: '#bed61e',
    //backgroundColor: 'rgba(140, 153, 44 , 0.80)',
    alignItems: 'center',
    // justifyContent: 'center',
    marginHorizontal: 5,
    marginVertical: 6,
    borderRadius: 30,
    height: 200,
    width: 160,

    //padding: 10
    //justifyContent: 'center',
    // textAlignVertical:'center'   
    //textAlign: 'center',
  },
  selected: {
    //backgroundColor: 'rgba(115, 126, 29, 0.88)',
    backgroundColor: '#4c362b',
    borderWidth: 0,
  },
  buttonLabel: {
    //bottom: Platform.OS != 'web' ? 10 : 8,
    //position: 'absolute',
    fontSize: 18,
    color: '#ffffff',
    padding: 20,
    paddingTop: 60,
    height: 170,
    width: 160,
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center'
  },
  selectedLabel: {
    color: '#ffffff',
  },

});

export default AccueilScreen;
