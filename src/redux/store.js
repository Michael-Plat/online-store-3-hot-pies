import { configureStore } from '@reduxjs/toolkit';

import filter from '../redux/slice/filterSlice';
import cart from '../redux/slice/cartSlice';

export const store = configureStore({
  reducer: { filter, cart },
});
