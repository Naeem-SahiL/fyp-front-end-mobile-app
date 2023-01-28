import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

function HomeScreen({ navigation }) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
      }}
    >
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          height: "30%",
          width: "100%",
        }}
      >
        <Text style={styles.title}>Welcome to Nav Assist</Text>
      </View>
      <View
        style={{
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("Camera")}
          style={styles.appButtonContainer}
        >
          <Text style={styles.appButtonText}>Detect</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Camera")}
          style={styles.appButtonContainer}
        >
          <Text style={styles.appButtonText}>Start Navigation</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("tts")}
          style={styles.appButtonContainer}
        >
          <Text style={styles.appButtonText}>Test TTS</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("tensorflow")}
          style={styles.appButtonContainer}
        >
          <Text style={styles.appButtonText}>Tensorflow Detection</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "lightgray",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: "80%",
    marginVertical: 10,
  },
  appButtonText: {
    fontSize: 18,
    color: "#000",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
});

const Separator = () => <View style={styles.separator} />;
