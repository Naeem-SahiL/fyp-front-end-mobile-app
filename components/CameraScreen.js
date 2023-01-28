import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import CameraComponent from "./cameraComponent/CameraComponent";
import GlobalStyles from "./GlobalStyles";
import { styles } from "./cameraComponent/Styles";
function CameraScreen({ navigation }) {
  const [photo, setPhoto] = useState();
  const [hide, setHide] = useState(false);
  const detect = async () => {
    console.log("detect called");
    // sendImage(photo);
  };

  const handleRetry = () => {
    setPhoto(null);
    setHide(false);
  };
  useEffect(() => {
    console.log("photo changed ->", photo);
    if (photo != null) {
      // detect();
    }
  }, [photo]);

  return (
    <View style={GlobalStyles.container}>
      <View style={styles1.cameraSpace}>
        {!hide && <CameraComponent setPhoto={setPhoto} setHide={setHide} />}
        {photo && <Image source={{ uri: photo }} style={styles.picture} />}
      </View>
      <View style={styles1.controlSpace}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          style={{ ...GlobalStyles.appButtonContainer, width: "60%" }}
        >
          <Text style={GlobalStyles.appButtonText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleRetry}
          style={{ ...GlobalStyles.appButtonContainer, width: "30%" }}
        >
          <Text style={GlobalStyles.appButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default CameraScreen;

const styles1 = StyleSheet.create({
  text: {
    color: "white",
  },
  cameraSpace: {
    flex: 0.8,
    width: "95%",
    marginVertical: 10,
    borderColor: "black",
    borderWidth: 1,
  },
  controlSpace: {
    flex: 0.2,
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-around",
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
