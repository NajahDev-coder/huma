import React, { useState, useRef, createRef, useEffect } from 'react';

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

  FlatList,
  Animated,
  Platform
} from 'react-native';


const useNativeDriver = Platform.OS === 'ios' || Platform.OS === 'android';

let SousCateg;

import { Base_url, RequestOptionsGet } from './utils/utils'
const CategScreen = ({ navigation }) => {

  const scrollX = useRef(new Animated.Value(0)).current;

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

      SousCateg = responseJson.data;
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
  const defaultImage = { uri: Base_url + 'images/img/no-picture1.png' };
  const getBeerImage = (idcateg, slugimg) => {
    let path = { uri: Base_url + 'images/img/' + idcateg + '/' + slugimg + '.jpg' };
    return path;
  };

  const getBeerImageCateg = (idImgCateg) => {
    //let path = { uri: Base_url + 'images/icones_categories/' + slugimg + '.png' };
    let path;
    if (idImgCateg == 1 || idImgCateg == 3)
      path = { uri: Base_url + 'images/icones_categories/icone_activeCateg.png' };
    else
      path = { uri: Base_url + 'images/icones_categories/icone_IN_activeCateg.png' };
    return path;
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
          <View style={{ padding: 10, flex: 1, width: '100%' }}>
            {/* <View style={styles.row}>

              <FlatList
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                data={CategroiesList}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() => {
                      displaySCateg(item.id);
                      setSelectedValue(item.id);
                    }}
                    style={[
                      styles.button,
                      //selectedValue == item.id && styles.selected,
                      (item.id == 1 || item.id == 3) && styles.selected,
                    ]}>

                    <ImageBackground source={getBeerImageCateg(item.id)}  >

                      <Text
                        style={[
                          styles.buttonLabel,
                          selectedValue == item.id && styles.selectedLabel,
                        ]}>
                        {item.titre}
                      </Text>

                    </ImageBackground>

                  </TouchableOpacity>
                )}

                numColumns={3}
                keyExtractor={(item, index) => index}
              />
            </View>*/}
            <View style={styles.row}>


              <ScrollView
                horizontal={true}

                showsHorizontalScrollIndicator={false}
                onScroll={Animated.event([
                  {
                    nativeEvent: {
                      contentOffset: {
                        x: scrollX,
                      },
                    },
                  },
                ],
                  { useNativeDriver: false }
                )}>
                <FlatList
                  data={CategroiesList}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      key={item.id}
                      onPress={() => {
                        displaySCateg(item.id);
                        setSelectedValue(item.id);
                      }}
                      style={[
                        styles.button,
                        //selectedValue == item.id && styles.selected,
                        (item.id == 1 || item.id == 3 || item.id == 5) && styles.selected,
                      ]}>


                      <ImageBackground source={getBeerImageCateg(item.id)}  >
                        <Text
                          style={[
                            styles.buttonLabel,
                            selectedValue == item.id && styles.selectedLabel,
                          ]}>
                          {item.titre}
                        </Text>

                      </ImageBackground>

                    </TouchableOpacity>
                  )}

                  horizontal={true}
                  keyExtractor={(item, index) => index}
                />
              </ScrollView>
            </View>
          </View>


          <SafeAreaView>

            <FlatList
              data={SousCateg}
              renderItem={({ item }) => (
                <View style={styles.viewThumbnail} key={item.id}>
                  <TouchableOpacity onPress={() => displaySCateg(item.id)} key={item.id}>
                    <ImageBackground
                      style={styles.imageThumbnail}
                      imageStyle={{ borderRadius: 3 }}
                      defaultSource={defaultImage}
                      source={getBeerImage(PcategID, item.slug)}>
                      <Text style={styles.txtThumb}>{item.titre}</Text>
                    </ImageBackground>
                  </TouchableOpacity>
                </View>
              )}
              //Setting the number of column
              numColumns={3}

              keyExtractor={(item, index) => index}
            />

          </SafeAreaView>
        </ScrollView>
      </ImageBackground>
    </View >
  );
};
/*function PreviewLayout({
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
              setsousCateg(value.id); setSelectedValue(value.id);
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
}*/
/*const renderItem = ({ item, index }) => {
  const { backgroundColor } = item;
  return (
    <TouchableOpacity
      style={[styles.item, { backgroundColor }]}
      onPress={() => {
        this._carousel.scrollToIndex(index);
      }}></TouchableOpacity>
  );
};*/
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
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  button: {
    backgroundColor: '#bed61e',
    alignItems: 'center',
    marginHorizontal: 5,
    marginVertical: 6,
    borderRadius: 30,
    height: 110,
    width: 110,

    //padding: 10
    //justifyContent: 'center',
    // textAlignVertical:'center'   
    //textAlign: 'center',
  },
  selected: {
    backgroundColor: '#4c362b',
    borderWidth: 0,
  },
  buttonLabel: {

    fontSize: 13,
    color: '#ffffff',
    //padding: 20,
    paddingTop: 40,
    height: 110,
    width: 90,
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center'
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
    padding: 5,
    //marginTop: '30%',
    backgroundColor: 'rgba(140, 153, 44, 0.45)',
    width: '100%',
    fontSize: 14,
    color: '#ffffff',
    textAlign: 'center',
    //fontSize: '16px',

    //fontFamily: 'Arial',
  },
  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
  }
});

export default CategScreen;
