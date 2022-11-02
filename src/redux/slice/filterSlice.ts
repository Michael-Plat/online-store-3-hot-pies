import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootStateType } from '../store';

export enum SortPropertyEnum {
  RATING_DESC = 'rating',
  RATING_ASC = '-rating',
  PRICE_DESC = 'price',
  PRICE_ASC = '-price',
  TITLE_DESC = 'title',
  TITLE_ASC = '-title',
}

export type SortType = {
  name: string;
  sortProperty: SortPropertyEnum;
};

export interface FilterSliceStateInface {
  categoryId: number;
  searchValue: string;
  sort: SortType;
  currentPage: number;
}

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

export const selectFilter = (state: RootStateType) => state.filter;

export const { setCategoryId, setSearchValue, setSort, setCurrentPage, setFilters } =
  filterSlice.actions;

export default filterSlice.reducer;
