import React from "react";
import { Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";

import { MyPlants } from "../pages/MyPlants";
import { PlantSelect } from "../pages/PlantSelect";

import colors from "../styles/colors";

const AppTab = createBottomTabNavigator();

const AuthRoutes = () => {
  return (
    <AppTab.Navigator 
      tabBarOptions={{
        activeTintColor: colors.green,
        inactiveTintColor: colors.heading,
        labelPosition: 'beside-icon',
        style: {
          paddingVertical: Platform.OS === 'android' ? 0 : 20,
          height: 88,
        }
      }} 
    >
      <AppTab.Screen 
        name="New Plant"
        component={PlantSelect}
        options={{
          tabBarIcon: (({ size, color }) => (
            <MaterialIcons name="add-circle-outline" size={size} color={color} />
          ))
        }}
      />

      <AppTab.Screen 
        name="My Plants"
        component={MyPlants}
        options={{
          tabBarIcon: (({ size, color }) => (
            <MaterialIcons name="format-list-bulleted" size={size} color={color} />
          ))
        }}
      />
    </AppTab.Navigator>
  )
}

export default AuthRoutes;