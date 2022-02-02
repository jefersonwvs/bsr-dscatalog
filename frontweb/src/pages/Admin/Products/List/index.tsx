import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AxiosRequestConfig } from 'axios';

import ProductCrudCard from 'pages/Admin/Products/ProductCrudCard';
import { SpringPage } from 'types/vendor/spring';
import { Product } from 'types/product';
import { requestBackend } from 'utils/requests';
import Pagination from 'components/Pagination';

import './styles.css';

const List = function () {
  const [page, setPage] = useState<SpringPage<Product>>();

  const getProducts = function (pageNumber: number) {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: '/products',
      params: {
        page: pageNumber,
        size: 3,
      },
    };

    requestBackend(config).then((response) => {
      setPage(response.data as SpringPage<Product>);
    });
  };

  useEffect(() => {
    getProducts(0);
  }, []);

  return (
    <div className="product-crud-container">
      <div className="product-crud-bar-container">
        <Link to="/admin/products/create">
          <button className="btn btn-primary text-white btn-crud-add">
            ADICIONAR
          </button>
        </Link>
        <div className="base-card product-filter-container">Search bar</div>
      </div>
      <div className="row">
        {page?.content.map((product) => (
          <div className="col-sm-6 col-md-12" key={product.id}>
            <ProductCrudCard
              product={product}
              onDelete={() => getProducts(page.number)}
            />
          </div>
        ))}
      </div>
      <Pagination
        pageCount={page ? page?.totalPages : 0}
        range={3}
        onChange={getProducts}
      />
    </div>
  );
};

export default List;
