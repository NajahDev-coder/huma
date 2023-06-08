import React, { useState, createRef, useEffect, useCallback } from 'react';
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
  ActivityIndicator
} from 'react-native';
import { RequestOptionsPut, RequestOptionsGet, RequestOptionsPost, Add_historique } from '../utils/utils';
import { SelectList } from 'react-native-dropdown-select-list';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Ionicons
} from '@expo/vector-icons';
import ActionOffre from './ActionOffre';
import FavorisOffre from './FavorisOffre';
import GetSession from '../Components/GetSession';
import GetProfile from '../Components/GetProfile';
import DetailleOffre from './DetailleOffre';
import { Base_url } from '../utils/utils';
import RatingScreen from './RatingScreen';
import ModalAlert from '../ModalAlert';
const GetOffres = ({ navigation, id_annonce, id_auteur_annonce, id_user }) => {


  const [isAlert, setIsAlert] = useState(false);
  const [MsgAlerte, setMsgAlert] = useState('');
  const [selected, setSelected] = useState("");
  const [Offres, setOffres] = useState([]);
  // const url = 'https://huma.bzh/';
  const [UserOffre, setUserOffre] = useState('');
  const [text, setText] = useState('');
  const [errortext, setErrortext] = useState('');
  const [loading, setLoading] = useState(true);
  const [animating, setAnimating] = useState(false);
  const [OffFocus, setOffFocus] = useState(false);
  const [traitementAnnonce, setTraitementAnnonce] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [etatDetailsOffre, setEtatDetailsOffre] = useState(0);
  const [dejaOffre, setDejaOffre] = useState(false);


  const UpModifier = (id_offre) => {
    setEtatDetailsOffre(id_offre);
    setRefreshKey((oldKey) => oldKey + 1);
  }
  const UpValider = (etat) => {

    setTraitementAnnonce(etat);
    setRefreshKey((oldKey) => oldKey + 1);
  }

  //add offre
  const handleSubmitPress = () => {

    if (!UserOffre) {
      const msg = "Veuillez saisir votre Offre!";
      setMsgAlert(msg);
      setIsAlert(true);
      return;
    }

    let dataToSend = {
      id_user: id_user,
      id_annonce: id_annonce,
      detaille: UserOffre,
    };

    const fetchUrl = 'offre/create';

    RequestOptionsPost(dataToSend, fetchUrl).then((response, error) => {

      if (response.status == 'success') {
        Add_historique(global.User_connecte, `Vous avez proposé une offre pour la demande ${id_annonce}`, id_annonce);

        setUserOffre(' ');
        setOffFocus(false);
        setRefreshKey((oldKey) => oldKey + 1);
        //console.log('Offre publié avec success!');
      }
    })
  };

  //fetch offres
  const fetchData = useCallback(async () => {

    const fetchUrl = `offres/${id_annonce}`;

    RequestOptionsGet(fetchUrl).then((response, error) => {
      if (response.data.length > 0) {
        setOffres(response.data);
        const offfres = response.data;
        Object.entries(offfres).forEach(([key, value]) => {

          if (value.etat_acc > 0) {
            setTraitementAnnonce(true);
          }
          if (value.id_user == global.User_connecte) {
            setDejaOffre(true);
          }
        });
      }

      setAnimating(false);

    })

  }, [id_annonce]);

  useEffect(() => {
    let isSubscribed = true;
    setAnimating(true);

    //setTimeout(() => {
    if (isSubscribed) {
      fetchData();
    }
    // }, 1000)   
    return () => { isSubscribed = false; }
  }, [refreshKey, fetchData]);


  return (
    <>
      {animating ? (
        <View style={{ alignItems: 'center', justifyContent: 'center', }}>

          <ActivityIndicator
            animating={animating}
            color="#c4d63c"
            size="large"
            style={styles.activityIndicator}
          />

          <Text style={{ color: '#cccccc' }}>Loading Offres...</Text>
        </View>)
        : (
          <View style={{ width: '100%' }}>
            <KeyboardAvoidingView enabled>
              {Offres.map((value) => (
                <>
                  {value.etat_acc != 4 &&
                    <TouchableOpacity key={value.id} style={styles.post}>
                      <View style={styles.bcBlock}>

                        <GetProfile user_id={value.id} img_prof={value.img_prof} navigation={navigation} />

                        <View style={styles.bcDetaille}>
                          <View style={{ zIndex: 20, position: 'absolute', top: 0, right: 0, padding: 0, width: 100 }}>

                            <FavorisOffre id_annonce={id_annonce} id_offre={value.ID_offre} id_user_offre={value.id} id_user={id_user} id_auteur_annonce={id_auteur_annonce} favoris={value.favoris} />

                            <ActionOffre navigation={navigation} id_annonce={id_annonce} id_offre={value.ID_offre} id_user_offre={value.id} id_user={id_user} id_auteur_annonce={id_auteur_annonce} etat={value.etat_acc} situation={traitementAnnonce} onValider={() => { UpValider(!value.etat_acc) }} onModifier={() => { UpModifier(value.ID_offre) }} onUpdate={() => { setRefreshKey((oldKey) => oldKey + 1); }} />
                          </View>
                          <View style={{ zIndex: 1 }}>
                            <Text style={styles.postLabel}>{value.nom}</Text>
                            <RatingScreen user_id1={value.id} user_id2={0} />

                            {(id_auteur_annonce == id_user || value.id_user == id_user) ?
                              <DetailleOffre id_offre={value.ID_offre} offre={value.detaille} etat={etatDetailsOffre} />
                              : (
                                <Text style={styles.bcText}>A proposé une offre.</Text>
                              )}
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                              <Text style={styles.bcSmText}>
                                publiée le {moment(value.date).format('MM-DD-YYYY')} à  {moment(value.date).format('hh:mm')}
                              </Text>
                            </View>
                          </View>

                        </View>
                      </View>
                    </TouchableOpacity>
                  }
                </>
              ))}
            </KeyboardAvoidingView>
          </View>
        )}

      {!dejaOffre && id_user && id_auteur_annonce != id_user && (
        <View style={{ width: '97%', padding: 3, marginLeft: 4 }}>
          <TextInput
            multiline={true}
            style={styles.inputStyle}
            onChangeText={(UserOffre) => {
              setUserOffre(UserOffre);
            }}
            onKeyPress={(e) => {
              UserOffre === '' ? setOffFocus(false) : setOffFocus(true);
            }}
            placeholder="Donner votre offre..."
            placeholderTextColor="#8b9cb5"
            numberOfLines={4}
          />
          {errortext ? (
            <Text style={styles.errorTextStyle}>{errortext}</Text>
          ) : null}
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
      )}
      {isAlert && (
        <ModalAlert msgAlerte={MsgAlerte} />
      )}
    </>
  );
};
const styles = StyleSheet.create({
  post: {
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: '#ffffff',
    alignSelf: 'flex-start',
    marginHorizontal: '2%',
    marginBottom: 15,
    width: '95%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 7,
    zIndex: 1
  },
  postLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#c4d63c',
  },
  bcBlock: {
    flexDirection: 'row',
  },
  bcDetaille: {
    alignSelf: 'flex-start',
    margin: 7,
    width: '80%',
  },
  bcText: {
    maxWidth: '100%',
  },
  bcSmText: {
    fontSize: 11,
    marginTop: 14,
    marginRight: 5
  },
  buttonTextStyle: {
    color: '#DCDCDC',
  },
  buttonTextActiveStyle: {
    color: '#1E90FF',
    fontWeight: '900',
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
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
});
export default GetOffres;
