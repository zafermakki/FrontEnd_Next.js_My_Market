import {
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";

export type CartItem = {
  id: number;
  productId: number;
  name: string;
  price: string;
  image: string | null;
  quantity: number;
};

type CartState = {
  items: CartItem[];
};

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",

  initialState,

  reducers: {
    setCart: (
      state,
      action: PayloadAction<CartItem[]>
    ) => {
      state.items = action.payload;
    },

    addToCart: (
      state,
      action: PayloadAction<CartItem>
    ) => {
      const existingItem = state.items.find(
        (item) =>
          item.productId ===
          action.payload.productId
      );

      if (existingItem) {
        existingItem.quantity +=
          action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },

    removeFromCart: (
      state,
      action: PayloadAction<number>
    ) => {
      state.items = state.items.filter(
        (item) =>
          item.productId !== action.payload
      );
    },

    updateQuantity: (
      state,
      action: PayloadAction<{
        productId: number;
        quantity: number;
      }>
    ) => {
      const item = state.items.find(
        (item) =>
          item.productId ===
          action.payload.productId
      );

      if (!item) {
        return;
      }

      if (action.payload.quantity <= 0) {
        state.items = state.items.filter(
          (cartItem) =>
            cartItem.productId !==
            action.payload.productId
        );

        return;
      }

      item.quantity =
        action.payload.quantity;
    },

    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  setCart,
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;