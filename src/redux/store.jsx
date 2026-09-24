import { configureStore } from "@reduxjs/toolkit";
import CartSlice from "./CartSlice";
import productSlice from "./productSlice";
import authSlice from "./authSlice";
import { saveCart } from "../utils/cartStorage";
import { saveAuth } from "../utils/authStorage";

const store = configureStore({
  reducer: {
    cart: CartSlice,
    product: productSlice,
    auth: authSlice,
  },
});

// Save the cart and the signed-in person whenever they change
// (and only then, not on every unrelated action)
let previousCart = store.getState().cart;
let previousAuth = store.getState().auth;

store.subscribe(() => {
  const state = store.getState();

  if (state.cart !== previousCart) {
    previousCart = state.cart;
    saveCart(state.cart);
  }
  if (state.auth !== previousAuth) {
    previousAuth = state.auth;
    saveAuth(state.auth);
  }
});

export default store;