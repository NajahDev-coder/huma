// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, { useState } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { Base_url } from '../utils/utils';
import { AntDesign } from '@expo/vector-icons';
//import Constants from 'expo-constants';
const NavigationDrawerHeader = (props) => {
    const [toggle, setToggle] = useState(0);
    const toggleDrawer = () => {
        props.navigationProps.toggleDrawer();
        setToggle(!toggle)
    };

    return (

        <View style={{ flexDirection: 'row', zIndex: 50 }}>
            <TouchableOpacity onPress={toggleDrawer}>

                <AntDesign name="menu-unfold" size={28} color="black" style={{ marginLeft: 15, marginTop: 5 }} />

            </TouchableOpacity>
        </View>


    );
};
export default NavigationDrawerHeader;