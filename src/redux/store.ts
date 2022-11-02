import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import filter from './slice/filterSlice';
import cart from './slice/cartSlice';
import pie from './slice/pieSlice';

export const store = configureStore({
  reducer: { filter, cart, pie },
});

export type RootStateType = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
