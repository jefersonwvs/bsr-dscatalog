import { ReactComponent as ArrowIcon } from 'assets/images/arrow.svg';
import ProductPrice from 'components/ProductPrice';

import './styles.css';

const ProductDetails = function () {
  return (
    <div className="product-details-container">
      <div className="base-card product-details-card">
        <div className="goback-container">
          <ArrowIcon />
          <h2>Voltar</h2>
        </div>
        <div className="row">
          <div className="col-xl-6">
            <div className="img-container">
              <img
                src="https://raw.githubusercontent.com/devsuperior/dscatalog-resources/master/backend/img/3-big.jpg"
                alt="Macbook Pro"
              />
            </div>
            <div className="name-price-container">
              <h1>Nome do produto</h1>
              <ProductPrice price={1250.15} />
            </div>
          </div>
          <div className="col-xl-6">
            <div className="description-container">
              <h2>Descrição do produto</h2>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Nesciunt quibusdam consequatur asperiores! Culpa, quis! Optio
                eligendi vitae, aut ab at consectetur dolores quia. Rem dolorum
                distinctio quisquam alias, nisi animi! Lorem ipsum dolor sit
                amet consectetur adipisicing elit. Quisquam quae unde ratione
                necessitatibus dolores quibusdam debitis voluptate laboriosam
                praesentium. Dolore amet ipsum aperiam ipsam ipsa rem molestiae
                facilis delectus cum.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
