import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import { setCategoryId, setSort, setCurrentPage, setFilters } from '../redux/slice/filterSlice';
import PieBlock from '../components/PieBlock';
import PieBlockLoader from '../components/PieBlock/PieBlockLoader';
import Categories from '../components/Categories';
import Sort, { sortList } from '../components/Sort';
import Pagination from '../components/Pagination';
import { SearchPie } from '../App';

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const { categoryId, sort, currentPage } = useSelector((state) => state.filter);

  const { searchValue } = React.useContext(SearchPie);
  const [items, setItems] = React.useState([]);
  const [loaderPies, setLoaderPies] = React.useState(true);

  const fetchPies = () => {
    setLoaderPies(true);

    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const sortBy = sort.sortProperty.replace('-', '');
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const search = searchValue ? `&search=${searchValue}` : '';

    axios
      .get(
        `https://62e7c43093938a545bd89e33.mockapi.io/items?page=${currentPage}&limit=8 &${category}&sortBy=${sortBy}&order=${order}${search}`,
      )
      .then((res) => {
        setItems(res.data);
        setLoaderPies(false);
      });
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
    window.scroll(0, 0);

    if (!isSearch.current) {
      fetchPies();
    }

    isSearch.current = false;
  }, [categoryId, sort, searchValue, currentPage]);

  const loaderSkeletons = [...new Array(10)].map((_, index) => <PieBlockLoader key={index} />);
  const pies = items.map((obj) => <PieBlock key={obj.id} {...obj} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryId}
          onClickCategory={(id) => {
            dispatch(setCategoryId(id));
          }}
        />
        <Sort sort={sort} onClickSort={(i) => dispatch(setSort(i))} />
      </div>
      <h2 className="content__title">Все пироги</h2>
      <div className="content__items">{loaderPies ? loaderSkeletons : pies}</div>
      <Pagination
        currentPage={currentPage}
        onChangePage={(namber) => dispatch(setCurrentPage(namber))}
      />
    </div>
  );
}
