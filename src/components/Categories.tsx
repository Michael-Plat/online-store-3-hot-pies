import React from 'react';

type CategoriesPropsType = {
  value: number;
  onClickCategory: (i: number) => void;
};

const categories = ['Все', 'Мясные', 'Вегетарианские', 'Десертные', 'Острые', 'Рыбные'];

const Categories: React.FC<CategoriesPropsType> = ({ value, onClickCategory }) => {
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
};

export default Categories;
