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

  SafeAreaView,
  TouchableHighlight,
  Switch
} from 'react-native';
import {
  actions,
  RichEditor,
  RichToolbar,
} from 'react-native-pell-rich-editor';
import { GooglePlacesApiKey } from "./utils/env"
import { Base_url, SaveImage, RequestOptionsPost } from './utils/utils';
import FileUpload from './Components/FileUpload';
import Loader from './Components/Loader';
//import ImagePicker, { ImageOrVideo } from 'react-native-image-crop-picker';
import Modal from 'react-native-modal';
import ModalAlert from './ModalAlert';
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

  const [show, setShow] = useState(true);
  const [Photo, setPhoto] = useState('');

  const [isAlert, setIsAlert] = useState(false);

  const [IsRedirect, setIsRedirect] = useState(false);
  const [MsgAlerte, setMsgAlert] = useState('');
  const [LinkPublicite, setLinkPublicite] = useState('');
  const [UserID, setUserID] = useState(null);
  const titreInputRef = createRef();
  const link_vedioRef = createRef();





  useEffect(() => {

  }, [])


  const handleSubmitButton = async () => {


    setIsAlert(false)
    const auteur = await AsyncStorage.getItem('user_email');
    // const user_id = await AsyncStorage.getItem('user_id');


    if (!titre) {
      const msg = "Veuillez remplir le titre de votre publicite";
      setMsgAlert(msg);
      setIsAlert(true);
      return;
    }

    else if (!LinkPublicite) {
      const msg = "Veuillez remplir le lien de votre publicite";
      setMsgAlert(msg);
      setIsAlert(true);
      return;
    }

    else if (!Photo) {
      const msg = "Veuillez ajouter une photo pour votre publicite";
      setMsgAlert(msg);
      setIsAlert(true);
      return;
    }
    else {
      setLoading(true);
      //Show Loader
      const lien = LinkPublicite.toString();

      const lient = lien.split('://');
      var lienPub;
      if (typeof lient[1] != 'undefined') {
        lienPub = lient[1];
      }
      else {
        lienPub = lien;
      }

      var dataToSend1 = {
        id_user: global.User_connecte,
        titre: titre,
        lien: lienPub
      };
      const fetchUrl = `publicite/create`;
      const responseJson = await RequestOptionsPost(dataToSend1, fetchUrl);

      //Hide Loader

      var dataToSend;
      var msg = '';
      if (responseJson.status) {
        const idPub = responseJson.data.insertId;

        console.log('idPub:', idPub)
        if (Photo != '') {
          // console.log('photo::::', Photo.base64)
          var urlPhoto;
          if (typeof Photo.assets != 'undefined')
            urlPhoto = Photo.assets[0].base64;
          else
            urlPhoto = Photo.base64;

          dataToSend = {
            imgsource: urlPhoto,
            pub_id: idPub,
            user_id: global.User_connecte,
            num: 1
          }

          const fetchUrl = 'upload';
          const response = await RequestOptionsPost(dataToSend, fetchUrl);
          if (typeof response == 'undefined' || response.status != 'success') {

            setLoading(false);
            msg = +"Upload Photo  échouée !";
            setMsgAlert(msg);
            //return;
          }
        }
        // CameraImage.IdAnnonceImage(capturedImage,responseJson.ID)

        const activite = "Vous avez ajouté une nouvelle publicité!"
        Add_historique(global.User_connecte, activite, idPub);
        setLoading(false);
        msg += "Publicité crée avec success!";
        setMsgAlert(msg);
        setIsAlert(true);
        setIsRedirect(true);

      } else {

        const msg = "Création publicité échouée!!";
        setMsgAlert(msg);
        setIsAlert(true);
      }
    }
  };



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
                // underlineColorAndroid="#f000"
                placeholder="Titre  "
                placeholderTextColor="#6cc5d5"
                autoCapitalize="sentences"

              />
            </View>
            <View style={styles.sectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(val) => setLinkPublicite(val)}
                // underlineColorAndroid="#f000"
                placeholder="Lien "
                placeholderTextColor="#6cc5d5"
                autoCapitalize="sentences"
                multiline={true}
              />
            </View>





            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={handleSubmitButton}>
              <Text style={styles.buttonTextStyle}>Valider</Text>
            </TouchableOpacity>

            {isAlert && (
              <ModalAlert msgAlerte={MsgAlerte} action={() => (IsRedirect ? props.navigation.navigate('MesPublicites') : null)} />
            )}

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
    marginHorizontal: 20,
    marginVertical: 5
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
    color: '#6cc5d5',
    backgroundColor: '#e7f9fc',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#D6ECF0',
  },


});
