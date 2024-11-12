import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  addToCartModel: { visible: false, data: {} },
};

export const AddToCartModelSlice = createSlice({
  name: "addToCartModel",
  initialState,
  reducers: {
    addToCartModel: (state, action) => {
      state.addToCartModel.data = action.payload;
    },
    closeCartModel: (state) => {
      state.addToCartModel.visible = false;
      state.addToCartModel.data = {};
    },
    openCartModel: (state) => {
      state.addToCartModel.visible = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToCartModel, openCartModel, closeCartModel } =
  AddToCartModelSlice.actions;

export default AddToCartModelSlice.reducer;
