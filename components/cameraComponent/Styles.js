import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  camera: {
    flex: 1,
    width: "100%",
    flexDirection: "column-reverse",
  },
  buttonContainer: {
    flex: 0.15,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
  txtMedium: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  picture: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  permissonBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default styles;
