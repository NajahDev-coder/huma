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
  Switch,
  SafeAreaView,
  TouchableHighlight,
  StatusBar,
} from 'react-native';

import { GOOGLE_PLACES_API_KEY } from "@env"
import { Base_url, RequestOptionsGet, SaveImage, RequestOptionsPost, Add_historique } from './utils/utils';
import FileUpload from './Components/FileUpload';
import Loader from './Components/Loader';
import Modal from 'react-native-modal';

import CameraImage, { IdAnnonceImage } from './Components/CameraImageScreen';
//import RichText from './Components/RichText';

import { actions, RichEditor, RichToolbar } from "react-native-pell-rich-editor";


import RenderHtml from 'react-native-render-html';
const handleHead = ({ tintColor }) => <Text style={{ color: tintColor }}>H1</Text>
import ModalAlert from './ModalAlert';
export default function EditAnnonceScreen({ navigation, route }) {
  //const auteur = 1;
  //const id_user = route.params?.id_user;
  const id_annonce = route.params?.id_annonce;

  //const auteur = 1;
  const [titre, setTitre] = useState('');
  const [court_description, setCourtDescription] = useState('');
  const [description, setDescription] = useState('');
  const [adresse, setAdresse] = useState('');
  const [LinkVedio, setLinkVedio] = useState('');
  const [qty, setQty] = useState(0);
  const [proposLivraison, setProposLivraison] = useState(0);
  const [Photo, setPhoto] = useState('');
  const [PhotoNew, setPhotoNew] = useState('');
  const [Photo2, setPhoto2] = useState('');
  const [Photo2New, setPhoto2New] = useState('');
  const [Photo3, setPhoto3] = useState('');
  const [Photo3New, setPhoto3New] = useState('');
  const [annonceType, setAnnonceType] = useState(0);
  const [annonceCateg, setAnnonceCateg] = useState(0);

  const [type, setType] = useState(0);
  const [categorie, setCategorie] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const [isUpdateSuccess, setIsUpdateSuccess] = useState(false);
  const [PreviewVisible1, setPreviewVisible1] = useState(false);
  const [PreviewVisible2, setPreviewVisible2] = useState(false);
  const [PreviewVisible3, setPreviewVisible3] = useState(false);
  const [isAlert, setIsAlert] = useState(false);
  const [MsgAlerte, setMsgAlert] = useState('');
  const titreInputRef = createRef();
  const link_vedioRef = createRef();
  const court_descriptionInputRef = createRef();
  const descriptionInputRef = createRef();
  const adresseInputRef = createRef();

  const isExiteFile = async () => {
    const fetchUrl = `file_existe/${id_annonce}`;

    const responseJson = await RequestOptionsGet(fetchUrl);
    // console.log('imgAnnonce', responseJson.data);

    if (responseJson.data.length > 0) {

      /*let dataImg = [];
      Object.entries(responseJson.data).map(([key, value]) => {
        dataImg.push({
          id: key,
          img: value.url
        });
      });*/
      if (responseJson.data[0]) { setPhoto(responseJson.data[0].url); setPreviewVisible1(true); }
      if (responseJson.data[1]) { setPhoto2(responseJson.date[1].url); setPreviewVisible2(true); }
      if (responseJson.data[2]) { setPhoto3(responseJson.data[2].url); setPreviewVisible3(true); }
      //console.log(dataImg)
      //setImageAnnonce(dataImg);
    }
  }
  const fetchData = async () => {
    const fetchUrl = `annonce/${id_annonce}`;

    const responseJson = await RequestOptionsGet(fetchUrl);
    //console.log(responseJson)
    if (responseJson.data.length > 0) {
      //setAnnonceDetails(responseJson.data[0]);
      //alert(responseJson.data[0].titre)
      setTitre(responseJson.data[0].titre);
      setCourtDescription(responseJson.data[0].court_description);
      setDescription(responseJson.data[0].description);
      setLinkVedio(responseJson.data[0].link_vedio)
      setProposLivraison(responseJson.data[0].propos_livraison)
      setQty(responseJson.data[0].qty)
      setAdresse(responseJson.data[0].adresse)

      // const defaultCoordinates = await Location.geocodeAsync(adresse);

      setType(responseJson.data[0].type);
      setCategorie(responseJson.data[0].categorie);
      // fadeIn();
    }
    // setLoading(false);
  };


  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      fetchData();
      isExiteFile();
    }
    return () => { isMounted = false }
  }, [id_annonce])

  const AfficheDescrp = (description) => {
    const source = { html: description }
    return (
      <RenderHtml
        // contentWidth={width}
        source={source}
      />
    )
  }

  const handleSubmitButton = async (e) => {
    e.preventDefault();


    setErrortext('');
    if (!titre) {
      const msg = 'Veuillez remplir le titre de votre annonce';
      setMsgAlert(msg);
      setIsAlert(true);
      return;
    }
    if (!court_description && !description) {
      const msg = 'Veuillez remplir la courte description et/ou la description de votre annonce';
      setMsgAlert(msg);
      setIsAlert(true);
      return;
    }
    //if (!adresse && !Ville && !codePostal) {  
    if (!adresse) {
      const msg = "Veuillez remplir l'adresse complète";
      setMsgAlert(msg);
      setIsAlert(true);
      return;
    }
    if (!qty || qty <= 0) {
      const msg = "Veuillez entrer une quantité valide!";
      setMsgAlert(msg);
      setIsAlert(true);
      return;
    }
    //Show Loader
    const defaultCoordinates = await Location.geocodeAsync(adresse);
    const latitude = defaultCoordinates[0].latitude;
    const longitude = defaultCoordinates[0].longitude;

    setLoading(true);
    var dataToSend1 = {
      titre: titre,
      linkVedio: LinkVedio,
      court_description: court_description,
      description: description,
      adresse: adresse,
      latitude: latitude,
      longitude: longitude,
      type: type,
      categorie: categorie,
      qty: qty,
      propos_livraison: proposLivraison
    };
    console.log('dfsdsdfsdf:', dataToSend1)
    const fetchUrl = `annonce/update/:id_annonce`;
    const responseJson = await RequestOptionsPost(dataToSend1, fetchUrl);

    //console.log('responseJson create annonce:', responseJson)

    //Hide Loader
    setLoading(false);
    //var dataToSend;
    //if (responseJson.status) {
    if (responseJson.status === 'success') {
      //console.log('Photo:::', Photo);
      const activite = "Votre annonce est bien modifiée!"
      Add_historique(global.User_connecte, activite, global.User_connecte);


      if (PhotoNew) {
        let update = false;
        if (Photo) update = true
        var dataToSendPhoto = {
          imgsource: PhotoNew.assets[0].base64,
          annonce_id: id_annonce,
          user_id: global.User_connecte,
          num: 1,
          update: update
        }
        SaveImage(dataToSendPhoto);
      }
      if (Photo2New) {
        let update = false;
        if (Photo2) update = true
        var dataToSendPhoto2 = {
          imgsource: Photo2New.assets[0].base64,
          annonce_id: id_annonce,
          user_id: global.User_connecte,
          num: 2,
          update: update
        }
        SaveImage(dataToSendPhoto2);
      }
      if (Photo3New) {
        let update = false;
        if (Photo3) update = true
        var dataToSendPhoto3 = {
          imgsource: Photo3New.assets[0].base64,
          annonce_id: id_annonce,
          user_id: global.User_connecte,
          num: 3,
          update: update
        }
        SaveImage(dataToSendPhoto3);
      }
      // CameraImage.IdAnnonceImage(capturedImage,responseJson.ID)
      setIsUpdateSuccess(true);
      setTimeout(function () {
        setIsUpdateSuccess(false);
      }, 2000);
      //console.log('Création annonce réussi!');
      //console.log(responseJson.status)
    } else {
      setErrortext('Modification annonce échouée!');
    }
  };

  if (isUpdateSuccess) {
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
                    Annonce modifiée avec success!
                  </Text>
                  <TouchableOpacity
                    style={styles.buttonStyle}
                    activeOpacity={0.5}
                    onPress={() => navigation.navigate('Annonces')}>
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


              {PreviewVisible1 && Photo ? (
                <ImageBackground
                  source={{ uri: Photo && Photo }}
                  style={{ width: '100%', height: 150 }}>
                  <View>
                    <AntDesign name="picture" size={24} color="black" onPress={() => setPreviewVisible1(false)} />
                  </View>

                </ImageBackground>
              ) : (
                <CameraImage
                  captureImage={setPhotoNew}
                  //style={{ height: 150, width: '100%' }}
                  PStyle={{ width: '100%', height: 150 }}
                  isinvisible={true}
                />
              )}
            </View>
            <View style={styles.section2Img}>
              <View style={styles.sectionStyleImg2}>
                {PreviewVisible3 && Photo3 ? (
                  <ImageBackground
                    source={{ uri: Photo3 }}
                    style={{ width: 80, height: 80 }}>
                    <View>
                      <AntDesign name="picture" size={24} color="black" onPress={() => setPreviewVisible3(false)} />
                    </View>

                  </ImageBackground>
                )
                  : (
                    <CameraImage
                      captureImage={setPhoto3New}
                      //style={{ height: 150, width: '100%' }}
                      PStyle={{ width: 80, height: 80 }}
                      isinvisible={true}
                    />
                  )}
              </View>

              <View style={styles.sectionStyleImg2}>
                {PreviewVisible2 && Photo2 ? (
                  <ImageBackground
                    source={{ uri: Photo2 }}
                    style={{ width: 80, height: 80 }}>
                    <View>
                      <AntDesign name="picture" size={24} color="black" onPress={() => setPreviewVisible2(false)} />
                    </View>

                  </ImageBackground>
                )
                  : (
                    <CameraImage
                      captureImage={setPhoto2New}
                      //style={{ height: 150, width: '100%' }}
                      PStyle={{ width: 80, height: 80 }}
                      isinvisible={true}
                    />
                  )}
              </View>
            </View>
            <View style={styles.sectionStyleSwitch}>
              <Text style={styles.labelStyle}>Livraison </Text>
              <Switch

                trackColor={{ true: '#6cc5d5', false: '#6cc5d5' }}
                thumbColor={proposLivraison ? '#6cc5d5' : '#D6ECF0'}
                ios_backgroundColor="#6cc5d5"
                onValueChange={() =>
                  setProposLivraison((proposLivraison) => !proposLivraison)
                }
                value={proposLivraison}
              />
            </View>
            <View style={styles.sectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(titre) => setTitre(titre)}
                value={titre}
                // underlineColorAndroid="#f000"
                placeholder="Entrez Le Titre  "
                placeholderTextColor="#6cc5d5"
                autoCapitalize="sentences"

              />
            </View>

            <View style={styles.sectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(court_description) =>
                  setCourtDescription(court_description)
                }
                value={court_description}
                //underlineColorAndroid="#f000"
                placeholder="Entrez votre courte description"
                placeholderTextColor="#6cc5d5"
                keyboardType="email-address"

              />
            </View>


            <View style={styles.richTextContainer}>

              <RichEditor
                ref={descriptionInputRef}
                onChange={(description) => setDescription(description)}
                initialContentHTML={description}
                //editorInitializedCallback={() => this.onEditorInitialized()}
                //androidHardwareAccelerationDisabled={true}
                style={styles.richTextEditorStyle}
                editorStyle={{ color: '#6cc5d5' }}
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
                //placeholder="Entrez la localisation  "
                placeholder={adresse}
                query={{
                  key: GOOGLE_PLACES_API_KEY,
                  language: 'fr', // language of the results
                }}
                onPress={(data, details = null) => { setAdresse(data.description) }}
                onFail={(error) => console.error(error)}
                requestUrl={{
                  url: 'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api',
                  useOnPlatform: 'web',
                }}
                textInputProps={{
                  placeholderTextColor: '#6cc5d5',
                }}
                styles={{
                  textInputContainer: {
                    backgroundColor: 'transparent',
                  },
                  textInput: {
                    color: '#6cc5d5',
                    paddingLeft: 15,
                    paddingRight: 15,
                    borderWidth: 1,
                    borderRadius: 30,
                    borderColor: '#D6ECF0',
                    backgroundColor: '#e7f9fc',
                  },
                  predefinedPlacesDescription: {
                    color: '#6cc5d5',
                  },
                }}
                ref={adresseInputRef}
              />
            </View>
            <View style={styles.sectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(LinkVedio) => setLinkVedio(LinkVedio)}
                keyboardType='url'
                value={LinkVedio}
                // underlineColorAndroid="#f000"
                placeholder="Entrez le Lien vidéo sans http(s):// "
                placeholderTextColor="#6cc5d5"
                autoCapitalize="sentences"
                multiline={true}
              />
            </View>
            <View style={styles.sectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(qty) => setQty(qty)}
                keyboardType='numeric'
                value={qty.toString()}
                //underlineColorAndroid="#f000"
                placeholder="quantité "
                placeholderTextColor="#6cc5d5"
                autoCapitalize="sentences"
                multiline={false}
              />
            </View>
            <Text style={styles.errorTextStyle}>{errortext}</Text>

            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={handleSubmitButton}>
              <Text style={styles.buttonTextStyle}>Valider</Text>
            </TouchableOpacity>
            {isAlert && (
              <ModalAlert msgAlerte={MsgAlerte} />
            )}
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
    width: '90%',
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
    marginHorizontal: 20,
    marginVertical: 5
  },
  sectionStyle2: {
    flex: 1,
    // height: 350,

    marginHorizontal: 20,
    marginVertical: 5
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
    color: '#6cc5d5',
    backgroundColor: '#e7f9fc',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#D6ECF0',
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
    width: '90%',
    marginLeft: 25,
    margin: 10,
  },
  title: {
    fontWeight: 'bold',
    alignSelf: 'center',
    paddingVertical: 10,
  },
  root: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: '#eaeaea',
  },
  editor: {
    flex: 1,
    padding: 0,
    borderColor: 'gray',
    borderWidth: 1,
    marginHorizontal: 30,
    marginVertical: 5,
    backgroundColor: 'white',
    minHeight: 150
  },
  richTextEditorStyle: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderWidth: 1,
    borderColor: '#D6ECF0',
    shadowColor: '#4b7279',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    fontSize: 20,
    background: '#e7f9fc',
    color: '#6cc5d5'
  },

  richTextToolbarStyle: {
    backgroundColor: '#e7f9fc',
    borderColor: '#D6ECF0',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderWidth: 1,
    borderBottomWidth: 0,
    // width:'95%'
  },
  sectionStyleSwitch: {
    //flexDirection: 'row',
    height: 40,
    margin: 20,
    marginBottom: 0
  },
  labelStyle: {
    marginLeft: 10,
    marginBottom: -35,
    color: '#6cc5d5',
    fontWeight: 'bold'
    //width: '80%',
  },

});
