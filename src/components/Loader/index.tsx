import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/core";
import LottieView from "lottie-react-native";
import { Feather } from "@expo/vector-icons";

import loadAnimation from "../../assets/load.json";
import colors from "../../styles/colors";
import fonts from "../../styles/fonts";

interface LoaderProps {
  text?: string;
}

export function Loader({ text }: LoaderProps) {
  const navigation = useNavigation();

  function handleChange() {
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <LottieView source={loadAnimation} autoPlay loop style={styles.loader} />
      {!!text && (
        <View style={styles.customContainer}>
          <Text style={styles.customText}>{text}</Text>
          <TouchableOpacity
            style={styles.customButton}
            activeOpacity={0.7}
            onPress={handleChange}
          >
            <Feather name="plus-circle" style={styles.customButtonIcon} />
        </TouchableOpacity>
        </View>
      )}
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
  customContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  customText: {
    fontSize: 18,
    maxWidth: 240,
    textAlign: 'center',
    fontFamily: fonts.text,
    marginTop: 20,
  },
  customButton: {
    backgroundColor: colors.green,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    marginTop: 20,
    height: 56,
    width: 56,
  },
  customButtonIcon: {
    fontSize: 30,
    color: colors.white,
  }
})