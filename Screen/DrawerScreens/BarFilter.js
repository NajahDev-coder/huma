import React, { useEffect } from "react";
//import FilterForm from "./FilterForm";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
    GooglePlacesAutocomplete,
    Geolocation,
} from 'react-native-google-places-autocomplete';
const BarFilter = ({ navigation }) => {
    return (
        <View style={styles.rowF}>
            <TouchableOpacity onPress={() => navigation.push('Filter')}>
                <View style={styles.rowAC}>
                    <GooglePlacesAutocomplete
                        placeholder="Localisation"
                        styles={{
                            textInputContainer: {
                                backgroundColor: 'transparent',
                                position: 'relative',
                            },
                            textInput: {
                                color: '#5a5959',
                                paddingLeft: 15,
                                paddingRight: 15,
                                borderWidth: 1,
                                borderRadius: 30,
                                borderColor: '#646363',
                                backgroundColor: 'transparent',
                                width: '75%',
                                height: 35,
                                fontSize: 11
                            },
                            predefinedPlacesDescription: {
                                color: '#1faadb',
                            },
                        }}
                    />
                </View>
                <MaterialCommunityIcons
                    name="filter-variant-plus"
                    size={35}
                    color="black"
                    onPress={() => navigation.push('Filter')}
                    style={{ position: 'absolute', right: 5 }}
                />
            </TouchableOpacity>

        </View>

    )
};
const styles = StyleSheet.create({
    rowF: {
        flex: 1,
        //flexDirection: 'column',
        paddingVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: '#ffffff',
        width: '100%',
        borderBottomEndRadius: 40,
        borderBottomWidth: 5,
        borderBottomColor: '#c4d63c',
        shadowColor: '#000000',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        marginBottom: 10,
    },
    rowAC: {
        flexDirection: 'column',
        width: '90%',
        paddingRight: 6,
        paddingLeft: 6,
        zIndex: 10,
        position: 'relative'

    },
})
export default BarFilter;