
import React, { useEffect, useState } from 'react'
import { ShowDetailAnnonce, ViewProfile, RequestOptionsGet } from '../utils/utils';
import { Text, TouchableOpacity, View } from 'react-native'


const GetActivite = ({ activite, id_activite, navigation }) => {


    const [Activite, setActivite] = useState('');
    const [type, setType] = useState('');

    useEffect(() => {
        let isMounted = true;
        const getDetActivite = async () => {
            if (activite.includes('demande')) {

                const fetchURL = `/annonce/${id_activite}`;
                const response = await RequestOptionsGet(fetchURL);
                const annonce = response.data[0].titre;
                setType('annonce')
                setActivite(annonce);

            }
            else if (activite.includes('invitation') || activite.includes('amis') || activite.includes('profile') || activite.includes('abonn')) {

                const fetchURL2 = `/user/${id_activite}`;
                const response2 = await RequestOptionsGet(fetchURL2);
                const nom = response2.data[0].nom;
                setType('user')
                setActivite(nom);

            }
        };
        if (isMounted) {

            getDetActivite();
        }
        return () => (isMounted = false);
    }, [activite, id_activite]);
    return (
        <>
            {type == "annonce" && (
                <TouchableOpacity
                    onPress={() => ShowDetailAnnonce(id_activite, navigation)}
                >
                    <Text
                        style={{
                            fontWeight: 'bold',
                        }}>  {Activite}</Text>
                </TouchableOpacity>
            )}
            {
                type == "user" && (<TouchableOpacity
                    onPress={() => ViewProfile(id_activite, navigation)}
                >
                    <Text
                        style={{
                            fontWeight: 'bold',
                        }}>  {Activite}</Text>
                </TouchableOpacity>
                )
            }
        </>
    );
};
export default GetActivite;
