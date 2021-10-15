import './styles.css';
import { ReactComponent as ArrowIcon } from 'assets/images/arrow.svg';
import ProductPrice from 'components/ProductPrice';
import { Link } from 'react-router-dom';

const ProductDetails = () => {
   return (
      <div className="product-details-container">
         <div className="base-card product-details-card">
            <Link to="/products">
               <div className="goback-container">
                  <ArrowIcon />
                  <h2>VOLTAR</h2>
               </div>
            </Link>
            {/* row é do bootstrap */}
            <div className="row">
               {/* col-xl-6: colunas que ocupam metade da tela */}
               <div className="col-xl-6">
                  <div className="img-container">
                     <img
                        src="https://raw.githubusercontent.com/devsuperior/dscatalog-resources/master/backend/img/1-big.jpg"
                        alt="product-img"
                     />
                  </div>
                  <div className="name-price-container">
                     <h1>Nome do produto</h1>
                     <ProductPrice price={192.46}></ProductPrice>
                  </div>
               </div>
               <div className="col-xl-6">
                  <div className="description-container">
                     <h2>Descrição do produto</h2>
                     <p>
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Recusandae veniam tempore illum necessitatibus,
                        hic officia commodi laboriosam quibusdam at dolorem
                        pariatur libero autem, ipsa assumenda. Beatae voluptate
                        recusandae pariatur omnis odit itaque optio, commodi
                        maxime, quidem at nobis fuga ut similique, asperiores
                        aliquam nihil. Totam provident praesentium vitae maiores
                        excepturi.
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default ProductDetails;
