import React, { useEffect, useState } from 'react';
import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Alert,
  Pressable
} from 'react-native';

import { MaterialIcons, AntDesign, MaterialCommunityIcons, Feather, Ionicons } from '@expo/vector-icons';

import { RequestOptionsGet } from '../utils/utils';

import { RequestOptionsPost, Base_url, API_URL, UpdatePremium } from '../utils/utils';


import { durationInMonths, addMonths } from '@progress/kendo-date-math';

import moment from 'moment';
const MonAbonnementScreen = ({ navigation }) => {

  const [loading, setLoading] = useState(false);
  const [RestAbnmt, setRestAbnmt] = useState(0);



  useEffect(() => {
    // In your app’s checkout, make a network request to the backend and initialize PaymentSheet.
    // To reduce loading time, make this request before the Checkout button is tapped, e.g. when the screen is loaded.
    //   initialisePaymentSheet();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const getDayAbnmt = async () => {
      const fetchUrl = `user/${global.User_connecte}`;
      const response = await RequestOptionsGet(fetchUrl)
      //console.log('isvip?', response)
      if (response.data.length > 0) {
        const MmebreisVIP = response.data[0].VIP;

        let Date_abonnement = new Date(response.data[0].date_abonnement)
        Date_abonnement = moment(Date_abonnement, 'DD-MM-YYYY')
        // const ToDay = new Date();

        let endDateAbnmt
        if (global.User_VIP < 4)
          endDateAbnmt = moment(Date_abonnement).add(global.User_VIP, 'M');
        else
          endDateAbnmt = moment(Date_abonnement).add(12, 'M');

        const restDay = endDateAbnmt.diff(Date_abonnement, 'days');
        //const diffDuration = moment.duration(diff);
        //const duration = durationInMonths(Date_abonnement, ToDay);
        // const restDay = diffDuration.days()

        setRestAbnmt(restDay)
      }
    }
    getDayAbnmt();
  }, []);

  return (


    <View style={styles.mainBody}>
      <ImageBackground
        source={{ uri: Base_url + 'images/bg_screen.png' }}
        resizeMode="cover"
        style={styles.image}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            // flex: 1,
            alignItem: 'center',
            justifyContent: 'center',

          }}>
          <View>
            <KeyboardAvoidingView enabled>
              <View style={{ alignItems: 'center', marginTop: 20, width: '100%' }}>

                <View style={styles.threeBloc}>

                  <View style={styles.blocAbnmt}>

                    <Text style={styles.titleModal}>Vous êtes Membre VIP!</Text>
                    <Text style={styles.titleModal2} > Votre abonnement est actif</Text>
                    {global.User_VIP < 4 ? (
                      <Text style={styles.titleModal}>Forfait VIP Plan  {global.User_VIP} Mois</Text>
                    ) : (
                      <Text style={styles.titleModal}>Forfait VIP Plan  1 An</Text>
                    )}
                    <Text style={{ fontWeight: 'bold', fontSize: 12, marginTop: 10, marginBottom: 25 }}>Vous reste encore {RestAbnmt} Jour(s)</Text>
                    <Text><Feather name="check" size={24} color="#c4d63c" /> Publier des annonces. </Text>
                    <Text><Feather name="check" size={24} color="#c4d63c" /> Proposer des offres </Text>
                    <Text><Feather name="check" size={24} color="#c4d63c" /> Vos Avis & Commentaires. </Text>
                    <Text><Feather name="check" size={24} color="#c4d63c" />Vos Publicités Produits.</Text>
                    <View style={{ flexDirection: 'row' }}>


                    </View>

                  </View>

                </View>



              </View>
            </KeyboardAvoidingView>
          </View>
        </ScrollView>
      </ImageBackground>
    </View >

  )
}
const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    alignContent: 'center',
  },
  image: {
    flex: 1,
  },
  threeBloc: {
    // flexDirection:'column',
    //flex:1,
    width: '90%'
  },
  blocAbnmt: {
    // width:'30%',
    margin: 10,
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
    shadowRadius: 5.46,
    elevation: 7,
    flexDirection: 'column',
  },

  txtbutt:
  {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold'
  },
  buttVIP:
  {
    margin: 10,
    borderWidth: 0,
    borderRadius: 10,
    backgroundColor: '#c4d63c',
    padding: 10,
  },

  titleModal:
  {
    fontSize: 15,
    color: 'rgba(140, 153, 44 , 0.80)',
    borderBottomColor: '#c4d63c',
    borderBottomWidth: 5,
    paddingBottom: 20,
    marginBottom: 10
  },

  titleModal2:
  {
    fontSize: 15,
    color: '#823a14',
    borderBottomColor: '#823a14',
    borderBottomWidth: 5,
    paddingBottom: 20,
    marginBottom: 10
  }
})
export default MonAbonnementScreen; 