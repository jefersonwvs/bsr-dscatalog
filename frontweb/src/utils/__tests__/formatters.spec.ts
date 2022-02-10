import { formatPrice } from 'utils/formatters';

test('formatPrice should format number pt-BR when given 10.1', () => {
  // Arrange
  const value = 10.1;

  // Act
  const result = formatPrice(value);

  // Assert
  expect(result).toEqual('10,10');
});
