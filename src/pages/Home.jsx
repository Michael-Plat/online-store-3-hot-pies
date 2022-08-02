import React from 'react';

import PieBlock from '../components/PieBlock';
import PieBlockLoader from '../components/PieBlock/PieBlockLoader';
import Categories from '../components/Categories';
import Sort from '../components/Sort';

export default function Home() {
  const [items, setItems] = React.useState([]);
  const [loaderPies, setLoaderPies] = React.useState(true);

  React.useEffect(() => {
    fetch('https://62e7c43093938a545bd89e33.mockapi.io/items')
      .then((res) => {
        return res.json();
      })
      .then((arr) => {
        setItems(arr);
        setLoaderPies(false);
      });
    window.scroll(0, 0);
  }, []);
  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
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
