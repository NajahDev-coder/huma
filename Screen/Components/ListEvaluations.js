import React, { useState, createRef, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Animated, Dimensions, Platform, ImageBackground, ScrollView, TouchableOpacity } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { SelectList, MultipleSelectList } from 'react-native-dropdown-select-list';

import moment from 'moment';

import GetProfile from './GetProfile';
import { Base_url, RequestOptionsGet, ShowDetailAnnonce } from '../utils/utils'
import { dateDiff } from '../includes/functions';
//import { ScrollView } from 'react-native-gesture-handler';
import { Rating, AirbnbRating } from 'react-native-ratings';

import Loader from '../Components/Loader';
const ListEvaluations = ({ navigation, route }) => {

    const [refreshKey, setRefreshKey] = useState(0);
    const [NbreNotif, setNbreNotif] = useState(0);
    const [EvaluationsList, setEvaluationsList] = useState([]);
    const [Enable, setEnable] = useState(0);
    const [fadeAnimation] = useState(new Animated.Value(0));
    const [selected, setSelected] = useState("");

    const [result, setResultat] = useState(<Loader loading={true} />);
    const minDate = new Date(2022, 8, 30);





    const NaVIG = (idNotif) => {
        //console.log(idNotif);
        ShowDetailAnnonce(idNotif, navigation);

    }
    const today = new Date();
    useEffect(() => {
        // const user_id= route.params.user_id
        const id_user = route.params?.id_user;
        let isSubscribed = true;
        const getEvaluations = async () => {
            //alert(id_user)

            const fetchUrl = `user_evaluation/${id_user}`;

            const responseJson = await RequestOptionsGet(fetchUrl)
            if (responseJson.data.length > 0) {

                setEvaluationsList(responseJson.data);
            }
            else

                setResultat('Pas des Avis & Commentaires ! ')
            //setRefreshKey((oldKey) => oldKey + 1); 

        }

        if (isSubscribed) {
            getEvaluations();
        }
        return () => (isSubscribed = false);
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
                    }}>
                    <View style={{ padding: 10, flex: 1, width: '100%' }}>

                        <View style={styles.row}>

                            {EvaluationsList.length == 0 ? (
                                <View style={{ width: '100%' }}>
                                    <View style={{ alignItems: 'center', justifyContent: 'center', paddingVertical: '50%', padding: '25%' }}>

                                        <Text style={{ color: '#777777', textAlign: 'center', }}>{result}</Text>
                                    </View>
                                </View>

                            ) : (
                                <FlatList
                                    data={EvaluationsList}

                                    renderItem={({ item }) => (
                                        <View style={styles.lisnotif}>
                                            <TouchableOpacity key={item.ID_avis} style={styles.bcBlock}>
                                                <GetProfile user_id={item.id_user_notant} navigation={navigation} img_prof={item.img_prof} />

                                                <View style={styles.bcDetaille}>
                                                    <Text style={styles.postLabel}>{item.nom} </Text>

                                                    <Text style={styles.bcText}>{item.commentaire}</Text>
                                                    <View style={{ flexDirection: 'row' }}>
                                                        <Text style={styles.txtEtoile}>{item.nbre_etoile}</Text>
                                                        <Rating
                                                            style={{ marginTop: 3 }}
                                                            startingValue={item.nbre_etoile}
                                                            imageSize={16}
                                                            readonly={true}
                                                        />
                                                    </View>

                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    )}

                                    keyExtractor={item => item.ID_avis}
                                />
                            )}

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
    image: {
        resizeMode: 'cover',
        flex: 1,
        justifyContent: 'center',
    },
    row: {
        width: '100%',
    },
    bc_notif: {
        flexDirection: 'row',
        padding: 0,
        position: 'relative'
    },
    isnotif: {
        backgroundColor: 'rgb(140, 153, 44)',
        width: 12,
        height: 12,
        borderRadius: 12,
        position: 'absolute',
        top: 10,
        right: 20,
        zIndex: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 9,
    },
    shownotif: {
        //flexDirection: 'column',
        //flexWrap: 'wrap',
        width: Platform.OS == 'web' ? '90%' : '100%',
        padding: 0,
        //position:'relative',
        top: 0,
        zIndex: 0,
        backgroundColor: 'transparent',
        right: 0
    },
    lisnotif: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 9,
        backgroundColor: '#ffffff',
        padding: 5,
        zIndex: 20,
        borderRadius: 10,
        borderWidth: 0,

        margin: 8,
        width: '95%',
        marginLeft: '3%'

    },
    bcBlock: {
        flexDirection: 'row',
        width: '100%'
    },
    postLabel: {
        fontSize: 12,
        fontWeight: '500',
        color: '#c4d63c',
    },
    bcDetaille: {
        alignSelf: 'flex-start',
        margin: 7,
        width: '95%',
    },
    bcText: {
        width: '100%',
    },
    bcSmText: {
        fontSize: 11,
    },
    txtEtoile: { color: '#f1c40f', marginBottom: 2, marginRight: 6, fontSize: 16 }

});
export default ListEvaluations;
