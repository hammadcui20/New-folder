import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Table } from "../../components";
import { allUsers } from "../../../assets/data/lists";

import { useTheme } from "../../../assets/colors/ThemeContext";
export default function UserList() {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Table
        headings={allUsers.heading}
        bodyData={allUsers.data}
        emailColumnIndex={[1, 2]}
        actionColumnIndex={4}
        tableTitle={"All Users"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
});
