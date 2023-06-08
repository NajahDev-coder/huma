// Import React and Component
import React, { useState, createRef, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
  RefreshControl,
  Switch,
  Modal,
  Alert,
  Pressable
} from 'react-native';
import * as Location from 'expo-location';
import Loader from './Components/Loader';
import NavigationBackHeader from './Components/NavigationBackHeader';
import { Base_url, Add_historique, SaveImage, RequestOptionsPost, RequestOptionsGet, GOOGLE_PLACES_API_KEY } from './utils/utils';
import CameraImage, { IdAnnonceImage } from './Components/CameraImageScreen';
import ModalAlert from './ModalAlert';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import {
  GooglePlacesAutocomplete,
  Geolocation,
} from 'react-native-google-places-autocomplete';

async function EditProfileUser(credentials, Base_url) {
  return fetch(Base_url + 'api/api/user/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
    body: credentials,
  }).then((data) => data.json());
}

const EditProfile = ({ route }) => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userAge, setUserAge] = useState('');
  const [userTel, setUserTel] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [userTransporteur, setUserTransporteur] = useState(0);
  const [userPointDolmen, setUserPointDolmen] = useState(0);
  const [userCache, setUserCache] = useState(0);
  const [userImageProfile, setUserImageProfile] = useState('');
  const [userImageCouvProfile, setUserImageCouvProfile] = useState('');
  const [UriProfile, setUriProfile] = useState(false);
  const [UriCouverture, setUriCouverture] = useState(false);
  const [ImageProfile, setImageProfile] = useState(null);
  const [ImageCouvProfile, setImageCouvProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const [successtext, setSuccesstext] = useState('');

  const [isAlert, setIsAlert] = useState(false);
  const [MsgAlerte, setMsgAlert] = useState('');
  const [captureProfileVisible, setCaptureProfileVisible] = useState(false);

  const [captureCouvertVisible, setCaptureCouvertVisible] = useState(false);

  const [currentPosition, setCurrentPosition] = useState(null);

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const DefaultimageCouvProfile = { uri: Base_url + 'images/no-couverture.png' };
  const DefaultimageProfile = { uri: Base_url + 'images/compte.png' };

  const id_user = route.params?.id_user;


  const getProfile = async () => {
    const fetchUrl = `user/${id_user}`;
    const responseJson = await RequestOptionsGet(fetchUrl)

    if (responseJson.data.length > 0) {
      setUserName(responseJson.data[0].nom);
      setUserEmail(responseJson.data[0].email);
      setUserTel(responseJson.data[0].tel);
      setUserAge(responseJson.data[0].age);
      const age = responseJson.data[0].age;
      //console.log('age', typeof age)
      setUserAddress(responseJson.data[0].adresse);
      setUserTransporteur(responseJson.data[0].Transporteur);
      setUserPointDolmen(responseJson.data[0].PointDolmen);
      setUserCache(responseJson.data[0].cache);
      const imgpf = responseJson.data[0].img_prof;
      const imgProfile = { uri: `${Base_url}images/${imgpf}` }
      setUserImageProfile(imgProfile);
      const imgcv = responseJson.data[0].img_couverture;
      const imgCouv = { uri: `${Base_url}images/${imgcv}` };
      setUserImageCouvProfile(imgCouv);
    }
  };
  const getCoordinates = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setTxtError('Veuillez activer votre poisition!');
      return;
    }
    const userLocation = await Location.getCurrentPositionAsync();
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
  useEffect(() => {
    let isSubscribed = true;

    if (isSubscribed) {
      getProfile();

      //console.log('edit userName:', userName);
    }

    return () => (isSubscribed = false);
  }, []);
  const takePictureProfile = () => {
    setCaptureProfileVisible(true)
  }
  const takePictureCouverture = () => {
    setCaptureCouvertVisible(true)
  }
  //const handleSubmitButton = () => {
  const handleSubmitButton = async (e) => {
    e.preventDefault();

    setErrortext('');
    if (!userName) {
      const msg = "Veuillez remplir votre Pseudo!";
      setMsgAlert(msg);
      setIsAlert(true);
      return;
    }
    if (!userEmail) {
      const msg = "Veuillez remplir votre Email!";
      setMsgAlert(msg);
      setIsAlert(true);
      return;
    }
    if (!userAge) {
      const msg = "Veuillez remplir votre Age!";
      setMsgAlert(msg);
      setIsAlert(true);
      return;
    }
    if (!userTel) {
      const msg = "Veuillez remplir votre Tél!";
      setMsgAlert(msg);
      setIsAlert(true);
      return;
    }
    if (!userAddress) {
      const msg = "Veuillez remplir votre Addresse!";
      setMsgAlert(msg);
      setIsAlert(true);
      return;
    }
    const defaultCoordinates = await Location.geocodeAsync(userAddress);
    const latitude = defaultCoordinates[0].latitude;
    const longitude = defaultCoordinates[0].longitude;
    //Show Loader
    setLoading(true);
    var dataToSend1 = {
      id_user: id_user,
      nom: userName,
      email: userEmail,
      age: userAge,
      tel: userTel,
      adresse: userAddress,
      longitude: longitude,
      latitude: latitude,
      transporteur: userTransporteur,
      point_dolmen: userPointDolmen,
      cache: userCache,
    };


    //console.log("dataToSend1", dataToSend1)
    const fetchUrl = 'user/update';
    const responseJson = await RequestOptionsPost(dataToSend1, fetchUrl);
    var dataToSend;
    if (responseJson.status) {
      //console.log('Photo', responseJson);  

      //Hide Loader
      setLoading(false);
      //console.log(responseJson.status);
      // If server response message same as Data Matched
      if (responseJson.status === 'success') {
        const activite = "Vous avez modifié votre profile!"
        Add_historique(global.User_connecte, activite, global.User_connecte);

        if (ImageProfile && ImageProfile.canceled == false) {

          const Imgsource1 = ImageProfile.assets[0].base64
          dataToSend1 = {
            imgsource: Imgsource1,
            img_prof: 1,
            user_id: global.User_connecte,
            num: 1
          }
          SaveImage(dataToSend1);
        }
        if (ImageCouvProfile && ImageCouvProfile.canceled == false) {
          //console.log('ImageCouvProfile', ImageCouvProfile.assets[0])
          //if (userImageCouvProfile) {

          //const source = ImageCouvProfile.assets[0].uri;
          //const Imgsource = "data:image/jpeg;base64," + source;
          const Imgsource = ImageCouvProfile.assets[0].base64;

          //console.log('ImageCouvProfile', Imgsource);

          dataToSend = {
            imgsource: Imgsource,
            img_couverture: 1,
            user_id: global.User_connecte,
            num: 1
          }
          SaveImage(dataToSend);
        }
        // console.log('Edit profile réussi!.');

        setSuccesstext('Edit profile réussi!');
      } else {
        setErrortext('Edit profile échouée!');
      }
    }
  }
  const UpdatePhotoProfile = (val) => {

    setCaptureProfileVisible(!captureProfileVisible);
    if (val.assets && val.assets[0].uri) {
      setUriProfile(true);
      setUserImageProfile(val.assets[0].uri);
      setImageProfile(val)
    }
    else {

      setUriProfile(false);
      setUserImageCouvProfile(val)
      setImageCouvProfile(val)
    }
  }

  const UpdatePhotoCouverture = (val) => {

    setCaptureCouvertVisible(!captureCouvertVisible);
    if (val.assets && val.assets[0].uri) {
      setUriCouverture(true);
      setUserImageCouvProfile(val.assets[0].uri);
      setImageCouvProfile(val)
    }
    else {
      setUriCouverture(false);
      setUserImageCouvProfile(val)
      setImageCouvProfile(val)
    }
  }
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
          }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <View style={{ alignItems: 'center' }}>
            <TouchableOpacity style={styles.post}>
              <ImageBackground
                //ref={img_annonce_cv}
                source={UriCouverture ? { uri: userImageCouvProfile } : userImageCouvProfile}
                onError={(e) =>
                  setUserImageCouvProfile(DefaultimageCouvProfile)
                }
                resizeMode="cover"
                style={[styles.image, { minHeight: 185 }]}>
                <View style={styles.bcBlockpf1}>
                  <View
                    style={styles.icoCamera}>
                    <AntDesign
                      name="camera"
                      size={24}
                      color="black"
                      onPress={takePictureProfile}
                    />
                  </View>
                  <View style={styles.bcProfile}>

                    <Image
                      source={UriProfile ? { uri: userImageProfile } : userImageProfile}
                      onError={(e) => setUserImageProfile(DefaultimageProfile)}
                      style={styles.imgbcProfile}
                    />

                  </View>


                </View>

                <View
                  style={{ position: 'absolute', bottom: 5, right: 5 }}>
                  <AntDesign
                    name="camera"
                    size={30}
                    color="white"
                    onPress={takePictureCouverture}
                  />
                </View>
              </ImageBackground>

            </TouchableOpacity>
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(userName) => setUserName(userName)}
              value={userName}
              underlineColorAndroid="#f000"
              placeholder="Pseudo"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(userEmail) => setUserEmail(userEmail)}
              value={userEmail}
              underlineColorAndroid="#f000"
              placeholder="Email"
              placeholderTextColor="#8b9cb5"
              keyboardType="email-address"
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(userAge) => setUserAge(userAge)}
              value={userAge.toString()}
              underlineColorAndroid="#f000"
              placeholder="Age"
              placeholderTextColor="#8b9cb5"
              keyboardType="numeric"
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              keyboardType='numeric'
              onChangeText={(userTel) => setUserTel(userTel)}
              value={userTel.toString()}
              underlineColorAndroid="#f000"
              placeholder="Tel"
              placeholderTextColor="#8b9cb5"
            // autoCapitalize="sentences"
            />
          </View>
          <View style={styles.SectionStyle2}>
            <GooglePlacesAutocomplete
              placeholder={userAddress}
              query={{
                key: GOOGLE_PLACES_API_KEY,
                language: 'fr', // language of the results
              }}
              onPress={(data, details = null) => {
                setUserAddress(data.description);

              }}
              onFail={(error) => console.error(error)}
              requestUrl={{
                url: 'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api',
                useOnPlatform: 'web',
              }}
              // getDefaultValue={() => userAddress}
              styles={{
                textInputContainer: {
                  background: 'transparent',
                  position: 'relative',
                  color: '#8b9cb5',
                },
                textInput: {
                  color: '#8b9cb5',
                  paddingLeft: 15,
                  paddingRight: 15,
                  borderWidth: 1,
                  borderRadius: 30,
                  borderColor: '#dddddd',
                  background: 'transparent',
                  width: '75%',
                  height: 35,
                },
                predefinedPlacesDescription: {
                  color: '#1faadb',
                },
              }}
              predefinedPlaces={[currentPlace]}
            />
          </View>
          <View style={styles.SectionStyle}>
            <Text style={styles.labelStyle}>Transporteur </Text>
            <Switch
              trackColor={{ false: '#767577', true: '#c4d63c' }}
              thumbColor={userTransporteur ? '#c4d63c' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() =>
                setUserTransporteur((userTransporteur) => !userTransporteur)
              }
              value={userTransporteur}
            />
          </View>

          <View style={styles.SectionStyle}>
            <Text style={styles.labelStyle}>Point Dolmen </Text>
            <Switch
              trackColor={{ false: '#767577', true: '#c4d63c' }}
              thumbColor={userPointDolmen ? '#c4d63c' : '#f4f3f4'}
              ios_backgroundColor="#c4d63c"
              onValueChange={() =>
                setUserPointDolmen((userPointDolmen) => !userPointDolmen)
              }
              value={userPointDolmen}
            />
          </View>

          <View style={styles.SectionStyle}>
            <Text style={styles.labelStyle}>Cacher vos données</Text>
            <Switch
              trackColor={{ false: '#767577', true: '#c4d63c' }}
              thumbColor={userCache ? '#c4d63c' : '#f4f3f4'}
              ios_backgroundColor="#c4d63c"
              onValueChange={() => setUserCache((userCache) => !userCache)}
              value={userCache}
            />
          </View>
          {successtext != '' ? (
            <Text style={styles.successTextStyle}>{successtext}</Text>
          ) : null}
          {errortext != '' ? (
            <Text style={styles.errorTextStyle}>{errortext}</Text>
          ) : null}
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={handleSubmitButton}>
            <Text style={styles.buttonTextStyle}>valider</Text>
          </TouchableOpacity>
          {isAlert && (
            <ModalAlert msgAlerte={MsgAlerte} />
          )}


          {captureProfileVisible && (
            <View style={styles.centeredView}>
              <Modal
                animationType="slide"
                transparent={true}
                presentationStyle="formSheet"
                visible={captureProfileVisible}
                onRequestClose={() => {

                  setCaptureProfileVisible(!captureProfileVisible);
                }}>
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <CameraImage
                      captureImage={(val) => UpdatePhotoProfile(val)}
                      PStyle={{ width: 150, height: 150 }}
                      isinvisible={true}
                    />
                  </View>
                </View>
              </Modal>
            </View>
          )}

          {captureCouvertVisible && (
            <View style={styles.centeredView}>
              <Modal
                animationType="slide"
                transparent={true}
                visible={captureCouvertVisible}
                onRequestClose={() => {

                  setCaptureCouvertVisible(!captureCouvertVisible);
                }}>
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <CameraImage
                      captureImage={(val) => UpdatePhotoCouverture(val)}
                      PStyle={{ width: 150, height: 150 }}
                      isinvisible={true}
                    />
                  </View>
                </View>
              </Modal>
            </View>
          )}

        </ScrollView>
      </ImageBackground>
    </View>



  );
};
//export default RegisterScreen;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    //paddingTop: Constants.statusBarHeight + 10,
  },
  SectionStyle: {
    flexDirection: 'row',
    height: 30,
    margin: 10,
  },
  SectionStyle2: {
    // marginLeft: 35,
    //ssmarginRight: 35,
    margin: 10,
    flexDirection: 'row',
    position: 'relative',
    zIndex: 10
  },
  post: {
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: '#ffffff',
    alignSelf: 'flex-start',

    marginBottom: 15,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 7,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  labelStyle: {
    marginLeft: 10,
    color: '#8b9cb5',
    width: '80%',
  },
  bcBlockpf1:
  {
    flexDirection: 'row',
    borderRadius: 110,
    width: 110,
    height: 110,
    position: 'relative'
  },
  bcProfile: {
    flexDirection: 'row',
    borderRadius: 110,
    width: 110,
    height: 110,
    backgroundColor: '#efefef',
    color: '#ffffff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    marginLeft: 8,
    zIndex: 5,
    //marginBottom: '-5px',
    position: 'relative',

    alignSelf: 'flex-start',
    elevation: 7,

    justifyContent: 'flex-end',
    textAlign: 'center',
  },
  imgbcProfile: {
    borderRadius: 110,
    width: 110,
    height: 110,

    zIndex: 5,
  },
  icoCamera: {
    position: 'absolute', width: 32, height: 32, borderRadius: 32, backgroundColor: '#dddddd', bottom: 3, right: 5, zIndex: 10,
    paddingTop: 4, paddingLeft: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
  },
  buttonStyle: {
    backgroundColor: '#c4d63c',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#c4d63c',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
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
    color: '#8b9cb5',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#dadae8',
  },
  successTextStyle: {
    color: '#c4d63c',
    textAlign: 'center',
    fontSize: 14,
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //marginTop: 22,

  },
  modalView: {
    width: 200,
    height: 220,
    //margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
export default EditProfile;
