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

  FlatList,
  Animated,
  Dimensions,
  Platform
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as Location from 'expo-location';

import { SelectList } from 'react-native-dropdown-select-list';
import { GooglePlacesApiKey } from "../utils/env";
import { Base_url, RequestOptionsGet, RequestOptionsPut, RequestOptionsPost } from '../utils/utils';
import moment from 'moment';
import { MaterialCommunityIcons, FontAwesome5, Entypo, MaterialIcons, FontAwesome } from '@expo/vector-icons';
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

const image = {
  uri: `${Base_url}images/bg_screen.png`,
};
const windowWidth = Dimensions.get('window').width - 50;
const FilterForm = ({ navigation }) => {
  //const [categorie, setCategorie] = useState(0);
  //const [type, setType] = useState(0);
  const [localisation, setLocalisation] = useState('');
  const [etat, setEtat] = useState(0);
  const [txtError, setTxtError] = useState('');

  const [currAdresse, setCurrAdresse] = useState('');
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
  const [Enable, setEnable] = useState(false);
  const [RefreshKey, setRefreshKey] = useState(0);
  const [icoFilter, setIcoFilter] = useState("filter-variant-plus");
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [showListType, setShowListType] = useState(0);
  const [showCalend, setShowCalend] = useState(0);
  const [showListCateg, setShowListCateg] = useState(0);
  const [showListSCateg, setShowListSCateg] = useState(0);
  const [showListSSCateg, setShowListSSCateg] = useState(0);

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

    } else {
      setStartDate(date);
      setSelectedStartDate(dateselec);
      setSelectedEndDate(null);
    }

  };
  //get list type
  const fetchType = async () => {
    const fetchUrl = `types`;
    const responseJson = await RequestOptionsGet(fetchUrl);
    let newArray = [];
    responseJson.map((item) => { newArray.push({ key: item.id, value: item.type }) })
    setTypeList(newArray);
  }

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
    //console.log('categ', categ)
    let filter = {
      adresse: currAdresse,
      titre: titreF,
      type: AnncType,
      categorie: categ,
      dateStart: dateStart,
      dateEnd: dateEnd,
    };
    //console.log('filter...', filter)
    await AsyncStorage.setItem('add_filter', JSON.stringify(filter));


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
  };

  const OnFilter = async () => {


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
  useEffect(() => {
    let isSubscribed = true;

    if (isSubscribed) {


      fetchType();
      fetchCategorie();
      if (selectedStartDate != null) setSelectedDate(selectedStartDate);
      //setSelectedDate(selectedStartDate.toString().substring(4, 10));
      if (selectedStartDate != null && selectedEndDate != null)
        setSelectedDate(selectedStartDate + ' / ' + selectedEndDate);
      setEnable(true)
    }
    return () => (isSubscribed = false);
    //}, [RefreshKey, selectedStartDate, selectedEndDate, selectedDate]);
  }, [RefreshKey, Enable]);
  //}, []);

  const onPressCalendar = () => {
    setSelectedStartDate(null);
    setSelectedEndDate(null);
    setSelectedDate('');
    setShowCalendar((oldValue) => !oldValue);
    //alert(showCalendar)

  };

  //render() {
  return (



    <View style={styles.mainBody}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            alignContent: 'center',
          }}
        ><>

            <View style={styles.rowTop}></View>

            <View style={styles.rowF}>
              {Enable == true && (
                <>
                  <View style={styles.rowAC}>
                    <View style={styles.row}>
                      <GooglePlacesAutocomplete
                        placeholder="Localisation "
                        query={{
                          key: GooglePlacesApiKey,
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
                            width: '65%',
                            //height: 35,
                            fontSize: 11
                          },
                          predefinedPlacesDescription: {
                            color: '#1faadb',
                          },
                        }}
                      />
                    </View>
                  </View>

                  <View style={styles.rowAC}>

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
                        style={{ position: 'absolute', top: 10, right: 15 }}
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
                          setType(val)
                        }}
                        data={TypeList}

                        boxStyles={{ borderRadius: 30, padding: 8, marginBottom: 5, zIndex: 1 }}
                        inputStyles={{ fontSize: 12, color: '#5a5959', }}
                        dropdownStyles={styles.dropselectStyle}
                        dropdownItemStyles={styles.itemdropselectStyle}
                        defaultOption={{ key: 0, value: 'Type' }}

                      />
                    </View>



                    <View style={styles.row}>

                      <SelectList
                        ////dropdownShown={false}
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
                          //dropdownShown={false}
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


                  </View>
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
                </>
              )}
            </View>
          </>
        </ScrollView>
      </ImageBackground>
    </View>


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
  row: {

    width: '96%',
    paddingLeft: Platform.OS == 'web' ? 0 : 12,
    marginVertical: 5,
    zIndex: 1
  },
  rowTop: {
    // flex: 1,
    flexDirection: 'column',
    paddingVertical: 10,
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
    //marginBottom: 20
  },
  rowF: {
    // flex: 1,
    flexDirection: 'column',
    paddingVertical: 20,
    paddingHorizontal: 10,
    //backgroundColor: '#ffffff',
    //backgroundColor: 'rgba(250, 250, 250 , 0.60)',
    minHeight: Dimensions.get('window').height - 120,
    width: '100%',
    borderBottomEndRadius: 40,
    borderBottomWidth: 5,
    borderBottomColor: '#c4d63c',
    shadowColor: '#000000',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    paddingBottom: 60
    //marginBottom: 20
  },
  rowBT: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-end',
    alignContent: 'flex-end', position: 'absolute',
    bottom: 10
  },
  rowAC: {
    flexDirection: 'row',
    flexWrap: "wrap",
    width: '100%',
    paddingRight: 6,
    paddingLeft: 3,
    position: 'relative',
    zIndex: 10
  },
  showfilter: {
    flexDirection: 'column',
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
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#646363',
    //height: 35,
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
    marginTop: 10
  },
  buttonTextStyle: {
    color: '#FFFFFF',

    fontSize: 11,
    justifyContent: 'flex-end',
  },
  dropselectStyle: { backgroundColor: 'transparent', borderWidth: 0, width: '100%', marginTop: -5 },
  itemdropselectStyle: { borderBottomWidth: 1, borderBottomColor: '#efefef', zIndex: 100 }
});
export default FilterForm;
