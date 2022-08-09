import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setCategoryId, setSort, setCurrentPage } from '../redux/slice/filterSlice';
import PieBlock from '../components/PieBlock';
import PieBlockLoader from '../components/PieBlock/PieBlockLoader';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Pagination from '../components/Pagination';
import { SearchPie } from '../App';

export default function Home() {
  const { categoryId, sort, currentPage } = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const { searchValue } = React.useContext(SearchPie);
  const [items, setItems] = React.useState([]);
  const [loaderPies, setLoaderPies] = React.useState(true);
  // const [currentPage, setCurrentPage] = React.useState(1);

  React.useEffect(() => {
    setLoaderPies(true);

    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const sortBy = sort.sortProperty.replace('-', '');
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const search = searchValue ? `&search=${searchValue}` : '';

    fetch(
      `https://62e7c43093938a545bd89e33.mockapi.io/items?page=${currentPage}&limit=8 &${category}&sortBy=${sortBy}&order=${order}${search}`,
    )
      .then((res) => {
        return res.json();
      })
      .then((arr) => {
        setItems(arr);
        setLoaderPies(false);
      });
    window.scroll(0, 0);
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
      <Pagination onChangePage={(namber) => dispatch(setCurrentPage(namber))} />
    </div>
  );
}
