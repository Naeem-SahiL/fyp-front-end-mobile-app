import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
  },
  camera: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 0,
  },
  canvas: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 1,
  },
  pred: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 100,
    color: "white",
    fontSize: 20,
    backgroundColor: "black",
  },
});

export { styles };
