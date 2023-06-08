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

import { RequestOptionsPost, Base_url, API_URL, PublishableKeyStripe, UpdatePremium } from '../utils/utils';
import { set } from 'react-native-reanimated';

const AbonnementScreen = ({ navigation }) => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [paymentSheetEnabled, setPaymentSheetEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [UserVIP, setUserVIP] = useState(0);
  //const [clientSecret, setClientSecret] = useState<string>();  
  const [clientSecret, setClientSecret] = useState('');

  const fetchPaymentSheetParams = async () => {
    const response = await fetch(`${API_URL}/payment-sheet`, {
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

  const openPaymentSheet = async (choix) => {
    //console.log('clientSecret', clientSecret);
    if (!clientSecret) {
      return;
    }
    setLoading(true);
    const { error } = await presentPaymentSheet({
      clientSecret,
    });

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      UpdatePremium(global.User_connecte, choix);
      const actv = `Vous êtes abonné pour  {choix} mois!`;
      Add_historique(global.User_connecte, actv, global.User_connecte);
      global.User_VIP = choix;

      setUserVIP(choix)
      //Alert.alert('Success', 'The payment was confirmed successfully');
    }
    setPaymentSheetEnabled(false);
    setLoading(false);
  };

  const initialisePaymentSheet = async () => {
    const {
      paymentIntent,
      ephemeralKey,
      customer,
    } = await fetchPaymentSheetParams();

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
    initialisePaymentSheet();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [UserVIP]);

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
                    {UserVIP > 0 && (
                      <ModalScreenIsVIP navigation={navigation} choix={UserVIP} />
                    )}
                    <View style={styles.threeBloc}>

                      <View style={styles.blocAbnmt}>

                        <Text style={styles.titleModal}>Devnir Membre VIP!</Text>

                        <Text style={styles.titleModal}>1 Mois/ 10€</Text>
                        <Text><Feather name="check" size={24} color="#c4d63c" /> Créer des annonces. </Text>
                        <Text><Feather name="check" size={24} color="#c4d63c" /> Proposer des offres </Text>
                        <Text><Feather name="check" size={24} color="#c4d63c" /> Donner votre Avis. </Text>
                        <Text><Feather name="check" size={24} color="#c4d63c" />Ajouter des publicités.</Text>
                        <View style={{ flexDirection: 'row' }}>

                          <Pressable
                            style={styles.buttVIP}
                            onPress={() => { openPaymentSheet(1) }}>
                            <Text style={styles.txtbutt}>Abonnez-vous!</Text>
                          </Pressable>
                        </View>
                      </View>

                      <View style={styles.blocAbnmt}>

                        <Text style={styles.titleModal}>Devnir Membre VIP!</Text>

                        <Text style={styles.titleModal}>3 Mois/ 25€</Text>
                        <Text><Feather name="check" size={24} color="#c4d63c" /> Créer des annonces. </Text>
                        <Text><Feather name="check" size={24} color="#c4d63c" /> Proposer des offres </Text>
                        <Text><Feather name="check" size={24} color="#c4d63c" /> Donner votre Avis. </Text>
                        <Text><Feather name="check" size={24} color="#c4d63c" />Ajouter des publicités.</Text>
                        <View style={{ flexDirection: 'row' }}>

                          <Pressable
                            style={styles.buttVIP}
                            onPress={() => { openPaymentSheet(2) }}>
                            <Text style={styles.txtbutt}>Abonnez-vous!</Text>
                          </Pressable>
                        </View>
                      </View>

                      <View style={styles.blocAbnmt}>

                        <Text style={styles.titleModal}>Devnir Membre VIP!</Text>

                        <Text style={styles.titleModal}>6 Mois/ 45€</Text>
                        <Text><Feather name="check" size={24} color="#c4d63c" /> Créer des annonces. </Text>
                        <Text><Feather name="check" size={24} color="#c4d63c" /> Proposer des offres </Text>
                        <Text><Feather name="check" size={24} color="#c4d63c" /> Donner votre Avis. </Text>
                        <Text><Feather name="check" size={24} color="#c4d63c" />Ajouter des publicités.</Text>
                        <View style={{ flexDirection: 'row' }}>

                          <Pressable
                            style={styles.buttVIP}
                            onPress={() => { openPaymentSheet(3) }}>
                            <Text style={styles.txtbutt}>Abonnez-vous!</Text>
                          </Pressable>
                        </View>
                      </View>
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
  }
})
export default AbonnementScreen; 