import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

import Pagination from 'components/Pagination';
import ProductCard from 'components/ProductCard';
import { Product } from 'types/product';
import { SpringPage } from 'types/vendor/spring';
import { AxiosParams } from 'types/vendor/axios';
import { BASE_URL } from 'utils/requests';

import './styles.css';

const Catalog = function () {
  const [page, setPage] = useState<SpringPage<Product>>();

  useEffect(() => {
    const request: AxiosParams = {
      method: 'GET',
      url: `${BASE_URL}/products`,
      params: {
        page: 0,
        size: 12,
      },
    };

    axios(request).then((response) => {
      setPage(response.data as SpringPage<Product>);
    });
  }, []);

  return (
    <div className="container my-4 catalog-container">
      <div className="row catalog-title-container">
        <h1>Catálogo de produtos</h1>
      </div>

      <div className="row">
        {page?.content.map((product) => (
          <div className="col-sm-6 col-lg-4 col-xl-3" key={product.id}>
            <Link to={`/products/${product.id}`}>
              <ProductCard product={product} />
            </Link>
          </div>
        ))}
      </div>

      <div className="row">
        <Pagination />
      </div>
    </div>
  );
};

export default Catalog;
