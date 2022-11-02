import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootStateType } from '../store';

export type CartItemType = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  type: string;
  size: number;
  count: number;
};

interface CartSliceStateInface {
  totalPrice: number;
  items: CartItemType[];
}

const initialState: CartSliceStateInface = {
  totalPrice: 0,
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItemType>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },
    minusItem(state, action: PayloadAction<string>) {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      if (findItem) {
        findItem.count--;
        state.totalPrice -= findItem.price;
      }
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((obj) => obj.id === action.payload);
    },
    clearItem(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const selectCart = (state: RootStateType) => state.cart;

export const selectCartById = (id: string) => (state: RootStateType) =>
  state.cart.items.find((obj) => obj.id === id);

export const { addItem, minusItem, removeItem, clearItem } = cartSlice.actions;

export default cartSlice.reducer;
