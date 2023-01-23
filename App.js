import * as React from "react";
import { Button, View, Text, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./components/HomeScreen";
import CameraScreen from "./components/CameraScreen";
import TextToSpech from "./components/TextToSpech";
import * as Speech from "expo-speech";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Camera" component={CameraScreen} />
        <Stack.Screen name="tts" component={TextToSpech} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
