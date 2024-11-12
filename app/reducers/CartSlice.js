import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
  cart: [],
};

// Async thunk to handle adding to cart and storing in AsyncStorage
export const addProductToCartAsync = createAsyncThunk(
  "cart/addProductToCartAsync",
  async (product, { dispatch, getState }) => {
    // Dispatch the action to update the Redux state
    dispatch(addProductToCart(product));
    // Retrieve the updated cart from Redux state
    const cart = getState().cart.cart;

    try {
      await AsyncStorage.setItem("cart", JSON.stringify(cart));
    } catch (error) {
      console.error("Error storing cart in AsyncStorage", error);
    }
  }
);

// Thunk to load cart from AsyncStorage
export const loadCartFromAsync = createAsyncThunk(
  "cart/loadCartFromAsync",
  async (_, { dispatch }) => {
    try {
      const cartData = await AsyncStorage.getItem("cart");
      if (cartData) {
        const cart = JSON.parse(cartData);
        dispatch(setCart(cart));
      }
    } catch (error) {
      console.error("Error loading cart from AsyncStorage:", error);
    }
  }
);

export const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProductToCart: (state, action) => {
      state.cart.push(action.payload);
    },
    setCart: (state, action) => {
      state.cart = action.payload;
    },
  },
});

// Action creators
export const { addProductToCart, setCart } = CartSlice.actions;

export default CartSlice.reducer;
