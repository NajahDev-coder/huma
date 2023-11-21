// Integration of Google map in React Native using react-native-maps
// https://aboutreact.com/react-native-map-example/

// Import React
import React, { useEffect, useState, useCallback, createRef } from 'react';
// Import required components
import { SafeAreaView, StyleSheet, View, Dimensions, Text, Image, Platform } from 'react-native';

//import {Geocoder} from 'react-native-geocoder';
// Import Map and Marker
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import * as Location from 'expo-location';

import { Base_url, RequestOptionsGet, ShowDetailAnnonce, ViewProfile } from './utils/utils';


const MapTransporteur = ({ navigation, position, refresh }) => {
    const mapRef = createRef();
    const { width, height } = Dimensions.get('window');
    const ASPECT_RATIO = width / 150;
    const LATITUDE_DELTA = 1;
    //default france
    const [Latitude, setLatitude] = useState(46.227638);
    const [Longitude, setLongitude] = useState(2.213749)
    const [filter, setFilter] = useState(JSON.stringify({ "adresse": "", "nom": "", "type": "" }));
    const [MembresList, setMembresList] = useState([]);

    // const [LongitudeDelta, setlongitudeDelta]=useState(LatitudeDelta*ASPECT_RATIO)
    const LongitudeDelta = 0.053
    const LatitudeDelta = 0.053
    //const [loading, setLoading]=useState(true)

    const fetchAdressAnnonce = async (filter) => {

        if (Object.keys(filter).length > 0) {
            filter = encodeURIComponent(filter);
        }
        const fetchUrl = `membres/${filter}`;
        const json = await RequestOptionsGet(fetchUrl);


        if (json.length > 0) {
            let data = [];
            json.map((value) => {
                let lat, longt;
                if (value.Userlatitude != '') lat = parseFloat(value.Userlatitude);
                if (value.Userlongitude != '') longt = parseFloat(value.Userlongitude);

                if (lat && longt)
                    data.push({ id: value.id, latitude: lat, longitude: longt, title: value.nom, adresse: value.adresse });

            });
            setMembresList(data);

        }

    };
    /*const getLatitude= async (adresse)=>{
      
            const defaultLocation = await Location.geocodeAsync(adresse);
            //console.log('latitude', defaultLocation);
            return defaultLocation[0].latitude;
    }
    const getLongitude= async (adresse)=>{
      
            const defaultLocation = await Location.geocodeAsync(adresse);
            //console.log('longitude', defaultLocation);
            return defaultLocation[0].longitude;
    }*/
    const fetchPlace = async () => {
        try {

            ////console.log(position)
            setLatitude(position.latitude);
            setLongitude(position.longitude)

        }
        catch (err) {
            //console.log(err);
        }
    }

    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            fetchPlace();
            fetchAdressAnnonce(filter);

        }
        return () => (isMounted = false)
    }, [refresh])
    const imageMarker = {
        uri: `${Base_url}images/icone_Marker.png`,
    };
    const getMarkers = () => {

        return (
            <>
                {MembresList.length > 0 && MembresList.map((marker, key) => (
                    <Marker
                        key={key}
                        draggable
                        coordinate={{
                            latitude: marker.latitude,
                            longitude: marker.longitude,
                        }}
                        onPress={() => { ViewProfile(marker.id, navigation) }}
                        onDragEnd={
                            (e) => alert(JSON.stringify(e.nativeEvent.coordinate))
                        }
                        title={marker.title}
                        description={marker.adresse}
                        showCallout
                    >
                        <Image source={imageMarker} style={{ height: 35, width: 35 }} />
                    </Marker>
                ))}
            </>
        )
    }
    //console.log('MembresList:', MembresList)
    if (Platform.OS != 'web') {


        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.container}>
                    <MapView
                        ref={mapRef}
                        style={styles.mapStyle}
                        provider={PROVIDER_GOOGLE}
                        initialRegion={{
                            latitude: Latitude,
                            longitude: Longitude,
                            latitudeDelta: LatitudeDelta,
                            longitudeDelta: LongitudeDelta
                        }}
                        //onPress={this.onMapPress.bind(this)}
                        showsUserLocation={true}
                        followsUserLocation={true}
                        showsMyLocationButton={true}
                        showsCompass={true}
                        showsTraffic={true}
                        toolbarEnabled={true}
                        // onMapReady={() => this.setState({ width: width - 1 })}
                        customMapStyle={mapStyle}>

                        {getMarkers()}
                    </MapView>


                </View>
            </SafeAreaView>
        );

    }
    return (
        <>
            {/*<Text>{MembresList.length}</Text>  
  <Text>{typeof MembresList}</Text>  
  {MembresList.length>0 &&  MembresList.map((marker, key) => (               
          <View key={key}>
          <Text>{marker.latitude}</Text>   
          <Text>{marker.longitude}</Text>
          </View>   
  ))}   
  <View>
   <Text>vvvv</Text>  
  </View>   */}
        </>
    )
};

export default MapTransporteur;

const mapStyle = [
    { elementType: 'geometry', stylers: [{ color: '#d0d0d0' }] },
    { elementType: 'labels.text.fill', stylers: [{ color: '#445414' }] },
    { elementType: 'labels.text.stroke', stylers: [{ color: '#d0d0d0' }] },
    {
        featureType: 'administrative.locality',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#59730b' }],
    },
    {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#59730b' }],
    },
    {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [{ color: '#086a78' }],
    },
    {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#206a31' }],
    },
    {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{ color: '#38414e' }],
    },
    {
        featureType: 'road',
        elementType: 'geometry.stroke',
        stylers: [{ color: '#212a37' }],
    },
    {
        featureType: 'road',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#9ca5b3' }],
    },
    {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [{ color: '#746855' }],
    },
    {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [{ color: '#1f2835' }],
    },
    {
        featureType: 'road.highway',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#f3d19c' }],
    },
    {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [{ color: '#2f3948' }],
    },
    {
        featureType: 'transit.station',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#d59563' }],
    },
    {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{ color: '#17263c' }],
    },
    {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#515c6d' }],
    },
    {
        featureType: 'water',
        elementType: 'labels.text.stroke',
        stylers: [{ color: '#17263c' }],
    },
];

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    mapStyle: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
});
