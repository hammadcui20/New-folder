import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Btn from "../../components/Btn"; // Ensure Btn is correctly imported here
import { useTheme } from "../../../assets/colors/ThemeContext";

export default function ViewCart({ navigation }) {
  const { theme } = useTheme();
  const cart = useSelector((state) => state.cart.cart);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // Calculate total price whenever cart changes
    const newTotal = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotal(newTotal);
  }, [cart]);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {cart.map((item, index) => (
        <Text key={index} style={styles.itemText}>
          {item.name} (x{item.quantity}) - $ {item.price}
        </Text>
      ))}

      <Text style={styles.totalText}>Total Price: ${total.toFixed(2)}</Text>

      <Btn
        text="Proceed to Checkout"
        width="50%"
        onPress={() => navigation.navigate("Checkout")}
        fontSize={15}
        paddingVertical={13}
        containerStyle={{ borderWidth: 0 }}
        backgroundColor={theme.primary}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    // justifyContent: "space-between",
  },
  itemText: {
    fontSize: 16,
    marginVertical: 5,
    fontFamily: "Regular",
  },
  totalText: {
    fontSize: 18,
    fontFamily: "Bold",
    marginVertical: 10,
  },
});
