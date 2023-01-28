import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { Camera } from "react-native-vision-camera";

function VisionCamera() {
  useEffect(() => {
    (async () => {
      console.log("VisionCamera mounted");
      const newCameraPermission = await Camera.requestCameraPermission();
    })();
  }, []);

  return (
    <View>
      <Text>VisionCamera</Text>
    </View>
  );
}

export default VisionCamera;
