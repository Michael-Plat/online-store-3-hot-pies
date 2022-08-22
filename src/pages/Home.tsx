import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import {
  setCategoryId,
  setCurrentPage,
  setFilters,
  selectFilter,
} from '../redux/slice/filterSlice';
import PieBlock from '../components/PieBlock';
import PieBlockLoader from '../components/PieBlock/PieBlockLoader';
import Categories from '../components/Categories';
import Sort, { sortList } from '../components/Sort';
import Pagination from '../components/Pagination';
import { fetchPie, selectPie } from '../redux/slice/pieSlice';
import SignalError from '../components/SignalError';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const { categoryId, searchValue, sort, currentPage } = useSelector(selectFilter);
  const { items, status } = useSelector(selectPie);

  const getPies = async () => {
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const sortBy = sort.sortProperty.replace('-', '');
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const search = searchValue ? `&search=${searchValue}` : '';
    //@ts-ignore
    dispatch(fetchPie({ currentPage, category, sortBy, order, search }));
    window.scroll(0, 0);
  };

  // Если изменили параметры и был первый рендер
  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort, currentPage]);

  // Если был первый рендер, то проверяем  URL-параметры и сохраняем в Redux
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = sortList.find((obj) => obj.sortProperty === params.sortProperty);

      dispatch(setFilters({ ...params, sort }));
      isSearch.current = true;
    }
  }, []);

  // Если был первый рендер, до запрашиваем пироги
  React.useEffect(() => {
    if (!isSearch.current) {
      getPies();
    }

    isSearch.current = false;
  }, [categoryId, sort, searchValue, currentPage]);

  const loaderSkeletons = [...new Array(10)].map((_, index) => <PieBlockLoader key={index} />);
  const pies = items.map((obj: any) => <PieBlock key={obj.id} {...obj} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryId}
          onClickCategory={(id: number) => {
            dispatch(setCategoryId(id));
          }}
        />
        <Sort />
      </div>
      <h2 className="content__title">Все пироги</h2>
      {status === 'error' ? (
        <SignalError />
      ) : (
        <div className="content__items">{status === 'loading' ? loaderSkeletons : pies}</div>
      )}

      <Pagination
        currentPage={currentPage}
        onChangePage={(page: number) => dispatch(setCurrentPage(page))}
      />
    </div>
  );
};

export default Home;
