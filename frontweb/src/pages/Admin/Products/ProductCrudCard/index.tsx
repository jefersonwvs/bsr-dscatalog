import { Link } from 'react-router-dom';

import ProductPrice from 'components/ProductPrice';
import { Product } from 'types/product';
import CategoryBadge from '../CategoryBadge';

import './styles.css';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from 'utils/requests';

type Props = {
  product: Product;
  onDelete: Function;
};

const ProductCrudCard = function (props: Props) {
  const { product, onDelete } = props;

  const handleDelete = function (productId: number) {
    if (!window.confirm('Tem certeza que deseja excluir o produto?')) {
      return;
    }

    const config: AxiosRequestConfig = {
      method: 'DELETE',
      url: `/products/${productId}`,
      withCredentials: true,
    };

    requestBackend(config).then(() => {
      onDelete();
    });
  };

  return (
    <div className="base-card product-crud-card">
      <div className="product-crud-card-top-container">
        <img src={product.imgUrl} alt={product.name} />
      </div>
      <div className="product-crud-card-description">
        <div className="product-crud-card-bottom-container">
          <h6>{product.name}</h6>
          <ProductPrice price={product.price} />
        </div>
        <div className="product-crud-categories-container">
          {product.categories.map((category) => (
            <CategoryBadge name={category.name} key={category.id} />
          ))}
        </div>
      </div>
      <div className="product-crud-card-buttons-container">
        <button
          className="btn btn-outline-danger product-crud-card-button product-crud-card-button-delete"
          onClick={() => {
            handleDelete(product.id);
          }}
        >
          EXCLUIR
        </button>
        <Link to={`/admin/products/${product.id}`}>
          <button className="btn btn-outline-secondary product-crud-card-button">
            EDITAR
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProductCrudCard;
