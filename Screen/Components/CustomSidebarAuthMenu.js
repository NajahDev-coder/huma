

// Import React and Component
import React, { useState, useEffect, Component } from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from '@react-navigation/drawer';
import GetProfile from './GetProfile';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { set } from 'react-native-reanimated';
import { DeleteSession } from '../utils/utils';

//const [UsName, setUsName] = useState('HüMA');
function CustomSidebarAuthMenu(props) {


    const [UsName, setUsName] = useState('HüMA');
    const [RefreshKey, setRefreshKey] = useState(0)


    const getUserName = async () => {


        const res = await AsyncStorage.getItem('user_name')
            .then((value) =>

                value === null ? 'HüMA' : value

            );
        return res;
    }

    useEffect(() => {
        const username = Promise.resolve(getUserName());

        let isMounted = true;
        username.then((value) => {
            if (isMounted) {
                setUsName(value)
                //Alert.alert(value);
            }
        });
        return () => {
            isMounted = false;
        };
    }, [RefreshKey])
    const idUser = global.User_connecte;
    const imageProfile = 'Profile-_U' + idUser + '.jpeg';


    return (
        <View style={stylesSidebar.sideMenuContainer}>
            <View style={stylesSidebar.profileHeader}>


                <GetProfile user_id={global.User_connecte} navigation={props.navigation} img_prof={imageProfile} StyleDimens='large' />

                <Text style={stylesSidebar.profileHeaderText}>
                    {UsName.toUpperCase()}
                </Text>


            </View>
            <View style={stylesSidebar.profileHeaderLine} />
            <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />
                <DrawerItem
                    label={({ color }) =>
                        <Text style={{ color: '#d8d8d8' }}>
                            Logout
                        </Text>
                    }
                    icon={({ color, size }) => <AntDesign name="logout" color={color} size={30} />}

                    onPress={() => {
                        DeleteSession(props.navigation)
                    }}
                />
            </DrawerContentScrollView>
        </View>
    );


}

const stylesSidebar = StyleSheet.create({
    sideMenuContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: '#FFF',
        paddingTop: 40,
        color: 'white',
    },
    profileHeader: {
        flexDirection: 'row',
        backgroundColor: '#c4d63c',
        padding: 15,
        textAlign: 'center',
    },
    profileHeaderPicCircle: {
        width: 60,
        height: 60,
        borderRadius: 60 / 2,
        color: 'white',
        backgroundColor: '#ffffff',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileHeaderText: {
        color: 'white',
        alignSelf: 'center',
        paddingHorizontal: 10,
        fontWeight: 'bold',
    },
    profileHeaderLine: {
        height: 1,
        marginHorizontal: 20,
        backgroundColor: '#e2e2e2',
        marginTop: 15,
    },
});

export default CustomSidebarAuthMenu