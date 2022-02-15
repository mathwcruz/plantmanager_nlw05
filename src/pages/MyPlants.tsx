import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image, Alert } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { formatDistance } from "date-fns";
import { enUS } from "date-fns/locale";
import AsyncStorage from "@react-native-async-storage/async-storage";


import { Header } from "../components/Header";
import { Loader } from "../components/Loader";
import { PlantCardSecondary } from "../components/PlantCardSecondary";

import { getPlants, removePlant, PlantProps } from "../libs/storage";

import waterDropImage from "../assets/waterdrop.png";

import colors from "../styles/colors";
import fonts from "../styles/fonts";

export function MyPlants() {
  const [myPlants, setMyPlants] = useState<PlantProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [nextWater, setNextWater] = useState<string>("");

  function handleRemovePlant(plant: PlantProps) {
    Alert.alert("Remove plant", `Do you want to remove ${plant.name}?`, [
      {
        text: 'No',
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: async () => {
          try {
            setIsLoading(true);
            await removePlant(plant?.id);

            setMyPlants((old) => old?.filter((data) => data?.id !== plant?.id));
            setTimeout(() => setIsLoading(false), 350);
          } catch (error) {
            Alert.alert("There was a problem trying to remove this plant, please try again")
          }
        }
      }
    ])
  }

  useEffect(() => console.log({ myPlants, isLoading }), [myPlants, isLoading])

  async function loadPlantsFromStorage() {
    setIsLoading(true);
    const plantsStoraged = await getPlants();

    if (plantsStoraged?.length > 0) {
      const nextTime = formatDistance(
        new Date(plantsStoraged[0].dateTimeNotification).getTime(),
        new Date().getTime(),
        { locale: enUS }
      );
  
      setNextWater(`Don't forget to water the ${plantsStoraged?.[0]?.name} at ${nextTime}`);
      setMyPlants(plantsStoraged);
      setTimeout(() => setIsLoading(false), 450);
    }
    
    setIsLoading(false);
  }

  useEffect(() => {
    loadPlantsFromStorage();
  }, []);

  return (
   <>
    {isLoading ? (
      <Loader />
    ) : (
      <>
        {!myPlants?.length ? (
           <Loader text={!myPlants?.length ? "You don't have registered plants yet" : ""} />
        ) : (
          <View style={styles.container}>
            <Header />
            <View style={styles.spotlightContainer}>
              <Image source={waterDropImage} style={styles.spotlightImage} />
              <Text style={styles.spotlightText}>{nextWater}</Text>
             </View>
              
            <View style={styles.plantsContainer}>
              <Text style={styles.plantsTitle}>Next watering</Text>
              <FlatList 
                data={myPlants}
                 keyExtractor={(item) => String(item?.id)}
                 renderItem={({ item }) => (
                  <PlantCardSecondary data={item} handleRemovePlant={() => handleRemovePlant(item)} />
                 )}
                 showsVerticalScrollIndicator={false}
              />
            </View>
          </View>
        )}
      </>
    )}
   </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    paddingTop: 50,
    backgroundColor: colors.background,
  },
  spotlightContainer: {
    backgroundColor: colors.blue_light,
    paddingHorizontal: 20,
    borderRadius: 20,
    height: 110,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  spotlightImage: {
    width: 60,
    height: 60,
  },
  spotlightText: {
    flex: 1,
    color: colors.blue,
    paddingHorizontal: 20,
  },
  plantsContainer: {
    flex: 1,
    width: '100%',
  },
  plantsTitle: {
    fontSize: 24,
    fontFamily: fonts.heading,
    color: colors.heading,
    marginVertical: 20,
  }
})