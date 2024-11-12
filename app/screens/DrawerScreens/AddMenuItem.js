import React, { useState } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Btn, Input } from "../../components";
import { validateFullName, validatePrice } from "../../utils/validations";
import Loading from "../../modal/loading";
import { useTheme } from "../../../assets/colors/ThemeContext";

export default function AddMenuItem() {
  const navigation = useNavigation();
  const { theme } = useTheme();

  // State for each input field
  const [menuName, setMenuName] = useState("");
  const [menuNameError, setMenuNameError] = useState("");
  const [price, setPrice] = useState("");
  const [priceError, setPriceError] = useState("");
  const [category1, setCategory1] = useState("");
  const [category1Error, setCategory1Error] = useState("");
  const [category2, setCategory2] = useState("");
  const [category2Error, setCategory2Error] = useState("");
  const [flavour, setFlavour] = useState("");
  const [flavourError, setFlavourError] = useState("");
  const [flavorPrice, setFlavorPrice] = useState("");
  const [flavorPriceError, setFlavorPriceError] = useState("");

  const [loading, setLoading] = useState(false);

  // Handlers for input changes and validations
  const handleMenuNameChange = (e) => {
    setMenuName(e);
    validateFullName({ e, error: setMenuNameError });
  };

  const handlePriceChange = (e) => {
    setPrice(e);
    validatePrice({ e, error: setPriceError });
  };

  const handleCategory1Change = (e) => {
    setCategory1(e);
    validateFullName({ e, error: setCategory1Error });
  };

  const handleCategory2Change = (e) => {
    setCategory2(e);
    validateFullName({ e, error: setCategory2Error });
  };

  const handleFlavourChange = (e) => {
    setFlavour(e);
    if (e) validateFullName({ e, error: setFlavourError });
    else setFlavourError(""); // Clear error if field is empty
  };

  const handleFlavorPriceChange = (e) => {
    setFlavorPrice(e);
    if (e) validatePrice({ e, error: setFlavorPriceError });
    else setFlavorPriceError(""); // Clear error if field is empty
  };

  // Render the form
  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <Text style={[styles.title, { color: theme.textPrimary }]}></Text>

      <Input
        placeholder="Menu Name"
        value={menuName}
        onChangeText={handleMenuNameChange}
        error={menuNameError}
        labelFontFamily="Bold"
        fontFamily="Regular"
        inputContainerStyle={{ paddingVertical: 5 }}
        containerStyle={{ marginHorizontal: 15 }}
      />

      <Input
        placeholder="Price"
        value={price}
        onChangeText={handlePriceChange}
        error={priceError}
        labelFontFamily="Bold"
        fontFamily="Regular"
        inputContainerStyle={{ paddingVertical: 5 }}
        containerStyle={{ marginHorizontal: 15 }}
        keyboardType="numeric" // Set keyboard type for numeric input
      />

      <Input
        placeholder="Category 1"
        value={category1}
        onChangeText={handleCategory1Change}
        error={category1Error}
        labelFontFamily="Bold"
        fontFamily="Regular"
        inputContainerStyle={{ paddingVertical: 5 }}
        containerStyle={{ marginHorizontal: 15 }}
      />

      <Input
        placeholder="Category 2"
        value={category2}
        onChangeText={handleCategory2Change}
        error={category2Error}
        labelFontFamily="Bold"
        fontFamily="Regular"
        inputContainerStyle={{ paddingVertical: 5 }}
        containerStyle={{ marginHorizontal: 15 }}
      />

      <Input
        placeholder="Flavour (Optional)"
        value={flavour}
        onChangeText={handleFlavourChange}
        error={flavourError}
        labelFontFamily="Bold"
        fontFamily="Regular"
        inputContainerStyle={{ paddingVertical: 5 }}
        containerStyle={{ marginHorizontal: 15 }}
      />

      <Input
        placeholder="Flavor Price (Optional)"
        value={flavorPrice}
        onChangeText={handleFlavorPriceChange}
        error={flavorPriceError}
        labelFontFamily="Bold"
        fontFamily="Regular"
        inputContainerStyle={{ paddingVertical: 5 }}
        containerStyle={{ marginHorizontal: 15 }}
        keyboardType="numeric" // Set keyboard type for numeric input
      />

      <Btn
        text="Add Menu Item"
        width="93%"
        onPress={() => {
          setLoading(true);
          let menuNameFlag = validateFullName({
            e: menuName,
            error: setMenuNameError,
          });
          let priceFlag = validatePrice({ e: price, error: setPriceError });
          let category1Flag = validateFullName({
            e: category1,
            error: setCategory1Error,
          });
          let category2Flag = validateFullName({
            e: category2,
            error: setCategory2Error,
          });
          let flavourFlag =
            !flavour ||
            validateFullName({ e: flavour, error: setFlavourError });
          let flavorPriceFlag =
            !flavorPrice ||
            validatePrice({ e: flavorPrice, error: setFlavorPriceError });

          setTimeout(() => {
            if (
              menuNameFlag &&
              priceFlag &&
              category1Flag &&
              category2Flag &&
              flavourFlag &&
              flavorPriceFlag
            ) {
              navigation.goBack(); // Navigate back to the previous screen after successful validation
            }
            setLoading(false);
          }, 1000);
        }}
      />

      <View style={{ marginBottom: 20 }}></View>
      {loading ? <Loading /> : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontFamily: "Black",
    color: "#1E232C",
    width: "78%",
    marginLeft: 15,
    marginVertical: 20,
  },
  label: {
    fontFamily: "Bold",
    fontSize: 14,
    color: "#6A707C",
  },
});
