import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { FilterSliceStateInface, SortPropertyEnum, SortType } from './typesFilter';

const initialState: FilterSliceStateInface = {
  categoryId: 0,
  searchValue: '',
  sort: { name: 'популярности', sortProperty: SortPropertyEnum.RATING_DESC },
  currentPage: 1,
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setSort(state, action: PayloadAction<SortType>) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterSliceStateInface>) {
      state.currentPage = Number(action.payload.currentPage);
      state.categoryId = Number(action.payload.categoryId);
      state.sort = action.payload.sort;
    },
  },
});

export const { setCategoryId, setSearchValue, setSort, setCurrentPage, setFilters } =
  filterSlice.actions;

export default filterSlice.reducer;
