// Import React and Component
import React, { useState, createRef, useLayoutEffect, useEffect } from 'react';
import {
  Animated,
  SafeAreaView,
  ImageBackground,
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  RefreshControl,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  // DeviceEventEmitter
} from 'react-native';
import {
  FontAwesome,
  FontAwesome5,
  AntDesign,
  MaterialIcons,
  Octicons,
  Fontisto,
  Ionicons,
} from '@expo/vector-icons';

import Loader from '../Components/Loader';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';


import GetSession from '../Components/GetSession';
import GetProfile from '../Components/GetProfile';
import { GetAmis, viewProfile } from '../includes/functions';
import { RequestOptionsGet, Base_url, RequestOptionsPut } from '../utils/utils';
const MesMessages = ({ navigation }) => {
  const [messagesList, setMessagesList] = useState([]);
  const [UserId, setUserId] = useState(0);

  const [result, setResultat] = useState(<Loader loading={true} />);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      fetchData();
    }, 1000);
  }, []);
  //get msg non lu count BY id_user2
  const getnbreMsg = async (id_user2) => {
    const fetchUrl = `isLuMessage/${id_user2}/${global.User_connecte}`;
    const response = await RequestOptionsGet(fetchUrl);
    return response.data[0].nbrNonLu
  }
  const fetchData = async () => {

    const fetchUrl = `mesmessages/${global.User_connecte}`;
    const json = await RequestOptionsGet(fetchUrl);
    if (json.length > 0) {


      var data = []
      json.map((value) => {
        getnbreMsg(value.amis.id).then((val) => {
          // DeviceEventEmitter.addListener('sendNewMsg', sendNewMsg, null)
          /*if(data && data.islu==true && data.id_user==value.amis.id)
          {
             Object.assign(value, {nbrNonLu: val});
          }
          else*/
          Object.assign(value, { nbrNonLu: val });

          data.push(value);
          if (data.length == json.length)
            setMessagesList(data)



        });
      })

    }
    else
      setResultat('Pas de Messages trouvés! ')
  };

  const marquerlu = async (id_user2) => {
    const fetchUrl = `marquerLuMessage/${global.User_connecte}`;
    const dataToSend = {
      id_user2: id_user2
    };
    setRefreshing(true);
    const response = await RequestOptionsPut(dataToSend, fetchUrl);
    //console.log('msg lu?', response);

    setRefreshing(false);
  }
  useEffect(() => {
    //setLoading(true)
    let isSubscribed = true;


    ////console.log('id_user MessagesList', UserId);

    if (isSubscribed) {
      setResultat(<Loader loading={true} />)
      fetchData();

    }
    return () => (isSubscribed = false);
  }, [refreshing]);
  const sendNewMsg = (data) => {
    /*(data && data.id_user) ? alert(data.id_user) : alert(user_id)
    (data && data.islu) ? alert(data.islu) : alert('nn lu')*/
    //alert(user_id)
  }
  return (
    <View style={styles.mainBody}>
      <ImageBackground
        source={{ uri: Base_url + 'images/bg_screen.png' }}
        resizeMode="cover"
        style={styles.image}>
        <ScrollView
          style={styles.flex}
          automaticallyAdjustContentInsets={false}
          keyboardShouldPersistTaps={'always'}
          contentInset={{ 'bottom': 20 }}
          keyboardDismissMode='on-drag'

          contentContainerStyle={{
            alignContent: 'center',
          }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <View style={{ padding: 10, flex: 1, width: '100%' }}>
            {/* <TouchableOpacity onPress={AddFitler}>
            <GetAmis />
*/}
            <View style={styles.row}>
              {messagesList.length > 0 ? (

                <FlatList
                  data={messagesList}
                  renderItem={({ item }) => (

                    <View style={styles.column}>
                      <TouchableOpacity
                        key={item.amis.id}
                        onPress={() => {
                          marquerlu(item.amis.id);
                          navigation.navigate({
                            name: 'GetMessages',
                            params: {
                              id_user2: item.amis.id,
                            },
                          });
                        }}>
                        <View style={styles.post}>
                          <View style={styles.bcBlock}>



                            <GetProfile user_id={item.amis.id} navigation={navigation} mg_prof={item.amis.img_prof} />

                            <View style={styles.bcDetaille}>
                              <View style={styles.bc_notifmsg}>
                                <Text style={styles.postLabel}>{item.amis.nom} </Text>
                                {item.nbrNonLu > 0 && <Text style={styles.notf}>{item.nbrNonLu}</Text>}
                              </View>
                              <Text style={[styles.bcText, item.lu === 1 && styles.bcMsgNoLu]}>{item.message}</Text>
                              <Text style={styles.postDateLabel}>envoyé le  {moment(item.date).format('MM-DD-YYYY')}</Text>
                            </View>
                          </View>
                        </View>
                        <View style={styles.rightpost}><Text></Text></View>
                      </TouchableOpacity>
                    </View>
                  )}

                  keyExtractor={(item) => item.amis.id}
                />

              ) : (
                <View style={{ width: '100%' }}>
                  <View style={{ alignItems: 'center', justifyContent: 'center', paddingVertical: '50%', padding: '25%' }}>

                    <Text style={{ color: '#777777', textAlign: 'center', }}>{result}</Text>
                  </View>

                </View>
              )}
            </View>
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
  },
  column: {
    flexDirection: 'column',
    width: '100%',
  },
  post: {
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: '#ffffff',
    //alignSelf: 'flex-start',
    marginHorizontal: '2%',
    marginBottom: 15,
    width: '94%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 7,
    flexDirection: 'column',
  },
  rightpost: {
    width: '6%',
    position: 'absolute',
    borderLeftColor: 'white',
    borderLeftWidth: 20,
    borderRightColor: 'transparent',
    borderRightWidth: 20,
    borderTopColor: 'white',
    borderTopWidth: 20,
    borderBottomColor: 'transparent',
    borderBottomWidth: 20,
    right: 0,
    top: 5,
  },
  postDateLabel: {
    fontSize: 11,

    color: '#cdcdcd',
  },
  postLabel: {
    fontSize: 12,
    fontWeight: '300',
    color: '#222222',
  },

  bcBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    //justifyContent: 'end',
  },
  bcDetaille: {
    //alignSelf: 'flex-start',
    margin: 7,
    width: '80%',
  },
  bcText: {
    //maxWidth: 90,
    color: '#6d6d6d',
  },
  bcMsgNoLu: {
    fontWeight: '500',
    color: "black"
  },
  bc_notifmsg: {
    flexDirection: 'row',
    //padding: 10, 
    position: 'relative'
  },
  notf: {

    // fontWeight:'bold',

    backgroundColor: 'rgb(140, 153, 44)',
    width: 22,
    height: 22,
    borderRadius: 22,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.22,
    shadowRadius: 5.46,
    elevation: 8,
    color: '#fff',
    textAlign: 'center',
    zIndex: 20
  },
});
export default MesMessages;
