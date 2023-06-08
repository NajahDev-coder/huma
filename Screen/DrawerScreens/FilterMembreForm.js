import React, { useState, useEffect } from 'react';
import {
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
  Animated,
  Dimensions,
} from 'react-native';

import { Picker } from '@react-native-picker/picker';
import * as Location from 'expo-location';
import { SelectList } from 'react-native-dropdown-select-list'

import { Base_url, RequestOptionsGet, RequestOptionsPut, RequestOptionsPost, GOOGLE_PLACES_API_KEY } from '../utils/utils';
import moment from 'moment';
import { MaterialCommunityIcons, Entypo, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import {
  GooglePlacesAutocomplete,
  Geolocation,
} from 'react-native-google-places-autocomplete';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CalendarPicker from 'react-native-calendar-picker';

const homePlace = {
  description: 'Home',
  geometry: { location: { lat: 48.8152937, lng: 2.4597668 } },
};
const workPlace = {
  description: 'Work',
  geometry: { location: { lat: 48.8496818, lng: 2.2940881 } },
};
const windowWidth = Dimensions.get('window').width - 50;
const windowheight = Dimensions.get('window').height / 2 - 50;

/*const currentPlace = {
      description: 'Position',
      geometry: { location: { lat: null, lng: null } },
    };*/
const FilterMembreForm = ({ OnFilter, OnIndex }) => {
  //const [categorie, setCategorie] = useState(0);
  const [Type, setType] = useState('');
  const [localisation, setLocalisation] = useState('');
  const [etat, setEtat] = useState(0);
  const [txtError, setTxtError] = useState('');

  const [currAdresse, setCurrAdresse] = useState('');
  const [currentPosition, setCurrentPosition] = useState(null);
  const [titreF, setTitreF] = useState('');

  const [icoFilter, setIcoFilter] = useState("filter-variant-plus");
  const [CountUpdtCAt, setCountUpdtCAt] = useState(0);
  const [Enable, setEnable] = useState(0);
  const [fadeAnimation] = useState(new Animated.Value(0));
  const [RefreshKey, setRefreshKey] = useState(0);

  const [windowHeight, setWindowHeight] = useState(70)

  const TypeList = [
    { key: 'Simple', value: 'Simple' },
    { key: 'Vip', value: 'VIP' },
    { key: 'Transporteur', value: 'Transporteur' },
    { key: 'Dolmen', value: 'PointDolmen' },
  ]

  const image = {
    uri: `${Base_url}images/bg_screen.png`,
  };

  //let Adfilter;
  const getCoordinates = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setTxtError('Veuillez activer votre poisition!');
      return;
    }
    const userLocation = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Highest, maximumAge: 10000 });
    // setcCULocation(userLocation);

    setCurrentPosition(userLocation);
    //  setCurrAdresse(userLocation.description);
  };
  const currentPlace = {
    description: 'Position',
    geometry: {
      location: {
        lat: currentPosition ? currentPosition.coords.latitude : '',
        lng: currentPosition ? currentPosition.coords.longitude : '',
      },
    },
  };
  const AddFilter = async () => {

    //console.log('currAdresse',currAdresse)
    let filter = {
      adresse: currAdresse,
      nom: titreF,
      type: Type
    };
    await AsyncStorage.setItem('add_filter', JSON.stringify(filter));
    //console.log('refraichissement....');
    //ShowAllFilter();
    OnFilter();
    setRefreshKey((oldKey) => oldKey + 1);
  };
  const DeleteFilter = async () => {
    let filter = {
      adresse: '',
      nom: '',
      type: ''
    };

    AsyncStorage.setItem('add_filter', JSON.stringify(filter));
    //console.log('refraichissement....');
    OnFilter();
    setRefreshKey((oldKey) => oldKey + 1);
    ShowAllFilter(1);
  };
  const ShowAllFilter = (stat) => {
    //console.log(fadeAnimation);

    //const stat = JSON.stringify(fadeAnimation) == '1' ? 0 : 1;

    //alert(stat);
    //const duration = JSON.stringify(fadeAnimation) == '1' ? 100 : 500
    // console.log('stat', stat);

    setEnable(!stat);
    if (stat == 0) {
      setWindowHeight(windowheight)
      setIcoFilter("filter-variant-minus");
      OnIndex(20);
    }
    else {
      setWindowHeight(70)
      setIcoFilter("filter-variant-plus");
      OnIndex(1);
    }
    /*setEnable(!stat);
    Animated.timing(fadeAnimation, {
      toValue: stat,
      duration: duration,
      nativeEvent: { contentOffset: { y: fadeAnimation } },
      useNativeDriver: true,
    }).start();*/

  };

  useEffect(() => {
    let isSubscribed = true;

    if (isSubscribed) {
      getCoordinates();

    }
    return () => (isSubscribed = false);
  }, [RefreshKey, windowHeight, Enable]);



  //render() {
  return (


    <View style={[styles.rowF, { height: windowHeight }]}>

      <View style={styles.rowAC}>
        <GooglePlacesAutocomplete
          placeholder="Localisation "
          query={{
            key: GOOGLE_PLACES_API_KEY,
            language: 'fr', // language of the results
          }}
          onPress={(data, details = null) => {
            setCurrAdresse(data.description);
            AddFilter();
          }}
          onFail={(error) => console.error(error)}
          requestUrl={{
            url: 'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api',
            useOnPlatform: 'web',
          }}
          getDefaultValue={() => currAdresse}
          styles={{
            textInputContainer: {
              backgroundColor: 'transparent',
              position: 'relative',
            },
            textInput: {
              color: '#5a5959',
              paddingLeft: 15,
              paddingRight: 15,
              borderWidth: 1,
              borderRadius: 30,
              borderColor: '#646363',
              backgroundColor: 'transparent',
              width: '75%',
              height: 35,
              fontSize: 11
            },
            predefinedPlacesDescription: {
              color: '#1faadb',
            },
          }}
          predefinedPlaces={[currentPlace]}
        />
        <MaterialCommunityIcons
          name={icoFilter}
          size={35}
          color="black"
          onPress={() => ShowAllFilter(Enable)}
        />
      </View>

      {Enable == true && (
        <View style={styles.showfilter}>
          <View style={styles.row}>
            <TextInput
              selectedValue={titreF}
              style={styles.inputStyle}
              onChangeText={(titre) => {
                setTitreF(titre);
                AddFilter();
              }}
              underlineColorAndroid="#f000"
              placeholder="Rechercher  "
              placeholderTextColor="#5a5959"
              autoCapitalize="sentences"
            />
          </View>


          <View style={styles.row}>

            <SelectList
              setSelected={(val) => { setType(val); setWindowHeight((oldKey) => oldKey + 80) }}
              onSelect={() => { AddFilter() }}
              data={TypeList}
              boxStyles={{ borderRadius: 30, padding: 5, marginBottom: 5 }}
              inputStyles={{ fontSize: 12, color: '#5a5959' }}
              dropdownStyles={styles.dropselectStyle}
              dropdownItemStyles={styles.itemdropselectStyle}
              defaultOption={{ key: '1', value: 'Membre' }}
              save="value"
            />

          </View>

          <View style={styles.rowBT}>
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={() => { DeleteFilter(); ShowAllFilter(Enable) }}>
              <Text style={styles.buttonTextStyle}>Réinitialiser</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={() => { AddFilter(); ShowAllFilter(Enable) }}>
              <Text style={styles.buttonTextStyle}>Rechercher</Text>
            </TouchableOpacity>

          </View>
        </View>
      )}

    </View>


  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'column',
    //flexWrap: 'wrap',
    width: '100%',
    paddingLeft: Platform.OS == 'web' ? 0 : 12
  },
  rowF: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: '#ffffff',

    width: '100%',
    borderBottomEndRadius: 40,
    borderBottomWidth: 5,
    borderBottomColor: '#c4d63c',
    shadowColor: '#000000',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,

  },
  rowBT: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-end',
  },
  rowAC: {
    flexDirection: 'row',
    width: '100%',
    paddingRight: 6,
    paddingLeft: 6,
    position: 'relative',
    zIndex: 10
  },
  showfilter: {
    //flexDirection: 'column',
    //flexWrap: 'wrap',
    width: '93%',
    padding: 5,
    position: 'absolute',
    top: 60,
    zIndex: 0
  },
  nofilter: {
    height: 0,
  },
  inputselectStyle: {
    flex: 1,
    color: '#5a5959',
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#646363',
    height: 15,
    width: '100%',
    backgroundColor: 'transparent',
    padding: 0,
    marginBottom: 5,
  },
  inputStyle: {
    flex: 1,
    color: '#5a5959',
    padding: 10,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#646363',
    height: 35,
    width: '100%',
    backgroundColor: 'transparent',
    marginBottom: 5,
    fontSize: 11
  },
  inputStylePicker: {
    flex: 1,
    color: '#5a5959',
    paddingLeft: 10,

    borderWidth: 0,
    borderRadius: 30,
    borderColor: '#646363',
    height: 35,
    width: '100%',
    backgroundColor: 'transparent',
    marginBottom: 5,
    fontSize: 11
  },
  buttonStyle: {
    backgroundColor: '#c4d63c',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#c4d63c',
    // height: 40,
    alignItems: 'center',
    borderRadius: 30,
    flexDirection: 'row-reverse',
    // paddingTop:35,
    paddingTop: 8,
    paddingBottom: 10,
    paddingRight: 20,
    paddingLeft: 20,
    marginLeft: 10,
  },
  buttonTextStyle: {
    color: '#FFFFFF',

    fontSize: 11,
    justifyContent: 'flex-end',
  },
  dropselectStyle:
    { backgroundColor: 'white', width: '100%' },
  itemdropselectStyle:
    { borderBottomWidth: 1, borderBottomColor: '#efefef' }
});
export default FilterMembreForm;
