import React, { useState, createRef, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


import { FontAwesome, FontAwesome5, AntDesign } from '@expo/vector-icons';
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
  Linking,
  Platform,
  FlatList,
} from 'react-native';
import { Link } from 'react-router-dom';
import CategScreen from './CategScreen';
import LoginScreen from './LoginScreen';
import { Base_url, RequestOptionsGet } from './utils/utils'
//const TypeScreen  =(props)  {
const TypeScreen = ({ navigation }) => {
  const [TypesList, setTypesList] = useState([]);
  const [TypeSelected, setTypeSelected] = useState('1');
  const [data, setData] = useState([]);
  const [Connecte, setConnecte] = useState(false);

  const image = { uri: Base_url + 'images/bg_screen.png' };
  const GetTypelist = async () => {
    const fetchUrl = 'types';
    const responseJson = await RequestOptionsGet(fetchUrl);

    let datas = [];
    Object.entries(responseJson).map(([key, value]) => {
      datas.push({ id: value.id, title: value.type });
    });
    ////console.log("PTypeID", PTypeID)
    setData(datas);
    setTypesList(responseJson);
    setTypeSelected(1);
  }
  useEffect(() => {

    let isSubscribed = true;
    if (isSubscribed) {
      GetTypelist();
    }

    return () => (isSubscribed = false);
  }, []);
  const getBeerImage = (idImgCateg) => {
    //let path = { uri: Base_url + 'images/icones_categories/' + slugimg + '.png' };
    let path;
    if (idImgCateg == 1 || idImgCateg == 4 || idImgCateg == 5)
      path = { uri: Base_url + 'images/icones_categories/icone_activeCateg.png' };
    else
      path = { uri: Base_url + 'images/icones_categories/icone_IN_activeCateg.png' };
    return path;
  };
  const navigateCateg = async (typeId) => {
    if (typeId == 3) {
      if (Platform.OS == 'web') {
        Linking.openURL('https://play.google.com/store/apps/details?id=com.devnajah.HuMA');
      }
      else {
        navigation.navigate('Don');
      }
    }
    else {

      AsyncStorage.setItem('type_id', String(typeId));
      navigation.navigate('Categ');
    }
  }
  return (
    <View style={styles.mainBody}>
      <ImageBackground
        source={{ uri: Base_url + 'images/bg_screen.png' }}

        style={styles.image}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            // flex: 1,
            justifyContent: 'center',
            alignContent: 'center',
          }}>
          <Text style={styles.titre1}>Créez votre Annonce maintenant!  </Text>
          <Text style={styles.titre}>Choisissez votre Catégorie </Text>

          <View style={styles.blcType}>
            <View style={styles.row}>
              {TypesList.map((value) => (
                <TouchableOpacity
                  key={value.id}
                  onPress={() => {
                    navigateCateg(value.id);
                  }}
                  style={[
                    styles.button,
                    [1, 4, 5].includes(value.id) && styles.selected,
                  ]}>
                  <ImageBackground source={getBeerImage(value.id)} style={{
                    flex: 1,
                    resizeMode: 'cover', height: 200, width: 160
                  }} >

                    <Text
                      style={[
                        styles.buttonLabel,
                        [1, 4, 5].includes(value.id) && styles.selectedLabel,
                      ]}>
                      {value.type}
                    </Text>
                  </ImageBackground>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );

};
const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  blcType: {
    padding: 10,
    flex: 1,
  },
  image: {
    resizeMode: 'cover',
    flex: 1,
    justifyContent: 'center',
  },
  titre1: {

    fontSize: 20,
    paddingTop: 25,
    color: '#96aa00',
    width: '100%',
    textAlign: 'center',
  },
  titre: {

    fontSize: 18,
    padding: 20,
    color: '#49382f',
    width: '100%',
    textAlign: 'center',
  },
  icon: {
    position: 'absolute',
    top: 5,
    right: 8,
    fontSize: 24,
  },

  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
    /* paddingTop: '10% ',
     marginLeft: '5%',*/
  },
  button: {
    backgroundColor: '#bed61e',
    //backgroundColor: 'rgba(140, 153, 44 , 0.80)',
    alignItems: 'center',
    // justifyContent: 'center',
    marginHorizontal: 5,
    marginVertical: 6,
    borderRadius: 30,
    height: 200,
    width: 160,

    //padding: 10
    //justifyContent: 'center',
    // textAlignVertical:'center'   
    //textAlign: 'center',
  },
  selected: {
    //backgroundColor: 'rgba(115, 126, 29, 0.88)',
    backgroundColor: '#4c362b',
    borderWidth: 0,
  },
  buttonLabel: {

    fontSize: 18,
    color: '#ffffff',
    padding: 20,
    paddingTop: 80,
    height: 170,
    width: 160,
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center'
  },
  selectedLabel: {
    color: '#ffffff',
  },
});

export default TypeScreen;
