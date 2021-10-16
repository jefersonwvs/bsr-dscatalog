import './styles.css';
import { ReactComponent as ArrowIcon } from 'assets/images/arrow.svg';
import ProductPrice from 'components/ProductPrice';
import { Link, useParams } from 'react-router-dom';
import { Product } from 'types/product';
import axios from 'axios';
import { BASE_URL } from 'utils/requests';
import { useEffect, useState } from 'react';
import ProductInfoLoader from './ProductInfoLoader';
import ProductDetailsLoader from './ProductDetailsLoader';

type UrlParams = {
   productId: string;
};

const ProductDetails = () => {
   const { productId } = useParams<UrlParams>();

   const [isLoading, setIsLoading] = useState(false);
   const [product, setProduct] = useState<Product>();

   useEffect(() => {
      setIsLoading(true);
      axios
         .get(`${BASE_URL}/products/${productId}`)
         .then((response) => {
            setProduct(response.data as Product);
         })
         .finally(() => {
            setIsLoading(false);
         });
   }, [productId]);

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
                  {isLoading ? (
                     <ProductInfoLoader />
                  ) : (
                     <>
                        <div className="img-container">
                           <img src={product?.imgUrl} alt={product?.name} />
                        </div>
                        <div className="name-price-container">
                           <h1>{product?.name}</h1>
                           {product && (
                              <ProductPrice
                                 price={product?.price}
                              ></ProductPrice>
                           )}
                        </div>
                     </>
                  )}
               </div>

               <div className="col-xl-6">
                  {isLoading ? (
                     <ProductDetailsLoader />
                  ) : (
                     <div className="description-container">
                        <h2>Descrição do produto</h2>
                        <p>{product?.description}</p>
                     </div>
                  )}
               </div>
            </div>
         </div>
      </div>
   );
};

export default ProductDetails;
