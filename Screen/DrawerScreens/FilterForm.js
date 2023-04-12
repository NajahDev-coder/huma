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

import { SelectList } from 'react-native-dropdown-select-list';
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
const windowWidth = Dimensions.get('window').width - 100;
const windowheight = Dimensions.get('window').height + 20;

/*const currentPlace = {
      description: 'Position',
      geometry: { location: { lat: null, lng: null } },
    };*/
const FilterForm = ({ OnFilter, OnIndex }) => {
  //const [categorie, setCategorie] = useState(0);
  //const [type, setType] = useState(0);
  const [localisation, setLocalisation] = useState('');
  const [etat, setEtat] = useState(0);
  const [txtError, setTxtError] = useState('');

  const [currAdresse, setCurrAdresse] = useState('');
  const [currentPosition, setCurrentPosition] = useState(null);
  const [titreF, setTitreF] = useState('');
  const [TypeList, setTypeList] = useState([]);
  const [CategroiesList, setCategroiesList] = useState([]);
  const [SSCategroiesList, setSSCategroiesList] = useState([]);
  const [SousSSCategroiesList, setSousSSCategroiesList] = useState([]);
  const [SousSSCatEgorie, setSousSSCatEgorie] = useState(0);
  const [SSCatEgorie, setSSCatEgorie] = useState(0);
  const [CatEgorie, setCatEgorie] = useState(0);
  const [Type, setType] = useState('');
  const [CountUpdtCAt, setCountUpdtCAt] = useState(0);
  const [Enable, setEnable] = useState(0);
  const [fadeAnimation] = useState(new Animated.Value(0));
  const [RefreshKey, setRefreshKey] = useState(0);
  const [icoFilter, setIcoFilter] = useState("filter-variant-plus");
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [windowHeight, setWindowHeight] = useState(70)
  const minDate = new Date(1999, 12, 30); // Today
  const maxDate = new Date(20950, 12, 30);


  const image = {
    uri: `${Base_url}images/bg_screen.png`,
  };
  const onDateChange = async (date, type) => {
    const dateselec = moment(date).format('YYYY-MM-DD');
    if (type === 'END_DATE') {
      setSelectedEndDate(dateselec);

      setShowCalendar(false);

      setWindowHeight(400)
    } else {
      setStartDate(date);
      setSelectedStartDate(dateselec);
      setSelectedEndDate(null);
    }
    //await (() => {

    // });
  };
  //get list type
  const fetchType = async () => {
    const fetchUrl = `types`;
    const responseJson = await RequestOptionsGet(fetchUrl);
    let newArray = [];
    responseJson.map((item) => { newArray.push({ key: item.id, value: item.type }) })
    setTypeList(newArray);
  };
  //get list categorie
  const fetchCategorie = async () => {
    const fetchUrl = `categories`;
    const responseJson = await RequestOptionsGet(fetchUrl);
    let newArray = [];
    responseJson.map((item) => { newArray.push({ key: item.id, value: item.titre }) })
    setCategroiesList(newArray);
  };
  //get list sous categorie
  const fetchSSCategorie = async (CategId) => {
    // const baseUrl = url + 'api/api/categories/';
    setCountUpdtCAt((oldValue) => oldValue + 1)
    setSSCategroiesList('');
    setSousSSCategroiesList('');

    const fetchUrl = `categories/${CategId}`;
    const responseJson = await RequestOptionsGet(fetchUrl);
    let newArray = [];
    responseJson.data.map((item) => { newArray.push({ key: item.id, value: item.titre }) })
    setSSCategroiesList(newArray);

  };
  //get list sous sous categorie
  const fetchSousSSCategorie = async (CategId) => {
    // const baseUrl = url + 'api/api/categories/';

    setSousSSCategroiesList('');

    const fetchUrl = `categories/${CategId}`;

    const responseJson = await RequestOptionsGet(fetchUrl);
    let newArray = [];
    responseJson.data.map((item) => { newArray.push({ key: item.id, value: item.titre }) })
    setSousSSCategroiesList(newArray);

  };
  //let Adfilter;
  const getCoordinates = async () => {
   /* const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setTxtError('Veuillez activer votre poisition!');
      return;
    }*/ 
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
    await AsyncStorage.removeItem('add_filter');
    const categ =
      SousSSCatEgorie != 0
        ? SousSSCatEgorie
        : SSCatEgorie != 0
          ? SSCatEgorie
          : CatEgorie != 0 ? CatEgorie : '';

    const AnncType = Type != 0 ? Type : '';

    const dateStart = selectedStartDate != null ? selectedStartDate : ''
    const dateEnd = selectedEndDate != null ? selectedEndDate : ''
    console.log('categ', categ)
    let filter = {
      adresse: currAdresse,
      titre: titreF,
      type: AnncType,
      categorie: categ,
      dateStart: dateStart,
      dateEnd: dateEnd,
    };
    console.log('filter...', filter)
    await AsyncStorage.setItem('add_filter', JSON.stringify(filter));

    setRefreshKey((oldKey) => oldKey + 1);
    //console.log('refraichissement....');
    ShowAllFilter(Enable);
    OnFilter();
  };
  const DeleteFilter = async () => {
    let filter = {
      adresse: '',
      titre: '',
      type: '',
      categorie: '',
      dateStart: '',
      dateEnd: '',
    };
    setSelectedStartDate('')
    setSelectedEndDate('')
    setSelectedDate('')
    AsyncStorage.setItem('add_filter', JSON.stringify(filter));
    //console.log('refraichissement....');

    OnFilter();
    setRefreshKey((oldKey) => oldKey + 1);
  };
  const ShowAllFilter = (stat) => {
    setEnable(!stat)
    if (stat == 0) {
      setWindowHeight(400)
      setIcoFilter("filter-variant-minus");
      OnIndex(20);
    }
    else {
      setWindowHeight(70)
      setIcoFilter("filter-variant-plus");
      setShowCalendar(false)
      OnIndex(1);
    }

  };

  useEffect(() => {
    let isSubscribed = true;

    if (isSubscribed) {
      getCoordinates();
      fetchType();
      fetchCategorie();
      if (selectedStartDate != null) setSelectedDate(selectedStartDate);
      //setSelectedDate(selectedStartDate.toString().substring(4, 10));
      if (selectedStartDate != null && selectedEndDate != null)
        setSelectedDate(selectedStartDate + ' / ' + selectedEndDate);
    }
    return () => (isSubscribed = false);
    //}, [RefreshKey, selectedStartDate, selectedEndDate, selectedDate]);
  }, [RefreshKey, windowHeight, Enable]);

  const onPressCalendar = () => {
    setSelectedStartDate(null);
    setSelectedEndDate(null);
    setSelectedDate('');
    setShowCalendar((oldValue) => !oldValue);
    //alert(showCalendar)
    if (!showCalendar) {
      setWindowHeight(windowheight - 170)
    }
    else
      setWindowHeight(400)
  };

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
            //AddFilter();
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
              value={titreF}
              style={styles.inputStyle}
              onChangeText={(titre) => {
                setTitreF(titre);
                //AddFilter();
              }}
              underlineColorAndroid="#f000"
              placeholder="Rechercher  "
              placeholderTextColor="#5a5959"
              autoCapitalize="sentences"
            />
          </View>
          <TouchableOpacity
            style={[styles.row, { position: 'relative' }]}
            onPress={onPressCalendar}>
            <TextInput
              value={selectedDate}
              style={styles.inputStyle}
              editable={false}
              underlineColorAndroid="#f000"
              placeholder="Choisir une Date  "
              placeholderTextColor="#5a5959"
              autoCapitalize="sentences"
            />

            <FontAwesome
              name="calendar"
              size={24}
              color="black"
              onPress={onPressCalendar}
              style={{ position: 'absolute', top: 5, right: 10 }}
            />
          </TouchableOpacity>
          {showCalendar && (
            <View style={styles.row}>
              <CalendarPicker
                startFromMonday={true}
                allowRangeSelection={true}
                minDate={minDate}
                maxDate={maxDate}
                todayBackgroundColor="#c4d63c"
                selectedDayColor="#c4d63c"
                selectedDayTextColor="#FFFFFF"
                onDateChange={onDateChange}
                width={windowWidth}
                initialDate={startDate}
              />
            </View>
          )}

          <View style={styles.row}>

            <SelectList
              setSelected={(val) => {
                setType(val);
                //AddFilter();  
              }}
              data={TypeList}
              boxStyles={{ borderRadius: 30, padding: 8, marginBottom: 5 }}
              inputStyles={{ fontSize: 12, color: '#5a5959' }}
              dropdownStyles={styles.dropselectStyle}
              dropdownItemStyles={styles.itemdropselectStyle}
              defaultOption={{ key: 0, value: 'Type' }}

            />
          </View>


          <View style={styles.row}>

            <SelectList
              setSelected={(val) => { setCatEgorie(val); setSSCatEgorie(val); setSousSSCatEgorie(val); fetchSSCategorie(val); }}
              data={CategroiesList}
              boxStyles={{ borderRadius: 30, padding: 8, marginBottom: 5 }}
              inputStyles={{ fontSize: 12, color: '#5a5959' }}
              dropdownStyles={styles.dropselectStyle}
              dropdownItemStyles={styles.itemdropselectStyle}
              defaultOption={{ key: 0, value: 'Catégories' }}

            />
          </View>



          {SSCategroiesList.length > 0 && (
            <View style={styles.row}>

              <SelectList
                setSelected={(val) => {
                  setSSCatEgorie(val);
                  fetchSousSSCategorie(val);
                  //AddFilter();
                }}
                data={SSCategroiesList}
                boxStyles={{ borderRadius: 30, padding: 8, marginBottom: 5 }}
                inputStyles={{ fontSize: 12, color: '#5a5959' }}
                dropdownStyles={styles.dropselectStyle}
                dropdownItemStyles={styles.itemdropselectStyle}
                defaultOption={{ key: 0, value: 'Sous Catégories' }}
              />
            </View>
          )}
          {SousSSCategroiesList.length > 0 && (
            <View style={styles.row}>

              <SelectList
                setSelected={(val) => {
                  setSousSSCatEgorie(val);
                  // AddFilter();
                }}
                data={SousSSCategroiesList}
                boxStyles={{ borderRadius: 30, padding: 8, marginBottom: 5 }}
                inputStyles={{ fontSize: 12, color: '#5a5959' }}
                dropdownStyles={styles.dropselectStyle}
                dropdownItemStyles={styles.itemdropselectStyle}
                defaultOption={{ key: 0, value: 'Sous Sous Catégories' }}
              />
            </View>
          )}
          <View style={styles.rowBT}>
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={() => DeleteFilter()}>
              <Text style={styles.buttonTextStyle}>Réinitialiser</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={() => AddFilter()}>
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
  rowinputStyle: {
    flex: 1,
    color: '#5a5959',
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#646363',
    height: 35,
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
    { backgroundColor: 'white', position: 'absolute', top: 37, width: '100%', zIndex: 100 },
  itemdropselectStyle:
    { borderBottomWidth: 1, borderBottomColor: '#efefef' }
});
export default FilterForm;
