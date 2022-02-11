import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from "react-native";

import { EnvironmentButton } from '../components/EnvironmentButton';
import { Header } from '../components/Header';

import { api } from "../services/api"

import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface EnvironmentProps {
  key: string;
  title: string;
}

export function PlantSelect() {
  const [environments, setEnvironments] = useState<EnvironmentProps[]>([]);

  useEffect(() => {
    const getPlants = async () => {
      const { data } = await api.get('plants_environments');

      setEnvironments([{
        key: 'all',
        title: 'All'
      }, ...data])
    }

    getPlants();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <Header />

      <Text style={styles.title}>In which environment</Text>
      <Text style={styles.subtitle}>do you want to place your plant?</Text>
      </View>

    <View>
      <FlatList data={environments} horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.enviromentList} renderItem={({ item }) => (<EnvironmentButton key={item?.key} title={item?.title} />)} />
    </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: 30,
  },
  title: {  
    fontSize: 17,
    color: colors.heading,
    fontFamily: fonts.heading,
    lineHeight: 20,
    marginTop: 15,
  },
  subtitle: {
    fontSize: 17,
    color: colors.heading,
    fontFamily: fonts.text,
    lineHeight: 20,
  },
  enviromentList: {
    height: 40,
    justifyContent: 'center',
    paddingBottom: 5,
    marginLeft: 32,
    marginVertical: 32,
  }
})