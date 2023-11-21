import React, { useState, createRef, useCallback, useEffect, useLayoutEffect } from 'react';
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
  Dimensions,
  RefreshControl
} from 'react-native';

import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Ionicons
} from '@expo/vector-icons';

import GetSession from '../Components/GetSession';
import GetProfile from '../Components/GetProfile';
import GetUser from '../Components/GetUser';
import { Base_url, RequestOptionsGet, RequestOptionsPost, RequestOptionsPut } from '../utils/utils'

import ModalAlert from '../ModalAlert';

const GetMessages = ({ navigation, route }) => {
  const [Messages, setMessages] = useState([]);

  const [isAlert, setIsAlert] = useState(false);
  const [MsgAlerte, setMsgAlert] = useState('');
  // const [UserId, setUserId] = useState(0);
  const [UserMessage, setUserMessage] = useState('');
  const [text, setText] = useState('');
  const [errortext, setErrortext] = useState('');
  const [loading, setLoading] = useState(true);
  const [OffFocus, setOffFocus] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [MyUser, setMyUser] = useState(0);
  const [isSent, setIsSent] = useState(false)
  const [limite, setLimite] = useState(10)
  const [Vu, setVu] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const id_user2 = route.params?.id_user2;

  const msgInput = createRef();
  const scroll = createRef();



  /*DeviceEventEmitter.addListener(
    'sendNewMsg', (data) => {

    });*/


  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    //setTimeout(() => {
    setRefreshing(false);
    setLimite((oldKey) => oldKey + 10)
    // }, 2000);
  }, []);
  //sent message
  const handleSubmitPress = async () => {


    if (!UserMessage) {
      const msg = "Veuillez saisir votre Message!";
      setMsgAlert(msg);
      setIsAlert(true);
      return;
    }
    setLimite(10);

    //  const UserId = await AsyncStorage.getItem('user_id');
    // setLoading(true);
    let dataToSend = {
      id_user1: global.User_connecte,
      id_user2: id_user2,
      message: UserMessage,
    };
    setUserMessage(' ');
    setOffFocus(false);
    setVu('');


    const fetchUrl = 'sent_messages';
    //alert(refreshKey);
    //await RequestOptionsPost(dataToSend, fetchUrl).then((response, error) => {
    const response = await RequestOptionsPost(dataToSend, fetchUrl)

    if (response.status == 'success') {
      // console.log('sent_messages',responseJson)

      setRefreshKey((oldKey) => oldKey + 1);
      // 
      //console.log('Message envoyé avec success!');
    } else {
      setErrortext('Erreur inatendu! Essayer plus tard!');
      //console.log('Erreur inatendu! Essayer plus tard!');
    }


  };
  const fetchData = async (limite) => {
    const fetchUrl = `messages/${global.User_connecte}/${id_user2}/${limite}`;
    //const json = await RequestOptionsGet(fetchUrl)

    // convert data to json
    const response = await RequestOptionsGet(fetchUrl);
    if (response.data.length > 0) {
      //alert("kk");
      let DataN = response.data.reverse();

      // DataN = DataN.reverse();

      setMessages(DataN);
      //setRefreshKey((oldKey) => oldKey + 1);
      // isVU();
      // marquerlu();
    }


  };


  const isVU = async () => {
    const fetchUrl = `isVuMessage/${global.User_connecte}/${id_user2}`;
    const response = await RequestOptionsGet(fetchUrl);

    if (response.data.length == 0) {
      setVu('Vu');
    }
    else {
      setVu('')
    }
  }

  useEffect(() => {
    let isSubscribed = true;

    if (isSubscribed) {

      // setUserMessage('');

      fetchData(limite);
      // scroll.scrollToEnd()
      //isVU();
      //if(global.User_connecte==)
      // marquerlu();

    }
    return () => (isSubscribed = false);
  }, [refreshKey, limite]);


  return (
    <View style={styles.mainBody}>
      <ImageBackground
        source={{ uri: Base_url + 'images/bg_screen.png' }}
        resizeMode="cover"
        style={styles.image}>
        <ScrollView
          ref={scroll}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            alignContent: 'center',
          }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View >

            <View style={{
              padding: 10, width: '100%', height: minHeight1
            }}>

              <View style={styles.row}>
                <ScrollView

                  keyboardShouldPersistTaps="handled"


                >
                  {Messages.map((item) => (

                    <View style={{ width: '100%' }} key={item.id}>

                      <TouchableOpacity
                        key={item.id}
                        style={
                          global.User_connecte != item.id_user1 ? styles.post : styles.post2
                        }>
                        {global.User_connecte != item.id_user1 ? (
                          <View style={styles.leftpost}><Text></Text></View>
                        ) : (
                          <View style={styles.rightpost}><Text></Text></View>
                        )
                        }
                        <View style={styles.bcBlock}>



                          <GetProfile user_id={item.id_user1} navigation={navigation} img_prof={item.img_prof} />


                          <View style={styles.bcDetaille}>
                            <GetUser id_user={item.id_user1} />

                            <Text style={styles.postLabel2}>{item.message}</Text>
                          </View>
                        </View>
                      </TouchableOpacity>

                    </View>

                  ))
                  }
                </ScrollView>
              </View>
              {/*Vu != '' && (
                <View style={{ alignSelf: 'flex-end', padding: 15, marginRight: 5 }}>
                  <Text style={{ color: '#b1b1b0', fontSize: 11 }}>{Vu}</Text>
                </View>
              )*/}

            </View>
            <View style={{ width: '95%', padding: 3, position: 'absolute', bottom: 0, left: 4, right: 4 }}>
              <TextInput
                multiline={true}
                style={styles.inputStyle}
                onChangeText={(val) => { setUserMessage(val); setOffFocus(true); }}
                ref={msgInput}
                onKeyPress={(e) => {
                  !UserMessage ? setOffFocus(false) : setOffFocus(true);
                }}
                value={UserMessage}
                placeholder="Ecrire votre message..."
                placeholderTextColor="#8b9cb5"
                numberOfLines={4}
              />
              {errortext && <Text style={styles.errorTextStyle}>{errortext}</Text>}
              {OffFocus === true ? (
                <TouchableOpacity
                  style={{ position: 'absolute', right: 14, bottom: 14 }}
                  activeOpacity={0.5}
                  onPress={() => handleSubmitPress()}>

                  <Ionicons name="send-sharp" size={24} color="#c4d63c" />

                </TouchableOpacity>
              ) : (
                <Text
                  style={{ position: 'absolute', right: 14, bottom: 14 }}>
                  <Ionicons name="send-outline" size={24} color="grey" />
                </Text>
              )
              }
            </View>

            {isAlert && (
              <ModalAlert msgAlerte={MsgAlerte} />
            )}
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};
const minHeight1 = parseInt(Dimensions.get('window').height - 70)
const minHeight = parseInt(Dimensions.get('window').height - 200)

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  row: {
    width: '100%',
    height: minHeight
  },
  post: {
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: '#efefef',
    alignSelf: 'flex-start',
    marginHorizontal: '3%',
    marginBottom: 15,
    width: '85%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 7,
  },
  post2: {
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: '#ffffff',
    alignSelf: 'flex-end',
    marginHorizontal: '3%',
    marginBottom: 15,
    width: '85%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 7,
  },

  postLabel2: {
    fontSize: 12,
    fontWeight: '500',
    color: '#000',
  },
  bcBlock: {
    flexDirection: 'row',
  },

  bcDetaille: {

    margin: 7,
    width: '80%',
  },

  inputStyle: {
    flex: 1,
    color: '#222222',
    padding: 15,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#dadae8',
    width: '100%',
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
    padding: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'red'
  },
  rightpost: {
    width: '6%',
    position: 'absolute',
    borderLeftColor: '#ffffff',
    borderLeftWidth: 20,
    borderRightColor: 'transparent',
    borderRightWidth: 20,
    borderTopColor: '#ffffff',
    borderTopWidth: 20,
    borderBottomColor: 'transparent',
    borderBottomWidth: 20,
    right: -15,
    top: 5,
  },
  leftpost: {
    width: '6%',
    position: 'absolute',
    borderLeftColor: 'transparent',
    borderLeftWidth: 20,
    borderRightColor: '#efefef',
    borderRightWidth: 20,
    borderTopColor: '#efefef',
    borderTopWidth: 20,
    borderBottomColor: 'transparent',
    borderBottomWidth: 20,
    left: -15,
    top: 5,

  },
});
export default GetMessages;
