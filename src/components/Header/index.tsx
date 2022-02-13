import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import AsyncStorage from "@react-native-async-storage/async-storage";

import avatarProfile from "../../assets/avatar_profile.png"

import colors from "../../styles/colors";
import fonts from "../../styles/fonts";

export function Header() {
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    async function getUserNameFromStorage() {
      const userName = await AsyncStorage.getItem('@plantmanager:userName');
  
      setUserName(userName || "");
    }

    getUserNameFromStorage()
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.greeting}>Hi,</Text>
        <Text style={styles.userName}>{userName}</Text>
      </View>

      <Image style={styles.avatarImage} source={avatarProfile} />
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
    // the getStatusBarHeight() method return the status bar height and we apply this value as margin top
    marginTop: getStatusBarHeight(),
  },
  greeting: {
    fontSize: 32,
    color: colors.heading,
    fontFamily: fonts.text,
  },
  userName: {
    fontSize: 32,
    color: colors.heading,
    fontFamily: fonts.heading,
    lineHeight: 40,
    maxWidth: 250,
  },
  avatarImage: {
    width: 75,
    height: 75,
    borderRadius: 40,
  }
})