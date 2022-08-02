import React from 'react';

export default function Categories() {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const categories = ['Все', 'Мясные', 'Вегетарианские', 'Десертные', 'Острые', 'Рыбные'];

  return (
    <div className="categories">
      <ul>
        {categories.map((value, i) => (
          <li
            key={value}
            onClick={() => setActiveIndex(i)}
            className={activeIndex === i ? 'active' : ''}>
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
}
