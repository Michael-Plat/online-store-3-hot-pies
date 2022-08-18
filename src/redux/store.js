import { configureStore } from '@reduxjs/toolkit';

import filter from '../redux/slice/filterSlice';
import cart from '../redux/slice/cartSlice';
import pie from '../redux/slice/pieSlice';

export const store = configureStore({
  reducer: { filter, cart, pie },
});
