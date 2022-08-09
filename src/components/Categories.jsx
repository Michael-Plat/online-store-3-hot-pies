import React from 'react';

const categories = ['Все', 'Мясные', 'Вегетарианские', 'Десертные', 'Острые', 'Рыбные'];

export default function Categories({ value, onClickCategory }) {
  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, i) => (
          <li key={i} onClick={() => onClickCategory(i)} className={value === i ? 'active' : ''}>
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
}
