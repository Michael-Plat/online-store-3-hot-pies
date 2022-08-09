import { configureStore } from '@reduxjs/toolkit';

import filter from '../redux/slice/filterSlice';

export const store = configureStore({
  reducer: { filter },
});
