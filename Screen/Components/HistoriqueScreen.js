import React, { useState, createRef, useEffect } from 'react';
import { View, Text, RefreshControl, StyleSheet, Animated, Dimensions, Platform, ImageBackground, ScrollView, TouchableOpacity } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { SelectList, MultipleSelectList } from 'react-native-dropdown-select-list';

import moment from 'moment';

import GetProfile from './GetProfile';
import { NaVIG, Base_url, RequestOptionsGet, ShowDetailAnnonce } from '../utils/utils'
import { dateDiff } from '../includes/functions';
//import { ScrollView } from 'react-native-gesture-handler';
import GetActivite from './GetActiviteScreen'

const HistoriqueScreen = ({ navigation }) => {

    const [refreshKey, setRefreshKey] = useState(0);
    const [NbreNotif, setNbreNotif] = useState(0);
    const [HistoriqueList, setHistoriqueList] = useState([]);
    const [Enable, setEnable] = useState(0);
    const [fadeAnimation] = useState(new Animated.Value(0));
    const [selected, setSelected] = useState("");

    const minDate = new Date(2022, 8, 30);
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

    const today = new Date();
    useEffect(() => {

        let isSubscribed = true;
        const getHistorique = async () => {
            //alert(id_user)
            const fetchUrl = `list_historique/${global.User_connecte}`;

            const responseJson = await RequestOptionsGet(fetchUrl)
            if (responseJson.data) {


                setHistoriqueList(responseJson.data);
                await GetName(5, 'Vous avez accepté une invitation de 5')
            }
            //setRefreshKey((oldKey) => oldKey + 1); 

        }

        if (isSubscribed) {
            getHistorique();
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
                        alignContent: 'center',
                    }}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }>
                    <View style={{ padding: 10, flex: 1, width: '100%' }}>

                        <View style={styles.row}>
                            {HistoriqueList.map((value) => (
                                <View style={styles.lisnotif}>
                                    <TouchableOpacity key={value.id} style={styles.bcBlock} onPress={() => NaVIG(value.id_activite, value.activite, navigation)}>
                                        {/*<GetProfile user_id={value.id_user} navigation={navigation} img_prof={value.img_prof} />*/}

                                        <View style={styles.bcDetaille}>

                                            <Text style={styles.bcText}>{value.activite.replace(String(value.id_activite), ' ')}<GetActivite activite={value.activite} id_activite={value.id_activite} />
                                            </Text>

                                            <View
                                                style={{ flexDirection: 'row', justifyContent: 'flex-end', paddingRight: 10 }}>
                                                <Text style={styles.bcSmText}>{dateDiff(new Date(value.date), today)}  </Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </View>
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
    image: {
        flex: 1,
        justifyContent: 'center',
    },
    row: {
        width: '100%',
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
        paddingRight: 15,
        zIndex: 20,
        borderRadius: 10,
        borderWidth: 0,
        width: '100%',
        marginTop: 5,

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
        width: '100%',
    },
    bcText: {
        width: '100%',
    },
    bcSmText: {
        fontSize: 11,
    },
});
export default HistoriqueScreen;
