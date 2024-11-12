// MyApp.js
import { StyleSheet, View, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { login } from "./reducers/UserSlice";

import AppNavigator from "./navigation/AppNavigator";
import { loadCartFromAsync } from "./reducers/CartSlice";

export default function MyApp() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(loadCartFromAsync());
  }, [dispatch]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("user");
        const userData = jsonValue != null ? JSON.parse(jsonValue) : null;
        if (userData) {
          dispatch(login(userData));
        }
      } catch (e) {
        console.log("Error fetching async storage: ", e);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [dispatch]);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <AppNavigator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
