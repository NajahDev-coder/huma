import React, { useState, createRef, useEffect, useRef } from 'react';
import {
  Animated,
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
  Button
} from 'react-native';
import {
  FontAwesome,
  FontAwesome5,
  AntDesign,
  MaterialIcons,
  Octicons,
  Fontisto,
  Ionicons,
  MaterialCommunityIcons
} from '@expo/vector-icons';
import { Base_url, RequestOptionsGet, RequestOptionsPost, Add_historique } from './utils/utils'

import { SelectList } from 'react-native-dropdown-select-list'
export default EstAmis = ({ id_user1, id_user2, navigation }) => {
  const [estAmis, setEstAmis] = useState(0);
  const [selected, setSelected] = useState('');
  const [refreshKey, setRefreshKey] = useState(0);
  const [UserInvited, setUserInvited] = useState(0);

  /*CHECK IF AMI*/

  useEffect(() => {
    let isSubscribed = true;

    const isAmis = async (id_user1, id_user2) => {
      const fetchUrl = `is_amis/${id_user1}/${id_user2}`;
      const responseJson = await RequestOptionsGet(fetchUrl)

      if (responseJson.data.length > 0) {

        setUserInvited(responseJson.data[0].id_user1)
        setEstAmis(responseJson.data[0].etat_acc);
        setRefreshKey((oldKey) => oldKey + 1);
      } else {
        setEstAmis(0);
        //setRefreshKey((oldKey) => oldKey + 1);
      }

    };
    if (isSubscribed) {
      isAmis(id_user1, id_user2);
    }
    return () => (isSubscribed = false);
  }, [estAmis]);

  //add /delete liste amis
  const listeAmis = async (MyUserId, UserId, etatAmis) => {

    const fetchUrl = `update_liste_amis`;
    //const baseUrl = "https://jsonplaceholder.typicode.com/posts";  

    let dataToSend = {
      id_user1: MyUserId,
      id_user2: UserId,
      eamis: etatAmis
    };


    var activite;
    if (etatAmis == 1)
      activite = `Vous avez envoyé une invitation à ${UserId}`;
    if (etatAmis == 2)
      activite = `Vous avez accepté une invitation de ${UserId}`;
    if (etatAmis == 3)
      activite = `Vous avez refusé une invitation de ${UserId}`;
    if (etatAmis == 0)
      activite = `Vous avez annulé une invitation de ${UserId}`;
    //console.log(activite)
    const responseJson = await RequestOptionsPost(dataToSend, fetchUrl)
    //console.log(responseJson)
    if (responseJson.status) {

      Add_historique(global.User_connecte, activite, UserId);
      //setRefreshKey((oldKey) => oldKey + 1);     
      setEstAmis(etatAmis)
    }
  };

  return (
    <>
      {estAmis == 2 && (
        <>
          <AntDesign
            name="message1"
            size={20}
            style={{ margin: 4 }}
            color="#c4d63c"
            onPress={() => {
              navigation.navigate({
                name: 'GetMessages',
                params: {
                  id_user1: id_user1,
                  id_user2: id_user2,
                },
              });
            }}
          />
          <Ionicons
            name="person"
            size={20}
            style={{ margin: 4 }}
            color="#c4d63c"
            onPress={() => {
              listeAmis(id_user1, id_user2, 0);
            }}
          />
        </>
      )}

      {estAmis == 1 && (UserInvited != global.User_connecte) && (

        <SelectList
          setSelected={(val) => setSelected(val)}
          data={[{ key: 2, value: 'Accepter' }, { key: 3, value: 'Refuser' }]}
          onSelect={() => {
            listeAmis(id_user1, id_user2, selected);
          }}
          search={false}
          arrowicon={<Text style={styles.txtbutt} ><MaterialCommunityIcons name="account-question" size={20} color="white" style={{ marginLeft: 5, marginTop: 3 }} /> Répondre</Text>}

          boxStyles={styles.boxdropstyle}
          inputStyles={{ opacity: 0 }}
          dropdownStyles={styles.dropstyle}
          dropdownItemStyles={styles.itemdropstyle}
        />
      )}
      {estAmis == 1 && UserInvited == global.User_connecte && (

        <SelectList

          setSelected={(val) => setSelected(val)}
          data={[{ key: 0, value: 'Annuler' }]}

          onSelect={() => {
            listeAmis(id_user1, id_user2, selected);
          }}
          search={false}
          arrowicon={<View style={styles.viewBT}><Text style={styles.txtbutt} ><MaterialCommunityIcons name="account-question" size={20} color="white" style={{ marginLeft: 5, marginTop: 3 }} /> Demande envoyée</Text></View>}
          boxStyles={styles.boxdropstyle}
          inputStyles={{ opacity: 0 }}
          dropdownStyles={styles.dropstyle}
          dropdownItemStyles={styles.itemdropstyle}
        />
      )}
      {estAmis == 0 && (
        <Ionicons
          name="person-add"
          size={20}
          style={{ margin: 4 }}
          color="black"
          onPress={() => {
            listeAmis(id_user1, id_user2, 1);
          }}
        />
      )}
    </>
  );
};
const styles = StyleSheet.create({


  boxdropstyle:
  {
    borderRadius: 0,
    borderWidth: 0,
    padding: 0,

  },
  dropstyle:
  {

    margin: 0,
    zIndex: 20,

    padding: 0,
    paddingVertical: 0,

    borderRadius: 6,

    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#909475'
  },
  itemdropstyle:
  {
    zIndex: 20,
    paddingVertical: 5,
    fontWeight: 'bold'
  },
  viewBT: {
    paddingBottom: 2,
    position: 'absolute', top: 0, right: 0
  },
  txtbutt:
  {
    color: '#FFFFFF',
    fontSize: 11,
    borderWidth: 0,
    borderRadius: 3,
    backgroundColor: '#a3ad56',
    paddingBottom: 5,
    paddingRight: 5,
    marginTop: 5,
    width: 128
  },
})