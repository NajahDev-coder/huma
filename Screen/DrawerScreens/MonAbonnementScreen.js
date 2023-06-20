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

//import { API_URL } from '../Config';

import { RequestOptionsPost, Base_url, API_URL, PublishableKeyStripe, UpdatePremium } from '../utils/utils';


const MonAbonnementScreen = ({ navigation }) => {

  const [loading, setLoading] = useState(false);




  useEffect(() => {
    // In your app’s checkout, make a network request to the backend and initialize PaymentSheet.
    // To reduce loading time, make this request before the Checkout button is tapped, e.g. when the screen is loaded.
    initialisePaymentSheet();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [UserVIP]);

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

                    <Text style={styles.titleModal}>Membre VIP!</Text>

                    <Text style={styles.titleModal}>{global.User_VIP} Mois/ parseInt((parseInt(global.User_VIP) * 10)€</Text>
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
    </View>

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
export default MonAbonnementScreen; 