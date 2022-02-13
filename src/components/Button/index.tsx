import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  Text,
} from "react-native";

import colors from "../../styles/colors";
import fonts from "../../styles/fonts";

interface ButtonProps extends TouchableOpacityProps {
  text: string;
}

export function Button({ text, disabled, ...rest }: ButtonProps) {
  return (
    <TouchableOpacity style={[styles.container, disabled && styles.buttonisDisabled]} {...rest}>
      <Text style={[styles.text, disabled && styles.textButtonIsDisabled]}>{text}</Text>
    </TouchableOpacity>
  );
}

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.green,
    height: 56,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonisDisabled: {
    backgroundColor: colors.gray,
  },
  text: {
    fontSize: 16,
    color: colors.white,
    fontFamily: fonts.heading,
  },
  textButtonIsDisabled: {
    color: 'black'
  },
});
