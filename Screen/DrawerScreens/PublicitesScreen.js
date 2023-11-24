import React, { useEffect, useState } from 'react'

import { Base_url, RequestOptionsGet, RequestOptionsPut, RequestOptionsPost } from '../utils/utils';
import { Linking, View, Image, TouchableOpacity, RefreshControl, Text, StyleSheet, ImageBackground, ScrollView } from 'react-native'
import Slideshow from 'react-native-slideshow-improved';

import { MaterialIcons, Entypo, AntDesign, MaterialCommunityIcons, Feather, Ionicons } from '@expo/vector-icons';
import ActionGestion from '../Components/ActionGestion';
import Loader from '../Components/Loader';

const PublicitesScreen = ({ navigation }) => {

  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [listPublicite, setListpublicite] = useState([]);
  const [position, setPosition] = useState(1);
  const [result, setResultat] = useState('');

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    setRefreshing(false);
    getPublicite()


  }, []);

  const getPublicite = async () => {
    let userId;
    if (global.User_connecte != null)
      userId = global.User_connecte;
    else
      userId = 'all';

    const fetchUrl = `publicites/${userId}`;

    const responseJson = await RequestOptionsGet(fetchUrl);

    if (responseJson.data.length > 0) {
      let datas = [];
      setListpublicite([])

      let url_img;
      Object.entries(responseJson.data).map(([key, value]) => {
        if (value.image == '')
          url_img = `${Base_url}images/publicite.jpg`
        else
          url_img = `${Base_url}images/${value.image}`
        // if (key == id_pub) {
        datas.push({ id: value.id, title: value.titre, caption: value.lien, url: url_img });
        // }
      });

      setListpublicite(datas);
    }
    setResultat('Pas des annonces trouvées! ')
  }

  const msgAlerte = 'Êtes-vous sûr de vouloir supprimer cette publicité!';
  const Navig = (val) => {
    Linking.openURL('http://' + val);
  }
  useEffect(() => {

    let isMounted = true;
    setLoading(true);
    if (isMounted) {
      getPublicite();
      setLoading(false)

    }
    return (() => { isMounted = false });
  }, []);
  return (
    <View style={styles.mainBody}>
      <ImageBackground
        source={{ uri: Base_url + 'images/bg_screen.png' }}

        style={styles.image}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            alignContent: 'center',
          }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >

          <View style={{ padding: 10, zIndex: 2, flex: 1, width: '100%', marginTop: 20 }}>


            <View style={styles.row}>
              {loading ? <Loader loading={loading} /> : (
                <View>
                  {listPublicite.length > 0 ? (

                    listPublicite.map((value, key) => (
                      <View
                        style={styles.post}>
                        <ImageBackground
                          source={{ uri: value.url }}

                          style={styles.bcImageBlock}>

                          <TouchableOpacity
                            key={key}
                            onPress={() => {
                              Navig(value.caption)
                            }} style={styles.bcCaption}>
                            <Text style={{ fontWeight: 'bold', color: '#000000' }}>#{value.title}</Text>
                            <Text style={{ textDecorationLine: 'underline', color: '#039be5' }}><Entypo name="video-camera" size={16} color="#039be5" /> {value.caption}</Text>
                          </TouchableOpacity>
                        </ImageBackground>

                        <View style={{ position: 'absolute', right: 4, top: 10, width: 120 }}>
                          <ActionGestion navigation={navigation} id={value.id} type='publicite' msgAlerte={msgAlerte} onAction={onRefresh} />
                        </View>

                      </View>

                    ))
                  ) : (
                    <View style={{ width: '100%' }}>
                      <View style={{ alignItems: 'center', justifyContent: 'center', paddingVertical: '50%', padding: '25%' }}>

                        <Text style={{ color: '#777777', textAlign: 'center', }}>{result}</Text>
                      </View>

                    </View>
                  )
                  }
                </View>
              )}

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
    resizeMode: 'cover',
    flex: 1,
    justifyContent: 'center',
  },

  row: {
    flexDirection: 'row',
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
    minHeight: 120,
    display: 'flex'
    // flexDirection: 'column',
  },
  bcImageBlock: {
    flex: 1,
    resizeMode: 'cover',
    width: '100%',
    height: 170,
  },

  bcCaption: {
    position: 'absolute',
    left: 0,
    bottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255 , 0.60)'
  }
})
export default PublicitesScreen;