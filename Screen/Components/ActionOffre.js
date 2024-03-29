import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, View, Alert } from 'react-native';
import {
  FontAwesome,
  FontAwesome5,
  AntDesign,
  MaterialIcons,
  Octicons,
  Fontisto,
  MaterialCommunityIcons,
  Ionicons,
  Feather,

} from '@expo/vector-icons';

import { SelectList } from 'react-native-dropdown-select-list'

import { Base_url, RequestOptionsPut, RequestOptionsGet, RequestOptionsPost } from '../utils/utils';
import ModalAlert from '../ModalAlert';
import ModalSuppression from '../ModalSuppression';
const ActionOffre = ({ navigation, id_annonce, id_offre, id_user_offre, id_user, id_auteur_annonce, etat, situation, onValider, onModifier, onUpdate }) => {


  const [OffreValide, setOffreValide] = useState(0);
  const [OffreEtat, setOffreEtat] = useState(etat);


  const [Valide, setValide] = useState(situation);
  const [selected, setSelected] = useState('');
  const [refreshKey, setRefreshKey] = useState(0);

  const [isAlert, setIsAlert] = useState(false);
  const [isRetirer, setIsRetirer] = useState(false);
  const [MsgAlert, setMsgAlert] = useState('');

  const DataModifier = [{ key: '1', value: 'Modifier' }, { key: '3', value: 'Retirer' }]
  //modifier ou supprimer offre
  const UpdateOffreAnnonce = async (id_offre, choix) => {

    if (choix === '3') {


      const msg = 'Êtes-vous sûr de vouloir retirer cette offre!';

      setMsgAlert(msg);
      setIsRetirer(true);
    }
    else {
      onModifier();
      //setEtatDetailsOffre(id_offre)
      setRefreshKey((oldKey) => oldKey + 1);
    }
  };

  //valider offre
  const ValidOffreAnnonce = async (navigation, id_annonce, id_offre, etat_acc, id_user1, id_user2) => {
    //console.log('ValidOffreAnnonce eta:',etat_acc);  
    if (etat_acc == 5) {

      navigation.navigate('Membres');
    }
    else {
      const baseUrl = Base_url + `api/api/valid_offre/${id_offre}`;
      //const baseUrl = "https://jsonplaceholder.typicode.com/posts";
      const data = await fetch(baseUrl, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          etat_valid: etat_acc,
          id_annonce: id_annonce,
          id_user1: id_user1,
          id_user2: id_user2,
        }),
      })
        .then((response) => response.json())
        .then((responseJson) => {

          setOffreEtat(etat_acc);

          if (etat_acc == 1) {
            const msg = 'Votre choix est enregistré!';
            setMsgAlert(msg);
            setIsAlert(true);
          }
          if (etat_acc == 2) {
            const msg = 'Votre offre est confirmée!';
            setMsgAlert(msg);
            setIsAlert(true);
          }
          if (etat_acc == 3) {
            const msg = 'Votre offre est annulée!';
            setMsgAlert(msg);
            setIsAlert(true);
          }

          onValider();
          setRefreshKey((oldKey) => oldKey + 1);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      if (MsgAlert != '')
        console.log(MsgAlert)
    }
  }, [isAlert, isRetirer, refreshKey])
  return (
    <>

      {(id_auteur_annonce == id_user && OffreEtat == 1) &&


        <Fontisto
          name="checkbox-active"
          size={16}
          style={{ position: 'absolute', top: 5, right: 0 }}
          color="#c4d63c"
          onPress={() => {
            ValidOffreAnnonce(
              navigation,
              id_annonce,
              id_offre,
              0,
              id_auteur_annonce,
              id_user_offre,
            );
          }}
        />

      }


      {/*offre validée*/}

      {(OffreEtat === 2 && (id_user_offre == id_user || id_auteur_annonce == id_user)) &&

        <SelectList
          setSelected={setSelected}
          data={[{ key: 5, value: 'Livrer' }, { key: 3, value: 'Annuler' }, { key: 4, value: 'Retirer' }]}
          onSelect={() => {
            ValidOffreAnnonce(
              navigation,
              id_annonce,
              id_offre,
              selected,
              id_user,
              id_auteur_annonce,
            )
          }}
          search={false}
          arrowicon={<AntDesign name="check" style={{ position: 'absolute', top: 5, right: 0 }} size={18} color="#c4d63c" />}
          boxStyles={styles.boxdropstyle}
          inputStyles={{ opacity: 0, padding: 0, height: 20, }}
          dropdownStyles={styles.dropstyle}
          dropdownItemStyles={styles.itemdropstyle}
        />
      }
      { /*offre annulé*/}
      {(OffreEtat === 3 && id_auteur_annonce == id_user) &&
        <MaterialCommunityIcons name="alert-circle-check-outline" size={22} color="grey"
          style={{ position: 'absolute', top: 5, right: 0 }} />
      }

      {(OffreEtat === 3 && id_user_offre == id_user) &&

        <SelectList
          setSelected={setSelected}
          data={[{ key: 2, value: 'Valider' }, { key: 4, value: 'Retirer' }]}
          onSelect={() => {
            ValidOffreAnnonce(
              navigation,
              id_annonce,
              id_offre,
              selected,
              id_user,
              id_auteur_annonce,
            )
          }}
          search={false}
          arrowicon={<MaterialCommunityIcons name="alert-circle-check-outline" size={22} color="grey"
            style={{ position: 'absolute', top: 5, right: 0 }} />}
          boxStyles={styles.boxdropstyle}
          inputStyles={{ opacity: 0, padding: 0, height: 20, }}
          dropdownStyles={styles.dropstyle}
          dropdownItemStyles={styles.itemdropstyle}
        />
      }

      {(id_auteur_annonce == id_user && (!situation || OffreEtat != 3) && OffreEtat != 1 && OffreEtat != 2) &&
        <Fontisto
          name="checkbox-passive"
          size={16}
          style={{ position: 'absolute', top: 5, right: 0 }}
          color="black"
          onPress={() => {
            ValidOffreAnnonce(
              navigation,
              id_annonce,
              id_offre,
              1,
              id_auteur_annonce,
              id_user_offre,
            );
          }}
        />
      }

      {/*offre selectionné*/}

      {(OffreEtat === 1 && id_user_offre == id_user) &&
        <SelectList
          setSelected={setSelected}
          data={[{ key: 2, value: 'Valider' }, { key: 3, value: 'Annuler' }, { key: 4, value: 'Retirer' }]}
          onSelect={() => {
            ValidOffreAnnonce(
              navigation,
              id_annonce,
              id_offre,
              selected,
              id_user,
              id_auteur_annonce,
            )
          }}
          search={false}
          arrowicon={<Ionicons name="checkmark-done"
            style={{ position: 'absolute', top: 5, right: 0 }} size={18} color="#c4d63c" />}
          boxStyles={styles.boxdropstyle}
          inputStyles={{ opacity: 0, padding: 0, height: 20, }}
          dropdownStyles={styles.dropstyle}
          dropdownItemStyles={styles.itemdropstyle}
        />
      }
      {/*modifier offre */}

      {(OffreEtat === 0 && id_user_offre == id_user) && (

        <SelectList
          setSelected={(val) => setSelected(val)}
          data={[{ key: '1', value: 'Modifier' }, { key: '3', value: 'Retirer' }]}
          onSelect={() => { UpdateOffreAnnonce(id_offre, selected) }}
          search={false}
          //defaultOption={{ key:'2', value:' CC' }} 
          arrowicon={<Feather name="more-vertical" size={18} style={{ position: 'absolute', top: 0, right: 0 }} color="black" />}
          boxStyles={styles.boxdropstyle}
          inputStyles={{ opacity: 0, padding: 0, height: 20, }}
          dropdownStyles={styles.dropstyle}
          dropdownItemStyles={styles.itemdropstyle}
        // save="value"
        />
      )}


      {isAlert && (
        <ModalAlert msgAlerte={MsgAlert} />
      )}
      {isRetirer && (

        <ModalSuppression navigation={navigation} msgAlerte={MsgAlert} id={id_offre} type='offre' onSupp={setRefreshKey((oldKey) => oldKey + 1)} />

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

    marginTop: -32,
    zIndex: 20,
    marginLeft: -5,
    padding: 0,
    paddingVertical: 0,
    borderRadius: 0,
    borderWidth: 0,
    backgroundColor: 'transparent',
    width: 100

  },
  itemdropstyle:
  {
    zIndex: 20,
    paddingVertical: 5,
    fontWeight: 'bold',
    borderRadius: 6,
    marginBottom: 2,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#909475',
    width: 100
  },

})
export default ActionOffre;
