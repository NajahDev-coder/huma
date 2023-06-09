
import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import GetProfile from '../Components/GetProfile';
import { NaVIG, Base_url, RequestOptionsGet, ShowDetailAnnonce, ViewProfile } from '../utils/utils'
import { dateDiff } from '../includes/functions';
const displayNotif = async ({ value }) => {

    const today = new Date();
    const date = new Date(value.date);
    return (

        <TouchableOpacity key={value.key} onPress={() => {
            setSelected;
            NaVIG(value.id_activite, value.type_activite, navigation)
        }} style={styles.bcBlock} >
            <GetProfile user_id={value.id_user1} navigation={navigation} img_prof={value.img_prof} />

            <View style={styles.bcDetaille}>
                <Text style={styles.postLabel}>{value.nom} </Text>
                <Text style={styles.bcText}>{value.notification}</Text>

                <View
                    style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                    <Text style={styles.bcSmText}>{dateDiff(date, today)}  </Text>
                </View>
            </View>
        </TouchableOpacity>

    )

};
export default displayNotif;