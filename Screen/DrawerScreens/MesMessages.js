// Import React and Component
import React, { useState, createRef,useLayoutEffect , useEffect } from 'react';
import {
  Animated,
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
  DeviceEventEmitter
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

import GetCategorie from '../Components/GetCategorie';
import GetType from '../Components/GetType';
import GetSession from '../Components/GetSession';
import GetProfile from '../Components/GetProfile';
import { GetAmis, viewProfile } from '../includes/functions';
import { RequestOptionsGet, Base_url } from '../utils/utils';
const MesMessages = ({ navigation }) => {
  const [messagesList, setMessagesList] = useState([]);
  const [UserId, setUserId] = useState(0);

  const [result, setResultat] = useState('Loading ....');

 //get msg non lu count
 const getnbreMsg = async (UserId, id_user2) => {
      const fetchUrl =  `isLuMessage/${UserId}/${id_user2}`;
      const response = await RequestOptionsGet(fetchUrl);  
       return   response.data[0].nbrNonLu      
  }   
  useLayoutEffect(() => {   
    //setLoading(true)
    let isSubscribed = true;

    (async () => {
      /* id de user connecté*/
      const id_user = await AsyncStorage.getItem('user_id');
      setUserId(id_user);
    })();

    //console.log('id_user MessagesList', UserId);
    const fetchData = async () => {

      const fetchUrl = `mesmessages/${UserId}`;
      const json = await RequestOptionsGet(fetchUrl);
      if (json.length > 0)
      { 
        
           
          var data=[]
         json.map( (value)=>{
            getnbreMsg(UserId, value.amis.id).then((val)=>{
             DeviceEventEmitter.addListener('sendNewMsg',sendNewMsg, null)
             /*if(data && data.islu==true && data.id_user==value.amis.id)
             {
                Object.assign(value, {nbrNonLu: val});
             }
             else*/
               Object.assign(value, {nbrNonLu: val});
            
            data.push(value);
            if(data.length==json.length)
            setMessagesList(data)

           
           
          });
        })
        
      }
      else
        setResultat('Pas des messages trouvées! ')
    };
    if (isSubscribed) {
      fetchData();
    }
    return () => (isSubscribed = false);
  }, [UserId]);
const sendNewMsg = (data)=>{    
/*(data && data.id_user) ? alert(data.id_user) : alert(user_id)
(data && data.islu) ? alert(data.islu) : alert('nn lu')*/
alert(user_id)
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
          }}>
          <View style={{ padding: 10, flex: 1, width: '100%' }}>
            {/* <TouchableOpacity onPress={AddFitler}>
            <GetAmis />
*/}
            <View style={styles.row}>
              { messagesList.length > 0 ? (
                messagesList.map((value) => (
                  <View style={styles.column}>
                    <TouchableOpacity
                      key={value.amis.id}
                      onPress={() => {
                        navigation.navigate({
                          name: 'GetMessages',
                          params: {
                            id_user1: UserId,
                            id_user2: value.amis.id,
                          },
                        });
                      }}
                      style={styles.post}>   
                      <View style={styles.bcBlock}>



                        <GetProfile user_id={value.amis.id} navigation={navigation} mg_prof={value.amis.img_prof} />
  
                        <View style={styles.bcDetaille}>
                        <View style={styles.bc_notifmsg}>
                          <Text style={styles.postLabel}>{value.amis.nom} </Text> 
                          {value.nbrNonLu>0 && <Text style={styles.notf}>{value.nbrNonLu}</Text>}
                          </View>
                          <Text style={[styles.bcText, value.lu === 1 && styles.bcMsgNoLu]}>{value.message}</Text>
                          <Text style={styles.postDateLabel}>envoyé le  {moment(value.date).format('MM-DD-YYYY')}</Text>
                        </View>
                      </View>
                    </TouchableOpacity>    

                    <View style={styles.rightpost}><Text></Text></View>
                  </View>
                ))
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
    minWidth: '95%',
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
    width: '5%',
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
    width: '75%',
  },
  bcText: {
    maxWidth: 90,
    color: '#6d6d6d',
  },
  bcMsgNoLu:
  {
    fontWeight: '500',
    color: "black"
  },
  bc_notifmsg:{ 
   flexDirection: 'row', 
   //padding: 10, 
   position:'relative'
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
    color:'#fff',
    textAlign: 'center',
    zIndex:20
  },
});
export default MesMessages;
