import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

import colors from "../../styles/colors";

export function Header() {
  return (
    <View style={styles.container}>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 20,
    backgroundColor: colors.red,
  }
})