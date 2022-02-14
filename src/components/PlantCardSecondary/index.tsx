import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SvgFromUri } from "react-native-svg";
import { RectButton, RectButtonProps } from "react-native-gesture-handler";

import fonts from "../../styles/fonts";
import colors from "../../styles/colors";

interface PlantCardSecondaryProps extends RectButtonProps {
  data: {
    name: string;
    photo: string;
    hour: string;
  }
}

export function PlantCardSecondary({ data, ...rest }: PlantCardSecondaryProps) {
  return (
   <RectButton style={styles.container} {...rest}>
     <SvgFromUri uri={data?.photo} width={50} height={50} />
     <Text style={styles.title}>{data?.name}</Text>
     <View style={styles.details}>
      <Text style={styles.time}>Water at</Text>
      <Text style={styles.timeLabel}>{data?.hour}</Text>
     </View>
    </RectButton>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 25,
    marginVertical: 5,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.shape,
  },
  title: {
    flex: 1,
    marginLeft: 10,
    fontFamily: fonts.heading,
    fontSize: 17,
    color: colors.heading,
  },
  details: {
    alignItems: 'flex-end',
  },
  timeLabel: {
    fontSize: 16,
    fontFamily: fonts.text,
    color: colors.body_light,
  },
  time: {
    marginTop: 5,
    fontSize: 16,
    fontFamily: fonts.heading,
    color: colors.body_dark,
  }
})