import React from 'react';
import { Dimensions, StyleSheet, Text, View, Image } from 'react-native';

import PropTypes from 'prop-types'
//import { MapView } from 'expo'
//import { MapView } from 'react-native-maps';
import MapView, { Polyline, Marker } from 'react-native-maps';
import { decode } from "@mapbox/polyline";
//import * as Permissions from 'expo-permissions';
//import * as MediaLibrary from 'expo-media-library';
import * as Location from 'expo-location';
//import Polyline from '@mapbox/polyline'


const locations = require('../locations.json')
const { width, height } = Dimensions.get('screen')

export default class MapScreen extends React.Component {
    state = {
        latitude: null,
        longitude: null,
        locations: locations
    }

    async componentDidMount() {
        // const { status } = await Permissions.getAsync(Permissions.LOCATION)
        const { status } = await Location.requestForegroundPermissionsAsync();
        //  let { status } = await Location.requestForegroundPermissionsAsync();

        /*if (status !== 'granted') {
            const response = await Permissions.askAsync(Permissions.LOCATION)
            //const response = await Location.requestPermissionsAsync();
        }*/
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
        }
        //console.log('status', status);
        var currentPlace = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Highest, maximumAge: 10000 });
        //console.log('getCurrentPositionAsync', currentPlace.coords);
        const options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };
        //this.setState({ currentPlace.latitude , currentPlace.longitude , currentPlace});       
        navigator.geolocation.getCurrentPosition(
            ({ coords: { latitude, longitude } }) => this.setState({ latitude, longitude }, this.mergeCoords),
            (error) => //console.log('Error:', error), options
        )
        // const { locations: [sampleLocation] } = this.state;


        /*   this.setState({ 
          desLatitude: currentPlace.coords.latitude,
          desLongitude: currentPlace.coords.longitude
      }, this.mergeCoords)*/

    }

    mergeCoords = () => {
        const {
            latitude,
            longitude,
            desLatitude,
            desLongitude
        } = this.state

        const hasStartAndEnd = latitude !== null && desLatitude !== null

        if (hasStartAndEnd) {
            const concatStart = `${latitude},${longitude}`
            const concatEnd = `${desLatitude},${desLongitude}`
            this.getDirections(concatStart, concatEnd)
        }
    }

    async getDirections(startLoc, desLoc) {
        try {
            const resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${desLoc}`, {
                mode: 'no-cors'
            })
            const respJson = await resp.json();
            const response = respJson.routes[0]
            const distanceTime = response.legs[0]
            const distance = distanceTime.distance.text
            const time = distanceTime.duration.text
            const points = decode(respJson.routes[0].overview_polyline.points);
            const coords = points.map(point => {
                return {
                    latitude: point[0],
                    longitude: point[1]
                }
            })
            this.setState({ coords, distance, time })
        } catch (error) {
            //console.log('Error: ', error)
        }
    }

    onMarkerPress = location => () => {
        const { coords: { latitude, longitude } } = location
        this.setState({
            destination: location,
            desLatitude: latitude,
            desLongitude: longitude
        }, this.mergeCoords)
    }

    renderMarkers = () => {
        const { locations } = this.state
        return (
            <View>
                {
                    locations.map((location, idx) => {
                        const {
                            coords: { latitude, longitude }
                        } = location
                        return (
                            <Marker
                                key={idx}
                                coordinate={{ latitude, longitude }}
                                onPress={this.onMarkerPress(location)}
                            />
                        )
                    })
                }
            </View>
        )
    }

    render() {
        const {
            time,
            coords,
            distance,
            latitude,
            longitude,
            destination
        } = this.state
        //console.log('latitude', latitude)
        if (latitude) {
            return (
                <MapView
                    showsUserLocation
                    style={{ flex: 1 }}
                    /* initialRegion={{
                         latitude,
                         longitude,
                         latitudeDelta: 0.0922,
                         longitudeDelta: 0.0421
                     }}*/
                    initialRegion={{
                        latitude: 52.5200066,
                        longitude: 13.404954,
                        latitudeDelta: 0.1,
                        longitudeDelta: 0.1
                    }}
                >
                    <View
                        style={{
                            width,
                            paddingTop: 10,
                            alignSelf: 'center',
                            alignItems: 'center',
                            height: height * 0.15,
                            backgroundColor: 'white',
                            justifyContent: 'flex-end',
                        }}>
                        <Text style={{ fontWeight: 'bold' }}>Estimated Time: {time}</Text>
                        <Text style={{ fontWeight: 'bold' }}>Estimated Distance: {distance}</Text>
                    </View>
                    {this.renderMarkers()}

                    <Polyline

                        coordinates={coords}
                    />


                    < Image
                        source={{ uri: destination && destination.image_url }}
                        style={{
                            flex: 1,
                            width: width * 0.95,
                            alignSelf: 'center',
                            height: height * 0.15,
                            position: 'absolute',
                            bottom: height * 0.05
                        }}
                    />
                </MapView>
            );
        }
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>We need your permission!</Text>
            </View>
        )
    }
}

