import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { fetchPie } from './asyncActionsPie';
import { PiesSliceInface, PieType, Status } from './typesPie';

const initialState: PiesSliceInface = {
  items: [],
  status: Status.LOADING, // loading | success | error
};

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

export const { setItems } = pieSlice.actions;

export default pieSlice.reducer;
