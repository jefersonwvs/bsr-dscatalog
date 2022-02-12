import { render, screen } from '@testing-library/react';
import { Product } from 'types/product';
import ProductCard from '..';

test('should render ProductCard', () => {
  const product: Product = {
    name: 'Notebook Lenovo Ideapad 300',
    price: 2785.4,
    imgUrl: 'https://wwww.doesnotmatter.com',
  } as Product;

  render(<ProductCard product={product} />);

  const name = screen.getByText('Notebook Lenovo Ideapad 300');
  const img = screen.getByAltText('Notebook Lenovo Ideapad 300');
  const currency = screen.getByText('R$');
  const integerPrice = screen.getByText('2.785');
  const decimalPrice = screen.getByText(',40');

  expect(name).toBeInTheDocument();
  expect(img).toBeInTheDocument();
  expect(currency).toBeInTheDocument();
  expect(integerPrice).toBeInTheDocument();
  expect(decimalPrice).toBeInTheDocument();
});
