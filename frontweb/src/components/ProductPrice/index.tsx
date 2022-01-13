import './styles.css';

const ProductPrice = function () {
  return (
    <div className="product-price-container">
      <span className="product-price-currency">R$</span>
      <div className="text-primary product-price-value">
        <h3 className="product-price-value-integer">2.779</h3>
        <h4>,67</h4>
      </div>
    </div>
  );
};

export default ProductPrice;
