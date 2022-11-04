import React from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';

const FullPie: React.FC = () => {
  const [pie, setPie] = React.useState<{ imageUrl: string; title: string; price: number }>();
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
    return <>'LOADING ....'</>;
  }

  return (
    <div className="container">
      <img src={pie.imageUrl} alt="Pie" />
      <h2>{pie.title}</h2>
      <p>text text text texttexttexttextv texttexttexttexttexttexttext texttexttexttexttexttext</p>
      <h2>{pie.price} ₽</h2>
      <Link to={'/mdkd'}>
        <button className="button button--outline button--add">
          <span>Назад</span>
        </button>
      </Link>
    </div>
  );
};

export default FullPie;
