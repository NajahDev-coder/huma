// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, { version } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { Base_url } from '../utils/utils';
const NavigationBackHeader = ({ navigationProps, Screen }) => {


    return (

        <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={() => navigationProps.goBack(Screen)} >
                <Image
                    source={
                        { uri: `${Base_url}images/back.png` }
                    }
                    style={{ width: 25, height: 25, marginLeft: 20, marginTop: 0 }}
                />
            </TouchableOpacity>
        </View>


    );
};
export default NavigationBackHeader;