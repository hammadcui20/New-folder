import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Table } from "../../components";
import { allOrder } from "../../../assets/data/lists";

import { useTheme } from "../../../assets/colors/ThemeContext";
export default function OrderLists() {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Table headings={allOrder.heading} tableTitle={"Orders List"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
});
