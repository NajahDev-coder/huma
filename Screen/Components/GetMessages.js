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
  Platform,
  FlatList,
  DeviceEventEmitter,
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

  const [Vu, setVu] = useState('');
  const id_user1 = route.params?.id_user1;

  const id_user2 = route.params?.id_user2;
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);



  DeviceEventEmitter.addListener(
    'sendNewMsg', (data) => {

    });



  //sent message
  const handleSubmitPress = async () => {
    setErrortext('');

    if (!UserMessage) {
      const msg = "Veuillez saisir votre Message!";
      setMsgAlert(msg);
      setIsAlert(true);
      return;
    }
    //  const UserId = await AsyncStorage.getItem('user_id');
    // setLoading(true);
    let dataToSend = {
      id_user1: id_user1,
      id_user2: id_user2,
      message: UserMessage,
    };

    const fetchUrl = 'sent_messages';

    const responseJson = await RequestOptionsPost(dataToSend, fetchUrl);
    // console.log('sent_messages',responseJson)
    if (responseJson.status) {
      setVu('');
      setUserMessage('');
      setOffFocus(false);
      setRefreshKey((oldKey) => oldKey + 1);
      // alert(refreshKey);
      //console.log('Message envoyé avec success!');
    } else {
      setErrortext('Erreur inatendu! Essayer plus tard!');
      //console.log('Erreur inatendu! Essayer plus tard!');
    }

  };
  const fetchData = async () => {
    const fetchUrl = `messages/${id_user1}/${id_user2}`;
    const json = await RequestOptionsGet(fetchUrl)

    // convert data to json


    //console.log('response gettype', json.data[0].type);
    const id_user = await AsyncStorage.getItem('user_id');
    setMyUser(id_user);
    setMessages(json.data);
    setRefreshKey((oldKey) => oldKey + 1);
  }

  const marquerlu = async () => {
    const fetchUrl = `marquerLuMessage/${id_user1}/${id_user2}`;
    const response = await RequestOptionsPut(fetchUrl);
    //console.log('msg lu?', response); 
    if (response.data.length > 0) {
      setVu('Vu');
      DeviceEventEmitter.emit("sendNewMsg", { islu: true, id_user: id_user2 });
    }
  }
  const islu = async () => {
    const fetchUrl = `isLuMessage/${id_user1}/${id_user2}`;
    const response = await RequestOptionsGet(fetchUrl);
    //console.log('is lu?', response.data[0].nbrNonLu);
    if (response.data[0].nbrNonLu == 0) {
      setVu('Vu');
    }
  }

  useEffect(() => {
    let isSubscribed = true;

    if (isSubscribed) {
      fetchData();
      // setUserMessage('');
      marquerlu();
      islu();
    }
    return () => (isSubscribed = false);
  }, [refreshKey, Vu]);


  return (
    <View style={styles.mainBody}>
      <ImageBackground
        source={{ uri: Base_url + 'images/bg_screen.png' }}
        resizeMode="cover"
        style={styles.image}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            alignContent: 'center',
          }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <View style={{ padding: 10, flex: 1, width: '100%' }}>

            <View style={styles.row}>
              {Messages.map((value) => (
                <View style={{ flex: 1, width: '100%' }} key={value.id}>

                  <TouchableOpacity
                    key={value.id}
                    style={
                      MyUser != value.id_user1 ? styles.post : styles.post2
                    }>
                    {MyUser != value.id_user1 ? (
                      <View style={styles.leftpost}><Text></Text></View>
                    ) : (
                      <View style={styles.rightpost}><Text></Text></View>
                    )
                    }
                    <View style={styles.bcBlock}>



                      <GetProfile user_id={value.id_user1} navigation={navigation} img_prof={value.img_prof} />


                      <View style={styles.bcDetaille}>
                        <GetUser id_user={value.id_user1} />

                        <Text style={styles.postLabel2}>{value.message}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>

                </View>

              ))}
            </View>
            <View style={{ alignSelf: 'flex-end', padding: 15 }}>
              <Text style={{ color: '#b1b1b0', fontSize: 11 }}>{Vu}</Text>
            </View>
            <View style={{ width: '97%', padding: 3, marginLeft: 4 }}>
              <TextInput
                multiline={true}
                style={styles.inputStyle}
                onChangeText={(val) => { setUserMessage(val); setOffFocus(true); }}

                onKeyPress={(e) => {
                  !UserMessage ? setOffFocus(false) : setOffFocus(true);
                }}
                placeholder="Ecrire votre message..."
                placeholderTextColor="#8b9cb5"
                numberOfLines={4}
              />
              {errortext && <Text style={styles.errorTextStyle}>{errortext}</Text>}
              {OffFocus === true ? (
                <TouchableOpacity
                  style={{ position: 'absolute', right: 14, bottom: 14 }}
                  activeOpacity={0.5}
                  onPress={handleSubmitPress}>

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
  },
  rightpost: {
    width: '5%',
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
    width: '5%',
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
