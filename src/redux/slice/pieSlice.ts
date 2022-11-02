import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

import { RootStateType } from '../store';
import { SortType } from './filterSlice';

interface PiesSliceInface {
  items: PieType[];
  status: Status;
}

type PieType = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  size: number[];
  types: number[];
  rating: number;
};

export type SearchPiesParamsType = {
  currentPage: number;
  category: string;
  sortBy: string;
  order: string;
  search: string;
};

enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

const initialState: PiesSliceInface = {
  items: [],
  status: Status.LOADING, // loading | success | error
};

export const fetchPie = createAsyncThunk<PieType[], SearchPiesParamsType>(
  'pie/fetchPieStatus',
  async (params) => {
    const { currentPage, category, sortBy, order, search } = params;
    const { data } = await axios.get<PieType[]>(
      `https://62e7c43093938a545bd89e33.mockapi.io/items?page=${currentPage}&limit=8 &${category}&sortBy=${sortBy}&order=${order}${search}`,
    );
    return data;
  },
);

const pieSlice = createSlice({
  name: 'pie',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<PieType[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPie.pending, (state, action) => {
      state.status = Status.LOADING;
      state.items = [];
    });

    builder.addCase(fetchPie.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });

    builder.addCase(fetchPie.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  },
});

export const selectPie = (state: RootStateType) => state.pie;

export const { setItems } = pieSlice.actions;

export default pieSlice.reducer;
