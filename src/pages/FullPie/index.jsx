import React from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

export default function FullPie() {
  const [pie, setPie] = React.useState();
  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchPie() {
      try {
        const { data } = await axios.get('https://62e7c43093938a545bd89e33.mockapi.io/items/' + id);
        setPie(data);
      } catch (error) {
        alert('Произошла ошибка, загрузка остановлена.');
        navigate('/');
      }
    }
    fetchPie();
  }, []);

  if (!pie) {
    return 'LOADING ....';
  }

  return (
    <div className="container">
      <img src={pie.imageUrl} alt="Pie" />
      <h2>{pie.title}</h2>
      <p>text text text texttexttexttextv texttexttexttexttexttexttext texttexttexttexttexttext</p>
      <h2>{pie.price} ₽</h2>
    </div>
  );
}
