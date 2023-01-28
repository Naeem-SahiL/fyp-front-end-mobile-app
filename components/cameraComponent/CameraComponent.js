import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  Image,
} from "react-native";

import GlobalStyles from "../GlobalStyles";
import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { styles, cameraComponentStyles } from "./Styles";
import LoadingPermission from "./LoadingPermission";
import MessageWithAction from "./MessageWithAction";
import { Permissions } from "expo";
import Ionicons from "@expo/vector-icons/Ionicons";
import axios from "axios";
// import { speak } from "../tts/useSpeech";
import useAPI from "./useAPI";

function CameraComponent({ setPhoto, setHide }) {
  const [type, setType] = useState(CameraType.back);
  const [videoStream, setVideoStream] = useState();
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const { sendImage } = useAPI();
  // const { speak } = useSpeech();

  useEffect(() => {
    (async () => {
      const mediaLibraryPermission =
        await MediaLibrary.requestPermissionsAsync();
      // await Camera.requestPermissionsAsync();
      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
    })();
  }, []);

  // useEffect(() => {
  //   // testRobo(picture);
  //   if (picture != null) {
  //     console.log(picture.base64);
  //   }
  // }, [picture]);

  let cameraRef = useRef(null);

  if (!permission) {
    return <LoadingPermission />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.permissonBox}>
        <MessageWithAction
          message="We need your permission to show the camera"
          actionTitle="Grant permission"
          actionHandler={requestPermission}
        />
      </View>
    );
  }

  const toggleCameraType = () => {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  };

  const asyncTakePicture = async () => {
    let options = { quality: 0.5, base64: true, exif: false };

    if (cameraRef) {
      let newPhoto = await cameraRef.current.takePictureAsync(options);
      setPhoto(newPhoto.uri);
      setHide(true);
      console.log("taking picture...");
      // setTimeout(asyncTakePicture, 2000);
      console.log("sending image...");
      // sendImage(newPhoto.uri);
    }
  };
  const handleCameraReady = async () => {
    console.log("Camera is ready");
    startRecording = async () => {
      if (cameraRef.current) {
        const video = await cameraRef.current.recordAsync();
        setVideoStream(video.uri);
        console.log("uri->", video.uri);
        // Send the video stream to the server
      }
    };
    await startRecording();
  };

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={type}
        ref={cameraRef}
        // onCameraReady={handleCameraReady}
      >
        <View style={cameraComponentStyles.container}>
          <View style={cameraComponentStyles.topbarContainer}>
            {/* <TouchableOpacity
              style={localStyles.appButtonContainer}
              onPress={asyncTakePicture}
            >
              <Ionicons name="camera-flip-outline" size={32} color="green" />
            </TouchableOpacity> */}
          </View>
          <View style={cameraComponentStyles.btnContainer}>
            <TouchableOpacity
              style={GlobalStyles.appButtonContainer}
              onPress={asyncTakePicture}
            >
              <Text style={GlobalStyles.appButtonText}>Detect</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Camera>
    </View>
  );
}

export default CameraComponent;
