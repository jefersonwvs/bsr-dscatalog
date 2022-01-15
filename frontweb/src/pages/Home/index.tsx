import { Link } from 'react-router-dom';

import { ReactComponent as MainImage } from 'assets/images/main-image.svg';
import ButtonIcon from 'components/ButtonIcon';

import './styles.css';

const Home = function () {
  return (
    // React components are written in JSX - it's sort of HTML mixed with JS
    <div className="home-container">
      <div className="base-card home-card">
        <div className="home-content-container">
          <div>
            <h1>Conheça o melhor catálogo de produtos</h1>
            <p>
              Ajudaremos você a encontrar os melhores produtos disponíveis no
              mercado.
            </p>
          </div>
          <div className="home-content-btn">
            <Link to="/products">
              <ButtonIcon />
            </Link>
          </div>
        </div>

        <div className="home-image-container">
          <MainImage />
        </div>
      </div>
    </div>
  );
};

export default Home;
