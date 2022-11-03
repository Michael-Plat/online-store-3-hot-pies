export interface PiesSliceInface {
  items: PieType[];
  status: Status;
}

export type PieType = {
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

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}
