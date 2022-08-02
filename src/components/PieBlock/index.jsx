import React from 'react';

export default function PieBlock({ title, price, imageUrl, types, sizes }) {
  const [pieCount, setPieCount] = React.useState(0);
  const [type, setType] = React.useState(Math.min.apply(this, types));
  const [sizeActive, setSizeActive] = React.useState(26);

  const addPieCount = () => {
    setPieCount(pieCount + 1);
  };

  const typePie = ['тонкое', 'традиционное'];

  return (
    <div className="pie-block-wrapper">
      <div className="pie-block">
        <img className="pie-block__image" src={imageUrl} alt="Pie" />
        <h4 className="pie-block__title">{title}</h4>
        <div className="pie-block__selector">
          <ul>
            {types.map((i) => (
              <li key={i} onClick={() => setType(i)} className={type === i ? 'active' : ''}>
                {typePie[i]}
              </li>
            ))}
          </ul>
          <ul>
            {sizes.map((size) => (
              <li
                key={size}
                onClick={() => setSizeActive(size)}
                className={sizeActive === size ? 'active' : ''}>
                {size} гр.
              </li>
            ))}
          </ul>
        </div>
        <div className="pie-block__bottom">
          <div className="pie-block__price">от {price} ₽</div>
          <button onClick={addPieCount} className="button button--outline button--add">
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
            <i>{pieCount}</i>
          </button>
        </div>
      </div>
    </div>
  );
}
