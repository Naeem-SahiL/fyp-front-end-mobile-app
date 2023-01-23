import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import GlobalStyles from "../GlobalStyles";
import styles from "./Styles";

function MessageWithAction({ message, actionTitle, actionHandler }) {
  return (
    <View style={{ alignItems: "center" }}>
      <Text style={styles.txtMedium}>{message}</Text>
      <TouchableOpacity
        style={GlobalStyles.appButtonContainer}
        onPress={actionHandler}
      >
        <Text style={styles.text}>{actionTitle}</Text>
      </TouchableOpacity>
    </View>
  );
}

export default MessageWithAction;
