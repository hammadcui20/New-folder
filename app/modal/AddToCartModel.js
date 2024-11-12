import React, { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useTheme } from "../../assets/colors/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { Btn, Input } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { closeCartModel } from "../reducers/AddToCartModelSlice";
import axios from "axios"; // Import axios for API calls

import { validateQuantity, validateFullName } from "../utils/validations";

export default function AddToCartModel() {
  const product = useSelector(
    (state) => state.AddToCartModelSlice.addToCartModel.data
  );
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const [modalVisible, setModalVisible] = useState(true);
  const [flavour, setFlavour] = useState("");
  const [quantity, setQuantity] = useState("");
  const [flavourError, setFlavourError] = useState("");
  const [quantityError, setQuantityError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleQuantityChange = (e) => {
    setQuantity(e);
    validateQuantity({ e, error: setQuantityError });
  };

  const handleAddToCart = async () => {
    try {
      setLoading(true);

      const quantityValid = validateQuantity({
        e: quantity,
        error: setQuantityError,
      });
      if (quantityValid) {
        const payload = {
          product_id: product.id,
          flavor_id: flavour || null,
          quantity: parseInt(quantity, 10),
        };

        const response = await axios.post(
          "https://6520-116-71-184-99.ngrok-free.app/add-to-cart/", 
          payload,
          { headers: { "Content-Type": "application/json" } }
        );

        if (response.data.status === "success") {
          dispatch(closeCartModel());
          Alert.alert("Success", "Product added to cart successfully!");
        } else {
          Alert.alert("Error", "Failed to add product to cart.");
        }
      }
    } catch (error) {
      console.error("Add to Cart Error:", error);
      Alert.alert("Error", "An error occurred while adding to cart.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        onRequestClose={() => {
          dispatch(closeCartModel());
        }}
      >
        <View style={styles.centeredView}>
          <View
            style={[
              styles.modalView,
              { backgroundColor: theme.cardBackground },
            ]}
          >
            <View
              style={[
                styles.modelHeader,
                {
                  borderBottomColor: theme.textSecondary,
                },
              ]}
            >
              <Text style={[styles.modelHeading, { color: theme.textPrimary }]}>
                Add to Cart
              </Text>
              <TouchableOpacity
                style={styles.closeIconContainer}
                onPress={() => {
                  dispatch(closeCartModel());
                }}
              >
                <Ionicons
                  name="close"
                  size={30}
                  color={theme.textSecondary}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.model}>
              <Input
                keyboardType="number-pad"
                placeholder="Enter Quantity"
                value={quantity}
                onChangeText={handleQuantityChange}
                error={quantityError}
                labelFontFamily="Bold"
                fontFamily="Regular"
                inputContainerStyle={{ paddingVertical: 5 }}
                containerStyle={{ marginHorizontal: 15 }}
              />
              <Btn
                text="Add to Cart"
                width="93%"
                containerStyle={{ marginLeft: 10 }}
                onPress={handleAddToCart}
              />
              {loading && (
                <ActivityIndicator size="large" color="#0000ff" />
              )}
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    elevation: 3,
  },
  modelHeader: {
    width: "100%",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
  },
  modelHeading: {
    fontFamily: "Bold",
    fontSize: 20,
  },
  closeIconContainer: {
    width: 30,
  },
  closeIcon: {},
  model: {
    width: "100%",
    padding: 20,
    justifyContent: "center",
  },
});
