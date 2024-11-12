import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Chart, Table } from "../../components";
import { useSelector } from "react-redux";
import { useTheme } from "../../../assets/colors/ThemeContext";
import { requestsHistory } from "../../../assets/data/lists";

export default function Dashboard() {
  const { theme } = useTheme();
  const user = useSelector((state) => state.userSlice.user);

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      {user.username == "user" ? (
        <Table
          headings={requestsHistory.heading}
          bodyData={requestsHistory.data}
          // emailColumnIndex={[3, 4]}
          actionColumnIndex={2}
          tableTitle={"Users Lists"}
        />
      ) : (
        <>
          <Chart title="Deliveries Out" subtitle="Monthly" />
          <Chart title="Daily Performance " subtitle="Product Statistics" />
          <Chart title="Cancelled  Orders" subtitle=" Monthly" />
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
});
