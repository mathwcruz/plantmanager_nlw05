import React from "react";
import { View, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";

import loadAnimation from "../../assets/load.json";

export function Loader() {
  return (
    <View style={styles.container}>
      <LottieView source={loadAnimation} autoPlay loop style={styles.loader} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader: {
    backgroundColor: 'transparent',
    width: 200,
    height: 200,
  },
})