import { ReactComponent as SearchIcon } from 'assets/images/search-icon.svg';

import './styles.css';

const ProductFilter = function () //
{
  return (
    <div className="base-card product-filter-container">
      <form className="product-filter-form" action="">
        <div className="product-filter-top-container">
          <input
            className="form-control product-filter-name"
            type="text"
            placeholder="Nome do produto"
          />
          <SearchIcon />
        </div>
        <div className="product-filter-bottom-container">
          <div className="product-filter-category-container">
            <select name="" id="">
              <option value="">Livros</option>
              <option value="">Eletrônicos</option>
            </select>
          </div>
          <button className="btn btn-outline-secondary">LIMPAR</button>
        </div>
      </form>
    </div>
  );
};

export default ProductFilter;
