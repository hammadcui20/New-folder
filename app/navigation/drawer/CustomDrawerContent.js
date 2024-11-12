// src/navigation/CustomDrawerContent.js
import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../reducers/UserSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "../../../assets/colors/ThemeContext";

export default function CustomDrawerContent(props) {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userSlice.user);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("user");
      dispatch(logout());
      props.navigation.reset({
        index: 0,
        routes: [{ name: "Auth" }],
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Define visible screens based on user role
  const getVisibleScreens = () => {
    const allRoutes = props.state.routes;

    // Filter screens based on role
    if (user?.username === "admin") {
      return allRoutes.filter((route) =>
        [
          "Dashboard",
          "Add Rider",
          "Add Menu Item",
          "Rider List",
          "User List",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "Edit Profile",
        ].includes(route.name)
      );
    } else if (user?.username === "user") {
      return allRoutes.filter((route) =>
        ["Dashboard", "Menu"].includes(route.name)
      );
    } else if (user?.username === "rider") {
      return allRoutes.filter((route) =>
        ["Dashboard", "Requests", "OrderLists", "Edit Profile"].includes(
          route.name
        )
      );
    } else {
      return []; // No screens if no user role matches
    }
  };

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={[
        styles.drawerContent,
        { backgroundColor: theme.primary },
      ]}
    >
      <View>
        <View style={styles.header}>
          <Image
            source={require("../../../assets/images/avatar.png")}
            style={styles.logo}
          />
        </View>

        {/* Conditionally Render Drawer Items */}
        <View style={styles.drawerItemContainer}>
          {getVisibleScreens().map((route, index) => (
            <DrawerItem
              key={index}
              label={route.name}
              onPress={() => props.navigation.navigate(route.name)}
              labelStyle={[styles.drawerItemLabel, { color: theme.primary }]}
              style={[styles.drawerItem, { backgroundColor: theme.neutral1 }]}
            />
          ))}
        </View>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity
          onPress={handleLogout}
          style={[
            styles.drawerItem,
            { paddingVertical: 15, backgroundColor: theme.neutral1 },
          ]}
        >
          <Text
            style={[
              styles.drawerItemLabel,
              { paddingLeft: 15, color: theme.primary },
            ]}
          >
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    justifyContent: "space-between",
    paddingVertical: 50,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
    borderRadius: 100,
  },
  drawerItemContainer: {
    paddingHorizontal: 10,
  },
  drawerItem: {
    marginVertical: 5,
    borderRadius: 50,
    paddingHorizontal: 10,
  },
  drawerItemLabel: {
    fontSize: 14,
    fontFamily: "Bold",
    paddingLeft: 5,
  },
  footer: {
    paddingHorizontal: 20,
  },
});
