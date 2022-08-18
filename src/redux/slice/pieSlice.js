import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPie = createAsyncThunk('pie/fetchPieStatus', async (params) => {
  const { currentPage, category, sortBy, order, search } = params;
  const { data } = await axios.get(
    `https://62e7c43093938a545bd89e33.mockapi.io/items?page=${currentPage}&limit=8 &${category}&sortBy=${sortBy}&order=${order}${search}`,
  );
  return data;
});

const initialState = {
  items: [],
  status: 'loading', // loading | success | error
};

const pieSlice = createSlice({
  name: 'pie',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchPie.pending]: (state) => {
      state.status = 'loading';
      state.items = [];
    },
    [fetchPie.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = 'success';
    },
    [fetchPie.rejected]: (state) => {
      state.status = 'error';
      state.items = [];
    },
  },
});

export const { setItems } = pieSlice.actions;

export default pieSlice.reducer;
