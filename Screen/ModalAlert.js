import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, View, Linking, Pressable, TouchableOpacity } from 'react-native';

import { deleteAction } from './utils/utils';
import { MaterialIcons, AntDesign, MaterialCommunityIcons, Feather, Ionicons } from '@expo/vector-icons';
const ModalAlert = ({ navigation, msgAlerte, action }) => {
    const [modalVisible, setModalVisible] = useState(true);
    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    //Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>

                    <View style={styles.modalView}>
                        <Text style={styles.titleModal}>{msgAlerte}</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <Pressable
                                style={styles.butt}
                                onPress={() => { setModalVisible(!modalVisible); action(); }}>
                                <Text style={styles.txtbutt}>OK</Text>
                            </Pressable>

                        </View>
                    </View>

                </View>
            </Modal>

        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        // alignItems: 'center',
        marginTop: 22,

    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        //alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },

    butt:
    {
        margin: 10,
        borderWidth: 0,
        borderRadius: 10,
        backgroundColor: 'rgba(140, 153, 44 , 0.80)',
        padding: 15,
    },
    txtbutt:
    {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: 'bold'
    },
    buttVIP:
    {
        margin: 10,
        borderWidth: 0,
        borderRadius: 10,
        backgroundColor: '#c4d63c',
        padding: 15,
    },
    txtbuttVIP:
    {
        color: '#ffffff',
        fontSize: 14,
        fontWeight: 'bold'
    },
    viptxt:
    {
        color: 'red',
    },
    titleModal:
    {
        fontSize: 15,
        color: 'rgba(140, 153, 44 , 0.80)',
        borderBottomColor: '#c4d63c',
        borderBottomWidth: 5,
        paddingTop: 10,
        paddingBottom: 20,
        marginBottom: 10
    }
});

export default ModalAlert;   