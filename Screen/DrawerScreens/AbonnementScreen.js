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
  Alert
} from 'react-native';
import { useStripe } from '@stripe/stripe-react-native';
import Button from '../Components/Button';
import PaymentScreen from '../Components/PaymentScreen';
import ModalScreen from '../Modal'
//import { API_URL } from '../Config';

import { RequestOptionsPost, Base_url, API_URL, PublishableKeyStripe, UpdatePremium } from '../utils/utils';
import { set } from 'react-native-reanimated';

const AbonnementScreen = ({ navigation }) => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [paymentSheetEnabled, setPaymentSheetEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [User_VIP, setUser_VIP] = useState(false);
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

  const openPaymentSheet = async () => {
    console.log('clientSecret', clientSecret);
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
      UpdatePremium(global.User_connecte);
      const actv = 'Vous avez changer en membre VIP!';
      Add_historique(global.User_connecte, actv);
      global.User_VIP = 1;

      setUser_VIP(true)
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
  }, [User_VIP]);

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
                flex: 1,
                alignItem: 'center',
                justifyContent: 'center',

              }}>
              <View>
                <KeyboardAvoidingView enabled>
                  <View style={{ alignItems: 'center', marginTop: 100 }}>

                    <PaymentScreen>

                      <Button
                        variant="primary"
                        loading={loading}
                        disabled={!paymentSheetEnabled}
                        title="Abonnez-vous!"
                        onPress={openPaymentSheet}
                      />
                    </PaymentScreen>
                    {User_VIP && (
                      <ModalScreen navigation={navigation} />
                    )}
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
})
export default AbonnementScreen; 