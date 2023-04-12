import React, { useState, createRef, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DatePicker from 'react-native-datepicker';
import * as ImagePicker from 'expo-image-picker';

import { WebView } from "react-native-webview";
import PlacesInput from 'react-native-places-input';

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
//import Constants from 'expo-constants';

import {
  FontAwesome,
  FontAwesome5,
  AntDesign,
  MaterialIcons,
} from '@expo/vector-icons';
import * as Location from 'expo-location';
import {
  ImageBackground,
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  ScrollView,
  Button,
  Platform,
  SafeAreaView,
  TouchableHighlight,
} from 'react-native';
import {
  actions,
  RichEditor,
  RichToolbar,
} from 'react-native-pell-rich-editor';

import { Base_url, SaveImage, RequestOptionsPost, GOOGLE_PLACES_API_KEY, Add_historique } from './utils/utils';
import FileUpload from './Components/FileUpload';
import Loader from './Components/Loader';
//import ImagePicker, { ImageOrVideo } from 'react-native-image-crop-picker';
import Modal from 'react-native-modal';
//import { CameraIcon, ImageIcon } from './icons';
//import UploadImageScreen from './Components/UploadImageScreen';
import CameraImage, { IdAnnonceImage } from './Components/CameraImageScreen';




export default function CreateAnnonceScreen(props) {
  //const auteur = 1;
  const [titre, setTitre] = useState('');
  const [court_description, setCourtDescription] = useState('');
  const [description, setDescription] = useState('');
  const [adresse, setAdresse] = useState('');
  const [codePostal, setCodePostal] = useState('');

  //const Dateauj = new Date().getDate();
  /*const [type, setType] = useState('');
  const [categorie, setCategorie] = useState('');*/

  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const [isCreationSuccess, setIsCreationSuccess] = useState(false);
  const [show, setShow] = useState(true);
  const [Photo, setPhoto] = useState('');
  const [Photo2, setPhoto2] = useState('');
  const [Photo3, setPhoto3] = useState('');
  const [LinkVedio, setLinkVedio] = useState('');
  const [UserID, setUserID] = useState(null);
  const titreInputRef = createRef();
  const link_vedioRef = createRef();
  const court_descriptionInputRef = createRef();
  const descriptionInputRef = createRef();
  const adresseInputRef = createRef();




  useEffect(() => {

  }, [isCreationSuccess])


  const handleSubmitButton = async (e) => {
    e.preventDefault();

    const type = await AsyncStorage.getItem('type_id');
    const categorie = await AsyncStorage.getItem('categ_id');
    const auteur = await AsyncStorage.getItem('user_email');
    // const user_id = await AsyncStorage.getItem('user_id');
    const defaultCoordinates= await Location.geocodeAsync(adresse); 
    const latitude=defaultCoordinates[0].latitude;
    const longitude=defaultCoordinates[0].longitude;

    setErrortext('');
    if (!titre) {
      alert('Veuillez remplir le titre de votre annonce');
      return;
    }
    if (!court_description && !description) {
      alert(
        'Veuillez remplir la courte description et/ou la description de votre annonce'
      );
      return;
    }
    //if (!adresse && !Ville && !codePostal) {  
    if (!adresse) {
      alert("Veuillez remplir l'adresse complète");
      return;
    }
    
    //Show Loader
    setLoading(true);
    var dataToSend1 = {
      user_id: global.User_connecte,
      titre: titre,
      linkVedio:LinkVedio,
      court_description: court_description,
      description: description,
      auteur: auteur,
      adresse: adresse,
      latitude: latitude,
      longitude:longitude,
      type: type,
      categorie: categorie,
    };
    //console.log('dataToSend', dataToSend)
    const fetchUrl = `annonce/create`;
    const responseJson = await RequestOptionsPost(dataToSend1, fetchUrl);

    //console.log('responseJson create annonce:', responseJson)

    //Hide Loader
    setLoading(false);
    //var dataToSend;
    //if (responseJson.status) {
    if (responseJson.status === 'success') {
      //console.log('Photo:::', Photo);
      const activite = "Vous avez ajouter une nouvelle annonce!"
      Add_historique(global.User_connecte, activite);

      if (Photo) {
        var dataToSendPhoto = {
          imgsource: Photo.assets[0].base64,
          annonce_id: responseJson.data.insertId,
          user_id: global.User_connecte,
          num: 1
        }
        SaveImage(dataToSendPhoto);
      }
      if (Photo2) {
        var dataToSendPhoto2 = {
          imgsource: Photo2.assets[0].base64,
          annonce_id: responseJson.data.insertId,
          user_id: global.User_connecte,
          num: 2
        }
        SaveImage(dataToSendPhoto2);
      }
      if (Photo3) {
        var dataToSendPhoto3 = {
          imgsource: Photo3.assets[0].base64,
          annonce_id: responseJson.data.insertId,
          user_id: global.User_connecte,
          num: 3
        }
        SaveImage(dataToSendPhoto3);
      }
      // CameraImage.IdAnnonceImage(capturedImage,responseJson.ID)
      setIsCreationSuccess(true);
      setTimeout(function () {
        setIsCreationSuccess(false);
      }, 2000);
      //console.log('Création annonce réussi!');
      //console.log(responseJson.status)
    } else {
      setErrortext('Création annonce échouée!');
    }
  };

  if (isCreationSuccess) {
    return (
      <View style={styles.mainBody}>
        <ImageBackground
          source={{ uri: Base_url + 'images/bg_screen.png' }}
          resizeMode="cover"
          style={styles.image}>
          <Loader loading={loading} />
          <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{
              alignContent: 'center',
            }}>

            <View>
              <KeyboardAvoidingView enabled>
                <View style={{ alignItems: 'center', margin: 20 }}>
                  <Image
                    source={{ uri: `${Base_url}images/success.png` }}
                    style={{
                      height: 150,
                      resizeMode: 'contain',
                      alignSelf: 'center',
                    }}
                  />
                  <Text style={styles.successTextStyle}>
                    Annonce crée avec success!
                  </Text>
                  <TouchableOpacity
                    style={styles.buttonStyle}
                    activeOpacity={0.5}
                    onPress={() => props.navigation.navigate('Annonces')}>
                    <Text style={styles.buttonTextStyle}>Liste Annonces</Text>
                  </TouchableOpacity>
                </View>
              </KeyboardAvoidingView>
            </View>
          </ScrollView>
        </ImageBackground>
      </View>
    );
    //setIsCreationSuccess(false);
  }

  return (
    <View style={styles.mainBody}>
      <ImageBackground
        source={{ uri: `${Base_url}images/bg_screen.png` }}
        resizeMode="cover"
        style={styles.image}>
        <Loader loading={loading} />
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            //flex: 1,
            justifyContent: 'center',
            alignContent: 'center',
          }}>
          <KeyboardAvoidingView enabled>
            <View style={styles.sectionStyleImg}>

              <CameraImage
                captureImage={setPhoto}
                //style={{ height: 150, width: '100%' }}
                PStyle={{ width: '100%', height: 150 }}
                isinvisible={true}
              />
            </View>
            {Photo ? (
              <View style={styles.section2Img}>
                <View style={styles.sectionStyleImg2}>
                  <CameraImage
                    captureImage={setPhoto2}
                    PStyle={{ width: 80, height: 80 }}
                    isinvisible={true}
                  />
                </View>
                <View style={styles.sectionStyleImg2}>
                  <CameraImage
                    captureImage={setPhoto3}
                    PStyle={{ width: 80, height: 80 }}
                    isinvisible={true}

                  />
                </View>
              </View>
            ) : (
              <></>
            )}
            <View style={styles.sectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(titre) => setTitre(titre)}
                underlineColorAndroid="#f000"
                placeholder="Entrez Le Titre  "
                placeholderTextColor="#222222"
                autoCapitalize="sentences"

              />
            </View>
            <View style={styles.sectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(LinkVedio) => setLinkVedio(LinkVedio)}
                underlineColorAndroid="#f000"
                placeholder="Entrez le Lien vidéo sans http(s):// "
                placeholderTextColor="#222222"
                autoCapitalize="sentences"
                multiline={true}
              />
            </View>
            <View style={styles.sectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(court_description) =>
                  setCourtDescription(court_description)
                }
                underlineColorAndroid="#f000"
                placeholder="Entrez votre courte description"
                placeholderTextColor="#222222"
                keyboardType="email-address"

              />
            </View>


            <View style={styles.richTextContainer}>

              <RichEditor
                ref={descriptionInputRef}
                onChange={(description) => setDescription(description)}
                placeholder="Entrez votre description"
                androidHardwareAccelerationDisabled={true}
                style={styles.richTextEditorStyle}
                initialHeight={250}

              />
              <RichToolbar
                editor={descriptionInputRef}
                selectedIconTint="#873c1e"
                iconTint="#312921"
                actions={[
                  actions.insertImage,
                  actions.setBold,
                  actions.setItalic,
                  actions.insertBulletsList,
                  actions.insertOrderedList,
                  actions.insertLink,
                  actions.setStrikethrough,
                  actions.setUnderline,
                ]}
                style={styles.richTextToolbarStyle}
              />
            </View>

            <View style={styles.sectionStyle2}>
              <GooglePlacesAutocomplete
                placeholder="Entrez la localisation  "
                query={{
                  key: GOOGLE_PLACES_API_KEY,
                  language: 'fr', // language of the results
                }}
                onPress={(data, details = null) => {console.log(details);setAdresse(data.description)}} 
                onFail={(error) => console.error(error)}
                requestUrl={{
                  url: 'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api',
                  useOnPlatform: 'web',
                }}
                styles={{
                  textInputContainer: {
                    backgroundColor: 'transparent',
                  },
                  textInput: {
                    color: '#5a5959',
                    paddingLeft: 15,
                    paddingRight: 15,
                    borderWidth: 1,
                    borderRadius: 30,
                    borderColor: '#646363',
                    backgroundColor: 'transparent',
                  },
                  predefinedPlacesDescription: {
                    color: '#1faadb',
                  },
                }}
                ref={adresseInputRef}
              />
            </View>
            <Text style={styles.errorTextStyle}>{errortext}</Text>

            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={handleSubmitButton}>
              <Text style={styles.buttonTextStyle}>Valider</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </ScrollView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    //paddingTop: Constants.statusBarHeight + 10,
  },

  sectionStyleImg: {
    flexDirection: 'row',
    height: 150,
    maxHeight: 150,
    width: '85%',
    marginTop: 20,
    marginLeft: 25,
    marginRight: 25,
    margin: 10,
  },
  section2Img: {
    flexDirection: 'row',
    height: 80,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 25,
    marginRight: 25,
  },
  sectionStyleImg2: {
    flexDirection: 'row',
    height: 80,
    width: 80,
    marginLeft: 5,
    marginRight: 5,
  },
  sectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 25,
    marginRight: 25,
    margin: 10,
  },
  sectionStyle2: {
    flex: 1,
    // height: 350,
    marginTop: 20,
    marginLeft: 25,
    marginRight: 25,
    margin: 10,
  },
  image: {
    //flex: 1,
    justifyContent: 'center',
  },

  buttonStyle: {
    backgroundColor: '#c4d63c',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#c4d63c',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 25,
    marginRight: 25,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    padding: 10,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: '#5a5959',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#646363',
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  successTextStyle: {
    color: '#c4d63c',
    textAlign: 'center',
    fontSize: 18,
    padding: 30,
  },
  richTextContainer: {
    display: 'flex',
    flexDirection: 'column-reverse',
    width: '85%',
    marginLeft: 25,
    margin: 10,
  },

  richTextEditorStyle: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderWidth: 1,
    borderColor: '#646363',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    fontSize: 20,
    backgroundColor: 'transparent',
  },

  richTextToolbarStyle: {
    backgroundColor: 'transparent',
    borderColor: '#646363',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderWidth: 1,
    // width:'95%'
  },
});
