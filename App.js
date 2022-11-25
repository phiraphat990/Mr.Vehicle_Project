import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MakeContract from "./screens/MakeContract";
import MakeContract_2 from "./screens/MakeContract_2";
import MakeContract_3 from "./screens/MakeContract_3";
import MyNavigator from "./navigation/MyNavigator";

const MealsNavigator = createNativeStackNavigator();

export default function App() {
  return (
<MyNavigator/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center",
  },
});
