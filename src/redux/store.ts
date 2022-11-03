import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import filter from './filter/sliceFilter';
import cart from './cart/sliceCart';
import pie from './pie/slicePie';

export const store = configureStore({
  reducer: { filter, cart, pie },
});

export type RootStateType = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
