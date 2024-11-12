// src/navigation/AppNavigator.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useSelector } from "react-redux";
import DrawerNavigator from "./drawer/DrawerNavigator";
import StackNavigator from "./stack/StackNavigator";

const RootStack = createStackNavigator();

export default function AppNavigator() {
  const user = useSelector((state) => state.userSlice.user);

  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      {!!user ? (
        <>
          <RootStack.Screen name="Main" component={DrawerNavigator} />
          <RootStack.Screen name="Auth" component={StackNavigator} />
        </>
      ) : (
        <>
          <RootStack.Screen name="Auth" component={StackNavigator} />
          <RootStack.Screen name="Main" component={DrawerNavigator} />
        </>
      )}
    </RootStack.Navigator>
  );
}
