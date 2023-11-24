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
import { Base_url, SaveImage, RequestOptionsPost, RequestOptionsGet, Add_historique } from './utils/utils';
import FileUpload from './Components/FileUpload';
import Loader from './Components/Loader';
//import ImagePicker, { ImageOrVideo } from 'react-native-image-crop-picker';
import Modal from 'react-native-modal';
import ModalAlert from './ModalAlert';
//import { CameraIcon, ImageIcon } from './icons';
//import UploadImageScreen from './Components/UploadImageScreen';
import CameraImage, { IdAnnonceImage } from './Components/CameraImageScreen';


export default function EditPubliciteScreen({ navigation, route }) {
  const id_publicite = route.params?.id_publicite;
  const [Titre, setTitre] = useState('');
  const [loading, setLoading] = useState(false);

  const [show, setShow] = useState(true);
  const [Photo, setPhoto] = useState('');
  const [PhotoNew, setPhotoNew] = useState('');

  const [PreviewVisible, setPreviewVisible] = useState(false);
  const [isAlert, setIsAlert] = useState(false);
  const [IsRedirect, setIsRedirect] = useState(false);
  const [MsgAlerte, setMsgAlert] = useState('');
  const [LinkPublicite, setLinkPublicite] = useState('');
  const [UserID, setUserID] = useState(null);
  const titreInputRef = createRef();
  const link_vedioRef = createRef();

  const fetchData = async () => {

    const fetchUrl = `publicite/${id_publicite}`;

    const responseJson = await RequestOptionsGet(fetchUrl);

    if (responseJson.data.length > 0) {

      setTitre(responseJson.data[0].titre);
      setLinkPublicite(responseJson.data[0].lien)
      if (responseJson.data[0].image != '') {
        setPreviewVisible(true);
        const imgPub = responseJson.data[0].image;
        url_img = `${Base_url}images/${imgPub}`
        setPhoto(url_img)
      }
    }
    // setLoading(false);
  };

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      fetchData();
    }
    return () => { isMounted = false }
  }, [])


  const handleSubmitButton = async () => {

    setIsAlert(false);
    if (!Titre) {
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

    /* else if (!Photo && !PhotoNew) {
       const msg = "Veuillez ajouter une photo pour votre publicite";
       setMsgAlert(msg);
       setIsAlert(true);
       return;
     }*/
    else {

      if (PhotoNew) {
        let update = false;
        if (Photo) update = true;
        let Imgsource;
        if (typeof PhotoNew.assets != 'undefined')
          Imgsource = PhotoNew.assets[0].base64;
        else
          Imgsource = PhotoNew.base64;

        let dataToSendPhoto = {
          pub_id: id_publicite,
          user_id: global.User_connecte,
          num: 1,
          update: update,
          imgsource: Imgsource,

        }
        const fetchUrlPhoto = 'upload';
        //console.log('response update publi::', dataToSendPhoto)
        const response = await RequestOptionsPost(dataToSendPhoto, fetchUrlPhoto);

        if (typeof response == 'undefined' || response.status != 'success') {
          const msg = "Modification image de Publicité échouée !";
          setMsgAlert(msg);
          return;
        }
      }
      setLoading(true);
      //Show Loader
      const lien = LinkPublicite.toString();

      const lient = lien.split('://');
      let lienPub;
      if (typeof lient[1] != 'undefined') {
        lienPub = lient[1];
      }
      else {
        lienPub = lien;
      }

      let dataToSend1 = {
        id_publicite: id_publicite,
        titre: Titre,
        lien: lienPub
      };

      const fetchUrl = `publicite/update`;
      const responseJson = await RequestOptionsPost(dataToSend1, fetchUrl);


      //Hide Loader
      setLoading(false);

      if (responseJson.status === 'success') {

        const activite = "Votre Publicité est bien modifiée!"
        Add_historique(global.User_connecte, activite, id_publicite);



        const msg = "Publicité Modifiée avec success!";
        setMsgAlert(msg);
        setIsAlert(true);
        setIsRedirect(true);

      } else {


        const msg = "Modification publicite échouée!";
        setMsgAlert(msg);
        setIsAlert(true);
      }
    }
  };



  return (
    <View style={styles.mainBody}>
      <ImageBackground
        source={{ uri: `${Base_url}images/bg_screen.png` }}

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
              {PreviewVisible && Photo ? (
                <ImageBackground
                  source={{ uri: Photo }}
                  style={{
                    flex: 1,
                    resizeMode: 'cover', width: '100%', height: 150, marginLeft: 5
                  }}>
                  <View>
                    <AntDesign name="picture" size={24} color="white" style={{ left: 5, top: 5 }} onPress={() => setPreviewVisible(false)} />
                  </View>

                </ImageBackground>
              )
                : (
                  <CameraImage
                    captureImage={setPhotoNew}
                    PStyle={{ width: '100%', height: 150 }}
                    isinvisible={true}
                  />
                )}
            </View>

            <View style={styles.sectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(Titre) => setTitre(Titre)}
                // underlineColorAndroid="#f000"
                value={Titre}
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
                value={LinkPublicite}
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
              <ModalAlert msgAlerte={MsgAlerte} action={() => (IsRedirect ? navigation.navigate('MesPublicites') : null)} />
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
    resizeMode: 'cover',
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
