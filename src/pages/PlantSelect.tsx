import React from 'react';
import { View, Text, StyleSheet } from "react-native";

import { Header } from '../components/Header';

import colors from '../styles/colors';

export function PlantSelect() {
  return (
    <View style={styles.container}>
      <Header />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    // backgroundColor: colors.background,
  }
})