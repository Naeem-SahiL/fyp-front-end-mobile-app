import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Camera from "react-native-camera-kit";

function DetectScreen() {
  return (
    <View style={styles.container}>
      <Camera
        style={styles.cameraContainer}
        //   cameraOptions={ratio: '16:9'}
      />
      <View style={styles.homeButtonContainer}>
        <TouchableOpacity
          style={styles.homeButton}
          onPress={() => this.props.navigation.navigate("Home")}
        >
          <Text>Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default DetectScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  cameraContainer: {
    flex: 0.8,
    width: "100%",
  },
  homeButtonContainer: {
    flex: 0.2,
    alignItems: "center",
    justifyContent: "center",
  },
  homeButton: {
    padding: 10,
    margin: 10,
    backgroundColor: "#c2bad8",
    borderRadius: 5,
  },
});
