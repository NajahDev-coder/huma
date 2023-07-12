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
import { useStripe } from '@stripe/stripe-react-native';
import Button from '../Components/Button';
import PaymentScreen from '../Components/PaymentScreen';
import ModalScreenIsVIP from '../ModalIsVIP';
//import { API_URL } from '../Config';

import { RequestOptionsPost, Base_url, API_URL, UpdatePremium, isVIP } from '../utils/utils';

const AbonnementScreen = ({ navigation }) => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [paymentSheetEnabled, setPaymentSheetEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [UserVIP, setUserVIP] = useState(0);
  //const [clientSecret, setClientSecret] = useState<string>();  
  const [clientSecret, setClientSecret] = useState('');

  const fetchPaymentSheetParams = async (amount) => {
    const response = await fetch(`${Base_url}api/api/abonnement/${amount}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const { paymentIntent, ephemeralKey, customer } = await response.json();
    setClientSecret(paymentIntent);
    return {
      paymentIntent,
      ephemeralKey,
      customer,
    };
  };

  const openPaymentSheet = async (choix, amount) => {
    //console.log('clientSecret', clientSecret);
    initialisePaymentSheet(amount);
    if (!clientSecret) {
      return;
    }
    setLoading(true);
    const { error } = await presentPaymentSheet({
      clientSecret,
    });

    if (error) {
      //Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      UpdatePremium(global.User_connecte, choix);
      //initialisePaymentSheet(choix, amount)
      let actv
      if (choix == 4)
        actv = `Vous êtes abonné pour  {choix} An !`;
      else
        actv = `Vous êtes abonné pour  {choix} mois!`;
      Add_historique(global.User_connecte, actv, global.User_connecte);
      global.User_VIP = choix;

      setUserVIP(choix)
      //Alert.alert('Success', 'The payment was confirmed successfully');
      navigation.navigate('MonAbonnement', { id_user: global.User_connecte })
    }
    setPaymentSheetEnabled(false);
    setLoading(false);
  };

  const initialisePaymentSheet = async (amount) => {
    const {
      paymentIntent,
      ephemeralKey,
      customer,
    } = await fetchPaymentSheetParams(amount);

    const { error } = await initPaymentSheet({
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      customFlow: false,
      merchantDisplayName: 'Example Inc.',
      style: 'alwaysDark',
    });
    if (!error) {
      setPaymentSheetEnabled(true);
    }
  };

  useEffect(() => {
    // In your app’s checkout, make a network request to the backend and initialize PaymentSheet.
    // To reduce loading time, make this request before the Checkout button is tapped, e.g. when the screen is loaded.
    // initialisePaymentSheet();
    isVIP();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [UserVIP, global.User_VIP]);

  return (
    <>
      {Platform.OS != 'web' &&
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

                    {global.User_VIP > 0 && (
                      <ModalScreenIsVIP navigation={navigation} choix={global.User_VIP} />
                    )}

                    <Text style={{ fontSize: 16, color: '#533627', padding: 8, }}>HüMA, bien plus que des échanges.</Text>
                    <Text style={{ fontSize: 18, color: '#98ab0c', padding: 8 }}>Abonnement</Text>
                    <Text style={{ fontSize: 12, padding: 20, paddingVertical: 8 }}>HûMA est gratuit, vous pouvez cependant choisir un Abonnement
                      pour une meilleure expérience.</Text>
                    <View style={styles.threeBloc}>

                      <PaymentScreen>
                        <View style={styles.blocAbnmt}>

                          <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.titleModal}>Gold - </Text>
                            <Text style={styles.chiffre}>1</Text>
                            <Text style={styles.titleModal}> mois: 12€!</Text>
                          </View>

                          <Text><Feather name="check" size={24} color="#c4d63c" /> Publier des Posts. </Text>
                          <Text><Feather name="check" size={24} color="#c4d63c" /> Recevoir des notifications. </Text>
                          <Text><Feather name="check" size={24} color="#c4d63c" /> Proposez vos offres</Text>
                          <Text><Feather name="check" size={24} color="#c4d63c" /> Vos Avis & Commentaires. </Text>
                          <Text><Feather name="check" size={24} color="#c4d63c" /> Vos Publicités Produits.</Text>
                          <View style={{ flexDirection: 'row' }}>

                            <Pressable
                              style={styles.buttVIP}
                              onPress={() => { openPaymentSheet(1, 12) }}>
                              <Text style={styles.txtbutt}>Abonnez-vous!</Text>
                            </Pressable>
                          </View>
                        </View>
                      </PaymentScreen>

                      <PaymentScreen>
                        <View style={styles.blocAbnmt}>


                          <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.titleModal}>Silver - </Text>
                            <Text style={styles.chiffre}>3</Text>
                            <Text style={styles.titleModal}> mois: 29€!</Text>
                          </View>
                          <Text><Feather name="check" size={24} color="#c4d63c" /> Publiez des Posts. </Text>
                          <Text><Feather name="check" size={24} color="#c4d63c" /> Recevoir des notifications. </Text>
                          <Text><Feather name="check" size={24} color="#c4d63c" /> Proposer des offres </Text>
                          <Text><Feather name="check" size={24} color="#c4d63c" /> Vos Avis & Commentaires. </Text>
                          <Text><Feather name="check" size={24} color="#c4d63c" /> Vos Publicités Produits.</Text>
                          <View style={{ flexDirection: 'row' }}>

                            <Pressable
                              style={styles.buttVIP}
                              onPress={() => { openPaymentSheet(2, 29) }}>
                              <Text style={styles.txtbutt}>Abonnez-vous!</Text>
                            </Pressable>
                          </View>
                        </View>
                      </PaymentScreen>

                      <PaymentScreen>
                        <View style={styles.blocAbnmt}>

                          <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.titleModal}>Gold - </Text>
                            <Text style={styles.chiffre}>6</Text>
                            <Text style={styles.titleModal}> mois: 52€!</Text>
                          </View>



                          <Text><Feather name="check" size={24} color="#c4d63c" /> Publier des Posts. </Text>
                          <Text><Feather name="check" size={24} color="#c4d63c" /> Proposer des offres </Text>
                          <Text><Feather name="check" size={24} color="#c4d63c" /> Proposer des offres </Text>
                          <Text><Feather name="check" size={24} color="#c4d63c" /> Vos Avis & Commentaires. </Text>
                          <Text><Feather name="check" size={24} color="#c4d63c" />Vos Publicités Produits.</Text>
                          <View style={{ flexDirection: 'row' }}>

                            <Pressable
                              style={styles.buttVIP}
                              onPress={() => { openPaymentSheet(3, 52) }}>
                              <Text style={styles.txtbutt}>Abonnez-vous!</Text>
                            </Pressable>
                          </View>
                        </View>
                      </PaymentScreen>
                      <PaymentScreen>
                        <View style={styles.blocAbnmt}>

                          <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.titleModal}>Platinium - </Text>
                            <Text style={styles.chiffre}>1</Text>
                            <Text style={styles.titleModal}> An  : 88€!</Text>
                          </View>
                          <Text><Feather name="check" size={24} color="#c4d63c" /> Publier des Posts. </Text>
                          <Text><Feather name="check" size={24} color="#c4d63c" /> Proposer des offres </Text>
                          <Text><Feather name="check" size={24} color="#c4d63c" /> Proposer des offres </Text>
                          <Text><Feather name="check" size={24} color="#c4d63c" /> Vos Avis & Commentaires. </Text>
                          <Text><Feather name="check" size={24} color="#c4d63c" /> Vos Publicités Produits.</Text>
                          <Text><Feather name="check" size={24} color="#c4d63c" /> Changez les Visuels de vos pubs comme vous le souhaitez et mettez vos produits
                            en avant.</Text>
                          <View style={{ flexDirection: 'row' }}>

                            <Pressable
                              style={styles.buttVIP}
                              onPress={() => { openPaymentSheet(4, 88) }}>
                              <Text style={styles.txtbutt}>Abonnez-vous!</Text>
                            </Pressable>
                          </View>
                        </View>

                      </PaymentScreen>

                    </View>



                  </View>
                </KeyboardAvoidingView>
              </View>
            </ScrollView>
          </ImageBackground>
        </View>
      }
    </>
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
    width: '80%'
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