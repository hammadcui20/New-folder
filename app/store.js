import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./reducers/UserSlice";
import AddToCartModelSlice from "./reducers/AddToCartModelSlice";
import CartSlice from "./reducers/CartSlice";
export const store = configureStore({
  reducer: { cart: CartSlice, userSlice, AddToCartModelSlice },
});
