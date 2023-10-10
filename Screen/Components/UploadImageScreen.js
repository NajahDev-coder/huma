
import React, { useState } from "react";
import {
    StyleSheet,
    View,
    Button,
    Image,
    ActivityIndicator,
    Platform,
    SafeAreaView,
    Text,
    TouchableHighlight
} from "react-native";
import storage from '@react-native-firebase/storage';
import { Base_url } from '../utils/utils';

import * as ImagePicker from 'expo-image-picker';
const UploadImageScreen = () => {


    const imgCamera = { uri: Base_url + "images/camera.png" }
    const [ImagePath, setImagePath] = useState(imgCamera)
    const [isLoading, setIsLoading] = useState(false)
    const [status, setStatus] = useState('')
    const [show, setShow] = useState(true);

    const [image, setImage] = useState(null);
    const chooseFile = async () => {
        setStatus('');
        var options = {
            title: 'Select Image',
            customButtons: [
                { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
            ],
            storageOptions: {
                skipBackup: true, // do not backup to iCloud
                path: 'Image', // store camera images under Pictures/images for android and Documents/images for iOS
            },
        };
        /* ImagePicker.showImagePicker(options, response => {
             if (response.didCancel) {
                 //console.log('User cancelled image picker', storage());
             } else if (response.error) {
                 //console.log('ImagePicker Error: ', response.error);
             } else if (response.customButton) {
                 //console.log('User tapped custom button: ', response.customButton);
             } else {
                 let path = getPlatformPath(response).value;
                 let fileName = getFileName(response.fileName, path);
                 setImagePath(path);
                 uploadImageToStorage(path, fileName);
             }
         });*/
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        //console.log(result);

        if (!result.canceled) {
            setShow(false);
            setImage(result.uri);
            // let path = getPlatformPath(result).value;
            let path = getPlatformPath(result.uri)
            //let fileName = getFileName(result.fileName, path);
            let fileName = getFileName("ttttt", path);
            setImagePath(path);
            uploadImageToStorage(path, fileName);
        }
    };

    const getFileName = (name, path) => {
        if (name != null) { return name; }

        if (Platform.OS === "ios") {
            path = "~" + path.substring(path.indexOf("/Documents"));
        }
        return path.split("/").pop();
    }

    const uploadImageToStorage = (path, name) => {
        setIsLoading(true);
        let reference = storage().ref(name);
        let task = reference.putFile(path);
        task.then(() => {
            //console.log('Image uploaded to the bucket!');
            setStatus('Image uploaded successfully');
            setIsLoading(false);
        }).catch((e) => {

            //console.log('uploading image error => ', e);
            setStatus('Something went wrong');
            setIsLoading(false);
        });
    }

    /**
     * Get platform specific value from response
     */
    const getPlatformPath = ({ path, uri }) => {
        return Platform.select({
            android: { "value": path },
            ios: { "value": uri }
        })
    }

    const getPlatformURI = (imagePath) => {
        let imgSource = imagePath;
        if (isNaN(imagePath)) {
            imgSource = { ImagePath };
            if (Platform.OS == 'android') {
                imgSource.uri = "file:///" + imgSource.uri;
            }
        }
        return imgSource
    }



    let imgSource = getPlatformURI(ImagePath)
    return (
        <SafeAreaView style={styles.container}>
            {isLoading && <ActivityIndicator size="large" style={styles.loadingIndicator} />}
            <View style={styles.imgContainer}>
                <Text style={styles.boldTextStyle}>{status}</Text>
                {/* <Image style={styles.uploadImage} source={imgSource} />
                <View style={styles.eightyWidthStyle} >
                    <Button title={'Upload Image'} onPress={chooseFile}></Button>
                </View>*/}

                <TouchableHighlight onPress={chooseFile} style={[styles.blcAvatar, show === false && styles.camHide]}>
                    <Image source={{ uri: Base_url + "images/camera.png" }} style={[
                        styles.imgAvatar,
                        show === false && styles.camHide,
                    ]} />

                </TouchableHighlight>
                {image && <TouchableHighlight onPress={chooseFile} style={styles.blcAvatar}><Image source={{ uri: image }} style={styles.imgAvatar} />
                </TouchableHighlight>}
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#e6e6fa',
    },
    imgContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        width: '100%',
        height: '100%'
    },
    loadingIndicator: {
        zIndex: 5,
        width: '100%',
        height: '100%',
    },
    boldTextStyle: {
        fontWeight: 'bold',
        fontSize: 22,
        color: '#5EB0E5',
    },
    blcAvatar:
    {
        width: "100%",
        height: 150
    },
    imgAvatar:
    {
        width: "100%",
        height: 150,
        borderRadius: 6,
        margin: 5,
        opacity: 1,
    },
    camHide:
    {
        opacity: 0,
        width: 0,
        height: 0
    },

});
export default UploadImageScreen;