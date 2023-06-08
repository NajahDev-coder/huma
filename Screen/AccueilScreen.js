import React, { useState, createRef, useEffect } from 'react';
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
  ALERT
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Carousel from 'react-native-anchor-carousel';
import { Base_url, RequestOptionsGet } from './utils/utils';
import ModalScreenVIP from './Modal'
//import Loader from './Components/Loader';
//import MapView, { Polyline, Marker } from 'react-native-maps';
import { decode } from '@mapbox/polyline';
import FilterForm from './DrawerScreens/FilterForm';
import CategCarousel from './CategCarousel';
import MapGeoScreen from './MapGeoScreen';

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

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      fetchData();
    }, 2000);
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
  /*const getDirections = async (startLoc, destinationLoc) => {
    try {
      const KEY = GOOGLE_API_KEY; //put your API key here.
      //otherwise, you'll have an 'unauthorized' error.
      let resp = await fetch(
        `maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}&key=${KEY}`,
        {
          mode: 'cors',
          header: {
            'Access-Control-Allow-Origin': '*',
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': 'true',
          },
        }
      );
      console.log(resp);
      let respJson = await resp.json();
      let points = decode(respJson.routes[0].overview_polyline.points);
      console.log('test points map', points);
      let coords = points.map((point, index) => {
        return {
          latitude: point[0],
          longitude: point[1],
        };
      });
      return coords;
    } catch (error) {
      return error;
    }
  };*/

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
    /*getDirections('52.5200066,13.404954', '50.1109221,8.6821267')
      .then((coords) => {
        setCoords(coords);
        console.log('coords:', coords); 
      })
      .catch((err) => console.log('Something went wrong'));
*/
    if (isSubscribed) {
      fetchData();

      fadeIn();
    }
    return () => (isSubscribed = false);
  }, [selectedValue, refreshing]);

  const GetFilter = () => {

    setZindexF(1);
    setSelectedValue(0);
    setSelectedValue(1);
    navigation.navigate('Annonces');
  };
  const defaultImage = { uri: Base_url + 'images/logo.png' };
  const getBeerImage = (slugimg) => {
    let path = { uri: Base_url + 'images/icones_categ/' + slugimg + '.png' };
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
          <View style={{ position: 'absolute', top: 0, right: 0, width: '100%', zIndex: 100 }}>
            <FilterForm OnIndex={(value) => setZindexF(value)} OnFilter={GetFilter} />
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


              {CategroiesList.map((value) => (
                <TouchableOpacity
                  key={value.id}
                  onPress={() => {
                    setSelectedValue(value.id);
                  }}
                  style={[
                    styles.button,
                    selectedValue == value.id && styles.selected,
                  ]}>

                  <ImageBackground source={getBeerImage(value.slug)} resizeMode="cover" style={{ width: sizeIcone, height: sizeIcone, resizeMode: 'contain' }}>
                    <Text
                      style={{ position: 'absolute', bottom: 15 }}>
                      {/* <Image
                      defaultSource={defaultImage}
                      source={getBeerImage(value.slug)}
                      style={{ width: sizeIcone, height: sizeIcone, resizeMode: 'contain' }}
                    />*/}
                    </Text>

                  </ImageBackground>
                  <Text
                    style={[
                      styles.buttonLabel,
                      selectedValue == value.id && styles.selectedLabel,
                    ]}>
                    {value.titre}
                  </Text>
                </TouchableOpacity>
              ))}
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
                }}>
                <SousCateg CategId={selectedValue} refresh={onRefresh} OnFilter={GetFilter} navigation={navigation} />
              </Animated.View>
            </SafeAreaView>

            {/** pop up*/}
            {(global.User_connecte != null && global.User_VIP != null) && (
              <ModalScreenVIP navigation={navigation} />
            )}
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
    //backgroundColor: '#8c992c',
    backgroundColor: 'rgba(140, 153, 44 , 0.80)',
    alignItems: 'center',
    marginHorizontal: '1%',
    marginBottom: 6,
    borderRadius: sizeButtonIcone,
    height: sizeButtonIcone,
    width: '35%',

    paddingTop: 4,
    paddingLeft: 4,
    //justifyContent: 'center',
    // textAlignVertical:'center'   
    //textAlign: 'center',
  },
  selected: {
    backgroundColor: 'rgba(115, 126, 29, 0.88)',
    borderWidth: 0,
  },
  buttonLabel: {
    bottom: Platform.OS != 'web' ? 10 : 8,
    position: 'absolute',
    fontSize: 13,
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  selectedLabel: {
    color: '#ffffff',
  },

});

export default AccueilScreen;

/*export default GoogleApiWrapper({
  apiKey: 'AIzaSyB_5nxISlZhAxCAdtzDG5Cmx04kbMc1vDc'
})(MapContainer);*/
