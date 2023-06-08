
import React, { useEffect, useState } from 'react'
import { ShowDetailAnnonce, ViewProfile, RequestOptionsGet } from '../utils/utils';
import { Text, TouchableOpacity, View } from 'react-native'


const GetActivite = ({ activite, id_activite }) => {


    const [Activite, setActivite] = useState('')


    useEffect(() => {
        let isMounted = true;
        const getDetActivite = async () => {
            if (activite.includes('demande')) {

                const fetchURL = `/annonce/${id_activite}`;
                const response = await RequestOptionsGet(fetchURL);
                const annonce = response.data[0].titre;
                setActivite(annonce);

            }
            else if (activite.includes('invitation') || activite.includes('amis') || activite.includes('profile') || activite.includes('abonn')) {

                const fetchURL2 = `/user/${id_activite}`;
                const response2 = await RequestOptionsGet(fetchURL2);
                const nom = response2.data[0].nom;
                setActivite(nom);

            }
        };
        if (isMounted) {

            getDetActivite();
        }
        return () => (isMounted = false);
    }, [activite, id_activite]);
    return (
        <Text
            style={{
                fontWeight: 'bold',
            }}>{Activite}</Text>
    );
};
export default GetActivite;
