import { render, screen } from '@testing-library/react';
import ProductPrice from '..';

test('should render ProductPrice', () => {
  const text1 = 'R$';
  const text2 = '27';
  const text3 = ',90';

  render(<ProductPrice price={27.9} />);
  // screen.debug();

  const result1 = screen.getByText(text1);
  expect(result1).toBeInTheDocument();
  const result2 = screen.getByText(text2);
  expect(result2).toBeInTheDocument();
  const result3 = screen.getByText(text3);
  expect(result3).toBeInTheDocument();
});
