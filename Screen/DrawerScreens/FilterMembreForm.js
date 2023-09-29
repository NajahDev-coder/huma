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
import { GooglePlacesApiKey } from "../utils/env";
import { Base_url, RequestOptionsGet, RequestOptionsPut, RequestOptionsPost } from '../utils/utils';
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

const FilterMembreForm = ({ OnFilter, OnIndex }) => {

  const [Type, setType] = useState('');
  const [localisation, setLocalisation] = useState('');
  const [etat, setEtat] = useState(0);
  const [txtError, setTxtError] = useState('');

  const [currAdresse, setCurrAdresse] = useState('');
  const [titreF, setTitreF] = useState('');

  const [icoFilter, setIcoFilter] = useState("filter-variant-plus");
  const [CountUpdtCAt, setCountUpdtCAt] = useState(0);
  const [Enable, setEnable] = useState(0);
  const [fadeAnimation] = useState(new Animated.Value(0));
  const [RefreshKey, setRefreshKey] = useState(0);


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

    setEnable(!stat);
    if (stat == 0) {
      setIcoFilter("filter-variant-minus");
      OnIndex(20);
    }
    else {
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
      // getCoordinates();

    }
    return () => (isSubscribed = false);
  }, [RefreshKey, Enable]);



  //render() {
  return (


    <View style={styles.rowF}>

      <View style={styles.rowAC}>
        <GooglePlacesAutocomplete
          placeholder="Localisation "
          query={{
            key: GooglePlacesApiKey,
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
              marginLeft: 5,
              fontSize: 11
            },
            predefinedPlacesDescription: {
              color: '#1faadb',
            },
          }}
        //predefinedPlaces={[currentPlace]}
        />
        <MaterialCommunityIcons
          name={icoFilter}
          size={35}
          color="black"
          onPress={() => ShowAllFilter(Enable)}
        />
      </View>

      {Enable == true && (

        <View>
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
              dropdownShown={false}
              setSelected={(val) => { setType(val); }}
              onSelect={() => { AddFilter(); }}
              data={TypeList}
              boxStyles={{ borderRadius: 30, padding: 5, marginBottom: -10 }}
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

    width: '98%',
    paddingLeft: Platform.OS == 'web' ? 0 : 10,
    marginVertical: 2
  },
  rowF: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
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
    marginTop: 20,
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
    width: '100%',
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
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#646363',
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
  dropselectStyle: { backgroundColor: 'transparent', borderWidth: 0, width: '100%' },
  itemdropselectStyle: { borderBottomWidth: 1, borderBottomColor: '#efefef' }
});
export default FilterMembreForm;
