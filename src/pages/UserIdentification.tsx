import React, { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  SafeAreaView,
  View,
  TextInput,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
} from "react-native";

import { Button } from "../components/Button";

import colors from "../styles/colors";
import fonts from "../styles/fonts";

export function UserIdentification() {
  const navigation = useNavigation();

  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isNameFilled, setIsNameFilled] = useState<boolean>(false);
  const [name, setName] = useState<string>("");

  function handleConfirm() {
    navigation.navigate("Confirmation");
  }

  function handleInputBlur() {
    setIsFocused(false);
    setIsNameFilled(!!name);
  }

  function handleInputFocus() {
    setIsFocused(true);
  }

  function handleNameInputChange(value: string) {
    setIsNameFilled(!!value);
    setName(value);
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.content}>
            <View style={styles.form}>
              <View style={styles.header}>
                <Text style={styles.emoji}>{isNameFilled ? "😄" : "😃"}</Text>

                <Text style={styles.title}>
                  How can {"\n"} we call you?
                </Text>
              </View>

              <TextInput
                style={[
                  styles.input,
                  (isFocused || isNameFilled) && { borderColor: colors.green },
                ]}
                placeholder="Enter a name"
                onChangeText={handleNameInputChange}
                onBlur={handleInputBlur}
                onFocus={handleInputFocus}
              />
              <View style={styles.footer}>
                <Button
                  text="Confirmar"
                  onPress={() => isNameFilled && handleConfirm()}
                />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-around",
  },
  content: {
    flex: 1,
    width: "100%",
  },
  form: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 54,
  },
  header: {
    alignItems: "center",
  },
  emoji: {
    fontSize: 44,
  },
  title: {
    fontSize: 24,
    lineHeight: 32,
    textAlign: "center",
    marginTop: 20,
    color: colors.heading,
    fontFamily: fonts.heading,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: colors.gray,
    color: colors.heading,
    width: "100%",
    fontSize: 18,
    marginTop: 50,
    padding: 10,
    textAlign: "center",
  },
  footer: {
    width: "100%",
    marginTop: 40,
    paddingHorizontal: 20,
  },
});
