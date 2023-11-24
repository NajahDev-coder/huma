import React, { useEffect, useState, useMemo } from 'react';
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
  FlatList,
  Linking,
  StatusBar,
  Alert,
  Pressable,
  Platform
} from 'react-native';
import ModalAlert from '../ModalAlert';
import RadioGroup from 'react-native-radio-buttons-group';
import { initStripe, useStripe } from '@stripe/stripe-react-native';
import { MaterialIcons, AntDesign, MaterialCommunityIcons, Feather, Ionicons } from '@expo/vector-icons';

import Button from '../Components/Button';


//import { API_URL } from '../Config';

import { RequestOptionsPost, fetchPublishableKeyDonate, Add_historique, Base_url, API_URL, InsertDonation, isVIP, RequestOptionsGet } from '../utils/utils';

const DonateScreen = ({ navigation }) => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [paymentSheetEnabled, setPaymentSheetEnabled] = useState(false);
  const [loading, setLoading] = useState(false);

  //const [clientSecret, setClientSecret] = useState<string>();  
  const [clientSecret, setClientSecret] = useState('');

  const [DonateAmount, setDonateAmount] = useState(2);

  const [DonateDuree, setDonateDuree] = useState(12);
  const [choixDuree, setChoixDuree] = useState('PAR MOIS');
  const [NbreDuree, setNbreDuree] = useState(1);
  const [isAlert, setIsAlert] = useState(false);
  const [MsgAlerte, setMsgAlert] = useState('');

  const fetchPaymentSheetParams = async (duree, amount) => {
    const apiuRL = `donate/${amount}/${duree}`
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
  async function initialize(amount, duree) {

    const publishableKey = await fetchPublishableKeyDonate(amount, duree);
    //console.log('publishableKey:::', publishableKey);
    if (publishableKey) {
      const response = await initStripe({
        publishableKey,
        merchantIdentifier: 'merchant.com.HüMA'
      });
      // console.log('response stripe:', response)

    }
  }
  const openPaymentSheet = async (duree, amount) => {
    setLoading(true);
    await initialize(amount, duree);

    await initialisePaymentSheet(duree, amount);

    console.log('clientSecret:::', clientSecret)
    /* if (!clientSecret) {
 
       setLoading(false);
       // Alert.alert(`Une erreur est survenue lors de la tentative de traitement de votre demande!`);
       Alert.alert(`Réessayez. Désolé. Une erreur est survenue!`);
 
       return;
 
     }*/
    const { error } = await presentPaymentSheet({
      clientSecret,
    });
    setLoading(false);
    if (error) {
      Alert.alert(`Réessayez. Désolé. Une erreur est survenue!`, error.message);
    } else {

      InsertDonation(global.User_connecte, amount, duree);
      //initialisePaymentSheet(choix, amount)
      let actv = `Vous avez Fait un Don de  ${amount}€ pour  ${duree} mois!`;
      Add_historique(global.User_connecte, actv, global.User_connecte);


      const msg = "Votre Don nous a beaucoup touché et nous vous remercions vivement pour ce geste!";
      setMsgAlert(msg);
      setIsAlert(true);


    }
    setPaymentSheetEnabled(false);
    //setLoading(false);
  };
  const DataTarifs = [
    {
      id: 't1',
      value: 2,
      title: '2€',
    },
    {
      id: 't2',
      value: 5,
      title: '5€',
    },
    {
      id: 't3',
      value: 10,
      title: '10€',
    },
    {
      id: 't4',
      value: 25,
      title: '25€',
    },
    {
      id: 't5',
      value: 50,
      title: '50€',
    },
    {
      id: 't6',
      value: 100,
      title: '100€',
    },
    {
      id: 't7',
      value: 200,
      title: '200€',
    },
    {
      id: 't8',
      value: 500,
      title: '500€',
    },
  ];

  const initialisePaymentSheet = async (duree, amount) => {
    const {
      paymentIntent,
      ephemeralKey,
      customer,
    } = await fetchPaymentSheetParams(duree, amount);


    const { error } = await initPaymentSheet({
      merchantDisplayName: "HüMA'",
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      allowsDelayedPaymentMethods: true,
      defaultBillingDetails: {
        name: 'HüMA Donation',
      },
      style: 'alwaysDark',
    });
    if (!error) {
      setPaymentSheetEnabled(true);
    }
  };
  const choixDON = (val) => {

    if (val == 1) {
      setChoixDuree('PAR MOIS');
      setNbreDuree(1);
      setDonateDuree(12)
    }
    else {
      setChoixDuree(' ');
      setNbreDuree(2);
      setDonateDuree(1)
    }
  }
  const dureeButtons = useMemo(() => ([


    {
      id: 1,
      label: 'Tous les mois (annulez quand vous voulez)',
      value: 1
    },
    {
      id: 2,
      label: 'Une seule fois',
      value: 2
    }
  ]), []);

  useEffect(() => {

  }, [isAlert])

  return (

    <View style={styles.mainBody}>
      <ImageBackground
        source={{ uri: Base_url + 'images/bg_screen.png' }}

        style={styles.image}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
        >
          <View>
            <KeyboardAvoidingView enabled>

              <View style={styles.threeBloc}>

                <View style={styles.blocAbnmt}>
                  <View>
                    <Text style={{ fontSize: 16, color: '#533627', paddingBottom: 10 }}>HüMA, bien plus que des échanges.</Text>
                    <Text style={styles.titleModal}>Dons</Text>

                    <Text style={styles.paragraph}>
                      Soutenez HüMA et ses efforts pour développer et fluidifier les échanges entre Humains, chaque don, grand ou petit, nous permet d'aller plus loin. Donnez aujourd'hui et faites partie de la solution de Solidarité entre les Membres !
                    </Text>
                    <Text style={styles.paragraph}>
                      Nous avons besoin de vous afin de créer une Plateforme qui facilite les échanges, Trocs, Dons de biens et services
                      entre Membres de notre Communauté, en cette période où chacun de nous pense qu'il pourrait lui aussi se retrouver demain dans le besoin.
                    </Text>

                    <Text style={styles.titleModal}>Faire un Don à HüMA</Text>
                    <Text style={styles.paragraph}>Montant</Text>

                  </View>

                  <View style={styles.row}>
                    <FlatList
                      data={DataTarifs}
                      renderItem={({ item }) => (
                        <TouchableOpacity
                          key={item.id}
                          onPress={() => {
                            setDonateAmount(item.value);
                          }}
                          style={[styles.btAmount, item.value == DonateAmount &&
                            { backgroundColor: '#4c362b' }
                          ]}>
                          <Text style={{ color: 'white' }
                          } > {item.title} </Text>
                        </TouchableOpacity>
                      )}
                      horizontal={true}
                      keyExtractor={item => item.id}
                    />
                  </View>
                  <View style={{ padding: 0, margin: 5 }}>
                    <RadioGroup
                      radioButtons={dureeButtons}
                      onPress={choixDON}
                      selectedId={NbreDuree}
                      borderColor='#c4d63c'
                      layout='column'
                      containerStyle={{ alignContent: 'flex-start', alignItems: 'flex-start' }}
                    />
                  </View>

                  <View style={{ flex: 1, alignContent: 'center', width: '100%' }}>

                    <Button style={styles.buttVIP} title={`Donner ${DonateAmount}€ ${choixDuree}`} onPress={() => { Platform.OS == 'web' ? Linking.openURL('https://play.google.com/store/apps/details?id=com.devnajah.HuMA') : openPaymentSheet(DonateDuree, DonateAmount) }} disabled={loading} />

                  </View>

                </View>
              </View>

              {isAlert && (
                <ModalAlert msgAlerte={MsgAlerte} action={() => { navigation.navigate('Accueil'); }} />
              )}
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

  },
  image: {
    resizeMode: 'cover',
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 14, padding: 15, paddingVertical: 8
  },
  threeBloc: {

    marginLeft: '2%',
    marginVertical: 20,
    width: '95%'
  },
  blocAbnmt: {
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.46,
    elevation: 7,
  },
  txtbutt: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold'
  },
  buttVIP: {
    margin: 10,
    alignItems: 'center',
    borderWidth: 0,
    borderRadius: 10,
    backgroundColor: '#c4d63c',
    padding: 15,
  },
  titleModal: {
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
  },
  btAmount: {
    padding: 10, margin: 2, borderRadius: 30, backgroundColor: '#c4d63c'
  },
})
export default DonateScreen; 