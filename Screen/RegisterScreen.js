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
  Pressable
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Loader from './Components/Loader';
import ModalAlert from './ModalAlert';
import { useTogglePasswordVisibility } from './Components/useTogglePasswordVisibility';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GooglePlacesApiKey } from "./utils/env"
import { Base_url, RequestOptionsPost } from './utils/utils';
export default function RegisterScreen(props) {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userAge, setUserAge] = useState('');
  const [userTel, setUserTel] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const { passwordVisibility, rightIcon, handlePasswordVisibility } = useTogglePasswordVisibility();
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const [isAlert, setIsAlert] = useState(false);
  const [MsgAlerte, setMsgAlert] = useState('');
  const [isRegistraionSuccess, setIsRegistraionSuccess] = useState(false);


  const emailInputRef = createRef();
  const ageInputRef = createRef();
  const telInputRef = createRef();
  const addressInputRef = createRef();
  const passwordInputRef = createRef();


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
    if (!userPassword) {
      const msg = "Veuillez remplir votre Password!";
      setMsgAlert(msg);
      setIsAlert(true);
      return;
    }
    //Show Loader
    setLoading(true);
    const defaultCoordinates = await Location.geocodeAsync(adresse);
    const latitude = defaultCoordinates[0].latitude;
    const longitude = defaultCoordinates[0].longitude;
    var dataToSend = {
      nom: userName,
      email: userEmail,
      age: userAge,
      tel: userTel,
      adresse: userAddress,
      password: userPassword,
      latitude: latitude,
      longitude: longitude
    };

    const fetchUrl = 'user/register'
    const responseJson = await RequestOptionsPost(dataToSend, fetchUrl);
    //Hide Loader
    setLoading(false);
    //console.log(responseJson);
    // If server response message same as Data Matched
    if (responseJson.status == 'success') {
      setIsRegistraionSuccess(true);
      console.log('Inscription Réussie . Veuillez vous connecter pour continuer.'
      );
      setErrortext('')
    } else {
      setErrortext('Inscription échouée!');
    }
  };
  if (isRegistraionSuccess) {
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
                  <Text style={styles.successTextStyle}>Inscription réussi. Veuillez vous connecter pour continuer!</Text>
                  <TouchableOpacity
                    style={styles.buttonStyle}
                    activeOpacity={0.5}
                    onPress={() => props.navigation.navigate('Login')}>
                    <Text style={styles.buttonTextStyle}>Se Connecter</Text>
                  </TouchableOpacity>
                </View>
                {isAlert && (
                  <ModalAlert msgAlerte={MsgAlerte} />
                )}
              </KeyboardAvoidingView>
            </View>
          </ScrollView>
        </ImageBackground>
      </View>
    );
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
          }}>

          <View>
            <KeyboardAvoidingView enabled>
              <View style={{ alignItems: 'center', margin: 20 }}>
                <Image
                  source={{ uri: `${Base_url}images/HuMA.png` }}
                  style={{
                    width: '50%',
                    height: 180,
                    resizeMode: 'contain',

                  }}
                />
              </View>
              <View style={styles.SectionStyle}>
                <TextInput
                  style={styles.inputStyle}
                  onChangeText={(UserName) => setUserName(UserName)}
                  underlineColorAndroid="#f000"
                  placeholder="Pseudo"
                  placeholderTextColor="#8b9cb5"
                  autoCapitalize="sentences"
                  returnKeyType="next"
                  onSubmitEditing={() =>
                    emailInputRef.current && emailInputRef.current.focus()
                  }
                  blurOnSubmit={false}
                />
              </View>
              <View style={styles.SectionStyle}>
                <TextInput
                  style={styles.inputStyle}
                  onChangeText={(UserEmail) => setUserEmail(UserEmail)}
                  underlineColorAndroid="#f000"
                  placeholder="Email"
                  placeholderTextColor="#8b9cb5"
                  keyboardType="email-address"
                  ref={emailInputRef}
                  returnKeyType="next"
                  onSubmitEditing={() =>
                    passwordInputRef.current && passwordInputRef.current.focus()
                  }
                  blurOnSubmit={false}
                />
              </View>
              <View style={styles.SectionStyle}>
                <TextInput
                  style={styles.inputStyle}
                  onChangeText={(UserPassword) => setUserPassword(UserPassword)}
                  secureTextEntry={passwordVisibility}
                  underlineColorAndroid="#f000"
                  placeholder="Password"
                  placeholderTextColor="#8b9cb5"
                  ref={passwordInputRef}
                  returnKeyType="next"

                  onSubmitEditing={() =>
                    ageInputRef.current && ageInputRef.current.focus()
                  }
                  blurOnSubmit={false}
                />
                <Pressable onPress={handlePasswordVisibility}>
                  <MaterialCommunityIcons name={rightIcon} size={22} color="grey" style={{ position: 'absolute', top: 7, right: 8 }} />
                </Pressable>
              </View>
              <View style={styles.SectionStyle}>
                <TextInput
                  style={styles.inputStyle}
                  onChangeText={(UserAge) => setUserAge(UserAge)}
                  underlineColorAndroid="#f000"
                  placeholder="Age"
                  placeholderTextColor="#8b9cb5"
                  keyboardType="numeric"
                  ref={ageInputRef}
                  returnKeyType="next"
                  onSubmitEditing={() =>
                    telInputRef.current && telInputRef.current.focus()
                  }
                  blurOnSubmit={false}
                />
              </View>
              <View style={styles.SectionStyle}>
                <TextInput
                  style={styles.inputStyle}
                  onChangeText={(UserTel) => setUserTel(UserTel)}
                  underlineColorAndroid="#f000"
                  placeholder="Tel"
                  placeholderTextColor="#8b9cb5"
                  keyboardType={'phone-pad'}
                  ref={telInputRef}
                  returnKeyType="next"
                  onSubmitEditing={Keyboard.dismiss}
                  blurOnSubmit={false}
                />
              </View>
              <View style={styles.sectionStyle2}>
                <GooglePlacesAutocomplete
                  placeholder="Pays "
                  textInputProps={{
                    placeholderTextColor: '#8b9cb5',
                  }}
                  query={{
                    key: GooglePlacesApiKey,
                    language: 'fr', // language of the results
                  }}
                  onPress={(data, details = null) =>
                    setUserAddress(data.description)
                  }
                  onFail={(error) => console.error(error)}
                  requestUrl={{
                    url: 'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api',
                    useOnPlatform: 'web',
                  }}
                  styles={{
                    textInputContainer: {
                      backgroundColor: 'transparent',
                      color: '#8b9cb5',
                      fontSize: 11
                    },
                    textInput: {
                      height: 35,
                      color: '#8b9cb5',
                      paddingLeft: 15,
                      paddingRight: 15,
                      borderWidth: 1,
                      borderRadius: 30,
                      borderColor: '#dddddd',
                      backgroundColor: 'transparent',
                    },
                    predefinedPlacesDescription: {
                      color: '#8b9cb5',
                    },
                  }}
                  ref={addressInputRef}
                />
              </View>
              {errortext != '' ? (
                <Text style={styles.errorTextStyle}>{errortext}</Text>
              ) : null}
              <TouchableOpacity
                style={styles.buttonStyle}
                activeOpacity={0.5}
                onPress={handleSubmitButton}>
                <Text style={styles.buttonTextStyle}>Inscription</Text>
              </TouchableOpacity>



              <View style={{ flexDirection: 'row', width: '100%', textAlign: 'center', justifyContent: 'center' }}>
                <Text
                  style={styles.reginavigationsterTextStyle}> <MaterialCommunityIcons onPress={() => props.navigation.navigate('Accueil')} name="home-export-outline" size={24} color="#c4d63c" />
                </Text>
                <Text
                  style={styles.reginavigationsterTextStyle}
                  onPress={() => props.navigation.navigate('Login')}>
                  Se connecter
                </Text>
              </View>

            </KeyboardAvoidingView>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
}
//export default RegisterScreen;

const styles = StyleSheet.create({
  mainBody: {

    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    //paddingTop: Constants.statusBarHeight + 10,
  },
  SectionStyle: {
    flex: 1,
    flexDirection: 'row',
    height: 35,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
    width: '90%'
  },
  sectionStyle2: {
    //flex: 1,
    //height: 35,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
    flexDirection: 'row',
    position: 'relative',
    zIndex: 10
  },

  image: {
    flex: 1,
    //justifyContent: 'center',
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
    padding: 10,
    fontSize: 16,
  },
  inputStyle: {
    //flex: 1,
    color: '#222222',
    padding: 8,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#dadae8',
    flexDirection: 'row',
    width: '85%'

  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  reginavigationsterTextStyle: {
    //flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    padding: 10,
  },
  successTextStyle: {
    paddingTop: '20%',
    color: 'rgb(115, 126, 29)',
    textAlign: 'center',
    fontSize: 18,
    padding: 30,
  },
});
