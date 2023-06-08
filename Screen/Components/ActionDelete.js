import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, View, Alert } from 'react-native';
import {
    FontAwesome,
    FontAwesome5,
    AntDesign,
    MaterialIcons,
    Octicons,
    Fontisto,
    MaterialCommunityIcons,
    Ionicons,
    Feather,

} from '@expo/vector-icons';

import { SelectList } from 'react-native-dropdown-select-list'
import ModalSuppression from '../ModalSuppression';
import { Base_url, RequestOptionsPut, RequestOptionsGet, RequestOptionsPost } from '../utils/utils';

const ActionDelete = ({ navigation, id, type, msgAlerte, id_user }) => {
    const [isAlerte, setIsAlerte] = useState(false);

    const [selected, setSelected] = useState('');

    const GererAnnonce = async (navigation, id, choix) => {

        if (choix == 1) {
            //setAnnonce_id_Su(null)
            navigation.navigate({
                name: 'EditAnnonce',
                params: {
                    id_annonce: id
                },
            });
        }
        else {
            setIsAlerte(true);

        }
    }
    return (
        <>
            <SelectList
                setSelected={setSelected}
                data={[{ key: 1, value: 'Modifier' }, { key: 2, value: 'Retirer' }]}
                onSelect={() => {
                    GererAnnonce(
                        navigation,
                        id,
                        selected,
                    )
                }}
                search={false}
                arrowicon={<Feather name="more-vertical" size={18} style={{ position: 'absolute', top: 0, right: 0 }} color="black" />}
                boxStyles={styles.boxdropstyle}
                inputStyles={{ opacity: 0, padding: 0, height: 20, }}
                dropdownStyles={styles.dropstyle}
                dropdownItemStyles={styles.itemdropstyle}
            />
            {isAlerte && (
                <ModalSuppression navigation={navigation} msgAlerte={msgAlerte} id={id} type={type} />
            )}
        </>
    );
};
const styles = StyleSheet.create({
    boxdropstyle:
    {
        borderRadius: 0,
        borderWidth: 0,
        padding: 0,

    },
    dropstyle:
    {
        minWidth: 80,
        position: 'absolute',
        top: 0,
        right: 18,
        zIndex: 20,

        marginTop: -5,
        padding: 0,
        paddingVertical: 0,

        borderRadius: 6,

        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#909475'
    },
    itemdropstyle:
    {
        zIndex: 20,
        paddingVertical: 5,
        fontWeight: 'bold'
    },
})
export default ActionDelete;

