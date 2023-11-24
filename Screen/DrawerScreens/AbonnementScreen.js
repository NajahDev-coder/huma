import React, { useEffect, useState } from 'react';
import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  Linking,
  StatusBar,
  Alert,
  Platform
} from 'react-native';
import { MaterialIcons, AntDesign, MaterialCommunityIcons, Feather, Ionicons } from '@expo/vector-icons';

import { initStripe, useStripe } from '@stripe/stripe-react-native';
import Button from '../Components/Button';
import ModalScreenIsVIP from '../ModalIsVIP';
//import { API_URL } from '../Config';

import { RequestOptionsPost, fetchPublishableKey, Add_historique, Base_url, API_URL, UpdatePremium, isVIP, RequestOptionsGet } from '../utils/utils';

const AbonnementScreen = ({ navigation }) => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [paymentSheetEnabled, setPaymentSheetEnabled] = useState(false);
  const [loading, setLoading] = useState(false);

  //const [clientSecret, setClientSecret] = useState<string>();  
  const [clientSecret, setClientSecret] = useState('');

  const [Abnmt_amount1, setAbnmtAmount1] = useState(0);
  const [Abnmt_amount2, setAbnmtAmount2] = useState(0);
  const [Abnmt_amount3, setAbnmtAmount3] = useState(0);
  const [Abnmt_amount4, setAbnmtAmount4] = useState(0);

  const [Abnmt_duree1, setAbnmtDuree1] = useState(0);
  const [Abnmt_duree2, setAbnmtDuree2] = useState(0);
  const [Abnmt_duree3, setAbnmtDuree3] = useState(0);
  const [Abnmt_duree4, setAbnmtDuree4] = useState(0);

  const fetchPaymentSheetParams = async (amount) => {
    const apiuRL = `abonnement/${amount}`
    //const response = await fetch(`${Base_url}api/api/abonnement/${amount}`);
    const response = await RequestOptionsGet(apiuRL);

    const paymentIntent = response.paymentIntent;
    const ephemeralKey = response.ephemeralKey;
    const customer = response.customer;

    setClientSecret(paymentIntent);
    return {
      paymentIntent,
      ephemeralKey,
      customer,
    };
  };
  async function initialize(amount) {
    // console.log('children::', amount)
    //const publishableKey = await fetchPublishableKey(amount, paymentMethod);
    const publishableKey = await fetchPublishableKey(amount);
    //console.log('publishableKey:::', publishableKey);
    if (publishableKey) {
      const response = await initStripe({
        publishableKey,
        merchantIdentifier: 'merchant.com.HüMA'
      });
      // console.log('response stripe:', response)
      setLoading(false);
    }
  }
  const openPaymentSheet = async (choix, amount) => {
    setLoading(true);
    await initialize(amount);
    // console.log('clientSecret', clientSecret);
    await initialisePaymentSheet(amount);

    // console.log('clientSecret:::', clientSecret)


    /*if (!clientSecret) {

      setLoading(false);
      // Alert.alert(`Une erreur est survenue lors de la tentative de traitement de votre demande!`);
      Alert.alert(`Réessayez. Désolé. Une erreur est survenue!`);

      return;

    }*/
    // console.log('clientSecret', clientSecret);

    // 
    const { error } = await presentPaymentSheet({
      clientSecret,
    });

    setLoading(false);
    if (error) {
      Alert.alert(`Réessayez. Désolé. Une erreur est survenue!`, error.message);
    } else {

      UpdatePremium(global.User_connecte, choix);
      //initialisePaymentSheet(choix, amount)
      global.User_VIP = choix;

      //  setUserVIP(choix)
      let actv;
      if (choix == 4)
        actv = `Vous êtes abonné pour  1 An !`;
      else
        actv = `Vous êtes abonné pour  ${choix} mois!`;
      Add_historique(global.User_connecte, actv, global.User_connecte);

      //Alert.alert('Success', 'The payment was confirmed successfully');
      navigation.navigate('MonAbonnement', { id_user: global.User_connecte })
    }
    setPaymentSheetEnabled(false);
    //setLoading(false);
  };

  const initialisePaymentSheet = async (amount) => {
    const {
      paymentIntent,
      ephemeralKey,
      customer,
    } = await fetchPaymentSheetParams(amount);


    const { error } = await initPaymentSheet({
      merchantDisplayName: "HüMA'",
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      allowsDelayedPaymentMethods: true,
      defaultBillingDetails: {
        name: 'Abonnement HüMA Membre',
      },
      style: 'alwaysDark',
    });
    if (!error) {
      setPaymentSheetEnabled(true);
    }
  };

  const getPackAbonnement = async () => {
    const api = 'getPackAbnmt';
    const response = await RequestOptionsGet(api);

    const amount1 = response.data[0]["prix"];
    //console.log("amount1:::", amount1)
    setAbnmtAmount1(amount1);

    //console.log('response.data prix:', amount1)

    const duree1 = response.data[0]["duree"];
    setAbnmtDuree1(duree1);

    const amount2 = response.data[1]["prix"]
    setAbnmtAmount2(amount2);

    const duree2 = response.data[1]["duree"]
    setAbnmtDuree2(duree2);

    const amount3 = response.data[2]["prix"]
    setAbnmtAmount3(amount3);

    const duree3 = response.data[2]["duree"]
    setAbnmtDuree3(duree3);

    const amount4 = response.data[3]["prix"]
    setAbnmtAmount4(amount4);

    const duree4 = response.data[3]["duree"]
    setAbnmtDuree4(duree4);

    setLoading(true);
  }
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      getPackAbonnement();
      //  isVIP();
    }
    return () => { isMounted = false }

  }, [global.User_VIP]);

  return (

    <View style={styles.mainBody}>
      <ImageBackground
        source={{ uri: Base_url + 'images/bg_screen.png' }}

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

                {global.User_VIP > 0 && (
                  <ModalScreenIsVIP navigation={navigation} choix={global.User_VIP} />
                )}

                <>
                  <Text style={{ fontSize: 16, color: '#533627', padding: 8, }}>HüMA, bien plus que des échanges.</Text>
                  <Text style={{ fontSize: 18, color: '#98ab0c', padding: 8 }}>Abonnement</Text>
                  <Text style={{ fontSize: 12, padding: 20, paddingVertical: 8 }}>HüMA est gratuit, vous pouvez cependant choisir un Abonnement
                    pour une meilleure expérience.</Text>
                </>
                {!loading ? (
                  <ActivityIndicator size="large" style={StyleSheet.absoluteFill} />
                ) :
                  (
                    <View style={styles.threeBloc}>


                      <View style={styles.blocAbnmt}>

                        <View style={{ flexDirection: 'row' }}>
                          <Text style={styles.titleModal}>Gold - </Text>
                          <Text style={styles.chiffre}>{Abnmt_duree1}</Text>
                          <Text style={styles.titleModal}> mois: {Abnmt_amount1}€ !</Text>
                        </View>

                        <Text><Feather name="check" size={24} color="#c4d63c" /> Publier des Posts. </Text>
                        <Text><Feather name="check" size={24} color="#c4d63c" /> Recevoir des notifications. </Text>
                        <Text><Feather name="check" size={24} color="#c4d63c" /> Proposez vos offres</Text>
                        <Text><Feather name="check" size={24} color="#c4d63c" /> Vos Avis & Commentaires. </Text>
                        <Text><Feather name="check" size={24} color="#c4d63c" /> Vos Publicités Produits.</Text>
                        <View style={{ flexDirection: 'row' }}>


                          <Button style={styles.buttVIP} title={'Abonnez-vous!'} onPress={() => { Platform.OS == 'web' ? Linking.openURL('https://play.google.com/store/apps/details?id=com.devnajah.HuMA') : openPaymentSheet(1, Abnmt_amount1) }} disabled={!loading} />

                        </View>
                      </View>



                      <View style={styles.blocAbnmt}>


                        <View style={{ flexDirection: 'row' }}>
                          <Text style={styles.titleModal}>Silver - </Text>
                          <Text style={styles.chiffre}>{Abnmt_duree2}</Text>
                          <Text style={styles.titleModal}> mois: {Abnmt_amount2}€ !</Text>
                        </View>
                        <Text><Feather name="check" size={24} color="#c4d63c" /> Publiez des Posts. </Text>
                        <Text><Feather name="check" size={24} color="#c4d63c" /> Recevoir des notifications. </Text>
                        <Text><Feather name="check" size={24} color="#c4d63c" /> Proposer des offres </Text>
                        <Text><Feather name="check" size={24} color="#c4d63c" /> Vos Avis & Commentaires. </Text>
                        <Text><Feather name="check" size={24} color="#c4d63c" /> Vos Publicités Produits.</Text>
                        <View style={{ flexDirection: 'row' }}>
                          <Button style={styles.buttVIP} title={'Abonnez-vous!'} onPress={() => { openPaymentSheet(2, Abnmt_amount2) }} disabled={!loading} />

                        </View>
                      </View>


                      <View style={styles.blocAbnmt}>

                        <View style={{ flexDirection: 'row' }}>
                          <Text style={styles.titleModal}>Gold - </Text>
                          <Text style={styles.chiffre}>{Abnmt_duree3}</Text>
                          <Text style={styles.titleModal}> mois: {Abnmt_amount3}€ !</Text>
                        </View>



                        <Text><Feather name="check" size={24} color="#c4d63c" /> Publier des Posts. </Text>
                        <Text><Feather name="check" size={24} color="#c4d63c" /> Proposer des offres </Text>
                        <Text><Feather name="check" size={24} color="#c4d63c" /> Proposer des offres </Text>
                        <Text><Feather name="check" size={24} color="#c4d63c" /> Vos Avis & Commentaires. </Text>
                        <Text><Feather name="check" size={24} color="#c4d63c" />Vos Publicités Produits.</Text>
                        <View style={{ flexDirection: 'row' }}>

                          <Button style={styles.buttVIP} title={'Abonnez-vous!'} onPress={() => { openPaymentSheet(3, Abnmt_amount3) }} disabled={!loading} />

                        </View>
                      </View>


                      <View style={styles.blocAbnmt}>

                        <View style={{ flexDirection: 'row' }}>
                          <Text style={styles.titleModal}>Platinium - </Text>
                          {Abnmt_duree4 == 12 ? (
                            <>
                              <Text style={styles.chiffre}>1</Text>
                              <Text style={styles.titleModal}> An : {Abnmt_amount4}€ !</Text>
                            </>
                          ) : (
                            <>
                              <Text style={styles.chiffre}>{Abnmt_duree4}</Text>
                              <Text style={styles.titleModal}> mois  : {Abnmt_amount4}€ !</Text>
                            </>
                          )
                          }
                        </View>
                        <Text><Feather name="check" size={24} color="#c4d63c" /> Publier des Posts. </Text>
                        <Text><Feather name="check" size={24} color="#c4d63c" /> Proposer des offres </Text>
                        <Text><Feather name="check" size={24} color="#c4d63c" /> Proposer des offres </Text>
                        <Text><Feather name="check" size={24} color="#c4d63c" /> Vos Avis & Commentaires. </Text>
                        <Text><Feather name="check" size={24} color="#c4d63c" /> Vos Publicités Produits.</Text>
                        <Text><Feather name="check" size={24} color="#c4d63c" /> Changez les Visuels de vos pubs comme vous le souhaitez et mettez vos produits
                          en avant.</Text>
                        <View style={{ flexDirection: 'row' }}>

                          <Button style={styles.buttVIP} title={'Abonnez-vous!'} onPress={() => { Platform.OS == 'web' ? Linking.openURL('https://play.google.com/store/search?q=huma&c=apps') : openPaymentSheet(4, Abnmt_amount4) }} disabled={!loading} />

                        </View>
                      </View>

                    </View>
                  )
                }



              </View>
            </KeyboardAvoidingView>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>

  )
}
const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    alignContent: 'center',
  },
  image: {
    resizeMode: 'cover',
    flex: 1,
  },
  threeBloc: {
    // flexDirection:'column',
    //flex:1,
    marginLeft: '3%',
    width: '95%'
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
    padding: 15,
  },

  titleModal:
  {
    fontSize: 15,
    color: 'rgba(140, 153, 44 , 0.80)',
    borderBottomColor: '#c4d63c',
    borderBottomWidth: 5,
    paddingTop: 10,
    paddingBottom: 20,
    marginBottom: 10
  },
  chiffre: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'rgba(140, 153, 44 , 0.80)',
    borderBottomColor: '#c4d63c',
    borderBottomWidth: 5,
    paddingBottom: 20,
    marginBottom: 10,
    marginTop: -5
  }
})
export default AbonnementScreen; 