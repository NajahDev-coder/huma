import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,

  Alert
} from 'react-native';
import { Camera } from 'expo-camera';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function CameraImage({ captureImage, isinvisible, PStyle }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);

  const [UserID, setUserID] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);

  let camera;
  // const [annonceId, setAnnonceId] = useState(null);
  const cameraRef = useRef();
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
      const user_id = await AsyncStorage.getItem('user_id');
      // const annonce_id = await AsyncStorage.getItem('annonce_id');
      setUserID(user_id);
      //setAnnonceId(annonce_id);
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const galleryPicture = async () => {


    let photo = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: true,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5
    });
    if (!photo.canceled) {

      setPreviewVisible(true);
      setCapturedImage(photo.assets[0]);

      captureImage(photo);
    }
  };
  const takePicture = async () => {

    //if (!Camera) return;
    if (cameraRef.current) {
      //const options = { quality: 0.5, base64: true, skipProcessing: true };
      let photo = await cameraRef.current.takePictureAsync({
        base64: true,
        quality: 0.5,
        fixOrientation: true,
        forceUpOrientation: true,
        base64: true
      });
      //let photo = await cameraRef.current.takePictureAsync(options);  

      if (photo) {
        setPreviewVisible(true);
        setCapturedImage(photo);
        captureImage(photo);
        //SaveImage(photo)
      }
    }
  };


  const switchCamera = () => {
    if (previewVisible) {
      return;
    }
    setCameraType((prevCameraType) =>
      prevCameraType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };
  return (
    <View
      style={{
        flex: 1,

        borderRadius: 10,
      }}>
      {previewVisible && capturedImage ? (
        <ImageBackground
          source={{ uri: capturedImage.uri }}
          style={styles.rowCamera, PStyle || styles.StCamera}>
          <View>
            <AntDesign name="picture" size={24} color="black" onPress={() => setPreviewVisible(false)} />
          </View>
        </ImageBackground>
      ) : (
        <Camera
          style={PStyle || styles.StCamera}
          ratio="19:9"
          type={cameraType}
          ref={cameraRef}
        >


          <View style={styles.rowCamera}>

            <AntDesign
              name="camera"
              size={24}
              color="white"
              onPress={takePicture}
            />

            <MaterialIcons name="flip-camera-android" size={24} color="white" onPress={switchCamera} />
            <AntDesign
              onPress={galleryPicture}
              name="picture"
              size={24}
              color="white"
            />

          </View>
        </Camera>
      )
      }
    </View>
  );
}
const styles = StyleSheet.create({
  StCamera: { flex: 1, borderRadius: 10, maxHeight: 150 },
  rowCamera: { flexDirection: 'row', justifyContent: 'space-between', padding: 5 }
});