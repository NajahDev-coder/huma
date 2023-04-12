import React, { useState, createRef, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DatePicker from 'react-native-datepicker';
import * as ImagePicker from 'expo-image-picker';

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

import FileUpload from './Components/FileUpload';
import Loader from './Components/Loader';
//import ImagePicker, { ImageOrVideo } from 'react-native-image-crop-picker';
import Modal from 'react-native-modal';
//import { CameraIcon, ImageIcon } from './icons';
//import UploadImageScreen from './Components/UploadImageScreen';
import CameraImage, { IdAnnonceImage } from './Components/CameraImageScreen';

//import { API_URL, GOOGLE_PLACES_API_KEY } from '@env';



export default function EditAnnonceScreen({ navigation, route }) {
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

  const API_URL = 'https://huma.bzh/'
  const GOOGLE_PLACES_API_KEY = 'AIzaSyAVWheD_CJmbOlCCKBTRKRRkeFJy_Mxzbg'

  async function CreateAnnonce(credentials) {
    return fetch(`${API_URL}api/api/annonce/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body: credentials,
    }).then((data) => data.json());
  }
  const SaveImage = async (Photo, id_annonce, num) => {
    //alert(UserID);
    await fetch(`${API_URL}api/api/upload`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      // send our base64 string as POST request
      body: JSON.stringify({
        imgsource: Photo.base64,
        annonce_id: id_annonce,
        user_id: UserID,
        num: num
      }),
    }).then((response) => response.json()).then((responseJson) => {
      //console.log('saveImage',responseJson);
      //console.log('saveImage id',id_annonce);
    });
  };

  useEffect(() => {
    (async () => {
      const user_id = await AsyncStorage.getItem('user_id');

      setUserID(user_id);
    })();
  }, [isCreationSuccess]);

  const handleSubmitButton = async (e) => {
    e.preventDefault();

    const type = await AsyncStorage.getItem('type_id');
    const categorie = await AsyncStorage.getItem('categ_id');
    const auteur = await AsyncStorage.getItem('user_email');
    // const user_id = await AsyncStorage.getItem('user_id');

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

    //const replaceHTML = description.replace(/<(.|\n)*?>/g, '').trim();
    //const descriptionHTML = replaceHTML.replace(/&nbsp;/g, '').trim();
    //Show Loader
    setLoading(true);
    var dataToSend = {
      user_id: UserID,
      titre: titre,
      court_description: court_description,
      description: description,
      auteur: auteur,
      adresse: adresse,
      codePostal: codePostal,
      type: type,
      categorie: categorie,
    };
    var formBody = [];
    for (var key in dataToSend) {
      var encodedKey = encodeURIComponent(key);
      var encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');

    const responseJson = await CreateAnnonce(formBody);

    //Hide Loader
    setLoading(false);

    if (responseJson.status) {
      //console.log('Photo', responseJson);
      if (Photo != '') SaveImage(Photo, responseJson.data.insertId, 1);
      if (Photo2 != '') SaveImage(Photo2, responseJson.data.insertId, 2);
      if (Photo3 != '') SaveImage(Photo3, responseJson.data.insertId, 3);
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
      <View
        style={{
          flex: 1,
          //justifyContent: 'center',
        }}>
        <ImageBackground
          source={{ uri: `${API_URL}images/bg_screen.png` }}
          resizeMode="cover"
          style={styles.image}>
          <Image
            source={{ uri: `${API_URL}images/success.png` }}
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
        </ImageBackground>
      </View>
    );
    //setIsCreationSuccess(false);
  }

  return (
    <View style={styles.mainBody}>
      <ImageBackground
        source={{ uri: `${API_URL}images/bg_screen.png` }}
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
                setcaptureImage={setPhoto}
                style={{ height: 150, width: '100%' }}
              />
            </View>
            {Photo ? (
              <View style={styles.section2Img}>
                <View style={styles.sectionStyleImg2}>
                  <CameraImage setcaptureImage={setPhoto2} />
                </View>
                <View style={styles.sectionStyleImg2}>
                  <CameraImage setcaptureImage={setPhoto3} />
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
                onChangeText={(link_vedio) => setLinkVedio(LinkVedio)}
                underlineColorAndroid="#f000"
                placeholder="Entrez le Lien vidéo  "
                placeholderTextColor="#222222"
                autoCapitalize="sentences"

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
                onPress={(data, details = null) => setAdresse(data.description)}
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
    //flex: 1,
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
