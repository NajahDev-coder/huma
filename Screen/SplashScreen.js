

// Import React and Component
import React, { useState, useEffect } from 'react';
import { durationInMonths } from '@progress/kendo-date-math';
//import { useNavigate } from "react-router-dom";

import { Base_url, UpdatePremium } from './utils/utils';
import {
    ActivityIndicator,
    View,
    StyleSheet,
    Image,
    Text,
    Alert
} from 'react-native';
import { RequestOptionsGet } from './utils/utils';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({ navigation }) => {
    //State for ActivityIndicator animation
    const [animating, setAnimating] = useState(false);


    //global.User_connecte =  AsyncStorage.getItem('user_id');
    const getUser = async () => {
        await AsyncStorage.getItem('user_id').then((value) => {
            value ? global.User_connecte = value : global.User_connecte = null
        });

    }

    const isVIP = async () => {

        const fetchUrl = `user/${global.User_connecte}`;
        const response = await RequestOptionsGet(fetchUrl)
        ////console.log('isvip?',response)
        if (response.data.length > 0) {
            const MmebreisVIP = response.data[0].VIP;
            const Date_abonnement = new Date(response.data[0].date_abonnement)
            const ToDay = new Date();
            const duration = durationInMonths(Date_abonnement, ToDay);
            //console.log('MmebreisVIP:', MmebreisVIP)
            if ((MmebreisVIP == 1 && duration < 1) || (MmebreisVIP == 2 && duration < 2) || (MmebreisVIP == 3 && duration < 3)) {
                UpdatePremium(global.User_connecte, 0);
                global.User_VIP = null
            }
            else global.User_VIP = 0
        }
        else
            global.User_VIP = null

    }
    //global.User_connecte =  getUser();


    useEffect(() => {

        let isSubscribed = true;
        // 
        clearAllData = () => {
            AsyncStorage.getAllKeys()
                .then(keys => AsyncStorage.multiRemove(keys));
        }
        const Access = async () => {
            //console.log('Access!');
            try {
                await AsyncStorage.getItem('user_id').then((value) => {
                    if (value !== null) {
                        global.User_connecte = value;
                        isVIP();
                        navigation.replace('Auth')
                    }
                    else {
                        global.User_connecte = null
                        clearAllData(); navigation.replace('DrawerNavigationRoutes');
                    }
                });

            } catch (e) {
                // error reading value
                //console.log('error', e);
                clearAllData();
                navigation.replace('DrawerNavigationRoutes');
            }

        }
        //setTimeout(() => {
        if (isSubscribed) {
            setAnimating(true);
            //getUser();     

            Access();
            //alert(global.User_connecte)
            //alert(global.User_VIP)
        }
        // }, 2500);

        return () => { isSubscribed = false; setAnimating(false); }
    }, [navigation]);

    return (
        <View style={styles.container}>
            <Image
                source={{ uri: `${Base_url}images/HuMA.png` }}
                style={{ width: '90%', resizeMode: 'contain', margin: 30 }}
            />

            <ActivityIndicator
                animating={animating}
                color="#c4d63c"
                size="large"
                style={styles.activityIndicator}
            />
        </View>
    );
};

export default SplashScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    activityIndicator: {
        alignItems: 'center',
        height: 80,
    },
});