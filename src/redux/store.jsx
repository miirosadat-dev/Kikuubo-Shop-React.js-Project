import { configureStore } from "@reduxjs/toolkit";
import CartSlice from "./CartSlice";
import productSlice from "./productSlice";
import { saveCart } from "../utils/cartStorage";

const store = configureStore({
  reducer: {
    cart: CartSlice,
    product: productSlice,
  },
});

// Save the cart whenever it changes (and only then, not on every search keystroke)
let previousCart = store.getState().cart;
store.subscribe(() => {
  const currentCart = store.getState().cart;
  if (currentCart !== previousCart) {
    previousCart = currentCart;
    saveCart(currentCart);
  }
});

export default store;