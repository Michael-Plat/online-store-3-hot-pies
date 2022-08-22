import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import cart from '../assets/img/cart.png';
import trash from '../assets/img/trash.svg';
import greyArroeLeft from '../assets/img/grey-arrow-left.svg';
import CartItem from '../components/CartItem';
import { clearItem, selectCart } from '../redux/slice/cartSlice';
import CartEmpty from '../components/CartEmpty';

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const { items, totalPrice } = useSelector(selectCart);

  const totalCount = items.reduce((sum: number, item: any) => sum + item.count, 0);

  const onClickClear = () => {
    if (window.confirm('Очисть корзину ?')) {
      dispatch(clearItem());
    }
  };

  if (!totalPrice) {
    return <CartEmpty />;
  }

  return (
    <div className="container container--cart">
      <div className="cart">
        <div className="cart__top">
          <h2 className="content__title">
            <img src={cart} alt="Cart" /> Корзина
          </h2>
          <div className="cart__clear">
            <img src={trash} alt="Delete" />
            <span onClick={onClickClear}>Очистить корзину</span>
          </div>
        </div>
        <div className="content__items">
          {items.map((item: any) => (
            <CartItem key={item.id} {...item} />
          ))}
        </div>
        <div className="cart__bottom">
          <div className="cart__bottom-details">
            <span>
              Всего пицц: <b>{totalCount} шт.</b>
            </span>
            <span>
              Сумма заказа: <b>{totalPrice} ₽</b>
            </span>
          </div>
          <div className="cart__bottom-buttons">
            <Link to={'/'} className="button button--outline button--add go-back-btn">
              <img src={greyArroeLeft} alt="Lefrt" />
              <span>Вернуться назад</span>
            </Link>
            <div className="button pay-btn">
              <span>Оплатить сейчас</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
