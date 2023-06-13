import React, { useState, createRef, useEffect } from 'react';

import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
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




let SousCateg;

import { Base_url, RequestOptionsGet } from './utils/utils'
const CategScreen = ({ navigation }) => {
  const [CategroiesList, setCategroiesList] = useState([]);
  const [CategSelected, setCategSelected] = useState('1');
  const [PcategID, setPcategID] = useState(1);
  const [selectedValue, setSelectedValue] = useState(1);
  const [SsCateg, SetSsCateg] = useState([]);


  const GetCategorie = async () => {
    const fetchUrl = 'categories'
    const responseJson = await RequestOptionsGet(fetchUrl);
    setCategroiesList(responseJson);
    setCategSelected(1);
  }
  useEffect(() => {
    let isSubscribed = true;

    if (isSubscribed) {
      GetCategorie();
      //console.log('PCategID', PcategID)
      displaySCateg(PcategID);
    }
    //SousCateg = displaySCateg(1)
    //SetSsCateg(SousCateg);
    //setPcategID(PCategID)
    return () => (isSubscribed = false);
  }, [PcategID]);
  const displaySCateg = async (categID) => {
    setPcategID(categID)
    const fetchUrl = `categories/${categID}`;

    const responseJson = await RequestOptionsGet(fetchUrl)

    if (responseJson.data.length > 0) {

      let data3 = [];
      Object.entries(responseJson.data).map(([key, value]) => {
        data3.push({
          id: value.id,
          title: value.titre,
          src: value.slug,
        });
      });


      SousCateg = data3;
      SetSsCateg(SousCateg); //return SousCateg;
    } else {
      // alert(PCategID)
      AsyncStorage.setItem('categ_id', String(PcategID));
      AsyncStorage.getItem('type_id').then((value) =>
        navigation.replace(
          value === null ? 'CreateAnnonce' : 'CreateAnnonce'
        )
      );
    }

  };

  return (
    <View style={styles.mainBody}>
      <ImageBackground
        source={{ uri: Base_url + 'images/bg_screen.png' }}
        resizeMode="cover"
        style={styles.image}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            justifyContent: 'center',
            alignContent: 'center',
          }}>
          <View style={{ padding: 10, flex: 1 }}>

            <View style={styles.row}>
              {CategroiesList.map((value) => (
                <TouchableOpacity
                  key={value.id}
                  onPress={() => {
                    displaySCateg(value.id);
                    setSelectedValue(value.id);
                  }}
                  style={[
                    styles.button,
                    selectedValue === value.id && styles.selected,
                  ]}>
                  <Text
                    style={[
                      styles.buttonLabel,
                      selectedValue === value.id && styles.selectedLabel,
                    ]}>
                    {value.titre}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <SafeAreaView>
            <ScrollView
              horizontal={true}
              style={{ width: '100%' }}
            >
              <FlatList
                data={SousCateg}
                renderItem={({ item }) => (
                  <View style={styles.viewThumbnail}>
                    <LinearGradient
                      colors={['#f3f3f3', '#ffffff', '#f9f9f9']}
                      start={{
                        x: 0,
                        y: 0,
                      }}
                      end={{
                        x: 1,
                        y: 1,
                      }}
                      style={styles.bgThumb}>
                      <TouchableOpacity
                        onPress={() => {
                          displaySCateg(item.id);
                        }}>
                        <Text style={styles.txtThumb}>{item.title}</Text>
                      </TouchableOpacity>
                    </LinearGradient>
                  </View>
                )}
                //Setting the number of column
                numColumns={3}
                keyExtractor={(item, index) => index}
              />
            </ScrollView>
          </SafeAreaView>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};
function PreviewLayout({
  label,
  children,
  values,
  selectedValue,
  setSelectedValue,
}) {
  return (
    <View style={{ padding: 10, flex: 1 }}>
      <View style={styles.row}>
        {values.map((value) => (
          <TouchableOpacity
            key={value.id}
            onPress={() => {
              /*setsousCateg(value.id);*/ setSelectedValue(value.id);
            }}
            style={[
              styles.button,
              selectedValue === value.id && styles.selected,
            ]}>
            <Text
              style={[
                styles.buttonLabel,
                selectedValue === value.id && styles.selectedLabel,
              ]}>
              {value.titre}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
const renderItem = ({ item, index }) => {
  const { backgroundColor } = item;
  return (
    <TouchableOpacity
      style={[styles.item, { backgroundColor }]}
      onPress={() => {
        this._carousel.scrollToIndex(index);
      }}></TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  button: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: 'rgba(140, 153, 44 , 0.80)',
    alignSelf: 'flex-start',
    marginHorizontal: '1%',
    marginBottom: 6,
    minWidth: '48%',
    textAlign: 'center',
  },
  selected: {
    backgroundColor: 'rgba(115, 126, 29, 0.88)',
    borderWidth: 0,
  },

  buttonLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: 'white',
    textAlign: 'center',
  },
  selectedLabel: {
    color: 'white',
  },

  viewThumbnail: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    flex: 1,
    flexDirection: 'column',
    margin: 1,
    justifyContent: 'center',
  },
  /*shadBT:
  {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 7,
  },*/
  bgThumb: {
    borderRadius: 10,
    backgroundColor: 'rgb(2,0,36)',
    justifyContent: 'center',
    minWidth: '100%',
    height: 70,
    textAlign: 'center',
    paddingHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 7,

    borderBottomWidth: 5,
    borderBottomColor: '#bac84e',

    // borderLeftWidth:5,
    // borderLeftColor:'#bac84e'
  },
  txtThumb: {
    color: '#7f8933',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CategScreen;
