import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Table } from "../../components";
import { allManagers } from "../../../assets/data/lists";

import { useTheme } from "../../../assets/colors/ThemeContext";
export default function RidersList() {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Table
        headings={allManagers.heading}
        bodyData={allManagers.data}
        emailColumnIndex={2}
        actionColumnIndex={3}
        tableTitle={"Riders List"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
});
