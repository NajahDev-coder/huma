// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, { version } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';

const url = "https://huma.bzh/";
const NavigationBackHeader = (props) => {
    const toggleDrawer = () => {
        props.navigationProps.toggleDrawer();
    };

    return (

        <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={toggleDrawer}>
                <Image
                    source={
                        { uri: url + 'images/back.png' }
                    }
                    style={{ width: 25, height: 25, marginLeft: 15 }}
                />
            </TouchableOpacity>
        </View>


    );
};
export default NavigationBackHeader;