import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Platform, Text, Pressable, View, Linking, TouchableOpacity } from 'react-native';

import { MaterialIcons, AntDesign, MaterialCommunityIcons, Feather, Ionicons } from '@expo/vector-icons';

const ModalScreeniSVIP = ({ navigation, choix }) => {
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
                        <Text style={styles.titleModal}>Félicitations, vous  êtes un membre VIP!</Text>
                        <Text style={styles.titleModal}>Pofitez {choix} mois pour :</Text>
                        <Text><Feather name="check" size={24} color="#c4d63c" /> Créer des annonces. </Text>
                        <Text><Feather name="check" size={24} color="#c4d63c" /> Proposer des offres </Text>
                        <Text><Feather name="check" size={24} color="#c4d63c" /> Donner votre Avis. </Text>
                        <Text><Feather name="check" size={24} color="#c4d63c" />Ajouter des publicités.</Text>
                        <View style={{ flexDirection: 'row' }}>

                            <Pressable
                                style={styles.buttVIP}
                                onPress={() => { setModalVisible(!modalVisible); navigation.navigate('Accueil') }}>
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
        alignItems: 'center',
        marginTop: 22,

    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
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
        padding: 10,
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
        padding: 10,
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
        paddingBottom: 20,
        marginBottom: 10
    }
});

export default ModalScreeniSVIP;   