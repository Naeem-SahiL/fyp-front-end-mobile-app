import { StyleSheet } from "react-native";

const GlobalStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  cameraSpace: {
    flex: 0.8,
    width: "95%",
    backgroundColor: "black",
    alignItems: "center",
    marginVertical: 10,
    justifyContent: "center",
  },
  text: {
    color: "white",
  },
  controlSpace: {
    flex: 0.2,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
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

export default GlobalStyles;
