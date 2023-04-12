import { ShowDetailAnnonce, ViewProfile, RequestOptionsGet } from '../utils/utils';
import { Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { set } from 'react-native-reanimated';

const GetActivite = async ({ activite, navigation }) => {

    const [idActivite, setIdActivite] = useState(0)
    const [Activite, setActivite] = useState('')
    const [Type, setType] = useState('')
    const getDetActivite = async () => {
        if (activite.includes('demande')) {
            const id_annonce = Number(activite.slice(activite.indexOf('demande') + 8))
            setIdActivite(id_annonce)
            const fetchURL = `/annonce/${id_annonce}`;
            const response = await RequestOptionsGet(fetchURL)
            const annonce = response.data[0].titre
            setActivite(annonce)
            setType('annonce')
        }
        else if (activite.includes('invitation')) {
            const id_user = Number(activite.slice(activite.indexOf('invitation') + 14))
            setIdActivite(id_user)
            const fetchURL = `/user/${id_user}`;
            const response = await RequestOptionsGet(fetchURL)
            const nom = response.data[0].nom
            setActivite(nom)
            setType('user')
        }
    }
    useEffect(() => {
        let isMounted = true
        if (isMounted) {

            getDetActivite()
        }
        return () => isMounted = false
    })

    return (
        <View>
            {/*<Text>{activite.replace(String(IdActivite), '')}*/}
            <Text>{activite}</Text>
            {Type == 'annonce' && (
                <TouchableOpacity onPress={() => ShowDetailAnnonce(IdActivite, navigation)}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{Activite}</Text>
                </TouchableOpacity>
            )}
            {Type == 'user' && (
                <TouchableOpacity onPress={() => ViewProfile(IdActivite, navigation)}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{Activite}</Text>
                </TouchableOpacity>
            )}

        </View>
    )



};
export default GetActivite;