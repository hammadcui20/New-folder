// src/navigation/MainNavigator.js
import React, { useEffect } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDrawerContent from "./CustomDrawerContent";
import {
  AddRider,
  AddMenuItem,
  Dashboard,
  Menu,
  OrderLists,
  Profile,
  Requests,
  RiderList,
  UserList,
  ViewCart,
  Checkout,
} from "../../screens/DrawerScreens";
import { useSelector } from "react-redux";

import { StyleSheet } from "react-native";
import { useTheme } from "../../../assets/colors/ThemeContext";

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  const { theme } = useTheme();

  const user = useSelector((state) => state.userSlice.user);

  // Define screens based on role
  const renderScreens = () => {
    return (
      <>
        <Drawer.Screen name="Dashboard" component={Dashboard} />
        <Drawer.Screen name="Add Rider" component={AddRider} />
        <Drawer.Screen name="Add Menu Item" component={AddMenuItem} />
        <Drawer.Screen name="User List" component={UserList} />
        <Drawer.Screen name="Rider List" component={RiderList} />
        <Drawer.Screen name="Menu" component={Menu} />
        <Drawer.Screen name="Your Cart" component={ViewCart} />
        <Drawer.Screen name="Checkout" component={Checkout} />
        <Drawer.Screen name="Requests" component={Requests} />
        <Drawer.Screen name="OrderLists" component={OrderLists} />
        <Drawer.Screen name="Edit Profile" component={Profile} />
      </>
    );
  };

  return (
    <Drawer.Navigator
      screenOptions={{
        headerTitleStyle: [styles.headerTitle, { color: theme.primaryText }],
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      {renderScreens()}
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 28,
    fontFamily: "Bold",
  },
});
