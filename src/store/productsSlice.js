import { createSlice } from "@reduxjs/toolkit";
import products from "../data/products";
const initialState = {
  products: products,
  selectedProduct: null,
};
export const productsSlice = createSlice({
  initialState,
  name: "products",
  reducers: {
    setSelectedProduct: (state, action) => {
      const productId = action.payload;
      state.selectedProduct = state.products.find((p) => p.id === productId);
    },
  },
});
