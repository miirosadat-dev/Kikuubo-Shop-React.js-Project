import { createSlice } from "@reduxjs/toolkit";
import { loadCart } from "../utils/cartStorage";

// Totals are always recalculated from the products list, so they can
// never drift out of sync. The products array is the single source of truth.
const recalculateTotals = (state) => {
  state.totalQuantity = state.products.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );
  state.totalPrice = state.products.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
};

const defaultAddress = {
  name: "Miiro Sadat",
  phone: "+256-700000000",
  address: "Lubiri Ring Road, Mengo",
};

const saved = loadCart();

const initialState = {
  products: saved?.products ?? [],
  totalQuantity: 0,
  totalPrice: 0,
  shippingAddress: saved?.shippingAddress ?? defaultAddress,
  currentOrder: null,
};

recalculateTotals(initialState);

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Product cards send the product and get 1 added.
    // The product page sends { ...product, quantity: 3 } to add several at once.
    addToCart(state, action) {
      const newItem = action.payload;
      const quantity = Math.max(1, Math.floor(Number(newItem.quantity)) || 1);
      const existingItem = state.products.find((item) => item.id === newItem.id);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.products.push({
          id: newItem.id,
          name: newItem.name,
          price: newItem.price,
          image: newItem.image,
          quantity,
        });
      }
      recalculateTotals(state);
    },

    removeFromCart(state, action) {
      state.products = state.products.filter(
        (item) => item.id !== action.payload,
      );
      recalculateTotals(state);
    },

    increaseQuantity(state, action) {
      const item = state.products.find((item) => item.id === action.payload);
      if (item) {
        item.quantity++;
        recalculateTotals(state);
      }
    },

    decreaseQuantity(state, action) {
      const item = state.products.find((item) => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity--;
        recalculateTotals(state);
      }
    },

    clearCart(state) {
      state.products = [];
      recalculateTotals(state);
    },

    updateShippingAddress(state, action) {
      state.shippingAddress = action.payload;
    },

    saveOrder(state, action) {
      state.currentOrder = action.payload;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
  updateShippingAddress,
  saveOrder,
} = CartSlice.actions;

export default CartSlice.reducer;