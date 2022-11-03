import { CartItemType } from '../redux/cart/typesCart';

export const calcTotalPrice = (items: CartItemType[]) => {
  return items.reduce((sum, obj) => obj.price * obj.count + sum, 0);
};
