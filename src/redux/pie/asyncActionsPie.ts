import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { PieType, SearchPiesParamsType } from './typesPie';

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
