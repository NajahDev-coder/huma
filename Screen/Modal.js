import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Platform, Text, Pressable, View, Linking, TouchableOpacity } from 'react-native';

import { MaterialIcons, AntDesign, MaterialCommunityIcons, Feather, Ionicons } from '@expo/vector-icons';
const ModalScreenVIP = ({ navigation }) => {
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
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>

              <Text style={styles.titleModal}>Membre Premium!</Text>
            </View>
            <Text><Feather name="check" size={24} color="#c4d63c" /> Publier  des annonces. </Text>
            <Text><Feather name="check" size={24} color="#c4d63c" /> Proposer des offres. </Text>
            <Text><Feather name="check" size={24} color="#c4d63c" /> Vos Avis & Commentaires. </Text>
            <Text><Ionicons name="lock-closed" size={24} color="grey" />Vos Publicités Produits. <Text style={styles.viptxt}>(VIP)</Text> </Text>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <Pressable
                style={styles.butt}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.txtbutt}>Ignorer</Text>
              </Pressable>
              <Pressable
                style={styles.buttVIP}
                onPress={() => { Platform.OS == 'web' ? Linking.openURL('https://play.google.com/store/search?q=huma&c=apps') : navigation.navigate('Abonnement') }}>
                <Text style={styles.txtbutt}>Devenir VIP</Text>
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
    //alignItems: 'center',
    marginTop: 22,

  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    // alignItems: 'center',
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
    color: '#c4d63c',
    fontWeight: 'bold'
  },
  titleModal:
  {
    fontSize: 15,
    color: 'rgba(140, 153, 44 , 0.80)',
    borderBottomColor: '#c4d63c',
    borderBottomWidth: 5,
    paddingBottom: 20,
    marginBottom: 10,

  }
});

export default ModalScreenVIP;   