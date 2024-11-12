import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useTheme } from "../../assets/colors/ThemeContext"; // Adjust the import path as necessary

export default function Table({
  tableTitle = null,
  headings = [],
  bodyData = [],
  emailColumnIndex = [],
  actionColumnIndex = [],
  defaultMessage = "No data available", // Default message when no data or headers are provided
}) {
  const { theme } = useTheme();
  if (typeof emailColumnIndex != "object")
    emailColumnIndex = [emailColumnIndex];

  if (typeof actionColumnIndex != "object")
    actionColumnIndex = [actionColumnIndex];

  const getButtonColor = (color) => {
    switch (color) {
      case "danger":
        return theme.danger;
      case "success":
        return theme.success;
      case "info":
        return theme.info;
      case "warning":
        return theme.warning;
      default:
        return theme.primary;
    }
  };

  // Check if table should display default message
  const isDataEmpty = headings.length === 0 && bodyData.length === 0;

  return (
    <View style={[styles.container, { backgroundColor: theme.cardBackground }]}>
      {tableTitle ? (
        <Text style={[styles.tableTitle, { color: theme.textPrimary }]}>
          {tableTitle}
        </Text>
      ) : null}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.table}>
          {isDataEmpty ? (
            // Display default or custom message if no data or headers
            <Text style={[styles.defaultMessage, { color: theme.danger }]}>
              {defaultMessage}
            </Text>
          ) : (
            <>
              {/* Table Headings */}
              <View style={styles.tableRow}>
                {headings.map((heading, index) => (
                  <Text
                    key={index}
                    style={[
                      styles.tableCell,
                      styles.tableHeader,
                      {
                        width:
                          emailColumnIndex?.includes(index) ||
                          emailColumnIndex === index
                            ? 230
                            : 150,
                      },
                      // { width: index === emailColumnIndex ? 230 : 150 },
                      {
                        backgroundColor: theme.secondary,
                        color: theme.neutral1,
                      },
                    ]}
                  >
                    {heading}
                  </Text>
                ))}
              </View>

              {/* Table Body */}
              {bodyData.map((rowData, rowIndex) => (
                <View key={rowIndex} style={styles.tableRow}>
                  {rowData.map((cellData, cellIndex) =>
                    actionColumnIndex.includes(cellIndex) &&
                    Array.isArray(cellData) ? (
                      // Render buttons if cell index matches action column index
                      <View
                        key={cellIndex}
                        style={[
                          styles.tableCell,
                          {
                            width: 150,
                            flexDirection: "row",
                            justifyContent: "flex-start",
                          },
                        ]}
                      >
                        {cellData.map((btn, btnIndex) => (
                          <TouchableOpacity
                            key={btnIndex}
                            style={[
                              styles.button,
                              { backgroundColor: getButtonColor(btn.color) },
                            ]}
                            onPress={btn.onClick}
                          >
                            <Text style={styles.buttonText}>{btn.label}</Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    ) : (
                      // Render regular text cells
                      <Text
                        key={cellIndex}
                        style={[
                          styles.tableCell,
                          {
                            width:
                              emailColumnIndex?.includes(cellIndex) ||
                              emailColumnIndex === cellIndex
                                ? 230
                                : 150,
                          },
                        ]}
                      >
                        {typeof cellData === "object"
                          ? JSON.stringify(cellData)
                          : cellData}
                      </Text>
                    )
                  )}
                </View>
              ))}
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 5,
    borderRadius: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  table: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  tableTitle: {
    fontSize: 30,
    marginVertical: 10,
    marginLeft: 20,
    textAlign: "Left",
    fontFamily: "ExtraBold",
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCell: {
    padding: 12,
    borderBottomWidth: 1,
    borderColor: "#ddd", // Default border color (you can adjust if needed)
    justifyContent: "left",
    fontFamily: "Regular",
    fontSize: 14,
  },
  tableHeader: {
    fontFamily: "ExtraBold",
    fontSize: 16,
  },
  button: {
    marginHorizontal: 5,
    paddingVertical: 7,
    paddingHorizontal: 13,
    borderRadius: 6,
    alignSelf: "flex-start", // Prevents the button from stretching to row height
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  buttonText: {
    color: "#fff", // Default button text color
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
    fontFamily: "Bold",
  },
  defaultMessage: {
    padding: 20,
    fontSize: 16,
    textAlign: "center",
    fontFamily: "Bold",
  },
});
