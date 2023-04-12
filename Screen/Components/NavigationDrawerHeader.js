// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, { version } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { Base_url } from '../utils/utils';

//import Constants from 'expo-constants';
const NavigationDrawerHeader = (props) => {
    const toggleDrawer = () => {
        props.navigationProps.toggleDrawer();
    };

    return (

        <View style={{ flexDirection: 'row', zIndex: 50 }}>
            <TouchableOpacity onPress={toggleDrawer}>
                <Image
                    source={
                        {
                            uri: Base_url + 'images/drawerWhite_b.png'
                        }
                    }
                    style={{ width: 25, height: 25, marginLeft: 15 }}
                />
            </TouchableOpacity>
        </View>


    );
};
export default NavigationDrawerHeader;