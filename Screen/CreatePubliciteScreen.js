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
import { Dimensions } from 'react-native';
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

import { Base_url, SaveImage, RequestOptionsPost, GOOGLE_PLACES_API_KEY } from './utils/utils';
import FileUpload from './Components/FileUpload';
import Loader from './Components/Loader';
//import ImagePicker, { ImageOrVideo } from 'react-native-image-crop-picker';
import Modal from 'react-native-modal';
//import { CameraIcon, ImageIcon } from './icons';
//import UploadImageScreen from './Components/UploadImageScreen';
import CameraImage, { IdAnnonceImage } from './Components/CameraImageScreen';




export default function CreatePubliciteScreen(props) {
  //const auteur = 1;
  const [titre, setTitre] = useState('');


  //const Dateauj = new Date().getDate();
  /*const [type, setType] = useState('');
  const [categorie, setCategorie] = useState('');*/

  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const [isCreationSuccess, setIsCreationSuccess] = useState(false);
  const [show, setShow] = useState(true);
  const [Photo, setPhoto] = useState('');

  const [LinkPublicite, setLinkPublicite] = useState('');
  const [UserID, setUserID] = useState(null);
  const titreInputRef = createRef();
  const link_vedioRef = createRef();





  useEffect(() => {

  }, [isCreationSuccess])


  const handleSubmitButton = async (e) => {
    e.preventDefault();


    const auteur = await AsyncStorage.getItem('user_email');
    // const user_id = await AsyncStorage.getItem('user_id');

    setErrortext('');
    if (!titre) {
      alert('Veuillez remplir le titre de votre publicite');
      return;
    }

    if (!LinkPublicite) {
      alert('Veuillez remplir le lien de votre publicite');
      return;
    }

    if (!Photo) {
      alert('Veuillez remplir la photo de votre publicite');
      return;
    }

    //Show Loader
    setLoading(true);
    var dataToSend1 = {
      id_user: global.User_connecte,
      titre: titre,
      lien: LinkPublicite,
    };

    const fetchUrl = `publicite/create`;
    const responseJson = await RequestOptionsPost(dataToSend1, fetchUrl);

    //console.log('responseJson create publicite:', responseJson)

    //Hide Loader
    setLoading(false);
    var dataToSend;
    if (responseJson.status) {
      //console.log('Photo', responseJson);
      if (Photo != '') {
        dataToSend = {
          imgsource: Photo.assets[0].base64,
          pub_id: responseJson.data.insertId,
          user_id: global.User_connecte,
          num: 1
        }
        SaveImage(dataToSend);
      }

      // CameraImage.IdAnnonceImage(capturedImage,responseJson.ID)
      setIsCreationSuccess(true);
      setTimeout(function () {
        setIsCreationSuccess(false);
      }, 2000);
      //console.log('Création annonce réussi!');
      //console.log(responseJson.status)
    } else {
      setErrortext('Création publicite échouée!');
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
          source={{ uri: `${Base_url}images/bg_screen.png` }}
          resizeMode="cover"
          style={styles.image}>
          <Image
            source={{ uri: `${Base_url}images/success.png` }}
            style={{
              height: 150,
              resizeMode: 'contain',
              alignSelf: 'center',
            }}
          />
          <Text style={styles.successTextStyle}>
            Publicité crée avec success!
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
                PStyle={{ width: '100%', height: 150 }}
                isinvisible={true}
              />
            </View>

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
                onChangeText={(val) => setLinkPublicite(val)}
                underlineColorAndroid="#f000"
                placeholder="Entrez le Lien sans http(s):// "
                placeholderTextColor="#222222"
                autoCapitalize="sentences"
                multiline={true}
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

  sectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 25,
    marginRight: 25,
    margin: 10,
  },

  image: {
    //flex: 1,
    justifyContent: 'center',
    minHeight: Dimensions.get('window').height
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
});
