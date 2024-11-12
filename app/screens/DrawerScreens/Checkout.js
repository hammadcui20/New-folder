import React, { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
// import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Btn from "../../components/Btn"; // Ensure Btn is correctly imported here
import { useTheme } from "../../../assets/colors/ThemeContext";

import { GOOGLE_PLACES_API_KEY } from "@env"; // Import API key from .env
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Input } from "../../components";

export default function Checkout({ navigation }) {
  const { theme } = useTheme();
  const [sourceAddress, setSourceAddress] = useState("");

  const handlePlaceOrder = () => {
    // Handle place order logic here
    console.log("Order placed with address:", sourceAddress);

    Alert.alert(
      "Order Placed",
      `Your order has been placed successfully! Address: ${sourceAddress}`,
      [
        {
          text: "OK",
          onPress: () => navigation.navigate("Dashboard"), // Navigate to Dashboard
        },
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.textPrimary }]}>Checkout</Text>

      <View style={styles.inputContainer}>
        <View style={styles.mapsInputContainer}>
          <Text
            style={[styles.mapsInputLabel, { color: theme.textPrimary }]}
          ></Text>

          <GooglePlacesAutocomplete
            placeholder="Enter Source Address"
            onPress={(data, details = null) => {
              setSourceAddress(data.description);
            }}
            query={{
              key: GOOGLE_PLACES_API_KEY, // Use the API key from .env
              language: "en",
            }}
            styles={{
              textInput: {
                height: 44,
                borderColor: theme.border,
                borderWidth: 1,
                paddingHorizontal: 10,
                borderRadius: 5,
                marginBottom: 15,
                backgroundColor: theme.background,
                color: theme.textPrimary,
              },
              description: {
                color: theme.textPrimary,
              },
            }}
            // styles={styles.styles.mapsInput}
            fetchDetails={true}
          />
        </View>

        <Input
          placeholder="Email"
          value="Rawalpindi, Pakistan"
          labelFontFamily="Bold"
          fontFamily="Regular"
          inputContainerStyle={{ paddingVertical: 0 }}
          readOnly
          label="Destination Address"
        />
      </View>

      <Btn
        text="Place Order"
        width="100%"
        onPress={handlePlaceOrder}
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
  },
  title: {
    fontSize: 24,
    fontFamily: "Bold",
    marginBottom: 20,
  },
  inputContainer: {
    gap: 50,
  },

  addressText: {
    fontSize: 16,
    marginVertical: 10,
    fontFamily: "Regular",
  },
  mapsInputContainer: {
    gap: 5,
  },
  mapsInputLabel: {
    fontFamily: "Bold",
    fontSize: 14,
  },
  mapsInput: {},
});
