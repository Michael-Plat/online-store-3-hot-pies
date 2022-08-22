import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { addItem, selectCartById } from '../../redux/slice/cartSlice';

type PieBlockPropsType = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  types: number[];
  sizes: number[];
};

const typesPie = ['тонкое', 'традиционное'];

const PieBlock: React.FC<PieBlockPropsType> = ({ id, title, price, imageUrl, types, sizes }) => {
  const dispatch = useDispatch();
  const cartItem = useSelector(selectCartById(id));
  const [typeActive, setTypeActive] = React.useState(Math.min.apply(this, types));
  const [sizeActive, setSizeActive] = React.useState(0);

  const addedCount = cartItem ? cartItem.count : 0;

  const onClickAdd = () => {
    const item = {
      id,
      title,
      price,
      imageUrl,
      type: typesPie[typeActive],
      size: sizes[sizeActive],
    };
    dispatch(addItem(item));
  };

  return (
    <div className="pie-block-wrapper">
      <div className="pie-block">
        <Link to={'/pie/' + id}>
          <img className="pie-block__image" src={imageUrl} alt="Pie" />
          <h4 className="pie-block__title">{title}</h4>
        </Link>
        <div className="pie-block__selector">
          <ul>
            {types.map((i) => (
              <li
                key={i}
                onClick={() => setTypeActive(i)}
                className={typeActive === i ? 'active' : ''}>
                {typesPie[i]}
              </li>
            ))}
          </ul>
          <ul>
            {sizes.map((size, i) => (
              <li
                key={size}
                onClick={() => setSizeActive(i)}
                className={sizeActive === i ? 'active' : ''}>
                {size} гр.
              </li>
            ))}
          </ul>
        </div>
        <div className="pie-block__bottom">
          <div className="pie-block__price">от {price} ₽</div>
          <button onClick={onClickAdd} className="button button--outline button--add">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Добавить</span>
            {addedCount > 0 && <i>{addedCount}</i>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PieBlock;
