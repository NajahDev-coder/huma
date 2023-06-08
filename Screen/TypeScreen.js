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


  return (
    <View style={styles.mainBody}>
      <ImageBackground
        source={{ uri: Base_url + 'images/bg_screen.png' }}
        resizeMode="cover"
        style={styles.image}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            flex: 1,
            justifyContent: 'center',
            alignContent: 'center',
          }}>
          <Text style={styles.titre}>Choisir votre Catégorie </Text>

          <View style={styles.blcType}>
            <View style={styles.row}>
              {TypesList.map((value) => (
                <TouchableOpacity
                  key={value.id}
                  onPress={() => {
                    AsyncStorage.setItem('type_id', String(value.id));
                    navigation.navigate('Categ');
                  }}
                  style={[
                    styles.button,
                    [1, 4, 5].includes(value.id) && styles.selected,
                  ]}>
                  <Text
                    style={[
                      styles.buttonLabel,
                      styles.icon,
                      [1, 4, 5].includes(value.id) && styles.selectedLabel,
                    ]}>
                    {value.type === 'Echanges' ? (
                      <FontAwesome name="exchange" size={24} color="white" />
                    ) : value.type === 'Dons' ? (
                      <FontAwesome5
                        name="hand-holding-heart"
                        size={24}
                        color="white"
                      />
                    ) : value.type === 'Bons Plans' ? (
                      <FontAwesome5
                        name="search-dollar"
                        size={24}
                        color="white"
                      />
                    ) : value.type === 'Transports' ? (
                      <FontAwesome5 name="route" size={24} color="white" />
                    ) : value.type === 'Infos' ? (
                      <AntDesign name="infocirlce"
                        size={24}
                        color="white"
                      />
                    ) : (
                      <FontAwesome
                        name="handshake-o"
                        size={24}
                        color="white"
                      />
                    )}
                  </Text>
                  <Text
                    style={[
                      styles.buttonLabel,
                      [1, 4, 5].includes(value.id) && styles.selectedLabel,
                    ]}>
                    {value.type}
                  </Text>
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
    flex: 1,
    justifyContent: 'center',
  },
  titre: {
    fontStyle: 'italic',
    fontSize: 22,
    padding: 20,
    paddingTop: '15%',
    paddingBottom: '12%',
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
    /* paddingTop: '10% ',
     marginLeft: '5%',*/
  },
  button: {
    borderRadius: 10,
    //borderTopRightRadius: 30,
    //backgroundColor: 'rgba(115, 126, 29, 0.88)',   
    backgroundColor: '#b4c62c',
    marginLeft: '5%',
    marginBottom: 6,
    minWidth: '40%',
    justifyContent: 'center',
    height: 100,
    textAlign: 'center'
  },
  selected: {
    backgroundColor: 'rgba(140, 153, 44 , 0.80)',
    borderWidth: 0,
  },
  buttonLabel: {
    fontSize: 20,
    fontWeight: '500',
    color: 'white',
    textAlign: 'center',
  },
  selectedLabel: {
    color: 'white',
  },
});

export default TypeScreen;
