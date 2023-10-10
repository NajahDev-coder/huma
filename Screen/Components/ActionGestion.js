import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import {
    Feather
} from '@expo/vector-icons';

import { SelectList } from 'react-native-dropdown-select-list'
import ModalSuppression from '../ModalSuppression';

const ActionGestion = ({ navigation, id, type, msgAlerte, id_user, onAction }) => {
    const [isAlerte, setIsAlerte] = useState(false);

    const [choix, setChoix] = useState(0);


    const GererAnnonce = async () => {

        console.log('old selected::', choix)
        // setSelected(0)
        if (choix == 1) {
            //setAnnonce_id_Su(null)
            if (type == 'annonce') {
                navigation.navigate({
                    name: 'EditAnnonce',
                    params: {
                        id_annonce: id
                    },
                });
            }
            else if (type == 'publicite') {

                navigation.navigate({
                    name: 'EditPublicite',
                    params: {
                        id_publicite: id
                    },
                });
            }
        }
        else {
            setIsAlerte(true);
        }
    }
    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            setIsAlerte(false);
            // console.log('setSelected1::', choix)
            setChoix(0)
            // console.log('setSelected2::', choix)
            //console.log('setSelected ID::', id)
        }
        return () => { isMounted = false }
    }, []);


    return (
        <>
            <SelectList
                setSelected={(val) => { setChoix(val) }}
                data={[{ key: 1, value: 'Modifier' }, { key: 2, value: 'Retirer' }]}
                onSelect={() => {
                    GererAnnonce();
                    // setDropStatus(false);
                }}
                search={false}
                arrowicon={<Feather name="more-vertical" size={18} style={{ position: 'absolute', top: 0, right: 0 }} color="black" />}
                boxStyles={styles.boxdropstyle}
                inputStyles={{ opacity: 0, padding: 0, height: 20, }}
                dropdownStyles={styles.dropstyle}
                dropdownItemStyles={styles.itemdropstyle}
            //dropdownShown={dropStatus}
            //defaultOption={{ key: '0', value: 'Choisir' }}
            />
            {
                isAlerte && (

                    <ModalSuppression navigation={navigation} msgAlerte={msgAlerte} id={id} type={type} onSupp={onAction} />

                )
            }
        </>
    )
};
const styles = StyleSheet.create({
    boxdropstyle:
    {
        borderRadius: 0,
        borderWidth: 0,
        padding: 0,
        position: 'relative',
        zIndex: 20

    },
    dropstyle:
    {

        marginTop: -35,
        zIndex: 20,
        //marginLeft: 5,
        padding: 0,
        paddingVertical: 0,
        borderRadius: 0,
        borderWidth: 0,
        backgroundColor: 'transparent'

    },
    itemdropstyle:
    {
        zIndex: 20,
        paddingVertical: 5,
        fontWeight: 'bold',
        borderRadius: 6,
        marginBottom: 2,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#909475',
        width: 100
    },

})
export default ActionGestion;

