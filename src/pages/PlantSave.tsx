import React, { useState } from "react";
import { View, Text, Alert, Image, ScrollView, Platform, TouchableOpacity, StyleSheet } from "react-native";
import { getBottomSpace } from "react-native-iphone-x-helper";
import { useRoute } from '@react-navigation/core';
import DateTimePicker, { Event } from '@react-native-community/datetimepicker';
import { SvgFromUri } from "react-native-svg"
import { format, isBefore } from "date-fns";

import { Button } from "../components/Button";

import { PlantProps } from "../libs/storage";

import waterDropImagem from "../assets/waterdrop.png";
import colors from "../styles/colors";
import fonts from "../styles/fonts";

interface Params {
  plant: PlantProps;
}

export function PlantSave() {
  const route = useRoute();

  const { plant } = route?.params as Params;

  const [dateTimeSelected, setDateTimeSelected] = useState(new Date());
  const [showDateTimePicker, setShowDateTimePicker] = useState(Platform.OS === 'ios');

  function handleSelectDateTime(_: Event, dateTime: Date | undefined) {
    if (Platform.OS === 'android') {
      setShowDateTimePicker((old) => !old);
    }

    if (dateTime && isBefore(dateTime, new Date())) {
      setDateTimeSelected(new Date());
      return Alert.alert("Choose a time in the future");
        // TODO: melhorar validação de data anteriro a atual, bug ao tentar escolher um horário após a meia noite, por exemplo
    }

    if (dateTime) {
      setDateTimeSelected(dateTime);
    }
  }

  function handleOpenDateTimePickerOnAndroid() {
    setShowDateTimePicker((old) => !old);
  }

  return (
    <View style={styles.container}>
      <View style={styles.plantInfo}>
        <SvgFromUri uri={plant?.photo} height={150} width={150} />
        <Text style={styles.plantName}>{plant?.name}</Text>
        <Text style={styles.plantAbout}>{plant?.about}</Text>
      </View>

      <View style={styles.controller}>
        <View style={styles.tipContainer}>
          <Image source={waterDropImagem} style={styles.tipImage} />
          <Text style={styles.tipText}>{plant?.water_tips}</Text>
        </View>

        <Text style={styles.timeRemember}>Choose the best time to be remembered</Text>

        {showDateTimePicker && (
          <DateTimePicker value={dateTimeSelected} mode="time" display="spinner" onChange={handleSelectDateTime} />
        )}

        {Platform.OS === 'android' && (
          <TouchableOpacity style={styles.dateTimePickerButton} onPress={handleOpenDateTimePickerOnAndroid}>
            <Text style={styles.dateTimePickerText}>{`Change time (current is ${format(dateTimeSelected, 'HH:mm')})`}</Text>
          </TouchableOpacity>
        )}

        <Button text="Register plant" onPress={() => {}} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: colors.shape,

  },
  plantInfo: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.shape,
  },
  plantName: {
    textAlign: 'center',
    fontFamily: fonts.heading,
    fontSize: 24,
    color: colors.heading,
    marginTop: 15,
  },
  plantAbout: {
    textAlign: 'center',
    fontFamily: fonts.text,
    fontSize: 17,
    color: colors.heading,
    marginTop: 10,
  },
  controller: {
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: getBottomSpace() || 20,
  },
  tipContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.blue_light,
    padding: 20,
    borderRadius: 20,
    position: 'relative',
    bottom: 65,
  },
  tipImage: {
    width: 56,
    height: 56,
  },
  tipText: {
    flex: 1,
    marginLeft: 20,
    fontFamily: fonts.text,
    color: colors.blue,
    fontSize: 17,
    textAlign: 'justify'
  },
  timeRemember: {
    textAlign: 'center',
    fontFamily: fonts.complement,
    color: colors.heading,
    fontSize: 12,
    marginBottom: 5,
  },
  dateTimePickerButton: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  dateTimePickerText: {
    color: colors.heading,
    fontSize: 24,
    fontFamily: fonts.text,
  }
})