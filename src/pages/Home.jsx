import React from 'react';

import PieBlock from '../components/PieBlock';
import PieBlockLoader from '../components/PieBlock/PieBlockLoader';
import Categories from '../components/Categories';
import Sort from '../components/Sort';

export default function Home() {
  const [items, setItems] = React.useState([]);
  const [loaderPies, setLoaderPies] = React.useState(true);
  const [categoryId, setCategoryId] = React.useState(0);
  const [sortType, setSortType] = React.useState({ name: 'популярности', sortProperty: 'rating' });

  React.useEffect(() => {
    setLoaderPies(true);
    fetch(
      `https://62e7c43093938a545bd89e33.mockapi.io/items?${
        categoryId > 0 ? `category=${categoryId}` : ''
      }&sortBy=${sortType.sortProperty.replace('-', '')}&order=${
        sortType.sortProperty.includes('-') ? 'asc' : 'desc'
      }`,
    )
      .then((res) => {
        return res.json();
      })
      .then((arr) => {
        setItems(arr);
        setLoaderPies(false);
      });
    window.scroll(0, 0);
  }, [categoryId, sortType]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={(i) => setCategoryId(i)} />
        <Sort sort={sortType} onClickSort={(i) => setSortType(i)} />
      </div>
      <h2 className="content__title">Все пироги</h2>
      <div className="content__items">
        {loaderPies
          ? [...new Array(10)].map((_, index) => <PieBlockLoader key={index} />)
          : items.map((obj) => <PieBlock key={obj.id} {...obj} />)}
      </div>
    </div>
  );
}
