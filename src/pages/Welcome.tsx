import React from "react";
import { useNavigation } from "@react-navigation/core";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Feather } from "@expo/vector-icons";

import welcomeImg from "../assets/watering.png";
import colors from "../styles/colors";
import fonts from "../styles/fonts";

export function Welcome() {
  const navigation = useNavigation();

  async function handleStart() {
    navigation.navigate("UserIdentification");
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        {/* <SafeAreaView /> same as a <div /> */}
        <Text style={styles.title}>
          Manage {"\n"} your plants {"\n"} the easy way
        </Text>
        <Image style={styles.image} source={welcomeImg} resizeMode="contain" />
        <Text style={styles.subtitle}>
          Don't forget to water your plants anymore. We take care to remember
          you whenever you need.
        </Text>

        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.7}
          onPress={handleStart}
        >
          {/* <TouchableOpacity /> to handle opacity transition */}
          <Feather name="chevron-right" style={styles.buttonIcon} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// Dealing with styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 20,
  },
  title: {
    fontFamily: fonts.heading,
    lineHeight: 34,
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: colors.heading,
    marginTop: 38,
  },
  subtitle: {
    fontFamily: fonts.text,
    textAlign: "center",
    fontSize: 18,
    paddingHorizontal: 20,
    color: colors.heading,
  },
  image: {
    // calculating image height based on device dimension
    height: Dimensions.get("window").width * 0.7,
  },
  button: {
    backgroundColor: colors.green,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    marginBottom: 25,
    height: 56,
    width: 56,
  },
  buttonIcon: {
    fontSize: 30,
    color: colors.white,
  },
});
