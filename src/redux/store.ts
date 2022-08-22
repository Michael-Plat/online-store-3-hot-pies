import { configureStore } from '@reduxjs/toolkit';

import filter from './slice/filterSlice';
import cart from './slice/cartSlice';
import pie from './slice/pieSlice';

export const store = configureStore({
  reducer: { filter, cart, pie },
});
