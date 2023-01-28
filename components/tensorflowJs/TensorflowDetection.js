import React, { useEffect, useRef, useState } from "react";
import { View, Text, Dimensions } from "react-native";
import { cameraWithTensors } from "@tensorflow/tfjs-react-native";
import { Camera } from "expo-camera";
import * as cocossd from "@tensorflow-models/coco-ssd";
import * as tf from "@tensorflow/tfjs";
import Canvas from "react-native-canvas";
import * as Speech from "expo-speech";
import { styles } from "./Styles";
import useSpeech from "../tts/useSpeech";
import useTensorHelpers from "./useTensorHelpers";

const TensorCamera = cameraWithTensors(Camera);

function TensorflowDetection() {
  const { speak } = useSpeech();
  const [model, setModel] = useState();
  const [classes, setClasses] = useState("Nope!!");
  const canvas = useRef();
  const { cameraTexture } = useTensorHelpers();

  // useEffect(() => {
  //   console.log("new class -> ", classes);
  //   Speech.stop();
  //   Speech.speak("There is ", classes);
  // }, [classes]);

  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermissionsAsync();
      console.log("Camera permission status -> ", status);
      speak("Loading tensorflow");
      console.log("[/] waiting for tf ready...");
      await tf.ready();

      speak("Tensorflow loaded .Setting webGl backend");

      console.log("[+] tf is ready.");
      console.log("[/] loading model");

      const model = await cocossd.load();
      speak("Model loaded.");
      console.log("[+] model loaded.");
      setModel(model);
    })();
  }, []);

  const handleCameraStream = (images) => {
    console.log("handleCameraStream -> ", images);
    const loop = async () => {
      const nextImageTensor = images.next().value;
      if (!model || !nextImageTensor) {
        Speech.stop();
        Speech.speak("No model or image tensor");
        throw new Error("No model or image tensor");
      }

      model
        .detect(nextImageTensor)
        .then((predictions) => {
          console.log("Predictions -> ", predictions);
          console.log("Predictions[0] -> ", predictions[0].class);
          // if (predictions[0].class != detcClass) {
          //   detcClass = predictions[0].class;
          //   setClasses(predictions[0].class);
          // }
          setClasses(predictions[0].class);
          drawRectangles(predictions, nextImageTensor);
        })
        .catch((err) => {
          console.log("error in detetction ->", err);
          throw err;
        });
      // console.log(predictions);

      // Dispose the tensor to release the memory.
      // updatePreview();
      // gl.endFrameEXP();
      nextImageTensor.dispose();
      requestAnimationFrame(loop);
    };
    loop();
  };

  return (
    <View style={styles.screen}>
      <TensorCamera
        style={styles.camera}
        type={Camera.Constants.Type.back}
        // Tensor related props
        cameraTextureHeight={cameraTexture.height}
        cameraTextureWidth={cameraTexture.width}
        resizeHeight={200}
        resizeWidth={152}
        resizeDepth={3}
        autorender={true}
        onReady={handleCameraStream}
        useCustomShadersToResize={false}
      />
      <Text style={styles.pred}>{classes}</Text>
      <Canvas style={styles.canvas} ref={canvas} />
    </View>
  );
}
export default TensorflowDetection;
