import * as Speech from "expo-speech";

export default function useSpeech() {
  const speak = (text) => {
    Speech.stop();
    Speech.speak(text);
  };

  return { speak };
}
