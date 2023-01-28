import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import img from "../../assets/favicon.png";
import Tflite from "tflite-react-native";

let tflite = new Tflite();

const MODEL_FILE = `file:///models/yolov2_tiny.tflite`;
const LABELS_FILE = `file:///models/yolov2_tiny.txt`;

function TfLiteCamera() {
  const [model, setModel] = useState();
  useEffect(() => {
    const loadModel = async () => {
      try {
        const model = await tflite.loadModel({
          model: MODEL_FILE,
          labels: LABELS_FILE,
          numThreads: 1, // defaults to 1
          isAsset: false, // defaults to true
          useGpuDelegate: false, // defaults to false
        });
        setModel(model);
      } catch (e) {
        console.log(e);
      }
    };
    loadModel();
  }, []);

  const exampleImageUri = Image.resolveAssetSource(img).uri;
  return (
    <View>
      <Text>Tensorflow Lite Camera</Text>
      <Image
        source={{ uri: exampleImageUri }}
        style={{ width: 200, height: 200 }}
      />
    </View>
  );
}

export default TfLiteCamera;
