import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SectionList,
  SafeAreaView,
  ActivityIndicator
} from "react-native";
import { useTheme } from "../../../assets/colors/ThemeContext";
import ProductCard from "../../components/ProductCard";
import Btn from "../../components/Btn";
import AddToCartModel from "../../modal/AddToCartModel";
import { useSelector } from "react-redux";
import axios from "axios";

export default function Menu({ navigation }) {
  const { theme } = useTheme();
  const [menuData, setMenuData] = useState([]);
  const [loading, setLoading] = useState(true);
  const modalVisible = useSelector(
    (state) => state.AddToCartModelSlice.addToCartModel.visible
  );

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const response = await axios.get("https://6520-116-71-184-99.ngrok-free.app/api/menu"); // Replace with actual API URL
        const data = response.data;

        // Group menu items by category
        const groupedData = data.reduce((sections, item) => {
          const categoryIndex = sections.findIndex(
            (section) => section.name === item.category
          );

          if (categoryIndex !== -1) {
            sections[categoryIndex].data.push(item);
          } else {
            sections.push({ name: item.category, data: [item] });
          }
          return sections;
        }, []);

        setMenuData(groupedData);
      } catch (error) {
        console.error("Error fetching menu data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuData();
  }, []);

  if (loading) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
      edges={["top"]}
    >
      <SectionList
        sections={menuData}
        keyExtractor={(item, index) => item.id + index}
        renderSectionHeader={({ section: { name } }) => (
          <Text style={[styles.categoryHeader, { color: theme.textPrimary }]}>
            {name}
          </Text>
        )}
        renderItem={({ item }) => (
          <View style={styles.productList}>
            <ProductCard key={item.id} product={item} />
          </View>
        )}
        ListFooterComponent={() => (
          <View style={styles.footer}>
            <Btn
              text="View Cart"
              width="50%"
              onPress={() => {
                navigation.navigate("Your Cart");
              }}
              fontSize={14}
              paddingVertical={10}
              containerStyle={{ borderWidth: 0 }}
              backgroundColor={theme.secondary}
            />
          </View>
        )}
      />
      {modalVisible && <AddToCartModel />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  categoryHeader: {
    fontSize: 24,
    fontFamily: "Black",
    marginVertical: 10,
    paddingLeft: 10,
  },
  subCategoryHeader: {
    fontSize: 20,
    fontFamily: "Bold",
    marginVertical: 5,
    paddingLeft: 15,
  },
  productList: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 10,
  },
  footer: {
    alignItems: "flex-start",
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
});
