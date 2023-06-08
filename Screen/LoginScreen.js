// Import React and Component
import React, { useState, createRef, useEffect } from 'react';
import {
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
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Loader from './Components/Loader';
import { Base_url } from './utils/utils'
import ModalAlert from './ModalAlert';
//import SocialLogin from './Components/SocialLogin';
const LoginScreen = ({ navigation, connecte }) => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const [message, setMessage] = useState(' ');
  const [UserName, setUserName] = useState('HüMA');
  const [animating, setAnimating] = useState(false);
  const [isAlert, setIsAlert] = useState(false);
  const [MsgAlerte, setMsgAlert] = useState('');

  let componentMounted = true;
  const passwordInputRef = createRef();
  const image = { uri: Base_url + 'images/bg_screen.png' };
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    let animating = true;

    if (animating == true) {
      if (connecte == 'false') {
        setMessage('Pour ajouter votre Annonce, merci de vous connecter!'); //AsyncStorage.removeItem('nonConnecte');
      }
    }


    return () => {
      animating = false;
    };
  }, [connecte]);

  //function to add session for member logué
  const Register_session = async (session_user_id) => {
    const baseUrl2 = Base_url + 'api/api/session';

    let dataToSend = { id_user: session_user_id };
    var formBody = [];
    for (var key in dataToSend) {
      var encodedKey = encodeURIComponent(key);
      var encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');
    await fetch(baseUrl2, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body: formBody,
    })
      .then((response) => response.json())
      .then((responseJson) => {
        //setRefreshKey((oldKey) => oldKey + 1);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSubmitPress = () => {
    setErrortext('');
    if (!userEmail) {
      const msg = "Veuillez remplir votre Email!";
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
    let dataToSend = { email: userEmail, password: userPassword };
    let formBody = [];
    for (let key in dataToSend) {
      let encodedKey = encodeURIComponent(key);
      let encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');
    const baseUrl = Base_url + 'api/api/user/login';
    //const baseUrl = 'HTTP://10.0.2.2:3000/api/user/login'
    fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body: formBody,
    })
      .then((response) => response.json())
      .then((responseJson) => {
        //Hide Loader
        setLoading(false);
        ////console.log(responseJson);
        // If server response message same as Data Matched
        if (responseJson.status === 'success') {
          AsyncStorage.setItem('user_id', String(responseJson.data[0].id));
          AsyncStorage.setItem('user_name', responseJson.data[0].nom);
          AsyncStorage.setItem('user_email', responseJson.data[0].email);

          //add session membre logué

          const session_user_id = responseJson.data[0].id;

          Register_session(session_user_id);

          //navigation.replace('DrawerNavigationAuthRoutes');
          navigation.replace('SplashScreen');
        } else {
          setErrortext('Please check your email id or password');
          ////console.log('Please check your email id or password');
        }
      })
      .catch((error) => {
        //Hide Loader
        setLoading(false);
        console.error(error);
      });
  };
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
              <View style={{ alignItems: 'center', marginTop: 70 }}>
                <Image
                  source={{ uri: Base_url + 'images/HuMA.png' }}
                  style={{
                    width: '50%',
                    height: 150,
                    resizeMode: 'contain',
                  }}
                />
              </View>
              <View style={styles.SectionTextStyle}>
                <Text style={styles.titre}>{message}</Text>
              </View>
              <View style={styles.SectionStyle}>
                <TextInput
                  style={styles.inputStyle}
                  onChangeText={(UserEmail) => setUserEmail(UserEmail)}
                  placeholder="Email" //dummy@abc.com
                  placeholderTextColor="#8b9cb5"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  returnKeyType="next"
                  onSubmitEditing={() =>
                    passwordInputRef.current && passwordInputRef.current.focus()
                  }
                  underlineColorAndroid="#f000"
                  blurOnSubmit={false}
                />
              </View>
              <View style={styles.SectionStyle}>
                <TextInput
                  style={styles.inputStyle}
                  onChangeText={(UserPassword) => setUserPassword(UserPassword)}
                  placeholder="Password" //12345
                  placeholderTextColor="#8b9cb5"
                  keyboardType="default"
                  ref={passwordInputRef}
                  onSubmitEditing={Keyboard.dismiss}
                  blurOnSubmit={false}
                  secureTextEntry={true}
                  underlineColorAndroid="#f000"
                  returnKeyType="next"
                />
              </View>
              {errortext != '' ? (
                <Text style={styles.errorTextStyle}>{errortext}</Text>
              ) : null}
              <TouchableOpacity
                style={styles.buttonStyle}
                activeOpacity={0.5}
                onPress={handleSubmitPress}>
                <Text style={styles.buttonTextStyle}>LOGIN</Text>
              </TouchableOpacity>
              <View style={{ flexDirection: 'row', width: '100%', textAlign: 'center', justifyContent: 'center' }}>
                <Text
                  style={styles.reginavigationsterTextStyle}> <MaterialCommunityIcons onPress={() => navigation.navigate('Accueil')} name="home-export-outline" size={24} color="#c4d63c" />
                </Text>
                <Text
                  style={styles.reginavigationsterTextStyle}
                  onPress={() => navigation.navigate('Register')}>
                  Inscription
                </Text>
              </View>
              {isAlert && (
                <ModalAlert msgAlerte={MsgAlerte} />
              )}
            </KeyboardAvoidingView>
          </View>
          {/*<SocialLogin />*/}
        </ScrollView>
      </ImageBackground>
    </View>
  );
};
export default LoginScreen;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    alignContent: 'center',
  },
  image: {
    flex: 1,
  },
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  SectionTextStyle: {
    flexDirection: 'row',
    marginTop: 0,
    marginLeft: 35,
    marginRight: 35,
  },
  reginavigationsterTextStyle: {
    //flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    padding: 10
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
    marginBottom: 25,
  },
  titre: {
    fontStyle: 'italic',
    fontSize: 18,
    color: '#222222',
    justifyContent: 'center',
    textAlign: 'center',

  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: '#222222',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#dadae8',
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
});
