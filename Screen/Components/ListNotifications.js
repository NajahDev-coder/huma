import React, { useState, createRef, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Animated, Dimensions, ImageBackground, ScrollView, Platform, TouchableOpacity } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { SelectList, MultipleSelectList } from 'react-native-dropdown-select-list';

import moment from 'moment';

import GetProfile from '../Components/GetProfile';
import {
    Base_url, RequestOptionsGet, ShowDetailAnnonce, UpdateReadNotification, NaVIG
} from '../utils/utils'
import { dateDiff } from '../includes/functions';
//import { ScrollView } from 'react-native-gesture-handler';


const ListNotifications = ({ navigation }) => {

    const [refreshKey, setRefreshKey] = useState(0);
    const [NbreNotif, setNbreNotif] = useState(0);
    const [NotifList, setNotifList] = useState([]);
    const [Enable, setEnable] = useState(0);
    const [fadeAnimation] = useState(new Animated.Value(0));
    const [selected, setSelected] = useState("");
    const minDate = new Date(2022, 8, 30);






    const today = new Date();
    const getNotification = async () => {
        //alert(id_user)
        const fetchUrl = `getAllNotif/${global.User_connecte}`;

        const responseJson = await RequestOptionsGet(fetchUrl)
        if (responseJson.data) {

            setNotifList(responseJson.data);
        }
        //setRefreshKey((oldKey) => oldKey + 1); 

    }
    useEffect(() => {

        let isSubscribed = true;


        if (isSubscribed) {
            // global.NbreNotifNonLU = 0;
            getNotification();
        }
        return () => (isSubscribed = false);
    }, []);
    const checklu = (item) => {
        const IdUserIn = ',' + String(global.User_connecte);
        if (item.includes(IdUserIn))
            return false;

        else
            return true;
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
                    <View style={{ padding: 10, flex: 1, width: '100%' }}>

                        <View style={styles.row}>

                            <FlatList
                                data={NotifList}
                                renderItem={({ item }) => (
                                    <View style={styles.lisnotif}>
                                        <TouchableOpacity key={item.ID_notif} onPress={() => { UpdateReadNotification(item.type_activite, item.ID_notif); NaVIG(item.id_activite, item.type_activite, navigation); }} style={styles.bcBlock}>

                                            <GetProfile user_id={item.id_user1} navigation={navigation} img_prof={item.img_prof} />

                                            <View style={styles.bcDetaille}>
                                                <Text style={styles.postLabel}>{item.nom} </Text>
                                                <Text style={styles.bcText}>{item.notification}</Text>

                                                <View
                                                    style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                                    <Text style={styles.bcSmText}>{dateDiff(new Date(item.date), today)}  </Text>
                                                    {(item.etat == 0 && checklu(item.id_users_lu)) && (<Text style={styles.NonLu}></Text>)}

                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                )}

                                keyExtractor={item => item.id}
                            />

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

        marginTop: 8,
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
        width: '80%',
    },
    bcText: {
        width: '100%',
    },
    bcSmText: {
        fontSize: 11,
        color: '#6cc5d5'
    },
    NonLu: {
        backgroundColor: '#6cc5d5',
        width: 10,
        height: 10,
        borderRadius: 10,
        position: 'absolute',
        top: -20,
        right: 0,
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
});
export default ListNotifications;
