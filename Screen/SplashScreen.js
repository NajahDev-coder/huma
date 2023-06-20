

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
import { RequestOptionsGet, Access } from './utils/utils';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({ navigation }) => {
    //State for ActivityIndicator animation
    const [animating, setAnimating] = useState(false);


    //global.User_connecte =  AsyncStorage.getItem('user_id');

    //global.User_connecte =  getUser();


    useEffect(() => {

        let isSubscribed = true;
        // 


        if (isSubscribed) {
            setAnimating(true);

            Access(navigation);
        }

        return () => { isSubscribed = false; setAnimating(false); }
    }, []);

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