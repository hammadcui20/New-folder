import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { BarChart } from "react-native-gifted-charts";
import { useTheme } from "../../assets/colors/ThemeContext"; // Adjust the import path as necessary

export default function Chart({
  data = [{ value: 50 }, { value: 80 }, { value: 90 }, { value: 70 }], // Default value: empty array
  maxValue = 5, // Default max value
  noOfSections = 6, // Default number of sections
  title = "Title", // Default title
  subtitle = "Subtitle", // Default subtitle
}) {
  const { theme } = useTheme(); // Access the current theme
  const [chartWidth, setChartWidth] = useState(0);

  return (
    <SafeAreaView
      style={[
        styles.container,
        { borderColor: theme.border, backgroundColor: theme.cardBackground },
      ]}
    >
      <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
        {subtitle}
      </Text>
      <Text style={[styles.title, { color: theme.textPrimary }]}>{title}</Text>

      <View
        style={styles.chartContainer}
        onLayout={(event) => {
          const { width } = event.nativeEvent.layout;
          setChartWidth(width);
        }}
      >
        <BarChart
          data={data}
          maxValue={maxValue}
          rulesType="solid"
          rulesColor="gray"
          xAxisColor="gray"
          yAxisThickness={0}
          xAxisThickness={1}
          noOfSections={noOfSections}
          width={chartWidth}
        />
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
    alignItems: "center",
    margin: 4,
  },
  title: {
    fontSize: 25,
    fontFamily: "Regular",
    marginBottom: 5,
    width: "100%",
  },
  subtitle: {
    fontSize: 15,
    fontFamily: "Regular",
    marginBottom: 15,
    width: "100%",
  },
  chartContainer: {
    width: "100%",
    alignItems: "flex-start",
    overflow: "hidden",
    marginTop: 15,
  },
  updateContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    width: "100%",
  },
  updateText: {
    fontSize: 15,
    fontFamily: "Regular",
    marginLeft: 5,
  },
});
