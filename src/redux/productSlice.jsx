import { createSlice } from "@reduxjs/toolkit";

// Searching and filtering now live in the page address (?q=phone&category=Fashion),
// so this slice only needs to hold the products and whether they are still loading.
const initialState = {
  products: [],
  loading: true,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts(state, action) {
      state.products = action.payload;
      state.loading = false;
    },
  },
});

export const { setProducts } = productSlice.actions;
export default productSlice.reducer;