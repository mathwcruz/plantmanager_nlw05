import React from "react";
import {
  SafeAreaView,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { Button } from "../components/Button";

import welcomeImg from "../assets/watering.png";
import colors from "../styles/colors";

export function Welcome() {
  return (
    <SafeAreaView style={styles.container}>
      {/* <SafeAreaView /> same as a <div /> */}
      <Text style={styles.title}>
        Manage {"\n"} your plants {"\n"} the easy way
      </Text>
      <Image style={styles.image} source={welcomeImg} />
      <Text style={styles.subtitle}>
        Don't forget to water your plants anymore. We take care to remember you
        whenever you need.
      </Text>

      <Button text=">" />
    </SafeAreaView>
  );
}

// Dealing with styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    color: colors.heading,
    marginTop: 42,
  },
  subtitle: {
    textAlign: "center",
    fontSize: 18,
    paddingHorizontal: 20,
    color: colors.heading,
  },
  image: {
    height: 284,
    width: 292,
  },
});
