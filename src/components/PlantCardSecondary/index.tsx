import React from "react";
import { View, Text, Animated, StyleSheet } from "react-native";
import { RectButton, RectButtonProps } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { SvgFromUri } from "react-native-svg";
import { Feather } from "@expo/vector-icons";

import fonts from "../../styles/fonts";
import colors from "../../styles/colors";

interface PlantCardSecondaryProps extends RectButtonProps {
  data: {
    name: string;
    photo: string;
    hour: string;
  };
  handleRemovePlant: () => void;
}

export function PlantCardSecondary({ data, handleRemovePlant, ...rest }: PlantCardSecondaryProps) {
  return (
    <Swipeable overshootRight={false} renderRightActions={() => (
      <Animated.View>
        <View>
          <RectButton style={styles.removeButton} onPress={handleRemovePlant}>
            <Feather name="trash" size={28} color={colors.white} />
          </RectButton>
        </View>
      </Animated.View>
    )}>
      <RectButton style={styles.container} {...rest}>
        <SvgFromUri uri={data?.photo} width={50} height={50} />
        <Text style={styles.title}>{data?.name}</Text>
        <View style={styles.details}>
          <Text style={styles.time}>Water at</Text>
          <Text style={styles.timeLabel}>{data?.hour}</Text>
        </View>
        </RectButton>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 15,
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
  },
  removeButton: {
    width: 120,
    height: 95,
    backgroundColor: colors.red,
    marginTop: 10,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    right: 20,
    paddingLeft: 15,
  }
})