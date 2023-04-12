// Import React and Component
import React, { useState, createRef, useEffect, useCallback } from 'react';

import { Base_url, RequestOptionsGet, ShowDetailAnnonce, RequestOptionsPut, RequestOptionsPost } from '../utils/utils';
import {
  Animated,
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

import Loader from '../Components/Loader';
import { Entypo } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PublicitesSlideshow from './PublicitesSlideshow';
import GetCategorie from '../Components/GetCategorie';
import GetType from '../Components/GetType';
import GetProfile from '../Components/GetProfile';
import FilterForm from './FilterForm';
import RatingScreen from '../Components/RatingScreen';

import { MaterialIcons, AntDesign, MaterialCommunityIcons, Feather, Ionicons } from '@expo/vector-icons'; 
const AnnoncesScreen = ({ navigation }) => {
  const [AnnoncesList, setAnnoncesList] = useState([]);

  const [filter, setFilter] = useState(JSON.stringify({ "adresse": "", "titre": "", "type": "", "categorie": "", "dateStart": "", "dateEnd": "" }));
  const [loading, setLoading] = useState(false);
  const [zIndexF, setZindexF] = useState(1);
  const [result, setResultat] = useState('Loading ....');

  const GetFilter = useCallback(async () => {


    await AsyncStorage.getItem('add_filter').then((value) => {
      console.log('value  filter:', value);

      if (value != null && !Object.is(filter, value)) {
        setFilter(value);
      }


    });
  }, [filter])

  const fetchData = async (filter) => {
    if (Object.keys(filter).length > 0) {
      filter = encodeURIComponent(filter);
    }
    const fetchUrl = `annonces/${filter}`;
    const json = await RequestOptionsGet(fetchUrl);
    if (json.length > 0) {
      setAnnoncesList(json)
      setResultat('')
    }
    else {

      setAnnoncesList([])
      setResultat('Pas des annonces trouvées! ')
    }
    //if (json == null) setAnnoncesList({});
  };

  useEffect(() => {
    setLoading(true)
    let isSubscribed = true;

    if (isSubscribed) {
      setTimeout(() => {
        setLoading(false);
        GetFilter();
        if (Object.keys(filter).length > 0) {
          fetchData(filter);
        }
      }, 100)
    }
    return () => { isSubscribed = false }
  }, [filter, GetFilter])


const isdivisibleNine=(num)=> {
  var myArr = 0;
   String(num).split("").map((num)=>{
      myArr+= Number(num)
    })
    console.log('num::',num) ;
    if( myArr==9 || myArr==18) return true;
    return false;
}

  return (
    <View style={styles.mainBody}>
      <ImageBackground
        source={{ uri: Base_url + 'images/bg_screen.png' }}
        resizeMode="cover"
        style={styles.image}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            alignContent: 'center',
          }}>

          <View style={{ zIndex: zIndexF }}>
            <FilterForm OnIndex={(value) => setZindexF(value)} OnFilter={GetFilter} />
          </View>


          <View style={{ padding: 10, flex: 1, zIndex: 2, width: '100%' }}>
            <View style={styles.row}>
              {loading ? <Loader loading={loading} /> :
                (AnnoncesList.length > 0 ? (
                  AnnoncesList.map((value,key) => (  
                    <>
                    <TouchableOpacity
                      key={value.ID_ance}
                      onPress={() => {
                        ShowDetailAnnonce(
                          value.ID_ance,
                          navigation
                        );
                      }}
                      style={styles.post}>
                      <View style={styles.bcBlock}>



                        <GetProfile user_id={value.user_id} navigation={navigation} img_prof={value.img_prof} />

                        <View style={styles.bcDetaille}>
                          <Text style={styles.postLabel}>{value.nom}</Text>
                          <RatingScreen user_id1={value.user_id} user_id2={0} />
                          <Text style={styles.postLabel}>
                            {value.titre}
                          </Text>
                          <Text style={styles.postLabel2}>
                            Description:
                          </Text>
                          <Text style={styles.bcText}>
                            {value.court_description}
                          </Text>
                        </View>
                      </View>


                      {value.Adresse_ance.length != 0 && (
                        <View style={styles.bcBlock2}>
                          <Text style={styles.bcText2}>
                            <Entypo name="location-pin" size={20} color="grey" />

                            {value.Adresse_ance}
                          </Text>
                        </View>
                      )}
                      <View style={styles.bcBlock}>
                        <View style={styles.btCateg}>
                          <GetCategorie id_annonce={value.categorie} />
                        </View>
                        <View style={styles.btType}>
                          <GetType id_annonce={value.type} />
                        </View>
                      </View>  
                    </TouchableOpacity>      
                    <View>       
                     {isdivisibleNine(key) && (   
                        <View style={styles.post}>
                       
                        <PublicitesSlideshow navigation={navigation} rang={key}/>    
           
            </View>
                      )}
                      </View>
                      </>   
                  ))
                ) : (

                  <View style={{ width: '100%' }}>
                    <View style={{ alignItems: 'center', justifyContent: 'center', paddingVertical: '50%', padding: '25%' }}>

                      <Text style={{ color: '#777777', textAlign: 'center', }}>{result}</Text>
                    </View>

                  </View>


                ))}
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};
let category = '';

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
    flexDirection: 'column',
    flexWrap: 'wrap',
    width: '100%',
  },

  post: {
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: '#ffffff',
    alignSelf: 'flex-start',
    marginHorizontal: '2%',
    marginBottom: 15,
    minWidth: '95%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 7,
    // flexDirection: 'column',
  },

  postLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#c4d63c',
  },
  postLabel2: {
    fontSize: 12,
    fontWeight: '500',
    color: '#000',
  },
  bcBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    //justifyContent: 'end',

  },
  bcBlock2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '85%',
    marginLeft: '13%',
    padding: 10,
  },
  bcDetaille: {
    // alignSelf: 'flex-start',
    margin: 7,
    width: '80%',
  },
  bcText: {
    //maxWidth: 200,
    color: '#6d6d6d',
    borderBottomColor: 'black',
    borderBottomWidth: 1
  },
  bcText2: {
    color: '#6d6d6d',
    //maxWidth: '100%',
    fontSize: 9,
  },
  btType: {
    alignSelf: 'flex-start',
    backgroundColor: '#7c4c32',
    color: '#ffffff',
    padding: 5,
    margin: 5,
    marginLeft: 10,
    borderRadius: 6,
    width: '40%',
    textAlign: 'center',
    justifyContent: 'center',
    maxWidth: 130,
  },
  btCateg: {
    alignSelf: 'flex-start',
    backgroundColor: '#c4d63c',
    color: '#ffffff',
    padding: 5,
    margin: 5,
    borderRadius: 6,
    width: '40%',
    textAlign: 'center',
    justifyContent: 'center',
    maxWidth: 130,
  },
   
  bcPublicite:{

              padding: 0,
              width: '95%',
              height:120
        
  },
});
export default AnnoncesScreen;
