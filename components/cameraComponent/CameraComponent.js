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
import styles from "./Styles";
import LoadingPermission from "./LoadingPermission";
import MessageWithAction from "./MessageWithAction";
import Ionicons from "@expo/vector-icons/Ionicons";

function CameraComponent({ setPhoto, setHide }) {
  const [type, setType] = useState(CameraType.back);
  const [picture, setPicture] = useState();
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();

  useEffect(() => {
    (async () => {
      const mediaLibraryPermission =
        await MediaLibrary.requestPermissionsAsync();
      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
    })();
  }, []);

  let cameraRef = useRef(null);

  if (!permission) {
    // Camera permissions are still loading
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
    let options = { quality: 1, base64: true, exif: false };

    if (cameraRef) {
      let newPhoto = await cameraRef.current.takePictureAsync(options);
      setPicture(newPhoto.uri);
      setPhoto(newPhoto.uri);
      setHide(true);
      sendImage(newPhoto.uri);
      // const asset = await MediaLibrary.createAssetAsync(newPhoto.uri);
      // console.log("asset", asset);
    }
  };

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type} ref={cameraRef}>
        <View style={localStyles.container}>
          <View style={localStyles.topbarContainer}>
            <TouchableOpacity
              style={localStyles.appButtonContainer}
              onPress={asyncTakePicture}
            >
              <Ionicons name="camera-flip-outline" size={32} color="green" />
            </TouchableOpacity>
          </View>
          <View style={localStyles.btnContainer}>
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

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  topbarContainer: {
    alignItems: "center",
    backgroundColor: "lightgreen",
  },
  btnContainer: {
    alignItems: "center",
  },
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "lightgray",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginVertical: 10,
  },
});

const sendImage = async (picture) => {
  try {
    let formData = new FormData();
    formData.append("file", {
      uri: picture,
      name: "image.jpg",
      type: "image/jpeg",
    });
    let options = {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    };
    let response = await fetch(
      "http://e62b-34-143-152-53.ngrok.io/predict",
      options
    );
    let responseJson = await response.json();
    // Do something with the response, like drawing bounding boxes on the picture
    console.log("responseJson", responseJson);
  } catch (error) {
    console.error(error);
  }
};
