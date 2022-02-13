import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { useNavigation } from '@react-navigation/core';

import { EnvironmentButton } from '../components/EnvironmentButton';
import { Header } from '../components/Header';
import { Loader } from '../components/Loader';
import { PlantCardPrimary } from '../components/PlantCardPrimary';

import { PlantProps } from '../libs/storage';
import { api } from "../services/api"

import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface EnvironmentProps {
  key: string;
  title: string;
}

export function PlantSelect() {
  const [environments, setEnvironments] = useState<EnvironmentProps[]>([]);
  const [plants, setPlants] = useState<PlantProps[]>([]);
  const [plantsFiltered, setPlantsFiltered] = useState<PlantProps[]>([]);

  const [environmentSelected, setEnvironmentSelected] = useState<string>('all');

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [hasMorePlantsToLoad, setHasMorePlantsToLoad] = useState<boolean>(false);

  const navigation = useNavigation();

  const getPlantsEnvironments = async () => {
    const { data: plantsEnvironments } = await api.get('plants_environments?_sort=title&_order=asc');

    setEnvironments([{
      key: 'all',
      title: 'All'
    }, ...plantsEnvironments])
  }

  const getPlants = async () => {
    const { data: plants } = await api.get(`plants?_sort=name&_order=asc&_page=${page}&_limit=8`);

    if (!plants) {
      return setIsLoading(true);
    }

    if (page > 1) {
      setPlants((old) => [...old, ...plants]);
      setPlantsFiltered((old) => [...old, ...plants]);
    } else {
      setPlants(plants);
      setPlantsFiltered(plants);
    }

    setIsLoading(false);
    setHasMorePlantsToLoad(false);
  }

  function handleEnvironmentSelected(environment: string) {
    setEnvironmentSelected(environment);

    if (environment == 'all') {
      return setPlantsFiltered(plants);
    }

    const plantsFiltered = plants.filter((plant) => plant?.environments?.includes(environment));
    setPlantsFiltered(plantsFiltered);
  }

  function handlePlantSelect(plant: PlantProps) {
    navigation.navigate("PlantSave", { plant });
  }

  function getLoadMorePlants(distance: number) {
    if (distance < 1) {
      return;
    }

    setHasMorePlantsToLoad(true);
    setPage((old) => old + 1)
    getPlants();
  }

  useEffect(() => {
    getPlantsEnvironments();
    getPlants();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <View style={styles.container}>
          <View style={styles.header}>
          <Header />

          <Text style={styles.title}>In which environment</Text>
          <Text style={styles.subtitle}>do you want to place your plant?</Text>
          </View>

        <View>
          <FlatList 
            data={environments}
            keyExtractor={(item) => String(item.key)}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.enviromentList}
            renderItem={({ item }) => (<EnvironmentButton title={item?.title} active={item?.key === environmentSelected} onPress={() => handleEnvironmentSelected(item?.key)} />)}
          />
        </View>

        <View style={styles.plants}>
            <FlatList 
              data={plantsFiltered}
              keyExtractor={(item) => String(item.id)}
              onEndReachedThreshold={0.1}
              onEndReached={({ distanceFromEnd }) => getLoadMorePlants(distanceFromEnd)}
              ListFooterComponent={hasMorePlantsToLoad ? <ActivityIndicator color={colors.green} /> : <></>}
              numColumns={2}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (<PlantCardPrimary data={item} onPress={() => handlePlantSelect(item)} />)}
          />
        </View>

        </View>
      )}
    </>
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
  },
  plants: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 25,
  }
})