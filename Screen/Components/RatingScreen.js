import React, { useState, useEffect } from 'react'
import { Alert, Modal, StyleSheet, Text, Pressable, View, TextInput } from 'react-native'
import { Rating, AirbnbRating } from 'react-native-ratings';
import { Base_url, RequestOptionsGet, RequestOptionsPost } from '../utils/utils';

const RatingScreen = ({ user_id1, user_id2 }) => {
  const [evaluation, setEvaluation] = useState(0)
  const [rate, setRate] = useState(0)
  const [avis, setAvis] = useState('')
  const [modalVisible, setModalVisible] = useState(false);
  const [TextSuccess, setTextSuccess] = useState('')

  // Catch Rating value

  const RatingCompleted = async () => {
    let dataToSend = {
      user_id1: user_id1,
      user_id2: user_id2,
      evaluation: evaluation,
      avis: avis
    }
    const responseJson = await RequestOptionsPost(dataToSend, 'update_user_evaluation')
    ////console.log("update_user_evaluation:" + responseJson);
    // //console.log("Evaluation: "+evaluation+" " + responseJson.rating);  
    if (responseJson) {

      setTextSuccess('Votre avis est bien publié!')
      setRate(responseJson.rating);
      setTimeout(() => { setModalVisible(false) }, 1000);
    }
  }
  const RatingProccess = (rating) => {

    //console.log("Rating is: ", rating);
    //Alert.alert(rating)
    setEvaluation(rating)
    setModalVisible(true)

  }
  const Noter = (user_id1 != user_id2 && user_id2 != 0) ? 1 : 0;
  ////console.log("Noter:", user_id1)
  const getNbreEtoile = async () => {
    const fetchURL = `user_rating/${user_id1}`
    const resp = await RequestOptionsGet(fetchURL)
    ////console.log('user_rating', fetchURL)

    //alert(resp.rating)
    setRate(resp.rating);
  }
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {

      getNbreEtoile();
    }
    return () => isMounted = false;


  }, [rate])

  return (
    <>

      <View style={styles.blc_rating}>
        <Text style={styles.txtEtoile}>{rate > 0 && rate}</Text>

        {Noter ?
          <AirbnbRating
            startingValue={rate > 0 ? rate : 0}
            defaultRating={rate > 0 ? rate : 0}
            size={16}
            reviews={1}
            //style={{ marginTop: 3 }}
            onFinishRating={(val) => RatingProccess(val)}
            ratingContainerStyle={{ marginTop: -58 }}
          />
          :
          <Rating
            style={{ marginTop: 3 }}
            startingValue={rate > 0 ? rate : 0}
            imageSize={16}
            readonly={true}
          />
        }

      </View>
      {modalVisible && (

        <View style={styles.centeredView}>

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {

              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <TextInput
                  multiline={true}
                  numberOfLines={4}
                  onChangeText={(val) => setAvis(val)}
                  placeholder='Donner votre avis'
                  style={styles.inputStyle}
                />
                <View style={{ flexDirection: 'row' }}>
                  <Text>{TextSuccess}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>

                  <Pressable
                    style={styles.buttonClose}
                    onPress={() => setModalVisible(false)}
                  >
                    <Text style={styles.textStyle}>Annuler</Text>
                  </Pressable>
                  <Pressable
                    style={styles.buttonValider}
                    onPress={() => RatingCompleted()}
                  >
                    <Text style={styles.textStyle}>Publier</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      )}
    </>
  )
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //marginTop: '20%',
    //width: '100%',
    //height:200, 

  },
  modalView: {
    width: '90%',
    position: 'absolute',
    top: '40%',
    left: '5%',
    backgroundColor: "white",
    borderRadius: 20,
    padding: 50,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2
  },
  buttonClose: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    backgroundColor: "#222222",
    margin: 5
  },
  buttonValider: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    backgroundColor: "#c4d63c",
    margin: 5
  },
  inputStyle: {
    flex: 1,
    color: '#5a5959',
    padding: 10,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 6,
    height: 35,
    width: '100%',
    backgroundColor: 'transparent',
    marginBottom: 5,
    fontSize: 11
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  blc_rating: { flexDirection: 'row', marginLeft: 5, justifyContent: 'flex-start', textAlign: 'left' },
  txtEtoile: { color: '#f1c40f', marginBottom: 2, marginRight: 2, fontSize: 14 }

});
export default RatingScreen;