import GlobalStyles from "./GlobalStyles";
// import React in our code
import React, { useState, useEffect } from "react";

// import all the components we are going to use
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  Keyboard,
  TouchableOpacity,
} from "react-native";
// import slider for the tuning of pitch and speed
// import Slider from "@react-native-community/slider";

// import Tts Text to Speech
// import Tts from "react-native-tts";
// import * as Speech from "expo-speech";
import useSpeech from "./tts/useSpeech";

function TextToSpech() {
  const [voices, setVoices] = useState([]);
  const [ttsStatus, setTtsStatus] = useState("initiliazing");
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [speechRate, setSpeechRate] = useState(0.5);
  const [speechPitch, setSpeechPitch] = useState(1);
  const [text, setText] = useState("Enter Text like Hello About React");
  const { speak } = useSpeech();
  //   useEffect(() => {
  //     Speech.speak("Welcome to React Native Text to Speech Example");
  //   }, []);

  return (
    <View style={GlobalStyles.container}>
      <View style={styles.playArea}>
        <Text>TextToSpech</Text>
      </View>
      <TouchableOpacity
        onPress={() => speak("Hello About React Native")}
        style={GlobalStyles.appButtonContainer}
      >
        <Text style={GlobalStyles.appButtonText}>Try it</Text>
      </TouchableOpacity>
    </View>
  );
}

export default TextToSpech;

const styles = StyleSheet.create({
  text: {
    color: "white",
  },
  playArea: {
    flex: 0.8,
    width: "95%",
    alignItems: "center",
    marginVertical: 10,
    justifyContent: "center",
  },
  controlSpace: {
    flex: 0.2,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
